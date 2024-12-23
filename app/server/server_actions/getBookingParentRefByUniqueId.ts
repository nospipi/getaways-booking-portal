"use server";
import { BookingModel } from "@/app/server/getaways-shared-models/models";
import connectDB from "@/app/server/db.connect";
import { IServerActionReturn } from "./types";

//-----------------------------------------------------------------------------

type IExtendedServerActionReturn = IServerActionReturn<string>;

export const getBookingParentRefByUniqueId = async (
  uniqueId: string
): Promise<IExtendedServerActionReturn> => {
  try {
    await connectDB();
    //throw new Error("simulate error");
    //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

    const booking = await BookingModel.findOne({
      unique_booking_id: uniqueId,
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    return {
      status: "success",
      message: "Booking found",
      data: booking.ref,
    };
  } catch (e) {
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
};

export default getBookingParentRefByUniqueId;
//------------------------------------------------------------------------------
