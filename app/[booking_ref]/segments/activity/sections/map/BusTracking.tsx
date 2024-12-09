import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import BusTrackingClient from "./BusTrackingClient.client";
import getBookingById from "@/app/server/server_actions/getBookingById";
import { FaBus } from "react-icons/fa6";

//---------------------------------------------------------------------------------------------

const BusTracking = async ({ id }: { id: string }) => {
  const booking = await getBookingById(id);
  const hasVehicle = booking?.task?.vehicle?.plate;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["TRACKING_DATA", id],
    queryFn: () => getTrackingData(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="section-container">
        <div className="section-title-container">Tour bus tracking</div>
        <div className="section-content-container">
          <div className="section-content-item-container">
            <div className="section-content-icon-container">
              <FaBus size={16} />
            </div>
            <div
              className="section-content-text-container"
              style={{
                color: hasVehicle ? "black" : "indianred",
              }}
            >
              {hasVehicle
                ? `${booking?.task?.vehicle?.plate} (${booking?.task?.vehicle?.type} / ${booking?.task?.vehicle?.color})`
                : "NOT AVAILABLE"}
            </div>
          </div>
          <BusTrackingClient id={id} /> {/* MAP HERE */}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default BusTracking;
