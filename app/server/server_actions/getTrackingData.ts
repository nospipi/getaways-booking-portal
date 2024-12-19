"use server";
import {
  BookingModel,
  TourGroupModel,
  TaskModel,
  VehicleModel,
  G4STrackingSessionCredentialsModel,
} from "@/app/server/getaways-shared-models/models";
import moment from "moment-timezone";
import connectDB from "@/app/server/db.connect";
const G4S_TRACKING_CREDENTIALS_DOC_ID =
  process.env.G4S_TRACKING_CREDENTIALS_DOC_ID;
import geolib from "geolib";
import axios from "axios";
import { IServerActionReturn } from "./types";

//-----------------------------------------------------------------------------

// export const getPhoneNumberOnDuty = async (): Promise<IServerActionReturn> => {
//   try {
//     //throw new Error("getPhoneNumberOnDuty simulate error"); //simulate error
//     //dont use throws in Vercel production because it intercepts the error and returns a custom error

//     await connectDB();
//     const onDutyUser = await UserModel.find({ onOfficeDuty: true });

//     if (onDutyUser.length === 0) {
//       return {
//         status: "error",
//         message: "No agents on duty right now, please send us an email",
//       };
//     }

//     //if more than one user on duty choose one randomly
//     const randomUserIndex = Math.floor(Math.random() * onDutyUser.length);
//     const phone_number = onDutyUser[randomUserIndex].contact.tel;

//     return {
//       status: "success",
//       message: "Phone number retrieved",
//       data: {
//         agent_name: onDutyUser[randomUserIndex].name.split(" ")[0],
//         phone_number,
//       },
//     };
//   } catch (e: unknown) {
//     console.log(e);
//     if (e instanceof Error) {
//       const error = e as { message: string };
//       return {
//         status: "error",
//         message: error.message,
//       };
//     } else {
//       return {
//         status: "error",
//         message: "An error occurred",
//       };
//     }
//   }
// };

const updateG4sTrackingSessionCredentials = async () => {
  const { username, password } =
    await G4STrackingSessionCredentialsModel.findById(
      G4S_TRACKING_CREDENTIALS_DOC_ID
    );

  const newCredentials = await axios.get(
    `https://api.3dtracking.net/api/v1.0/Authentication/UserAuthenticate?UserName=${username}&Password=${password}`
  );
  const { SessionId: NewSessionId } = newCredentials.data.Result;
  const { SessionId: updatedCredentialsDocSessionId } =
    await G4STrackingSessionCredentialsModel.findByIdAndUpdate(
      G4S_TRACKING_CREDENTIALS_DOC_ID,
      { SessionId: NewSessionId },
      { new: true }
    );
  console.log("G4s tracking session credentials updated");
  return updatedCredentialsDocSessionId;
};

