"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import MapClientMarker from "./map_elements/MapClientMarker";
import MapVehicleMovingMarker from "./map_elements/MapVehicleMovingMarker";
import { useQuery } from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import MapDistancesStats from "./map_elements/MapDistancesStats";
import MapControlSwitches from "./map_elements/MapControlSwitches";
import MapLoadingIndicator from "./map_elements/MapLoadingIndicator";
import MapRefetchingIndicator from "./map_elements/MapRefetchingIndicator";
import MapCountdown from "./map_elements/MapCountdown";
import MapBackButton from "./map_elements/MapBackButton";
import MapError from "./map_elements/MapError";
import { IoIosFlag } from "react-icons/io";
import { IGetBookingReturn } from "@/app/server/server_actions/getBookingByUniqueId";
import "mapbox-gl/dist/mapbox-gl.css";
import { IExtendedServerActionReturn } from "@/app/server/server_actions/getTrackingData";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

//---------------------------------------------------------

const MapboxMap = ({ booking }: { booking: string }) => {
  const parsedBooking: IGetBookingReturn = JSON.parse(booking);
  const [devicePosition, setDevicePosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [shouldWatchDevicePosition, setShouldWatchDevicePosition] =
    useState<boolean>(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [shouldFollowVehicle, setShouldFollowVehicle] =
    useState<boolean>(false);
  const [shouldFollowClient, setShouldFollowClient] = useState<boolean>(false);
  const [mapIsLoading, setMapIsLoading] = useState<boolean>(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const meetingPointPosition: [number, number] = useMemo(() => {
    return [
      parseFloat(parsedBooking?.pickup_location?.longitude ?? "0"), // Convert to number, fallback to 0
      parseFloat(parsedBooking?.pickup_location?.latitude ?? "0"), // Convert to number, fallback to 0
    ];
  }, [
    parsedBooking?.pickup_location?.longitude,
    parsedBooking?.pickup_location?.latitude,
  ]);

  const { data, refetch, isRefetching } = useQuery<IExtendedServerActionReturn>(
    {
      queryKey: ["TRACKING_DATA", parsedBooking.unique_booking_id],
      queryFn: () => getTrackingData(parsedBooking.unique_booking_id),
      retry: false,
      refetchOnWindowFocus: true,
      refetchInterval: 10000,
    }
  );

  const isError = data?.status === "error";

  const errorText =
    isError && data?.message ? data.message.split("&")[0] : undefined;
  const targetDate = data?.message ? data.message.split("&")[1] : undefined;
  const shouldCountdown = isError && typeof targetDate === "string";
  const errorWithoutCountdown = isError && !targetDate;

  const trackingData = data?.data;
  const meetingPointName = trackingData?.meetingPointName ?? "N/A";

  const vehicleLon = trackingData?.vehicle_position?.lon ?? 0;
  const vehicleLat = trackingData?.vehicle_position?.lat ?? 0;
  const LngLatValid = vehicleLon !== 0 && vehicleLat !== 0;

  const coordinates: [number, number][] = useMemo(() => {
    return [[vehicleLon, vehicleLat], meetingPointPosition];
  }, [vehicleLon, vehicleLat, meetingPointPosition]);

  const meetingPointHTML = useMemo(() => {
    return `<div style="
    display: flex; 
    flex-direction: column; 
    gap: 7px; 
    color: white; 
  ">
    <span>📍 Meeting Point</span>
    <span><strong>${meetingPointName}</strong></span>
  </div>
  `;
  }, [meetingPointName]);

  useEffect(() => {
    return () => {
      if (map) {
        setMapIsLoading(false);
      }
    };
  }, [map]);

  //only for cleanup
  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  //map initialization
  useEffect(() => {
    if (mapContainer.current && LngLatValid && !isError && map === null) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [vehicleLon, vehicleLat] as LngLatLike,
        zoom: 17, //default zoom,but we are setting fitbounds later,so zoom is relative to between the vehicle position and the meeting point
        //https://docs.mapbox.com/mapbox-gl-js/api/handlers/
      });
      setMap(newMap);
    }
  }, [LngLatValid, vehicleLat, vehicleLon, isError, map]);

  //re-arrange lines at every different coordinates
  useEffect(() => {
    if (map) {
      const onStyleLoad = () => {
        if (map.getSource("line")) {
          map.removeLayer("line");
          map.removeSource("line");
        }

        map.addSource("line", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        });

        // Add the line layer
        map.addLayer({
          id: "line",
          type: "line",
          source: "line",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "dodgerblue",
            "line-width": 1,
            "line-dasharray": [2, 2],
          },
        });
      };

      if (map.isStyleLoaded()) {
        // If style is already loaded, add the layer immediately
        onStyleLoad();
      } else {
        // Otherwise, wait for the style to finish loading
        map.on("style.load", onStyleLoad);
      }

      return () => {
        map.off("style.load", onStyleLoad);
      };
    }
  }, [map, coordinates]);

  useEffect(() => {
    if (map) {
      const customClientMarker = document.createElement("div");
      customClientMarker.className = "meeting-point-marker-container";
      customClientMarker.innerHTML = ReactDOMServer.renderToString(
        <IoIosFlag
          style={{
            fontSize: "16px",
            color: "white",
            position: "absolute",
          }}
        />
      );

      new mapboxgl.Marker({
        element: customClientMarker,
      })
        .setLngLat(meetingPointPosition as LngLatLike)
        .setPopup(
          new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            closeOnClick: false,
            closeOnMove: false,
          }).setHTML(meetingPointHTML)
        )
        .addTo(map)
        .togglePopup();
    }
  }, [map, meetingPointPosition, meetingPointHTML]);

  //remove map when error occurs
  useEffect(() => {
    if (isError && map) {
      map.remove();
      setMap(null);
    }
  }, [isError, map]);

  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        borderRadius: "10px",
        background: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <MapCountdown
        shouldCountdown={shouldCountdown}
        setMapIsLoading={setMapIsLoading}
        refetch={refetch}
        targetDate={targetDate}
      />

      <MapError
        errorText={errorText}
        errorWithoutCountdown={errorWithoutCountdown}
      />

      <MapLoadingIndicator mapIsLoading={mapIsLoading} />

      <MapRefetchingIndicator
        shouldRender={map !== null}
        isRefetching={isRefetching}
      />

      <MapVehicleMovingMarker
        shouldFollowVehicle={shouldFollowVehicle}
        booking={parsedBooking as IGetBookingReturn}
        map={map as mapboxgl.Map}
      />

      <MapClientMarker
        map={map}
        clientPosition={devicePosition}
        shouldFollowClient={shouldFollowClient}
        shouldWatchDevicePosition={shouldWatchDevicePosition}
      />

      <MapDistancesStats
        shouldRender={map !== null}
        unique_booking_id={parsedBooking.unique_booking_id}
      />
      <MapControlSwitches
        shouldRender={map !== null}
        shouldWatchDevicePosition={shouldWatchDevicePosition}
        setShouldWatchDevicePosition={setShouldWatchDevicePosition}
        setShouldFollowClient={setShouldFollowClient}
        setShouldFollowVehicle={setShouldFollowVehicle}
        setDevicePosition={setDevicePosition}
        setWatchId={setWatchId}
        watchId={watchId}
        shouldFollowClient={shouldFollowClient}
        shouldFollowVehicle={shouldFollowVehicle}
      />

      <MapBackButton />

      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default MapboxMap;
