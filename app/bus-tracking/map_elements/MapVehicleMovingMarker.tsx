"use client";

import { useState, useEffect, useMemo } from "react";
import { FaBusSimple } from "react-icons/fa6";
import ReactDOMServer from "react-dom/server";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useQuery } from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import { IGetBookingReturn } from "@/app/server/server_actions/getBookingByUniqueId";

//----------------------------------------------

const MapVehicleMovingMarker = ({
  shouldFollowVehicle,
  booking,
  map,
}: {
  shouldFollowVehicle: boolean;
  booking: IGetBookingReturn;
  map: mapboxgl.Map;
}) => {
  const [marker, setMarker] = useState<mapboxgl.Marker>();
  const [lngLat, setLngLat] = useState<LngLatLike>([0, 0]);

  const { data, isRefetching } = useQuery({
    queryKey: ["TRACKING_DATA", booking.unique_booking_id],
    queryFn: () => getTrackingData(booking.unique_booking_id),
    retry: false,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });

  const trackingData = data?.data;

  const vehiclePlate = trackingData?.vehiclePlate || "N/A";
  const vehicleType = trackingData?.vehicleType || "N/A";
  const vehicleColor = trackingData?.vehicleColor || "N/A";

  //calculate vehicle position
  const vehicleLon = trackingData?.vehicle_position?.lon || 0;
  const vehicleLat = trackingData?.vehicle_position?.lat || 0;
  const computedLngLat = useMemo(() => {
    return [vehicleLon, vehicleLat] as LngLatLike;
  }, [vehicleLon, vehicleLat]);

  //construct custom marker
  const customVehicleMarker = document.createElement("div");
  customVehicleMarker.className = "vehicle-marker-container";
  customVehicleMarker.innerHTML = ReactDOMServer.renderToString(
    <FaBusSimple
      style={{
        fontSize: "16px",
        color: "white",
        position: "absolute",
      }}
    />
  );

  //update lngLat position at every refetch
  useEffect(() => {
    if (map) {
      setLngLat(computedLngLat as LngLatLike);
      if (shouldFollowVehicle) {
        map.flyTo({
          center: computedLngLat as LngLatLike,
          essential: true,
        });
      }
    }
  }, [isRefetching, map, computedLngLat, shouldFollowVehicle]);

  //update marker on map at every lngLat change
  useEffect(() => {
    if (map && lngLat) {
      if (marker) marker.remove();

      const newMarker = new mapboxgl.Marker({ element: customVehicleMarker })
        .setLngLat(lngLat)
        .addTo(map);

      //construct popups

      const defaultPopup = new mapboxgl.Popup({
        offset: 20,
        closeButton: false,
        closeOnClick: false,
        closeOnMove: false,
      }).setHTML(
        `
  <div style="
    display: flex; 
    flex-direction: column; 
    gap: 7px; 
  ">
    <span>🚐 Vehicle Type: <strong>${vehicleType}</strong></span>
    <span>🎫 Plate number: <strong>${vehiclePlate}</strong></span>
    <span>🎨 Color: <strong>${vehicleColor}</strong></span>
  </div>
  `
      );

      const otherPickupPopup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(`<div>Picking up passengers...</div>`);
      const ownPickupPopup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(`<div>Is very near to you...</div>`);
      const arrivedPopup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(`<b><div>Has arrived at your location !</div></b>`);

      const shouldHidePopup =
        !trackingData?.arrivedAtOwnPickup &&
        !trackingData?.arrivingInOwnPickup &&
        !trackingData?.withinRangeOfOtherPickup;

      if (shouldHidePopup) {
        newMarker.setPopup(defaultPopup).togglePopup();
      }

      if (trackingData?.arrivedAtOwnPickup) {
        newMarker.setPopup(arrivedPopup).togglePopup();
      }

      if (trackingData?.arrivingInOwnPickup) {
        newMarker.setPopup(ownPickupPopup).togglePopup();
      }

      if (trackingData?.withinRangeOfOtherPickup) {
        newMarker.setPopup(otherPickupPopup).togglePopup();
      }

      setMarker(newMarker);
    }
  }, [lngLat]);

  return null;
};

export default MapVehicleMovingMarker;
