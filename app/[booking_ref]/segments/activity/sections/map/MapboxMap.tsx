import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import { LngLatLike } from "mapbox-gl";
// import MapboxLanguage from "@mapbox/mapbox-gl-language";
import BarLoader from "react-spinners/BarLoader";
import { ClientMarker } from "./ClientMarker";
import { useGetTrackingData } from "../../reactQueryHooks";
import MovingMarker from "./MovingMarker";
import fake_map from "../../../src/fake_map.png";
import { Booking } from "../../screens/HomeScreen";
//import { MapInfoContext } from "./MapInfo";
declare const mapboxgl: any; //imported in index.html
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

//---------------------------------------------------------

const Container = styled.div`
  flex: 1;
  width: 100%;
  //height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  flex: 1;
  border-radius: 5px;
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    color: indianred;
  }
`;

// const PopupContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   flex-direction: column;
//   padding: 1px 5px 0 5px;
//   //shadow

//   span {
//     padding: 0;
//     margin: 0;
//   }
// `;

const FakeMapContainer = styled.div`
  width: 100%;
  flex: 1;
  border-radius: 5px;
  position: relative;
`;

const FakeMap = styled.img`
  width: 100%;
  height: 100%;
  max-height: 200px;
  border-radius: 5px;
  filter: blur(1.5px);
`;

const FakeMapOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  span {
    color: white;
    font-size: 15px;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

//---------------------------------------------------------

// const Popup = ({ eta }: { eta: string | null }) => {
//   return (
//     <PopupContainer>
//       <span>ETA to you: {eta}</span>
//     </PopupContainer>
//   );
// };

//---------------------------------------------------------

const MapboxMap = ({ booking }: { booking: Booking }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map>();
  //const { etaTopickup } = useContext(MapInfoContext);

  const {
    //destructuring data property of data
    data: trackingData,
    error,
    isError,
    isLoading,
    isRefetching,
    //refetch,
  } = useGetTrackingData(booking._id, booking?.task?._id, "MAPINFO");

  if (isError && (error as any)?.response?.data?.message) {
    console.log("Error message:", (error as any).response.data.message);
  }

  const vehicleLon = trackingData?.data.vehicle_position?.lon || 0;
  const vehicleLat = trackingData?.data.vehicle_position?.lat || 0;
  // const pickupLon = booking?.pickup_location?.longitude;
  // const pickupLat = booking?.pickup_location?.latitude;
  const LngLatValid = vehicleLon !== 0 && vehicleLat !== 0;

  // calculate midpoint between vehicle and first meeting point
  // const midLng = (vehicleLon + pickupLon) / 2;
  // const midLat = (vehicleLat + pickupLat) / 2;
  // const center = [midLng, midLat];

  useEffect(() => {
    if (mapContainer.current && LngLatValid) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [vehicleLon, vehicleLat] as LngLatLike,
        zoom: 14, //default zoom,but we are setting fitbounds later,so zoom is relative to between the vehicle position and the meeting point
        //https://docs.mapbox.com/mapbox-gl-js/api/handlers/
        dragPan: false,
        touchPitch: true,
      });
      setMap(newMap);
    }
  }, [LngLatValid, vehicleLat, vehicleLon]);

  useEffect(() => {
    // const language = new MapboxLanguage({
    //   defaultLanguage: "en",
    // });
    const clientPosition = [
      booking?.pickup_location?.longitude,
      booking?.pickup_location?.latitude,
    ];

    if (map) {
      //map.addControl(language);

      // Add client marker
      const customClientMarker = document.createElement("div");
      customClientMarker.innerHTML = ReactDOMServer.renderToString(
        <ClientMarker />
      );

      // const popupToHTML = ReactDOMServer.renderToString(
      //   <Popup eta={etaTopickup} />
      // );

      new mapboxgl.Marker({
        element: customClientMarker,
      })
        .setLngLat(clientPosition as LngLatLike)
        .addTo(map);

      // if (etaTopickup) {
      //   newMarker.setPopup(
      //     new mapboxgl.Popup({
      //       offset: 25,
      //       closeButton: false,
      //       className: "popup",
      //     }).setHTML(popupToHTML)
      //   );
      // }

      //the above but add  Popup component
      //newMarker.togglePopup();

      // Fit map to bounds of between the vehicle and meeting point
      const bounds = new mapboxgl.LngLatBounds()
        .extend([vehicleLon, vehicleLat] as LngLatLike)
        .extend(clientPosition as LngLatLike);

      map.fitBounds(bounds, { padding: 50 });

      //set zoom to 14 if zoom is greater than 14 after fitbounds
      map.on("load", () => {
        const zoom = map.getZoom();

        // map.setLayoutProperty("country-label", "text-field", [
        //   "get",
        //   "name_en",
        // ]);

        if (zoom > 14) {
          map.setZoom(14);
        }
      });
    }
  }, [
    map,
    vehicleLat,
    vehicleLon,
    booking?.pickup_location?.latitude,
    booking?.pickup_location?.longitude,
    isRefetching,
  ]);

  return (
    <Container>
      <>
        {isLoading && <BarLoader color="#bababa" loading={true} />}

        {/* 
        {!isLoading && (isError || !trackingData) && (
          <ErrorContainer>
            <span>
              {(error as any)?.response?.data?.message ||
                "Tour bus tracking not available"}
            </span>
          </ErrorContainer>
        )} */}

        {!isLoading && (isError || !trackingData) && (
          <ErrorContainer>
            <FakeMapContainer>
              <FakeMap src={fake_map} />
              <FakeMapOverlay>
                <span>
                  TRACKING WILL BECOME AVAILABLE 30 MINUTES PRIOR TO YOUR PICKUP
                  TIME
                </span>
              </FakeMapOverlay>
            </FakeMapContainer>
          </ErrorContainer>
        )}

        <MapContainer
          style={{
            display: isLoading || error ? "none" : "block",
          }}
          ref={mapContainer}
        >
          {map && (
            <MovingMarker
              booking={booking as Booking}
              map={map as mapboxgl.Map}
            />
          )}
        </MapContainer>
      </>
    </Container>
  );
};

export default MapboxMap;
