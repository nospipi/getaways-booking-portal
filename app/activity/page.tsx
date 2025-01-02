import ActivitySegment from "@/app/activity/segments/activity/ActivitySegment";
import UsefullInfoSegment from "@/app/activity/segments/usefull_info/UsefullInfoSegment";
import getBookingUniqueIds from "@/app/server/server_actions/getBookingUniqueIds";
import getBookingParentRefByUniqueId from "../server/server_actions/getBookingParentRefByUniqueId";
import BottomViewTarget from "./BottomViewTarget";
import { Suspense } from "react";
//import TrackPageVisitHandler from "@/utils/TrackPageVisitHandler.client";

//---------------------------------------------------------

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  let { ref } = await searchParams;
  const { uniqueId } = await searchParams;
  if (uniqueId) {
    //if we get uniqueId, get ref first because there might be multiple bookings in the same parent ref
    const booking_ref = await getBookingParentRefByUniqueId(uniqueId);
    if (booking_ref.status === "success") {
      ref = booking_ref.data;
    }
  }

  //then get all uniqueIds for this ref and render all bookings
  const uniqueIds = (await getBookingUniqueIds(ref)) as string[];

  return (
    <main className="page-container">
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
            <Suspense>
              {/* wrapped in Suspense because it accesses useSearchParams hook (through useAddUserAction hook) */}
              {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
              <BottomViewTarget />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;

//---------------------------------------------------------
