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
import { getPreciseDistance } from "geolib";
import axios from "axios";
import { IServerActionReturn } from "./types";
const G4S_TRACKING_URL = process.env.G4S_TRACKING_URL;

//-----------------------------------------------------------------------------

class CustomError extends Error {
  targetDate?: string;

  constructor() {
    super(); // Call the parent constructor to initialize the `message` and other Error properties.
  }
}

//-----------------------------------------------------------------------------

const updateG4sTrackingSessionCredentials = async () => {
  const { username, password } =
    await G4STrackingSessionCredentialsModel.findById(
      G4S_TRACKING_CREDENTIALS_DOC_ID
    );

  const newCredentials = await axios.get(
    `${G4S_TRACKING_URL}Authentication/UserAuthenticate?UserName=${username}&Password=${password}`
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

interface VehiclePosition {
  new: boolean;
  lon: number;
  lat: number;
  heading: number;
}

interface TrackingData {
  targetDate?: string | null;
  vehiclePosition?: VehiclePosition;
  otherPickupsCoords?: { latitude: string; longitude: string }[];
  pickupCoords?: { latitude: string; longitude: string }[];
  withinRangeOfOtherPickup?: boolean;
  arrivingInOwnPickup?: boolean;
  arrivedAtOwnPickup?: boolean;
  vehiclePlate?: string;
  vehicleColor?: string;
  vehicleType?: string;
  meetingPointName?: string;
}

export type IExtendedServerActionReturn = IServerActionReturn<TrackingData>;

const getTrackingData = async (
  uniqueId: string
): Promise<IExtendedServerActionReturn> => {
  try {
    await connectDB();
    const booking = await BookingModel.findOne({
      unique_booking_id: uniqueId,
    });

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
      moment(pickupDateTimeInGreece, "YYYY-MM-DD HH:mm").subtract(
        1800,
        "seconds"
      )
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
      const error = new CustomError();
      error.message = "NOT AVAILABLE";
      throw error;
    }

    if (!tourGroup.vehicle_id) {
      const error = new CustomError();
      error.message = "NOT AVAILABLE";
      throw error;
    }

    if (!hasPickupLocation) {
      const error = new CustomError();
      error.message = "NOT AVAILABLE";
      throw error;
    }

    if (!hasMeetingTime) {
      const error = new CustomError();
      error.message = "NOT AVAILABLE";
      throw error;
    }

    if (currentDateTimeInGreeceIsBeforeAllowedTrackingTime) {
      const error = new CustomError();

      error.message = `Tour bus tracking will open on ${trackingStartingDateTime}`;
      error.targetDate = trackingStartingDateTime;
      throw error;
    }

    if (currentDateTimeInGreeceIsAfterAllowedTrackingTime) {
      const error = new CustomError();
      error.message =
        "Tour bus tracking is no longer available for this booking";
      throw error;
    }

    //----------------- GETTING TRACKING DATA -------------------

    const {
      plate,
      color,
      type,
      gps_tracker_uid,
      position: { latitude, longitude, heading, updated_at },
    } = await VehicleModel.findById(tourGroup.vehicle_id);

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

    const otherPickupsCoords = task?.pickups
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

    const pickupCoords = task?.pickups?.map(
      (pickup: { lat: number; lon: number }) => {
        return {
          latitude: pickup.lat,
          longitude: pickup.lon,
        };
      }
    );

    if (shouldGetNewPosition) {
      //get new position

      const { UserIdGuid, SessionId: CurrentSessionId } =
        await G4STrackingSessionCredentialsModel.findById(
          G4S_TRACKING_CREDENTIALS_DOC_ID
        );
      let stats;

      const vehicle_stats = await axios.get(
        `${G4S_TRACKING_URL}Units/${gps_tracker_uid}/PositionAtTime?UserIdGuid=${UserIdGuid}&SessionId=${CurrentSessionId}&PointInTimeDateTimeUTC=${new Date().toISOString()}`
      );
      const sessionIsExpired = vehicle_stats.data.Status.ErrorCode === "50018";

      //SESSION EXPIRED
      if (sessionIsExpired) {
        //GET NEW SESSION ID
        const updatedCredentialsDocSessionId =
          await updateG4sTrackingSessionCredentials();
        const vehicle_stats_after_updating_creds = await axios.get(
          `${G4S_TRACKING_URL}/${gps_tracker_uid}/PositionAtTime?UserIdGuid=${UserIdGuid}&SessionId=${updatedCredentialsDocSessionId}&PointInTimeDateTimeUTC=${new Date().toISOString()}`
        );

        stats = vehicle_stats_after_updating_creds.data.Result;
      } else {
        stats = vehicle_stats.data.Result;
      }

      await updateVehiclePosition(
        tourGroup.vehicle_id,
        stats.Position.Latitude,
        stats.Position.Longitude,
        stats.Position.Speed,
        stats.Position.Heading
      );

      const distanceFromVehicleToClientMeters = getPreciseDistance(
        {
          latitude: stats.Position.Latitude,
          longitude: stats.Position.Longitude,
        },
        {
          latitude: booking.pickup_location.latitude,
          longitude: booking.pickup_location.longitude,
        }
      );

      const withinRangeOfOtherPickup = otherPickupsCoords.some(
        (coordinate: { latitude: number; longitude: number }) => {
          const distance = getPreciseDistance(
            {
              latitude: stats.Position.Latitude,
              longitude: stats.Position.Longitude,
            },
            coordinate
          );
          return distance < 100;
        }
      );
      const arrivingInOwnPickup =
        distanceFromVehicleToClientMeters <= 300 &&
        distanceFromVehicleToClientMeters > 80;
      const arrivedAtOwnPickup = distanceFromVehicleToClientMeters <= 80;

      const result: IExtendedServerActionReturn = {
        status: "success",
        message: "Tracking data retrieved successfully",
        data: {
          vehiclePosition: {
            new: true,
            lat: stats.Position.Latitude,
            lon: stats.Position.Longitude,
            heading: stats.Position.Heading,
          },
          otherPickupsCoords,
          pickupCoords: pickupCoords,
          withinRangeOfOtherPickup,
          arrivingInOwnPickup,
          arrivedAtOwnPickup,
          vehiclePlate: plate,
          vehicleColor: color,
          vehicleType: type,
          meetingPointName: booking.pickup_location.name,
        },
      };

      return result;
    } else {
      //return stored position

      const distanceFromVehicleToClientMeters = getPreciseDistance(
        { latitude, longitude },
        {
          latitude: booking.pickup_location.latitude,
          longitude: booking.pickup_location.longitude,
        }
      );

      const withinRangeOfOtherPickup = otherPickupsCoords.some(
        (coordinate: { latitude: number; longitude: number }) => {
          const distance = getPreciseDistance(
            { latitude, longitude },
            coordinate
          );
          return distance < 100;
        }
      );
      const arrivingInOwnPickup =
        distanceFromVehicleToClientMeters <= 300 &&
        distanceFromVehicleToClientMeters > 80;
      const arrivedAtOwnPickup = distanceFromVehicleToClientMeters <= 80;

      const result: IExtendedServerActionReturn = {
        status: "success",
        message: "Tracking data retrieved successfully",
        data: {
          vehiclePosition: {
            new: false,
            lat: latitude,
            lon: longitude,
            heading,
          },
          otherPickupsCoords,
          pickupCoords: pickupCoords,
          withinRangeOfOtherPickup,
          arrivingInOwnPickup,
          arrivedAtOwnPickup,
          vehiclePlate: plate,
          vehicleColor: color,
          vehicleType: type,
          meetingPointName: booking.pickup_location.name,
        },
      };

      return result;
    }
  } catch (e: unknown) {
    console.log("ERROR FROM SERVER ACTION", e);
    //we cannot throw errors to consumers of a server action in Vercel production because it intercepts the messages and returns a custom one
    if (e instanceof CustomError) {
      return {
        status: "error",
        message: e.message,
        data: {
          targetDate: e?.targetDate || null,
        },
      };
    } else {
      return {
        status: "error",
        message: "An error occurred",
      };
    }
  }
};

export default getTrackingData;

//------------------------------------------------------------------------------
