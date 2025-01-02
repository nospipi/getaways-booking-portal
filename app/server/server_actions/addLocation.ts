"use server";
import {
  BookingModel,
  NotificationModel,
  ProductsModel,
} from "@/app/server/getaways-shared-models/models";
import moment from "moment";
import { escape } from "validator";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import connectDB from "@/app/server/db.connect";
import { addUserActionByRef } from "./addUserAction";
import { IServerActionReturn } from "./types";
const REFRESH_NOTIFICATIONS_URL = process.env
  .REFRESH_NOTIFICATIONS_URL as string;

//-----------------------------------------------------------------------------

export const addLocation = cache(
  async (
    booking_id: string,
    location: string
  ): Promise<IServerActionReturn> => {
    try {
      const locationInputHasEnoughChars = location.length > 5;
      const locationInputHasTooManyChars = location.length > 100;

      //throw new Error("simulate error");
      //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

      if (!locationInputHasEnoughChars) {
        throw new Error("Please enter a location with at least 6 characters");
      }

      if (locationInputHasTooManyChars) {
        throw new Error(
          "Please enter a location with less than 100 characters"
        );
      }

      const sanitizedLocation = escape(location);
      await connectDB();

      //update location
      const updatedBooking = await BookingModel.findByIdAndUpdate(
        booking_id,
        {
          client_location: sanitizedLocation,
        },
        {
          new: true,
        }
      );
      await addUserActionByRef(updatedBooking.ref, "ADDED_LOCATION");
      const product = await ProductsModel.findById(updatedBooking.product_id);
      //create notification and call refresh notifications url
      const notification = new NotificationModel({
        title: `${updatedBooking.client_name}: ${
          updatedBooking.ref
        } updated location via booking portal ( ${product.title} / ${moment(
          updatedBooking.date
        ).format("DD/MM/YYYY")} / ${
          updatedBooking.client_location || "No client location"
        } )`,
        data: {
          getaways_suite: {
            isReadBy: [],
            type: "client_updated_location",
            id: updatedBooking.id,
          },
        },
      });
      await notification.save();
      await fetch(REFRESH_NOTIFICATIONS_URL);

      revalidatePath(`/${updatedBooking.ref}`);

      return {
        status: "success",
        message: "Location updated successfully",
      };
    } catch (e: unknown) {
      if (typeof e === "object" && e !== null && "message" in e) {
        const error = e as { message: string };
        return {
          status: "error",
          message: error.message,
        };
      } else {
        return {
          status: "error",
          message: "An error occurred",
        };
      }
    }
  }
);

export default addLocation;
