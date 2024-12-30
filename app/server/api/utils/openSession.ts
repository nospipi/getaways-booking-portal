import connectDB from "@/app/server/db.connect";
import {
  PortalOpenSessionModel,
  BookingModel,
} from "../../getaways-shared-models/models";

//---------------------------------------------------------

const openSession = async (ref: string | null, uniqueId: string | null) => {
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
    }

    return true;
  } catch (error) {
    return error;
  }
};

export default openSession;
