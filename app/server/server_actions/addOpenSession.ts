"use server";
import { PortalOpenSessionModel } from "@/app/server/getaways-shared-models/models";
import { headers } from "next/headers";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const addOpenSession = async (): Promise<unknown> => {
  //throw new Error("addNotification simulate error");
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

  const headerList = await headers();

  const encodedParams = headerList.get("params_from_middleware") as string;
  const decodedParams = JSON.parse(
    Buffer.from(encodedParams, "base64").toString("utf8")
  );

  const { ref, uniqueId } = decodedParams as {
    ref: string;
    uniqueId: string;
  };
  console.log("ref:", ref, "uniqueId:", uniqueId);

  await connectDB();

  // const newNotification = new PortalOpenSessionModel({
  //   title,
  // });
  // await newNotification.save();

  return true;
};

export default addOpenSession;

//------------------------------------------------------------------------------
