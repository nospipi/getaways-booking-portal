"use server";
import { BookingModel } from "@/app/api/getaways-shared-models/models";
import connectDB from "@/app/api/db.connect";

//-----------------------------------------------------------------------------

const getBooking = async (ref: string): Promise<unknown> => {
  console.log("getBooking ref", ref);
  try {
    await connectDB();
    const booking = await BookingModel.findOne({ ref });
    return JSON.stringify(booking);
  } catch (error: unknown) {
    console.log("getBooking error", error);
    return error;
  }
};

export { getBooking };

//------------------------------------------------------------------------------
