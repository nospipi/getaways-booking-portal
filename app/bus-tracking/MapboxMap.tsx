"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { PiClockCountdownFill } from "react-icons/pi";
import MovingMarker from "./MovingMarker";
import { useQuery } from "@tanstack/react-query";
import { TiWarning } from "react-icons/ti";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import { IoIosFlag } from "react-icons/io";
import { IGetBookingReturn } from "@/app/server/server_actions/getBookingByUniqueId";
import "mapbox-gl/dist/mapbox-gl.css";
import { IExtendedServerActionReturn } from "@/app/server/server_actions/getTrackingData";
import Countdown, { CountdownRenderProps } from "react-countdown";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { truncate } from "fs";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

//---------------------------------------------------------

const errorRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  if (completed) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span
        style={{
          color: "white",
        }}
      >
        Bus tracking will open in
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          color: "indianred",
        }}
      >
        <PiClockCountdownFill
          size={18}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          color="white"
        />
        {days > 0 && <span>{days} days</span>}
        {hours > 0 && <span>{hours} hours</span>}
        {minutes > 0 && <span>{minutes} minutes</span>}
        {seconds > 0 && days === 0 && <span>{seconds} seconds</span>}
      </div>
    </div>
  );
};

const MapboxMap = ({ booking }: { booking: string }) => {
  const parsedBooking: IGetBookingReturn = JSON.parse(booking);
  const [devicePosition, setDevicePosition] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const hasDevicePosition = devicePosition.latitude && devicePosition.longitude;
  const [devicePositionError, setDevicePositionError] = useState<string>("");
  const [shouldWatchDevicePosition, setShouldWatchDevicePosition] =
    useState<boolean>(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [shouldFollowVehicle, setShouldFollowVehicle] =
    useState<boolean>(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const clientPosition: [number, number] = useMemo(() => {
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
  const shouldCountdown = isError && targetDate;
  const errorWithoutCountdown = isError && !targetDate;

  const trackingData = data?.data;
  const meetingPointName = trackingData?.meetingPointName ?? "N/A";

  const vehicleLon = trackingData?.vehicle_position?.lon ?? 0;
  const vehicleLat = trackingData?.vehicle_position?.lat ?? 0;
  const LngLatValid = vehicleLon !== 0 && vehicleLat !== 0;
  // distanceFromVehicleToClientMeters: number;
  // distanceFromVehicleToClientInKm: number;
  // distanceFromVehicleToClientInMiles: number;
  // distanceFromVehicleToClientInYards: number;
  const distanceFromVehicleToClientMeters =
    trackingData?.distanceFromVehicleToClientMeters ?? 0;
  const distanceFromVehicleToClientInKm =
    trackingData?.distanceFromVehicleToClientInKm ?? 0;
  const distanceFromVehicleToClientInMiles =
    trackingData?.distanceFromVehicleToClientInMiles ?? 0;
  const distanceFromVehicleToClientInYards =
    trackingData?.distanceFromVehicleToClientInYards ?? 0;
  console.log(
    distanceFromVehicleToClientMeters,
    distanceFromVehicleToClientInKm,
    distanceFromVehicleToClientInMiles,
    distanceFromVehicleToClientInYards
  );

  const coordinates: [number, number][] = useMemo(() => {
    return [[vehicleLon, vehicleLat], clientPosition];
  }, [vehicleLon, vehicleLat, clientPosition]);

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
        //dragPan: false,
        touchPitch: true,
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
        .setPopup(
          new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            closeOnClick: false,
            closeOnMove: false,
          }).setHTML(`
              <div style="
    display: flex; 
    flex-direction: column; 
    gap: 7px; 
    color: white; 
  ">
    <span>📍 Meeting Point</span>
    <span><strong>${meetingPointName}</strong></span>
  </div>

          `)
        )
        .addTo(map)
        .togglePopup();
    }
  }, [map]);

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
      {shouldCountdown && (
        <Countdown
          date={targetDate}
          renderer={errorRenderer}
          onComplete={() => {
            //when countdown is completed, refetch the tracking data to return success status and render the map
            refetch();
          }}
        />
      )}

      {errorWithoutCountdown && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.4)",
            width: "100%",
            paddingTop: "30px",
            paddingBottom: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TiWarning style={{ fontSize: "30px", color: "white" }} />
          <span
            style={{
              color: "indianred",
              width: "70%",
            }}
          >
            {errorText}
          </span>
        </div>
      )}

      {isRefetching && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <RotatingLines width="15" strokeColor="white" />
          <span
            style={{
              fontSize: "10px",
              color: "grey",
            }}
          >
            Getting vehicle position
          </span>
        </div>
      )}

      {map && (
        <MovingMarker
          booking={parsedBooking as IGetBookingReturn}
          map={map as mapboxgl.Map}
        />
      )}

      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "10px",
          //background: "rgba(0, 0, 0, 0.3)",
          //backdropFilter: "blur(2px)",
          color: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{watchId}</span>
          <span>{devicePosition?.latitude}</span>
          <span>{devicePosition?.longitude}</span>
        </div>
        <div>
          <FormGroup>
            <FormControlLabel
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "12px" } }}
              control={
                <Switch
                  checked={shouldWatchDevicePosition}
                  onChange={(value) => {
                    if (value.target.checked) {
                      setShouldWatchDevicePosition(true);
                      const id = navigator.geolocation.watchPosition(
                        (position) => {
                          setDevicePosition({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                          });
                        },
                        (err) => {
                          toast.error(`${err.message}`);
                          setWatchId(null);
                          setShouldWatchDevicePosition(false);
                        },
                        {
                          enableHighAccuracy: true,
                          timeout: 5000,
                          maximumAge: 0,
                        }
                      );

                      setWatchId(id);
                    } else {
                      if (watchId) {
                        setShouldWatchDevicePosition(false);
                        navigator.geolocation.clearWatch(watchId);
                        setWatchId(null);
                      }
                    }
                  }}
                />
              }
              label="Show your position"
              labelPlacement="start"
            />
            <FormControlLabel
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "12px" } }}
              control={
                <Switch
                  checked={shouldFollowVehicle}
                  onChange={(value) => {
                    setShouldFollowVehicle(value.target.checked);
                  }}
                />
              }
              label="Follow vehicle"
              labelPlacement="start"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default MapboxMap;
