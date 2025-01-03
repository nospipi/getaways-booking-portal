"use server";
import {
  BookingModel,
  PortalOpenSessionModel,
} from "@/app/server/getaways-shared-models/models";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const refreshOpenSessionByRef = async (
  ref: string | null = null
): Promise<void> => {
  if (!ref) {
    return;
  }

  await connectDB();

  const openSession = await PortalOpenSessionModel.findOne({
    booking_ref: ref,
  });

  if (openSession) {
    openSession.expireAt = new Date();
    await openSession.save();
  } else {
    const newOpenSession = new PortalOpenSessionModel({
      booking_ref: ref,
    });
    await newOpenSession.save();
  }
};

export const refreshOpenSessionByUniqueId = async (
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

  const openSession = await PortalOpenSessionModel.findOne({
    booking_ref: booking.ref,
  });

  if (openSession) {
    openSession.expireAt = new Date();
    await openSession.save();
  } else {
    const newOpenSession = new PortalOpenSessionModel({
      booking_ref: booking.ref,
    });

    await newOpenSession.save();
  }
};

//------------------------------------------------------------------------------
