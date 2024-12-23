"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import MovingMarker from "./MovingMarker";
import { useQuery } from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import { IoIosFlag } from "react-icons/io";
import { IGetBookingReturn } from "@/app/server/server_actions/getBookingByUniqueId";
import "mapbox-gl/dist/mapbox-gl.css";
import { IExtendedServerActionReturn } from "@/app/server/server_actions/getTrackingData";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

//---------------------------------------------------------

const MapboxMap = ({ booking }: { booking: IGetBookingReturn }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map>();

  const clientPosition: [number, number] = [
    parseFloat(booking?.pickup_location?.longitude ?? "0"), // Convert to number, fallback to 0
    parseFloat(booking?.pickup_location?.latitude ?? "0"), // Convert to number, fallback to 0
  ];

  const { data, isRefetching } = useQuery<IExtendedServerActionReturn>({
    queryKey: ["TRACKING_DATA", booking._id],
    queryFn: () => getTrackingData(booking._id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const trackingData = data?.data;

  const vehicleLon = trackingData?.vehicle_position?.lon ?? 0;
  const vehicleLat = trackingData?.vehicle_position?.lat ?? 0;
  const LngLatValid = vehicleLon !== 0 && vehicleLat !== 0;

  useEffect(() => {
    if (mapContainer.current && LngLatValid) {
      const newMap = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [vehicleLon, vehicleLat] as LngLatLike,
        zoom: 14, //default zoom,but we are setting fitbounds later,so zoom is relative to between the vehicle position and the meeting point
        //https://docs.mapbox.com/mapbox-gl-js/api/handlers/
        //dragPan: false,
        touchPitch: true,
      });
      setMap(newMap);
    }
  }, [LngLatValid, vehicleLat, vehicleLon]);

  useEffect(() => {
    if (map) {
      const customClientMarker = document.createElement("div");
      customClientMarker.className = "client-marker-container";
      customClientMarker.innerHTML = ReactDOMServer.renderToString(
        <IoIosFlag
          style={{
            fontSize: "20px",
            color: "white",
            position: "absolute",
          }}
        />
      );

      new mapboxgl.Marker({
        element: customClientMarker,
      })
        .setLngLat(clientPosition as LngLatLike)
        .addTo(map);

      // Fit map to bounds of between the vehicle and meeting point
      const bounds = new mapboxgl.LngLatBounds()
        .extend([vehicleLon, vehicleLat] as LngLatLike)
        .extend(clientPosition as LngLatLike);

      map.fitBounds(bounds, { padding: 50, animate: false });
      //set zoom to 14 if zoom is greater than 14 after fitbounds
      map.on("load", () => {
        const zoom = map.getZoom();

        if (zoom > 14) {
          map.setZoom(14);
        }
      });
    }
  }, [map, isRefetching]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {isRefetching && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(2px)",
            padding: "10px",
            zIndex: 1,
            textAlign: "center",
            color: "white",
            fontSize: "14px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          Getting new location data...
        </div>
      )}
      {map && (
        <MovingMarker
          booking={booking as IGetBookingReturn}
          map={map as mapboxgl.Map}
        />
      )}
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "400px",
          flex: 1,
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default MapboxMap;