const updateVehiclePosition = async (
  vehicle_id: string,
  latitude: number,
  longitude: number,
  speed: number,
  heading: number
) => {
  try {
    await VehicleModel.findByIdAndUpdate(vehicle_id, {
      position: {
        latitude,
        longitude,
        speed,
        heading,
        updated_at: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//-----------------------------------------------------------------------------

const getTrackingData = async (booking_id: string) => {
  await connectDB();
  const booking = await BookingModel.findById(booking_id);

  const hasMeetingTime = booking.pickup_time.length > 0;
  const hasPickupLocation = booking?.pickup_location?.name?.length > 0;

  const pickupDateTimeInGreece = moment(
    `${booking.date} ${booking.pickup_time}`,
    "YYYY-MM-DD HH:mm"
  ).format("YYYY-MM-DD HH:mm");

  const currentDateTimeInGreece = moment()
    .tz("Europe/Athens")
    .format("YYYY-MM-DD HH:mm");

  const currentDateTimeInGreeceIsBeforeAllowedTrackingTime = moment(
    currentDateTimeInGreece,
    "YYYY-MM-DD HH:mm"
  ).isBefore(
    moment(pickupDateTimeInGreece, "YYYY-MM-DD HH:mm").subtract(1800, "seconds")
  ); //30 minutes
  const currentDateTimeInGreeceIsAfterAllowedTrackingTime = moment(
    currentDateTimeInGreece,
    "YYYY-MM-DD HH:mm"
  ).isAfter(
    moment(pickupDateTimeInGreece, "YYYY-MM-DD HH:mm").add(3600, "seconds")
  ); //1 hour

  const trackingStartingDateTime = moment(
    pickupDateTimeInGreece,
    "YYYY-MM-DD HH:mm"
  )
    .subtract(1800, "seconds")
    .format("DD MMM YYYY, hh:mm A");

  const tourGroup = await TourGroupModel.findById(booking.tour_group_id);
  const task = await TaskModel.findById(tourGroup?.task_id);

  // HAVING TASK BUT NO MEETING TIME NOT POSSIBLE SO WE CHECK FOR TASK FIRST ANYWAY
  if (!task) {
    const error = new Error();
    error.message = "Tour bus tracking not available";
    throw error;
  }

  if (!task.vehicle_id) {
    const error = new Error();
    error.message = "Tour bus tracking not available";
    throw error;
  }

  if (!hasPickupLocation) {
    const error = new Error();
    error.message = "Tour bus tracking not available";
    throw error;
  }

  if (!hasMeetingTime) {
    const error = new Error();
    error.message = "Tour bus tracking not available";
    throw error;
  }

  if (currentDateTimeInGreeceIsBeforeAllowedTrackingTime) {
    const error = new Error();
    error.message = `Tour bus tracking will open on ${trackingStartingDateTime}`;
    throw error;
  }

  if (currentDateTimeInGreeceIsAfterAllowedTrackingTime) {
    const error = new Error();
    error.message =
      "Tour bus tracking is available only during the pickup time";
    throw error;
  }

  //----------------- GETTING TRACKING DATA -------------------

  const {
    gps_tracker_uid,
    position: { latitude, longitude, heading, updated_at },
  } = await VehicleModel.findById(task.vehicle_id);

  const vehicleHasGpsTracker = gps_tracker_uid && gps_tracker_uid?.length > 0;
  if (!vehicleHasGpsTracker) {
    const error = new Error();
    error.message = "Tour bus tracking not available";
    throw error;
  }

  const vehicleHasPosition = latitude && longitude && updated_at;
  const vehiclePositionIsOld = moment(updated_at).isBefore(
    moment().subtract(3, "seconds")
  );
  const shouldGetNewPosition = !vehicleHasPosition || vehiclePositionIsOld;

  const coordinates = task?.pickups
    ?.map((pickup: { lat: number; lon: number }) => {
      if (
        pickup.lat !== booking.pickup_location.latitude ||
        pickup.lon !== booking.pickup_location.longitude
      ) {
        return {
          latitude: pickup.lat,
          longitude: pickup.lon,
        };
      }
      return null; // Return null for coordinates to be filtered out
    })
    .filter((coordinate: unknown) => coordinate !== null);

  const distanceFromVehicleToClient = geolib.getPreciseDistance(
    { latitude, longitude },
    {
      latitude: booking.pickup_location.latitude,
      longitude: booking.pickup_location.longitude,
    }
  );

  const withinRangeOfOtherPickup = coordinates.some(
    (coordinate: { latitude: number; longitude: number }) => {
      const distance = geolib.getPreciseDistance(
        { latitude, longitude },
        coordinate
      );
      return distance < 100;
    }
  );
  const arrivingInOwnPickup =
    distanceFromVehicleToClient <= 300 && distanceFromVehicleToClient > 80;
  const arrivedAtOwnPickup = distanceFromVehicleToClient <= 80;

  if (shouldGetNewPosition) {
    const { UserIdGuid, SessionId: CurrentSessionId } =
      await G4STrackingSessionCredentialsModel.findById(
        G4S_TRACKING_CREDENTIALS_DOC_ID
      );
    let stats;

    const vehicle_stats = await axios.get(
      `https://api.3dtracking.net/api/v1.0/Units/${gps_tracker_uid}/PositionAtTime?UserIdGuid=${UserIdGuid}&SessionId=${CurrentSessionId}&PointInTimeDateTimeUTC=${new Date().toISOString()}`
    );
    const sessionIsExpired = vehicle_stats.data.Status.ErrorCode === "50018";

    //SESSION EXPIRED
    if (sessionIsExpired) {
      //GET NEW SESSION ID
      const updatedCredentialsDocSessionId =
        await updateG4sTrackingSessionCredentials();
      const vehicle_stats_after_updating_creds = await axios.get(
        `https://api.3dtracking.net/api/v1.0/Units/${gps_tracker_uid}/PositionAtTime?UserIdGuid=${UserIdGuid}&SessionId=${updatedCredentialsDocSessionId}&PointInTimeDateTimeUTC=${new Date().toISOString()}`
      );

      stats = vehicle_stats_after_updating_creds.data.Result;
    } else {
      stats = vehicle_stats.data.Result;
    }

    await updateVehiclePosition(
      task.vehicle_id,
      stats.Position.Latitude,
      stats.Position.Longitude,
      stats.Position.Speed,
      stats.Position.Heading
    );

    const result = {
      vehicle_position: {
        new: true,
        lat: stats.Position.Latitude,
        lon: stats.Position.Longitude,
        heading: stats.Position.Heading,
      },
      withinRangeOfOtherPickup,
      arrivingInOwnPickup,
      arrivedAtOwnPickup,
    };

    return JSON.stringify(result); //don't stringify if its sent to a server component
  } else {
    const result = {
      vehicle_position: {
        new: false,
        lat: latitude,
        lon: longitude,
        heading,
      },
      withinRangeOfOtherPickup,
      arrivingInOwnPickup,
      arrivedAtOwnPickup,
    };

    return JSON.stringify(result); //don't stringify if its sent to a server component
  }
};

export default getTrackingData;

//------------------------------------------------------------------------------
