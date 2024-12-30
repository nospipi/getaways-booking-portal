"use client";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const MapOtherPickupMarkers = ({
  map,
  pickupCoordinates,
}: {
  map: mapboxgl.Map | null;
  pickupCoordinates: [number, number][]; // Array of [lng, lat]
}) => {
  useEffect(() => {
    if (map) {
      pickupCoordinates.forEach((pickupCoordinate) => {
        const customMarker = document.createElement("div");
        customMarker.className = "custom-pickup-marker";
        new mapboxgl.Marker(customMarker)
          .setLngLat(pickupCoordinate)
          .addTo(map);
      });
    }
  }, [map, pickupCoordinates]);

  return null;
};

export default MapOtherPickupMarkers;
