"use server";
import { BookingModel } from "@/app/server/getaways-shared-models/models";
import { escape } from "validator";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const addLocation = cache(
  async (booking_id: string, location: string): Promise<unknown> => {
    const locationInputHasEnoughChars = location.length > 6;
    const locationInputHasTooManyChars = location.length > 100;

    //throw new Error("simulate error");
    //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

    if (!locationInputHasEnoughChars) {
      throw new Error("Please enter a location with at least 6 characters");
    }

    if (locationInputHasTooManyChars) {
      throw new Error("Please enter a location with less than 100 characters");
    }

    const sanitizedLocation = escape(location);

    await connectDB();

    const updatedBooking = await BookingModel.findByIdAndUpdate(booking_id, {
      client_location: sanitizedLocation,
    });

    revalidatePath(`/booking/${updatedBooking.ref}`);

    return "success";
  }
);

export default addLocation;
//------------------------------------------------------------------------------
