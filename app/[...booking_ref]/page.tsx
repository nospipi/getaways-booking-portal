import ActivitySegment from "@/app/[...booking_ref]/segments/activity/ActivitySegment";
import UsefullInfoSegment from "@/app/[...booking_ref]/segments/usefull_info/UsefullInfoSegment";
import getBookingIds from "@/app/server/server_actions/getBookingIds";
import TrackPageVisitHandler from "@/utils/TrackPageVisitHandler.client";

//---------------------------------------------------------

const Page = async ({
  params,
}: {
  params: Promise<{ booking_ref: string[] }>;
}) => {
  const pageParams = await params;
  const {
    booking_ref: [booking_ref, confirmFlag],
  } = pageParams;

  const bookingIds = (await getBookingIds(booking_ref)) as string[];
  if (confirmFlag === "confirm") {
    console.log("confirmFlag exists");
  }

  return (
    <div className="page-container">
      <TrackPageVisitHandler booking_ref={booking_ref[0]} />
      <div className="content-wrapper">
        <div className="content-container">
          <div className="content-container-wrapper">
            {bookingIds.map((bookingId: string, index: number) => (
              <ActivitySegment
                key={bookingId}
                id={bookingId}
                activityIndex={index}
                numberOfActivities={bookingIds.length}
              />
            ))}
            <UsefullInfoSegment id={bookingIds[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

//---------------------------------------------------------
