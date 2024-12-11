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
import { redirect } from "next/navigation";

//-----------------------------------------------------------------------------

interface ITaskReturn extends ITask {
  _id: string;
  assignees: unknown[];
  vehicle: IVehicle | null;
  meetingPointCoordinates: number[];
}

export interface IGetBookingReturn extends IBooking {
  product: IProduct | null;
  suggestedProducts: IProduct[];
  task: ITaskReturn | null;
  isFirstVisit: boolean;
}

export const getBookingById = cache(
  async (id: string): Promise<IGetBookingReturn> => {
    try {
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
        "tour_group_id",
      ]);

      if (!booking) {
        redirect("/");
      }

      const product = await ProductsModel.findById(booking.product_id);
      const suggestedProducts = await ProductsModel.find({
        _id: { $in: product?.suggested_products || [] },
      }).select([
        "_id",
        "bokun_product_code",
        "platform_product_name",
        "product_short_description",
        "market_price",
        "tour_duration",
        "product_pictures",
      ]);

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
        suggestedProducts,
        task: {
          _id: task?._id,
          assignees: taskAssignees,
          vehicle: vehicle,
          meetingPointCoordinates: coordinates,
        },
        isFirstVisit: !previousVisit,
      };
    } catch (e) {
      console.error(e);
      throw new Error("Could not find booking");
    }
  }
);

export default getBookingById;
//------------------------------------------------------------------------------
