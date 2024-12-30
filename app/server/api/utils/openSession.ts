import connectDB from "@/app/server/db.connect";
import {
  PortalSessionModel,
  PortalOpenSessionModel,
  BookingModel,
  ProductsModel,
} from "../../getaways-shared-models/models";

//---------------------------------------------------------

const createSession = async (
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
  try {
    await connectDB();

    //if we receive ref
    if (ref) {
      //check if session exists
      const session = await PortalSessionModel.findOne({ booking_ref: ref });

      //if session does not exist, create one
      if (!session) {
        const bookings = await BookingModel.find({ ref }).select(
          "unique_booking_id date client_name product_id"
        );

        const bookingsField = [];
        for (const booking of bookings) {
          const product = await ProductsModel.findById(
            booking.product_id
          ).select("title");
          bookingsField.push({
            unique_booking_id: booking.unique_booking_id,
            booking_date: booking.date,
            client_name: booking.client_name,
            product_title: product.title,
          });
        }

        const newSession = new PortalSessionModel({
          booking_ref: ref,
          bookings: bookingsField,
          session_actions: [
            {
              date_time: Date.now(),
              user_action: "INITIAL_VISIT",
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
      }
    }

    //if we receive uniqueId
    if (uniqueId) {
      //get booking ref from uniqueId
      const booking = await BookingModel.findOne({
        unique_booking_id: uniqueId,
      }).select("ref");

      //if booking exists
      if (booking) {
        const session = await PortalSessionModel.findOne({
          booking_ref: booking.ref,
        });

        //if session does not exist, create one
        if (!session) {
          const bookings = await BookingModel.find({ ref: booking.ref }).select(
            "unique_booking_id date client_name product_id"
          );
          const bookingsField = [];
          for (const booking of bookings) {
            const product = await ProductsModel.findById(
              booking.product_id
            ).select("title");
            bookingsField.push({
              unique_booking_id: booking.unique_booking_id,
              booking_date: booking.date,
              client_name: booking.client_name,
              product_title: product.title,
            });
          }
          const newSession = new PortalSessionModel({
            booking_ref: booking.ref,
            bookings: bookingsField,
            session_actions: [
              {
                date_time: Date.now(),
                user_action: "INITIAL_VISIT",
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
        }
      }
    }

    return true;
  } catch (error) {
    console.error("createSession error:", error);
    return error;
  }
};

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
  console.log(
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
  try {
    await connectDB();

    //if we receive ref
    if (ref) {
      //check if open session exists
      const openSession = await PortalOpenSessionModel.findOne({
        booking_ref: ref,
      });

      //if open session does not exist, create one
      if (!openSession) {
        const newOpenSession = new PortalOpenSessionModel({
          booking_ref: ref,
        });
        await newOpenSession.save();
      }
      await createSession(
        ref,
        null,
        platform,
        osName,
        osVersion,
        browserName,
        browserVersion,
        mobileVendor,
        mobileModel
      );
    }

    //if we receive uniqueId
    if (uniqueId) {
      //get booking ref from uniqueId
      const booking = await BookingModel.findOne({
        unique_booking_id: uniqueId,
      }).select("ref");

      //if booking exists
      if (booking) {
        const openSession = await PortalOpenSessionModel.findOne({
          booking_ref: booking.ref,
        });

        //if open session does not exist, create one
        if (!openSession) {
          const newOpenSession = new PortalOpenSessionModel({
            booking_ref: booking.ref,
          });
          await newOpenSession.save();
        }
      }

      await createSession(
        ref,
        null,
        platform,
        osName,
        osVersion,
        browserName,
        browserVersion,
        mobileVendor,
        mobileModel
      );
    }

    return true;
  } catch (error) {
    console.error("createOpenSession error:", error);
    return error;
  }
};

export default createOpenSession;
