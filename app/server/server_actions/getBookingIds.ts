"use server";
import { BookingModel } from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import connectDB from "@/app/server/db.connect";
import { redirect } from "next/navigation";
//-----------------------------------------------------------------------------

export const getBookingIds = cache(
  async (ref: string | undefined): Promise<unknown> => {
    await connectDB();

    const bookings = await BookingModel.find({
      ref: ref,
    }).sort({
      cancelled: 1, // cancelled bookings at the end, non cancelled bookings at the beginning
    });

    if (!bookings.length) {
      redirect("/?error=Booking not found");
    }

    if (bookings[0].cancelled) {
      // if the first booking is cancelled, it means all bookings are cancelled
      redirect("/?error=Booking is cancelled");
    }

    const result = bookings.map((booking) => booking.id);

    //await new Promise((resolve) => setTimeout(resolve, 60000)); // simulate delay

    return result;
  }
);

export default getBookingIds;
//------------------------------------------------------------------------------
