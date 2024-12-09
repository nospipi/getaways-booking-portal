import ActivitySegment from "@/app/[booking_ref]/segments/activity/ActivitySegment";
import UsefullInfoSegment from "@/app/[booking_ref]/segments/usefull_info/UsefullInfoSegment";
import getBookingIds from "@/app/server/server_actions/getBookingIds";

//---------------------------------------------------------

const Page = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { booking_ref } = await params;
  const bookingIds = (await getBookingIds(booking_ref)) as string[];

  return (
    <div className="page-container">
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
            <UsefullInfoSegment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

//---------------------------------------------------------
