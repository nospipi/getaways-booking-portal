import BookingInfo from "./sections/booking_info/BookingInfo";
import SegmentHeader from "../SegmentHeader";
import ConfirmStatusSection from "./sections/meeting_point/confirm/ConfirmStatusSection";
import TourInfoSection from "./sections/tour_info/TourInfoSection";
import MeetingPoint from "./sections/meeting_point/MeetingPoint";
import MeetingTime from "./sections/meeting_time/MeetingTime";
import TourHosts from "./sections/tour_hosts/TourHosts";
import TourBusInfo from "./sections/tour_bus_info/TourBusInfo";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import BusTracking from "./sections/tour_bus_tracking/BusTracking";
//---------------------------------------------------------

const ActivitySegment = async ({
  uniqueId,
  activityIndex,
  numberOfActivities,
}: {
  uniqueId: string;
  activityIndex: number;
  numberOfActivities: number;
}) => {
  const booking = await getBookingByUniqueId(uniqueId);
  const shouldShowConfirmButton =
    booking?.pickup_location?.name &&
    booking.pickup_location.name.length > 0 &&
    booking?.pickup_time?.length > 0;

  return (
    <article className="segment-container">
      <SegmentHeader>
        {`Activity ${activityIndex + 1} of ${numberOfActivities}`}
      </SegmentHeader>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        <BookingInfo uniqueId={uniqueId} />
        <TourInfoSection uniqueId={uniqueId} />
        <MeetingPoint uniqueId={uniqueId} />
        <TourHosts uniqueId={uniqueId} />
        <TourBusInfo uniqueId={uniqueId} />
        <BusTracking uniqueId={uniqueId} />
      </div>
    </article>
  );
};

export default ActivitySegment;
