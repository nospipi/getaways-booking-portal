"use server";
import { cache } from "react";
import {
  BookingModel,
  ProductsModel,
  PortalUserSessionModel,
  TourGroupModel,
  TaskModel,
  UserModel,
  VehicleModel,
} from "@/app/server/getaways-shared-models/models";
import _ from "lodash";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

const getBookings = cache(async (ref: string): Promise<unknown> => {
  console.log("getBooking in server with ref", ref);
  await connectDB();

  const booking = await BookingModel.findOne({ ref: ref });

  const bookings = await BookingModel.find({ ref: ref }).sort({
    product_time_slot: 1,
  });

  if (booking.cancelled) {
    throw new Error("Booking is cancelled");
  }

  if (!bookings.length) {
    throw new Error("Booking not found");
  }

  const result = [];

  if (bookings.length) {
    for (const booking of bookings) {
      const product = await ProductsModel.findById(booking.product_id);
      const previousVisit = await PortalUserSessionModel.findOne({
        booking_ref: booking.ref,
      });
      const isFirstVisit = !previousVisit;

      const tourGroup = await TourGroupModel.findById(booking.tour_group_id);
      const task =
        tourGroup?.task_id && (await TaskModel.findById(tourGroup?.task_id));
      const coordinates = task?.pickups?.map((pickup: unknown) => ({
        latitude: pickup.lat,
        longitude: pickup.lon,
      }));

      const taskAssignees = [];
      if (task?.assignees.length > 0) {
        for (const assignee of task.assignees) {
          const assigneeData = await UserModel.findById(assignee?.user_id);
          taskAssignees.push(assigneeData.name.split(" ")[0]);
        }
      }
      const vehicle = await VehicleModel.findById(task?.vehicle_id);

      const omittedBooking = _.pick(booking, [
        "_id",
        "ref",
        "client_name",
        "date",
        "option_id",
        "tickets",
        "pickup_location",
        "client_location",
        "pickup_time",
        "client_response_status",
      ]);

      result.push({
        booking: {
          ...omittedBooking,
          product: product,
          isFirstVisit: isFirstVisit,
        },
        task: {
          _id: task?._id,
          assignees: taskAssignees,
          vehicle: vehicle,
          meetingPointCoordinates: coordinates,
        },
      });
    }
  }
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  //console.log(" bookings returned", result);
  //throw new Error("Booking not found");
  return result; //if we return to client components, we need to JSON.stringify the payload
});

export default getBookings;

//------------------------------------------------------------------------------
