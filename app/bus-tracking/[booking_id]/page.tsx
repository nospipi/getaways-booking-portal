import BackButton from "./BackButton";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import getBookingById from "@/app/server/server_actions/getBookingById";
import MapboxMap from "./MapboxMap";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

//---------------------------------------------------------

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ booking_id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { booking_id } = await params;
  const { ref } = await searchParams;

  const booking = await getBookingById(booking_id);
  console.log("Booking ID:", booking_id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["TRACKING_DATA", booking_id],
    queryFn: () => getTrackingData(booking_id),
  });

  return (
    <main className="page-container">
      <div className="content-wrapper">
        <div className="content-container">
          <div className="content-container-wrapper">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <BackButton />
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <MapboxMap booking={booking} />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;

//---------------------------------------------------------
