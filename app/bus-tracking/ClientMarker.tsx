"use client";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { FaWalking } from "react-icons/fa";
import { computeDestinationPoint } from "geolib";

const startingPosition = [37.98258, 23.72087];
const generateFakeCoordinates = (
  callback: (coords: [number, number]) => void
) => {
  let currentPosition = {
    latitude: startingPosition[1],
    longitude: startingPosition[0],
  };

  const intervalId = setInterval(() => {
    // Move 5 meters north (0 degrees bearing)
    currentPosition = computeDestinationPoint(currentPosition, 5, 0);

    const newPosition: [number, number] = [
      currentPosition.latitude,
      currentPosition.longitude,
    ];
    callback(newPosition);
  }, 1000);

  return intervalId; // Return the interval ID so it can be cleared later
};
//----------------------------------------------

const ClientMarker = ({
  map,
  clientPosition,
  shouldFollowClient,
  shouldWatchDevicePosition,
}: {
  map: mapboxgl.Map | null;
  clientPosition: [number, number];
  shouldFollowClient: boolean;
  shouldWatchDevicePosition: boolean;
}) => {
  const [marker, setMarker] = useState<mapboxgl.Marker | null>();
  const [fakePosition, setFakePosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (shouldWatchDevicePosition) {
      intervalId = generateFakeCoordinates(setFakePosition);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [shouldWatchDevicePosition]);

  const hasClientPosition = clientPosition[0] !== 0 && clientPosition[1] !== 0;
  const shouldCreateMarker =
    map && hasClientPosition && shouldWatchDevicePosition;

  useEffect(() => {
    if (shouldCreateMarker) {
      if (marker) {
        marker.remove();
      }

      const customClientMarker = document.createElement("div");
      customClientMarker.className = "client-marker-container";
      customClientMarker.innerHTML = ReactDOMServer.renderToString(
        <FaWalking
          style={{
            fontSize: "14px",
            color: "white",
            position: "absolute",
          }}
        />
      );

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setText("You are here");

      const newMarker = new mapboxgl.Marker(customClientMarker)
        .setLngLat(fakePosition as LngLatLike)
        .setPopup(popup)
        .addTo(map)
        .togglePopup();

      setMarker(newMarker);
      if (shouldFollowClient) {
        map.flyTo({
          center: fakePosition as LngLatLike,
          essential: true,
        });
      }
    } else {
      if (marker) {
        marker.remove();
        setMarker(null);
      }
    }
  }, [shouldCreateMarker, fakePosition, shouldFollowClient]);

  return null;
};

export default ClientMarker;
