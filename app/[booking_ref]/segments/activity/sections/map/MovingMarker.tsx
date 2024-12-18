"use client";

import { useState, useEffect } from "react";
import { FaBusSimple } from "react-icons/fa6";
import ReactDOMServer from "react-dom/server";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useQuery } from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import { IGetBookingReturn } from "@/app/server/server_actions/getBookingById";

//----------------------------------------------

const MovingMarker = ({
  booking,
  map,
}: {
  booking: IGetBookingReturn;
  map: mapboxgl.Map;
}) => {
  const [marker, setMarker] = useState<mapboxgl.Marker>();
  const [lngLat, setLngLat] = useState<LngLatLike>([0, 0]);

  const { data = "{}", isRefetching } = useQuery({
    queryKey: ["TRACKING_DATA", booking._id],
    queryFn: () => getTrackingData(booking._id),
    retry: false,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });

  const trackingData = JSON.parse(data);
  console.log("trackingData", trackingData);

  //calculate vehicle position
  const vehicleLon = trackingData?.vehicle_position?.lon || 0;
  const vehicleLat = trackingData?.vehicle_position?.lat || 0;
  const computedLngLat = [vehicleLon, vehicleLat] as LngLatLike;

  //construct custom marker
  const customVehicleMarker = document.createElement("div");
  customVehicleMarker.className = "vehicle-marker-container";
  customVehicleMarker.innerHTML = ReactDOMServer.renderToString(
    <FaBusSimple
      style={{
        fontSize: "18px",
        color: "white",
        position: "absolute",
      }}
    />
  );

  //update marker position at every refetch
  useEffect(() => {
    if (map) {
      setLngLat(computedLngLat as LngLatLike);
    }
  }, [isRefetching]);

  //update marker on map at every lngLat change
  useEffect(() => {
    if (map && lngLat) {
      if (marker) marker.remove();

      const newMarker = new mapboxgl.Marker({ element: customVehicleMarker })
        .setLngLat(lngLat)
        .addTo(map);

      //construct popups
      const otherPickupPopup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(
        `<div style="padding: 5px 10px;">Picking up passengers...</div>`
      );
      const ownPickupPopup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(
        `<div style="padding: 5px 10px;">Is very near to you...</div>`
      );
      const arrivedPopup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(
        `<b><div style="padding: 5px 10px; color:rgb(49 87 49);">Has arrived at your location !</div></b>`
      );

      const shouldHidePopup =
        !trackingData?.arrivedAtOwnPickup &&
        !trackingData?.arrivingInOwnPickup &&
        !trackingData?.withinRangeOfOtherPickup;

      if (shouldHidePopup) {
        newMarker.setPopup(undefined);
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

export default MovingMarker;
