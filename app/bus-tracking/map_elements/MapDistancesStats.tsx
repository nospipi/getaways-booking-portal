import { useQuery } from "@tanstack/react-query";
import { IExtendedServerActionReturn } from "../../server/server_actions/getTrackingData";
import getTrackingData from "@/app/server/server_actions/getTrackingData";

//---------------------------------------------------------

const MapDistancesStats = ({
  shouldRender,
  unique_booking_id,
}: {
  shouldRender: boolean;
  unique_booking_id: string;
}) => {
  const { data } = useQuery<IExtendedServerActionReturn>({
    queryKey: ["TRACKING_DATA", unique_booking_id],
    queryFn: () => getTrackingData(unique_booking_id),
    // retry: false,
    // refetchOnWindowFocus: true,
    // refetchInterval: 10000,
    enabled: shouldRender,
  });

  const trackingData = data?.data;
  const distanceFromVehicleToClientMeters =
    trackingData?.distanceFromVehicleToClientMeters ?? 0;
  const distanceFromVehicleToClientInKm =
    trackingData?.distanceFromVehicleToClientInKm ?? 0;
  const distanceFromVehicleToClientInMiles =
    trackingData?.distanceFromVehicleToClientInMiles ?? 0;
  const distanceFromVehicleToClientInFeet =
    trackingData?.distanceFromVehicleToClientInFeet ?? 0;

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "10px",
        paddingTop: "7px",
        paddingLeft: "5px",
        color: "whitesmoke",
        gap: "1px",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        padding: "10px",
        zIndex: 1,
      }}
    >
      <span
        style={{
          color: "dodgerblue",
          fontWeight: "bold",
        }}
      >{`Vehicle ↔ Meeting Point`}</span>

      <div>
        <span>{`${distanceFromVehicleToClientInKm} km`}</span>
      </div>
      <div>
        <span>{`${distanceFromVehicleToClientMeters} meters`}</span>
      </div>
      <div>
        <span>{`${distanceFromVehicleToClientInMiles} miles`}</span>
      </div>
      <div>
        <span>{`${distanceFromVehicleToClientInFeet} feet`}</span>
      </div>
    </div>
  );
};

export default MapDistancesStats;
