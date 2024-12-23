"use server";
import {
  BookingModel,
  ProductsModel,
  PortalUserSessionModel,
  PortalOpenSessionModel,
} from "@/app/server/getaways-shared-models/models";
import connectDB from "@/app/server/db.connect";

//-----------------------------------------------------------------------------

type UserActionData = {
  booking_ref: string;
  device_info: {
    platform: string;
    osName: string;
    osVersion: string;
    browserName: string;
    browserVersion: string;
    mobileVendor: string;
    mobileModel: string;
  };
};

export const addUserAction = async (data: UserActionData): Promise<boolean> => {
  //throw new Error("addNotification simulate error");
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

  await connectDB();

  const booking = await BookingModel.findOne({ ref: data.booking_ref });
  const product = await ProductsModel.findById(booking.product_id);
  const session = await PortalUserSessionModel.findOne({
    booking_ref: data.booking_ref,
  });

  if (booking && product) {
  }

  return true;
};

export default addUserAction;

//------------------------------------------------------------------------------
