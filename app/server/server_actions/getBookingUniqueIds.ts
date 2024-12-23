"use server";
import { BookingModel } from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import connectDB from "@/app/server/db.connect";
import { redirect } from "next/navigation";

//-----------------------------------------------------------------------------

export const getBookingUniqueIds = cache(
  async (ref: string | undefined): Promise<unknown> => {
    try {
      await connectDB();

      //throw new Error("simulate error");
      //await new Promise((resolve) => setTimeout(resolve, 60000)); // simulate delay

      const bookings = await BookingModel.find({
        ref: ref,
      }).sort({
        cancelled: 1, // cancelled bookings at the end, non cancelled bookings at the beginning
      });

      if (!bookings.length) {
        throw new Error("Booking not found");
      }

      if (bookings[0].cancelled) {
        // if the first booking is cancelled, it means all bookings are cancelled
        throw new Error("Booking is cancelled");
      }

      const result = bookings.map((booking) => booking.unique_booking_id);

      return result;
    } catch (e: unknown) {
      console.log(e);
      if (typeof e === "object" && e !== null && "message" in e) {
        const error = e as { message: string };
        redirect(`/?error=${error}`);
      } else {
        redirect(`/?error=An error occurred`);
      }
    }
  }
);

export default getBookingUniqueIds;
//------------------------------------------------------------------------------
