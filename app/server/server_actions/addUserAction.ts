"use server";
import {
  PortalSessionModel,
  BookingModel,
} from "@/app/server/getaways-shared-models/models";
import {
  UserActionType,
  UserActionData,
} from "../getaways-shared-models/schemas/portalSessionSchema";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const addUserAction = async (
  ref: string | null = null,
  uniqueId: string | null = null,
  action: UserActionType,
  platform: string,
  osName: string,
  osVersion: string,
  browserName: string,
  browserVersion: string,
  mobileVendor: string,
  mobileModel: string,
  data?: UserActionData
): Promise<void> => {
  //throw new Error("addUserAction simulate error");
  //await new Promise((resolve) => setTimeout(resolve, 5000)); // simulate delay

  await connectDB();

  let booking_ref = null;

  //if we receive ref, proceed with this
  if (ref) {
    booking_ref = ref;
  }

  //if we receive uniqueId, get ref first
  if (uniqueId) {
    const booking = await BookingModel.findOne({
      unique_booking_id: uniqueId,
    }).select("ref");

    if (booking) {
      booking_ref = booking.ref;
    }
  }

  //if booking_ref is still null, we have not received ref or uniqueId, do nothing
  if (!booking_ref) {
    return;
  }

  const session = await PortalSessionModel.findOne({
    booking_ref: booking_ref,
  });

  if (session) {
    session.session_actions.push({
      user_action: action,
      platform,
      osName,
      osVersion,
      browserName,
      browserVersion,
      mobileVendor,
      mobileModel,
      data,
    });
    await session.save();
  }

  return;
};

export default addUserAction;

//------------------------------------------------------------------------------
