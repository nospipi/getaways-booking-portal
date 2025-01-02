import connectDB from "@/app/server/db.connect";
import {
  PortalOpenSessionModel,
  PortalSessionModel,
  BookingModel,
} from "../../getaways-shared-models/models";

//---------------------------------------------------------

const closeSession = async (ref: string | null, uniqueId: string | null) => {
  try {
    await connectDB();

    //if we receive ref
    if (ref) {
      //delete open session if it exists
      await PortalOpenSessionModel.findOneAndDelete({
        booking_ref: ref,
      });
      const session = await PortalSessionModel.findOne({
        booking_ref: ref,
      });
      if (session) {
        const lastUserAction =
          session.session_actions[session.session_actions.length - 1];
        session.session_actions.push({
          user_action: "PAGE_LEAVE",
          platform: lastUserAction.platform,
          osName: lastUserAction.osName,
          osVersion: lastUserAction.osVersion,
          browserName: lastUserAction.browserName,
          browserVersion: lastUserAction.browserVersion,
          mobileVendor: lastUserAction.mobileVendor,
          mobileModel: lastUserAction.mobileModel,
        });
        await session.save();
      }
    }

    //if we receive uniqueId
    if (uniqueId) {
      //get ref first
      const booking = await BookingModel.findOne({
        unique_booking_id: uniqueId,
      }).select("ref");

      if (booking) {
        await PortalOpenSessionModel.findOneAndDelete({
          booking_ref: booking.ref,
        });

        const session = await PortalSessionModel.findOne({
          booking_ref: booking.ref,
        });

        if (session) {
          const lastUserAction =
            session.session_actions[session.session_actions.length - 1];
          session.session_actions.push({
            user_action: "PAGE_LEAVE",
            platform: lastUserAction.platform,
            osName: lastUserAction.osName,
            osVersion: lastUserAction.osVersion,
            browserName: lastUserAction.browserName,
            browserVersion: lastUserAction.browserVersion,
            mobileVendor: lastUserAction.mobileVendor,
            mobileModel: lastUserAction.mobileModel,
          });
          await session.save();
        }
      }
    }

    return true;
  } catch (error) {
    return error;
  }
};

export default closeSession;
