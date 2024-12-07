import BookingInfoSection from "./sections/booking_info/BookingInfoSection";
import SegmentHeader from "../SegmentHeader";
import ConfirmStatusSection from "./sections/confirm/ConfirmStatusSection";
import TourInfoSection from "./sections/tour_info/TourInfoSection";
import MeetingPointSection from "./sections/meeting_point/MeetingPointSection";
import getBooking from "@/app/server/server_actions/getBooking";
//---------------------------------------------------------

const ActivitySegment = async ({
  id,
  activityIndex,
  numberOfActivities,
}: {
  id: string;
  activityIndex: number;
  numberOfActivities: number;
}) => {
  const booking = await getBooking(id);
  const hasPickupLocationAndTime =
    booking?.pickup_location?.name.length > 0 &&
    booking?.pickup_time.length > 0;
  const product_title = booking?.product?.platform_product_name;

  return (
    <div className="segment-container">
      <SegmentHeader>
        <div
          style={{
            flex: 1,
            display: "flex",
            //justifyContent: "flex-start",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>
            {/* {`Activity #${
              activityIndex + 1
            } of ${numberOfActivities} - ${product_title}`} */}
            {`Activity #${activityIndex + 1} of ${numberOfActivities}`}
          </span>
        </div>
      </SegmentHeader>
      {hasPickupLocationAndTime && <ConfirmStatusSection id={id} />}
      <BookingInfoSection id={id} />
      <TourInfoSection id={id} />
      <MeetingPointSection id={id} />
    </div>
  );
};

export default ActivitySegment;
