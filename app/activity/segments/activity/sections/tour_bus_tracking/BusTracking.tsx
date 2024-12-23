import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import BusTrackingSection from "./BusTrackingSection.client";

//---------------------------------------------------------------------------------------------

const BusTracking = async ({ id }: { id: string }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["TRACKING_DATA", id],
    queryFn: () => getTrackingData(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BusTrackingSection booking_id={id} />
    </HydrationBoundary>
  );
};

export default BusTracking;
