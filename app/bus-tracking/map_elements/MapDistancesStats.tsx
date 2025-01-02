import { useQuery } from "@tanstack/react-query";
import { IExtendedServerActionReturn } from "../../server/server_actions/getTrackingData";
import { getPreciseDistance, convertDistance } from "geolib";
import getTrackingData from "@/app/server/server_actions/getTrackingData";

//---------------------------------------------------------

const MapDistancesStats = ({
  meetingPointPosition,
  clientPosition,
  shouldRender,
  shouldRenderClientDistances,
  unique_booking_id,
}: {
  meetingPointPosition: [number, number]; //longitude, latitude
  clientPosition: [number, number]; //longitude, latitude
  shouldRender: boolean;
  shouldRenderClientDistances: boolean;
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

  const distanceFromVehicleToMeetingPointInMeters = getPreciseDistance(
    {
      lat: meetingPointPosition[1] ?? 0,
      lng: meetingPointPosition[0] ?? 0,
    },
    {
      lat: trackingData?.vehiclePosition?.lat ?? 0,
      lng: trackingData?.vehiclePosition?.lon ?? 0,
    }
  );

  const distanceFromVehicleToClientInMeters = getPreciseDistance(
    {
      lat: clientPosition[1] ?? 0,
      lng: clientPosition[0] ?? 0,
    },
    {
      lat: trackingData?.vehiclePosition?.lat ?? 0,
      lng: trackingData?.vehiclePosition?.lon ?? 0,
    }
  );

  //---------------------------------------------------------

  const distanceFromVehicleToMeetingPointInKm = convertDistance(
    distanceFromVehicleToMeetingPointInMeters,
    "km"
  );

  const distanceFromVehicleToMeetingPointInMiles = convertDistance(
    distanceFromVehicleToMeetingPointInMeters,
    "mi"
  );

  const distanceFromVehicleToMeetingPointInFeet = convertDistance(
    distanceFromVehicleToMeetingPointInMeters,
    "ft"
  );

  //------

  const distanceFromVehicleToClientInKm = convertDistance(
    distanceFromVehicleToClientInMeters,
    "km"
  );

  const distanceFromVehicleToClientInMiles = convertDistance(
    distanceFromVehicleToClientInMeters,
    "mi"
  );

  const distanceFromVehicleToClientInFeet = convertDistance(
    distanceFromVehicleToClientInMeters,
    "ft"
  );

  //---------------------------------------------------------

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        paddingTop: "12px",
        paddingLeft: "12px",
        fontSize: "10px",
        color: "whitesmoke",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
        }}
      >
        <span
          style={{
            color: "dodgerblue",
            fontWeight: "bold",
          }}
        >{`Vehicle ↔ Meeting Point`}</span>

        <div>
          <span>{`${distanceFromVehicleToMeetingPointInKm.toFixed(
            2
          )} km`}</span>
        </div>
        <div>
          <span>{`${distanceFromVehicleToMeetingPointInMeters.toFixed(
            2
          )} meters`}</span>
        </div>
        <div>
          <span>{`${distanceFromVehicleToMeetingPointInMiles.toFixed(
            2
          )} miles`}</span>
        </div>
        <div>
          <span>{`${distanceFromVehicleToMeetingPointInFeet.toFixed(
            2
          )} feet`}</span>
        </div>
      </div>
      {shouldRenderClientDistances && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
          }}
        >
          <span
            style={{
              color: "dodgerblue",
              fontWeight: "bold",
            }}
          >{`Vehicle ↔ Your Position`}</span>

          <div>
            <span>{`${distanceFromVehicleToClientInKm.toFixed(2)} km`}</span>
          </div>
          <div>
            <span>{`${distanceFromVehicleToClientInMeters.toFixed(
              2
            )} meters`}</span>
          </div>
          <div>
            <span>{`${distanceFromVehicleToClientInMiles.toFixed(
              2
            )} miles`}</span>
          </div>
          <div>
            <span>{`${distanceFromVehicleToClientInFeet.toFixed(
              2
            )} feet`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapDistancesStats;
