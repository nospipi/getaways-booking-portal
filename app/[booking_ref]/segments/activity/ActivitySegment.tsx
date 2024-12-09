import BookingInfo from "./sections/booking_info/BookingInfo";
import SegmentHeader from "../SegmentHeader";
import ConfirmStatusSection from "./sections/confirm/ConfirmStatusSection";
import TourInfoSection from "./sections/tour_info/TourInfoSection";
import MeetingPoint from "./sections/meeting_point/MeetingPoint";
import MeetingTime from "./sections/meeting_point/MeetingTime";
import TourHosts from "./sections/meeting_point/TourHosts";
import getBookingById from "@/app/server/server_actions/getBookingById";
import BusTracking from "./sections/map/BusTracking";
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
  const booking = await getBookingById(id);
  const hasPickupLocationAndTime =
    booking?.pickup_location?.name.length > 0 &&
    booking?.pickup_time.length > 0;

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
      <BookingInfo id={id} />
      <TourInfoSection id={id} />
      <MeetingPoint id={id} />
      <MeetingTime id={id} />
      <TourHosts id={id} />
      <BusTracking id={id} />
    </div>
  );
};

export default ActivitySegment;
