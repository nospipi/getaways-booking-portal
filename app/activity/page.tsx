import ActivitySegment from "@/app/activity/segments/activity/ActivitySegment";
import UsefullInfoSegment from "@/app/activity/segments/usefull_info/UsefullInfoSegment";
import getBookingIds from "@/app/server/server_actions/getBookingIds";
//import TrackPageVisitHandler from "@/utils/TrackPageVisitHandler.client";

//---------------------------------------------------------

const Page = async ({
  //params,
  searchParams,
}: {
  //params: Promise<{ booking_ref: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  //const { booking_ref } = await params;
  const { ref } = await searchParams;
  const bookingIds = (await getBookingIds(ref)) as string[];

  return (
    <main className="page-container">
      {/* <TrackPageVisitHandler booking_ref={booking_ref} /> */}
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
    </main>
  );
};

export default Page;

//---------------------------------------------------------
