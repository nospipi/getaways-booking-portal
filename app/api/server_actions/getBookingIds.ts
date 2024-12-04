"use server";
import { BookingModel } from "@/app/api/getaways-shared-models/models";
import connectDB from "@/app/api/db.connect";

//-----------------------------------------------------------------------------

export const getBookingIds = async (ref: string): Promise<unknown> => {
  await connectDB();

  const bookings = await BookingModel.find({ ref: ref }).sort({
    product_time_slot: 1,
  });

  if (!bookings.length) {
    throw new Error("Booking not found");
  }

  if (bookings[0].cancelled) {
    throw new Error("Booking is cancelled");
  }

  const result = bookings.map((booking) => booking.id);

  return result;
};

export default getBookingIds;
//------------------------------------------------------------------------------
