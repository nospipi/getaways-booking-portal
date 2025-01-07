"use server";
import {
  BookingModel,
  ProductsModel,
  TourGroupModel,
  TaskModel,
  VehicleModel,
  UserModel,
  PortalSessionModel,
  NotificationModel,
} from "@/app/server/getaways-shared-models/models";
import moment from "moment";
import { addUserActionByRef } from "./addUserAction";
import { cache } from "react";
import connectDB from "@/app/server/db.connect";
import { IBooking } from "@/app/server/getaways-shared-models/schemas/bookingSchema";
import {
  IProduct,
  IOption,
} from "../getaways-shared-models/schemas/productsSchema";
import { ITask, IPickup } from "../getaways-shared-models/schemas/taskSchema";
import { IVehicle } from "../getaways-shared-models/schemas/vehicleSchema";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
const REFRESH_NOTIFICATIONS_URL = process.env
  .REFRESH_NOTIFICATIONS_URL as string;

//-----------------------------------------------------------------------------

interface ITaskReturn extends ITask {
  _id: string;
  assignees: unknown[];
  vehicle: IVehicle | null;
  meetingPointCoordinates: number[];
}

export interface IGetBookingReturn extends IBooking {
  product: IProduct;
  option: IOption;
  suggestedProducts: IProduct[];
  task: ITaskReturn;
  isFirstVisit: boolean;
}

/**
 * Fetches booking details by its ID and performs various lookups including the product, option,
 * suggested products, task details, assignees, and vehicle information.
 *
 * @async
 * @param {string} id - The mongo _id of the booking to fetch.
 * @returns {Promise<IGetBookingReturn>} A promise resolving :
 *
 * {
 *
 * product: IProduct;
 *
 * option: IOption;
 *
 * suggestedProducts: IProduct[];
 *
 * task: ITaskReturn | null;
 *
 * isFirstVisit: boolean;
 *
 * } -->
 *
 * return {
 *
 * ...booking.toObject(),
 *
 * product,
 *
 * option,
 *
 * suggestedProducts,
 *
 * task: {
 *
 * _id: task?._id,
 *
 * assignees: taskAssignees,
 *
 * vehicle: vehicle,
 *
 * meetingPointCoordinates: coordinates,
 *
 * },
 *
 * isFirstVisit: !previousVisit,
 *
 * };
 *
 * - Check headers for `params_from_middleware` and parse the `confirm` url search param value which is a booking.unique_booking_id.
 * - If it matches this booking's unique_booking_id, the client_response_status is updated to 'CONFIRMED'.
 * - Writes a notification and calls the socket to inform other consumers of the change.
 *
 * - Suggested products are fetched based on the main product's suggested_products array of product _id's.
 * - Task information includes assignees and vehicle details.
 * - If this is the client's first visit, `isFirstVisit` will be true.
 *
 * @throws Will redirect to an error page if any errors occur during the process.
 */

export const getBookingByUniqueId = cache(
  async (unique_id: string): Promise<IGetBookingReturn> => {
    try {
      //throw new Error("getBookingById error"); //simulate error
      const headerList = await headers();
      const encodedParams = headerList.get("params_from_middleware") as string;
      const decodedParams = JSON.parse(
        Buffer.from(encodedParams, "base64").toString("utf8")
      );
      //console.log("Decoded params from middleware:", decodedParams);
      const { confirm: uniqueBookingIdtoConfirm } = decodedParams as {
        confirm: string;
      };
      await connectDB();

      const booking = await BookingModel.findOne({
        unique_booking_id: unique_id,
      }).select([
        "_id",
        "ref",
        "unique_booking_id",
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

      //confirm url param matches this booking's unique_booking_id, it means the client visits page with auto-confirm linking
      const isAutoConfirm =
        uniqueBookingIdtoConfirm === booking.unique_booking_id;

      //should not confirm if pickup location or pickup time is missing
      //ui does bot show confirm button if these fields are missing, for manual confirm
      //so auto-confirm should not proceed as well
      const eligibleForConfirm =
        booking?.pickup_location?.name &&
        booking.pickup_location.name.length > 0 &&
        booking?.pickup_time?.length > 0;

      //we should also not proceed if the booking is already confirmed
      const isAlreadyConfirmed =
        booking?.client_response_status === "CONFIRMED";

      const shouldConfirm =
        isAutoConfirm && eligibleForConfirm && !isAlreadyConfirmed;

      if (shouldConfirm) {
        //update status to confirmed
        booking.client_response_status = "CONFIRMED";

        await addUserActionByRef(booking.ref, "CONFIRMED_INSTRUCTIONS");

        await booking.save();
        //create notification and call refresh notifications url
        const notification = new NotificationModel({
          title: `${booking.client_name} confirmed via booking portal`,
          data: {
            getaways_suite: {
              isReadBy: [],
              bookingDate: moment(new Date(booking.date)).format("DD/MM/YYYY"),
              type: "client_confirmed",
              id: booking.id,
            },
          },
        });
        await notification.save();
        await fetch(REFRESH_NOTIFICATIONS_URL);
      }

      const product = await ProductsModel.findById(booking.product_id);
      const option = product?.options?.find(
        (option: IOption) => option._id.toString() === booking.option_id
      );
      const suggestedProducts = await ProductsModel.find({
        _id: { $in: product?.suggested_products || [] },
      })
        .select([
          "_id",
          "bokun_product_code",
          "platform_product_name",
          "product_short_description",
          "market_price",
          "tour_duration",
          "product_pictures",
        ])
        .sort({ index: 1 });

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
      const previousVisit = await PortalSessionModel.findOne({
        booking_ref: booking.ref,
      });

      return {
        ...booking.toObject(),
        product,
        option,
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
      if (typeof e === "object" && e !== null && "message" in e) {
        const error = e as { message: string };
        redirect(`/?error=${error.message}`);
      } else {
        redirect("/?error=There was an unexpected error");
      }
    }
  }
);

export default getBookingByUniqueId;
//------------------------------------------------------------------------------
