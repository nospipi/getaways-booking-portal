"use server";
import { BookingModel } from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import connectDB from "@/app/server/db.connect";
import { IBooking } from "@/app/server/getaways-shared-models/schemas/bookingSchema";

//-----------------------------------------------------------------------------

export const getBookingForContact = cache(
  async (ref: string): Promise<IBooking> => {
    await connectDB();

    const booking = await BookingModel.findOne({ ref }).select([
      "client_name",
      "ref",
    ]);

    return booking;
  }
);

export default getBookingForContact;
//------------------------------------------------------------------------------
