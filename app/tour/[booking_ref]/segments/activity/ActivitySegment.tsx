import BookingInfoSection from "./sections/booking_info/BookingInfoSection";
import SegmentHeader from "../SegmentHeader";
import ConfirmStatusSection from "./sections/confirm/ConfirmStatusSection";
import TourInfoSection from "./sections/tour_info/TourInfoSection";
import getBooking from "@/app/server/server_actions/getBooking";
//---------------------------------------------------------

const ActivitySegment = async ({ id }: { id: string }) => {
  const booking = await getBooking(id);
  const hasPickupLocationAndTime =
    booking?.pickup_location?.name.length > 0 &&
    booking?.pickup_time.length > 0;

  return (
    <div className="segment-container">
      <SegmentHeader />
      {hasPickupLocationAndTime && <ConfirmStatusSection id={id} />}
      <BookingInfoSection id={id} />
      <TourInfoSection id={id} />
    </div>
  );
};

export default ActivitySegment;
