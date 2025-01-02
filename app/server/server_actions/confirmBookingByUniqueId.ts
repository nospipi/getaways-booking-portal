"use server";
import {
  BookingModel,
  NotificationModel,
} from "@/app/server/getaways-shared-models/models";
import connectDB from "@/app/server/db.connect";
import { addUserActionByRef } from "./addUserAction";
import moment from "moment";
const REFRESH_NOTIFICATIONS_URL = process.env
  .REFRESH_NOTIFICATIONS_URL as string;

//-----------------------------------------------------------------------------

export const confirmBookingByUniqueId = async (
  unique_booking_id: string
): Promise<unknown> => {
  console.log("confirmBookingByUniqueId", unique_booking_id);

  await connectDB();
  //throw new Error("simulate error");
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

  const bookingToUpdate = await BookingModel.findOne({
    unique_booking_id: unique_booking_id,
  });

  if (!bookingToUpdate) {
    throw new Error("Booking not found");
  }

  await addUserActionByRef(bookingToUpdate.ref, "CONFIRMED_INSTRUCTIONS");

  //update booking status
  bookingToUpdate.client_response_status = "CONFIRMED";
  await bookingToUpdate.save();

  //create notification and call refresh notifications url
  const notification = new NotificationModel({
    title: `${bookingToUpdate.client_name} confirmed via booking portal`,
    data: {
      getaways_suite: {
        isReadBy: [],
        bookingDate: moment(new Date(bookingToUpdate.date)).format(
          "DD/MM/YYYY"
        ),
        type: "client_confirmed",
        id: bookingToUpdate.id,
      },
    },
  });
  await notification.save();
  await fetch(REFRESH_NOTIFICATIONS_URL);

  return;
};

export default confirmBookingByUniqueId;
//------------------------------------------------------------------------------
