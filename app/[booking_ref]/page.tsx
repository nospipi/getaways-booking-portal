import ActivitySegment from "@/app/[booking_ref]/segments/activity/ActivitySegment";
import UsefullInfoSegment from "@/app/[booking_ref]/segments/usefull_info/UsefullInfoSegment";
import getBookingIds from "@/app/server/server_actions/getBookingIds";
import confirmBookingByUniqueIdServer from "../server/server_actions/confirmBookingByUniqueIdServer";
import TrackPageVisitHandler from "@/utils/TrackPageVisitHandler.client";

//---------------------------------------------------------

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ booking_ref: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { booking_ref } = await params;
  const { confirm } = await searchParams;
  const bookingIds = (await getBookingIds(booking_ref)) as string[];

  let confirmErrorMessage: string | null = null;

  const handleConfirm = async (uniqueId: string) => {
    try {
      await confirmBookingByUniqueIdServer(uniqueId);
    } catch (e) {
      if (typeof e === "object" && e !== null && "message" in e) {
        const error = e as { message: string };
        confirmErrorMessage = error.message;
      } else {
        confirmErrorMessage = "An error occurred";
      }
    }
  };

  if (confirm) {
    await handleConfirm(confirm);
  }

  console.log("confirmErrorMessage", confirmErrorMessage);

  return (
    <main className="page-container">
      <TrackPageVisitHandler booking_ref={booking_ref} />
      <div className="content-wrapper">
        <div className="content-container">
          <div className="content-container-wrapper">
            {bookingIds.map((bookingId: string, index: number) => (
              <ActivitySegment
                key={bookingId}
                id={bookingId}
                activityIndex={index}
                numberOfActivities={bookingIds.length}
                confirmErrorMessage={confirmErrorMessage}
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
