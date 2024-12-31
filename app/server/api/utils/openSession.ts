import connectDB from "@/app/server/db.connect";
import {
  PortalSessionModel,
  PortalOpenSessionModel,
  BookingModel,
  ProductsModel,
} from "../../getaways-shared-models/models";
import { nanoid } from "nanoid";

//---------------------------------------------------------

const createOpenSession = async (
  ref: string | null,
  uniqueId: string | null,
  platform: string,
  osName: string,
  osVersion: string,
  browserName: string,
  browserVersion: string,
  mobileVendor: string,
  mobileModel: string
) => {
  const fallbackId1 = nanoid();
  const fallbackId2 = nanoid();
  try {
    await connectDB();

    const bookings = await BookingModel.find({
      $or: [
        { ref: ref || fallbackId1 }, //we fall back to a random id because falling back to null returns bookings with unset field
        { unique_booking_id: uniqueId || fallbackId2 }, //the same as ref
      ],
    });

    if (!bookings.length) {
      return false;
    }

    //.1 create session ---------------------------------------------------------
    //   check if session exists
    const session = await PortalSessionModel.findOne({
      booking_ref: bookings[0].ref,
    });

    //   if session does not exist, create the first session and add the first visit action
    if (!session) {
      const bookingsField = [];
      for (const booking of bookings) {
        const product = await ProductsModel.findById(booking.product_id).select(
          "title"
        );
        bookingsField.push({
          unique_booking_id: booking.unique_booking_id,
          booking_date: booking.date,
          client_name: booking.client_name,
          product_title: product.title,
        });
      }

      const newSession = new PortalSessionModel({
        booking_ref: bookings[0].ref,
        bookings: bookingsField,
        session_actions: [
          {
            date_time: Date.now(),
            user_action: "PAGE_VISIT",
            platform,
            osName,
            osVersion,
            browserName,
            browserVersion,
            mobileVendor,
            mobileModel,
          },
        ],
      });
      await newSession.save();
    } else {
      //   if session exists, update session_actions with the new visit action
      const session_actions = session.session_actions;
      session_actions.push({
        date_time: Date.now(),
        user_action: "PAGE_VISIT",
        platform,
        osName,
        osVersion,
        browserName,
        browserVersion,
        mobileVendor,
        mobileModel,
      });
      await PortalSessionModel.updateOne(
        { booking_ref: bookings[0].ref },
        { session_actions }
      );
    }

    //2. create open session ---------------------------------------------------------
    //   check if open session exists
    const openSession = await PortalOpenSessionModel.findOne({
      booking_ref: bookings[0].ref,
    });

    //   if open session does not exist, create one
    if (!openSession) {
      const newOpenSession = new PortalOpenSessionModel({
        booking_ref: bookings[0].ref,
      });
      await newOpenSession.save();
    }

    return true;
  } catch (error) {
    console.error("createSession error:", error);
    return error;
  }
};

export default createOpenSession;
