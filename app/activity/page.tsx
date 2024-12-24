import ActivitySegment from "@/app/activity/segments/activity/ActivitySegment";
import UsefullInfoSegment from "@/app/activity/segments/usefull_info/UsefullInfoSegment";
import getBookingUniqueIds from "@/app/server/server_actions/getBookingUniqueIds";
import getBookingParentRefByUniqueId from "../server/server_actions/getBookingParentRefByUniqueId";
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
  let { ref } = await searchParams;
  const { uniqueId } = await searchParams;
  if (uniqueId) {
    const booking_ref = await getBookingParentRefByUniqueId(uniqueId);
    console.log(booking_ref);
    if (booking_ref.status === "success") {
      ref = booking_ref.data;
    }
  }
  const uniqueIds = (await getBookingUniqueIds(ref)) as string[];

  return (
    <main className="page-container">
      {/* <TrackPageVisitHandler booking_ref={booking_ref} /> */}
      <div className="content-wrapper">
        <div className="content-container">
          <div className="content-container-wrapper">
            {uniqueIds.map((uniqueId: string, index: number) => (
              <ActivitySegment
                key={uniqueId}
                uniqueId={uniqueId}
                activityIndex={index}
                numberOfActivities={uniqueIds.length}
              />
            ))}
            <UsefullInfoSegment id={uniqueIds[0]} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;

//---------------------------------------------------------
