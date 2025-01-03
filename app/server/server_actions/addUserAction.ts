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

export const addUserActionByRef = async (
  ref: string | null = null,
  action: UserActionType,
  platform?: string,
  osName?: string,
  osVersion?: string,
  browserName?: string,
  browserVersion?: string,
  mobileVendor?: string,
  mobileModel?: string,
  data?: UserActionData
): Promise<void> => {
  if (!ref) {
    return;
  }

  await connectDB();

  const session = await PortalSessionModel.findOne({
    booking_ref: ref,
  });

  if (session) {
    const lastAction =
      session.session_actions[session.session_actions.length - 1];
    session.session_actions.push({
      user_action: action,
      platform: platform || lastAction.platform,
      osName: osName || lastAction.osName,
      osVersion: osVersion || lastAction.osVersion,
      browserName: browserName || lastAction.browserName,
      browserVersion: browserVersion || lastAction.browserVersion,
      mobileVendor: mobileVendor || lastAction.mobileVendor,
      mobileModel: mobileModel || lastAction.mobileModel,
      data,
    });
    await session.save();
  }
};

export const addUserActionByUniqueId = async (
  uniqueId: string | null = null,
  action: UserActionType,
  platform?: string,
  osName?: string,
  osVersion?: string,
  browserName?: string,
  browserVersion?: string,
  mobileVendor?: string,
  mobileModel?: string,
  data?: UserActionData
): Promise<void> => {
  //throw new Error("addUserAction simulate error");
  //await new Promise((resolve) => setTimeout(resolve, 5000)); // simulate delay

  await connectDB();

  if (!uniqueId) {
    return;
  }

  const booking = await BookingModel.findOne({
    unique_booking_id: uniqueId,
  }).select("ref");

  const session = await PortalSessionModel.findOne({
    booking_ref: booking.ref,
  });

  if (session) {
    const lastAction =
      session.session_actions[session.session_actions.length - 1];
    session.session_actions.push({
      user_action: action,
      platform: platform || lastAction.platform,
      osName: osName || lastAction.osName,
      osVersion: osVersion || lastAction.osVersion,
      browserName: browserName || lastAction.browserName,
      browserVersion: browserVersion || lastAction.browserVersion,
      mobileVendor: mobileVendor || lastAction.mobileVendor,
      mobileModel: mobileModel || lastAction.mobileModel,
      data,
    });
    await session.save();
  }

  return;
};

//------------------------------------------------------------------------------
