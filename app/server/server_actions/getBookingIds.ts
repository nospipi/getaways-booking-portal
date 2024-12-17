"use server";
import { BookingModel } from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import connectDB from "@/app/server/db.connect";
import { redirect } from "next/navigation";
//import { headers } from "next/headers";

//-----------------------------------------------------------------------------

export const getBookingIds = cache(
  async (ref: string | undefined): Promise<unknown> => {
    // const headersList = await headers();
    // const ip = headersList.get("request-ip");
    // console.log("ip", ip);
    // console.log("ref", ref[0]);

    await connectDB();

    //await new Promise((resolve) => setTimeout(resolve, 60000)); // simulate delay

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

    return result;
  }
);

export default getBookingIds;
//------------------------------------------------------------------------------
