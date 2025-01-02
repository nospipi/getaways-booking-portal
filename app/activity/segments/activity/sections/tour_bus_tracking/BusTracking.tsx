import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import BusTrackingSection from "./BusTrackingSection.client";
import { Suspense } from "react";

//---------------------------------------------------------------------------------------------

const BusTracking = async ({ uniqueId }: { uniqueId: string }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["TRACKING_DATA", uniqueId],
    queryFn: () => getTrackingData(uniqueId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        {/* wrapped in Suspense because it accesses useSearchParams hook (through useAddUserAction hook) */}
        {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
        <BusTrackingSection uniqueId={uniqueId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default BusTracking;
