"use server";
import {
  NotificationModel,
  //BookingModel,
} from "@/app/server/getaways-shared-models/models";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const addOpenSession = async (title: string): Promise<unknown> => {
  //throw new Error("addNotification simulate error");
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

  await connectDB();

  const newNotification = new NotificationModel({
    title,
  });
  await newNotification.save();

  return true;
};

export default addOpenSession;

//------------------------------------------------------------------------------
