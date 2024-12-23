import BookingInfo from "./sections/booking_info/BookingInfo";
import SegmentHeader from "../SegmentHeader";
import ConfirmStatusSection from "./sections/confirm/ConfirmStatusSection";
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
  const hasPickupLocationAndTime =
    booking?.pickup_location?.name &&
    booking.pickup_location.name.length > 0 &&
    booking?.pickup_time?.length > 0;

  return (
    <article className="segment-container">
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
      {hasPickupLocationAndTime && <ConfirmStatusSection uniqueId={uniqueId} />}
      <BookingInfo uniqueId={uniqueId} />
      <TourInfoSection uniqueId={uniqueId} />
      <MeetingPoint uniqueId={uniqueId} />
      <MeetingTime uniqueId={uniqueId} />
      <TourHosts uniqueId={uniqueId} />
      <TourBusInfo uniqueId={uniqueId} />
      <BusTracking uniqueId={uniqueId} />
    </article>
  );
};

export default ActivitySegment;
