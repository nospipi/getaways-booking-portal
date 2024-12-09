"use server";
import { UserModel } from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

export const getPhoneNumberOnDuty = cache(async (): Promise<string> => {
  await connectDB();
  const onDutyUser = await UserModel.find({ onOfficeDuty: true });

  if (onDutyUser.length === 0) {
    throw new Error("No agents on duty right now, please send an email");
  }

  //if more than one user on duty choose one randomly
  const randomUserIndex = Math.floor(Math.random() * onDutyUser.length);
  const phone_number = onDutyUser[randomUserIndex].contact.tel;

  return phone_number;
});

export default getPhoneNumberOnDuty;
//------------------------------------------------------------------------------
