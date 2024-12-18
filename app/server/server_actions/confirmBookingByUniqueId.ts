"use server";
import { BookingModel } from "@/app/server/getaways-shared-models/models";
import connectDB from "@/app/server/db.connect";

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

  bookingToUpdate.client_response_status = "CONFIRMED";
  await bookingToUpdate.save();

  return;
};

export default confirmBookingByUniqueId;
//------------------------------------------------------------------------------
