"use client";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { FaWalking } from "react-icons/fa";

//----------------------------------------------

const ClientMarker = ({
  map,
  clientPosition,
  shouldWatchDevicePosition,
}: {
  map: mapboxgl.Map | null;
  clientPosition: [number, number];
  shouldWatchDevicePosition: boolean;
}) => {
  const [marker, setMarker] = useState<mapboxgl.Marker | null>();
  const hasClientPosition = clientPosition[0] !== 0 && clientPosition[1] !== 0;
  const shouldCreateMarker =
    map && hasClientPosition && shouldWatchDevicePosition;

  //if shouldCreateMarker is true, create a new marker else remove the marker
  //at every clientPosition change remove the marker and create a new one at the new position

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
            fontSize: "18px",
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
        .setLngLat(clientPosition as LngLatLike)
        .setPopup(popup)
        .addTo(map)
        .togglePopup();

      setMarker(newMarker);
    } else {
      if (marker) {
        marker.remove();
        setMarker(null);
      }
    }
  }, [shouldCreateMarker, clientPosition]);

  return null;
};

export default ClientMarker;
