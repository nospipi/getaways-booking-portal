import Tour from "@/app/home/sections/tour/Tour";
import UsefullInfoSegment from "../home/sections/tour/UsefullInfoSegment";
import getBookingIds from "@/app/api/server_actions/getBookingIds";

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
            {bookingIds.map((bookingId: string) => (
              <Tour key={bookingId} id={bookingId} />
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
