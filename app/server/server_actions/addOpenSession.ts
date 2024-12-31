"use server";
import createOpenSession from "../api/utils/openSession";

//-----------------------------------------------------------------------------

export const addOpenSession = async (
  ref: string | null = null,
  uniqueId: string | null = null,
  platform: string = "",
  osName: string = "",
  osVersion: string = "",
  browserName: string = "",
  browserVersion: string = "",
  mobileVendor: string = "",
  mobileModel: string = ""
): Promise<boolean> => {
  //throw new Error("addNotification simulate error");
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

  await createOpenSession(
    ref,
    uniqueId,
    platform,
    osName,
    osVersion,
    browserName,
    browserVersion,
    mobileVendor,
    mobileModel
  );

  return true;
};

export default addOpenSession;

//------------------------------------------------------------------------------
