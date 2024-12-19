"use server";
import { UserModel } from "@/app/server/getaways-shared-models/models";
import { cache } from "react";
import connectDB from "@/app/server/db.connect";
import { IServerActionReturn } from "./types";

//-----------------------------------------------------------------------------

export const getPhoneNumberOnDuty = cache(
  async (): Promise<IServerActionReturn> => {
    try {
      //throw new Error("getPhoneNumberOnDuty simulate error"); //simulate error

      await connectDB();
      const onDutyUser = await UserModel.find({ onOfficeDuty: true });

      if (onDutyUser.length === 0) {
        return {
          status: "error",
          message: "No agents on duty right now, please send us an email",
        };
      }

      //if more than one user on duty choose one randomly
      const randomUserIndex = Math.floor(Math.random() * onDutyUser.length);
      const phone_number = onDutyUser[randomUserIndex].contact.tel;

      return {
        status: "success",
        message: "Phone number retrieved",
        data: phone_number,
      };
    } catch (e: unknown) {
      console.log(e);
      if (e instanceof Error) {
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
  }
);

export default getPhoneNumberOnDuty;
//------------------------------------------------------------------------------
