import connectDB from "@/app/server/db.connect";
import {
  PortalOpenSessionModel,
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
    }

    //if we receive uniqueId
    if (uniqueId) {
      //get booking ref from uniqueId
      const booking = await BookingModel.findOne({
        unique_booking_id: uniqueId,
      }).select("ref");

      //if booking exists
      if (booking) {
        //delete open session if it exists
        await PortalOpenSessionModel.findOneAndDelete({
          booking_ref: booking.ref,
        });
      }
    }

    return true;
  } catch (error) {
    return error;
  }
};

export default closeSession;
