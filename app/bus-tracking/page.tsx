import BackButton from "./BackButton";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import MapboxMap from "./MapboxMap";
import { nanoid } from "nanoid";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

//---------------------------------------------------------

const Page = async ({
  //params,
  searchParams,
}: {
  //params: Promise<{ booking_id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  //const { booking_id } = await params;
  const fallbackId = nanoid();
  const { uniqueId = fallbackId } = await searchParams;

  const booking = await getBookingByUniqueId(uniqueId);
  const stringifiedBooking = JSON.stringify(booking);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["TRACKING_DATA", uniqueId],
    queryFn: () => getTrackingData(uniqueId),
  });

  return (
    <main className="page-container">
      <div className="content-wrapper">
        <div className="content-container">
          <div
            className="content-container-wrapper"
            style={{
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <BackButton />
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
              <MapboxMap booking={stringifiedBooking} />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;

//---------------------------------------------------------
