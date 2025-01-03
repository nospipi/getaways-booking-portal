"use server";
import {
  BookingModel,
  PortalOpenSessionModel,
} from "@/app/server/getaways-shared-models/models";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const closeOpenSessionByRef = async (
  ref: string | null = null
): Promise<void> => {
  if (!ref) {
    return;
  }

  await connectDB();
  await PortalOpenSessionModel.deleteOne({ booking_ref: ref });
};

export const closeOpenSessionByUniqueId = async (
  uniqueId: string | null = null
): Promise<void> => {
  await connectDB();

  if (!uniqueId) {
    return;
  }

  const booking = await BookingModel.findOne({
    unique_booking_id: uniqueId,
  }).select("ref");

  if (!booking) {
    return;
  }

  await PortalOpenSessionModel.deleteOne({ booking_ref: booking.ref });
};

//------------------------------------------------------------------------------
