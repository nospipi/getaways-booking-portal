import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import BusTrackingSection from "./BusTrackingSection.client";

//---------------------------------------------------------------------------------------------

const BusTracking = async ({ uniqueId }: { uniqueId: string }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["TRACKING_DATA", uniqueId],
    queryFn: () => getTrackingData(uniqueId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BusTrackingSection uniqueId={uniqueId} />
    </HydrationBoundary>
  );
};

export default BusTracking;
