"use server";
import {
  BookingModel,
  ProductsModel,
  TourGroupModel,
  TaskModel,
  VehicleModel,
  UserModel,
  PortalUserSessionModel,
} from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import connectDB from "@/app/server/db.connect";
import { IBooking } from "@/app/server/getaways-shared-models/schemas/bookingSchema";
import { IProduct } from "../getaways-shared-models/schemas/productsSchema";
import { ITask, IPickup } from "../getaways-shared-models/schemas/taskSchema";
import { IVehicle } from "../getaways-shared-models/schemas/vehicleSchema";

//-----------------------------------------------------------------------------

interface ITaskReturn extends ITask {
  _id: string;
  assignees: unknown[];
  vehicle: IVehicle | null;
  meetingPointCoordinates: number[];
}

export interface IGetBookingReturn extends IBooking {
  product: IProduct | null;
  task: ITaskReturn | null;
  isFirstVisit: boolean;
}

export const getBooking = cache(
  async (id: string): Promise<IGetBookingReturn> => {
    await connectDB();

    const booking = await BookingModel.findById(id).select([
      "_id",
      "ref",
      "client_name",
      "date",
      "product_id",
      "option_id",
      "tickets",
      "pickup_location",
      "client_location",
      "pickup_time",
      "client_response_status",
    ]);
    const product = await ProductsModel.findById(booking.product_id);
    const tourGroup = await TourGroupModel.findById(booking.tour_group_id);
    const task =
      tourGroup?.task_id && (await TaskModel.findById(tourGroup?.task_id));
    const coordinates = task?.pickups?.map((pickup: IPickup) => ({
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
    const previousVisit = await PortalUserSessionModel.findOne({
      booking_ref: booking.ref,
    });

    return {
      ...booking.toObject(),
      product,
      task: {
        _id: task?._id,
        assignees: taskAssignees,
        vehicle: vehicle,
        meetingPointCoordinates: coordinates,
      },
      isFirstVisit: !previousVisit,
    };
  }
);

export default getBooking;
//------------------------------------------------------------------------------
