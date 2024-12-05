import { useState, useEffect } from "react";
import { VehicleMarker } from "./VehicleMarker";
import ReactDOMServer from "react-dom/server";
import mapboxgl, { LngLatLike, MercatorCoordinate } from "mapbox-gl";
// import getDistance from "geolib/es/getDistance";
// import { getPreciseDistance } from "geolib";
// import styled from "styled-components";
import { useGetTrackingData } from "../../reactQueryHooks";
import { Booking } from "../../screens/HomeScreen";
//import { MapInfoContext } from "./MapInfo";

//----------------------------------------------

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

// const Popup = ({ plate, eta }: { plate: string; eta: string | null }) => {
//   return (
//     <PopupContainer>
//       <span>Tour Bus : {plate}</span>
//       {eta && <span>ETA to you : {eta}</span>}
//     </PopupContainer>
//   );
// };

//----------------------------------------------

const MovingMarker = ({
  booking,
  map,
}: {
  booking: Booking;
  map: mapboxgl.Map;
}) => {
  const [marker, setMarker] = useState<mapboxgl.Marker>();
  const [lngLat, setLngLat] = useState<LngLatLike>([0, 0]);
  //const { setEtaTopickup } = useContext(MapInfoContext);

  const {
    data: trackingData,
    //isLoading,
    refetch,
  } = useGetTrackingData(booking?._id, booking?.task?._id, "MARKER");

  // const clientPosition = [
  //   booking?.pickup_location?.latitude,
  //   booking?.pickup_location?.longitude,
  // ];

  // const coordinates = booking?.task?.meetingPointCoordinates || [];

  // const meetingPoint = trackingData?.data.meeting_points.find(
  //   (point: { lat: number; lon: number }) =>
  //     point.lat === booking?.pickup_location?.latitude &&
  //     point.lon === booking?.pickup_location?.longitude
  // );
  // const eta: string | null = meetingPoint?.distance_to_vehicle?.duration?.text;
  // const plate: string = booking?.task?.vehicle.plate;
  const heading: number = trackingData?.data.vehicle_position?.heading || 0;

  useEffect(() => {
    let interval = setInterval(() => {
      refetch();
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (map) {
      const vehicleLon = trackingData?.data.vehicle_position?.lon || 0;
      const vehicleLat = trackingData?.data.vehicle_position?.lat || 0;
      const lngLat = [vehicleLon, vehicleLat] as LngLatLike;
      setLngLat(lngLat as LngLatLike);
      //map.setCenter(latLng as LngLatLike);
      //setEtaTopickup(eta);
    }
    // eslint-disable-next-line
  }, [trackingData]);

  useEffect(() => {
    if (map && lngLat) {
      // Add vehicle marker
      const customVehicleMarker = document.createElement("div");
      customVehicleMarker.innerHTML = ReactDOMServer.renderToString(
        <VehicleMarker heading={heading} />
      );

      // const popupToHTML = ReactDOMServer.renderToString(
      //   <Popup plate={plate} eta={eta} />
      // );

      // const markerLatLng = marker.getLngLat();
      // const withinRange = coordinates.some(
      //   (coord) =>
      //     geolib.getDistance(
      //       { latitude: coord.latitude, longitude: coord.longitude },
      //       { latitude: markerLatLng.lat, longitude: markerLatLng.lng }
      //     ) <= 50
      // );

      // // Open or close the popup based on whether marker is within range
      // if (withinRange) {
      //   marker.togglePopup();
      // } else {
      //   // Close the popup if marker is not within range
      //   marker.setPopup(null);
      // }

      if (marker) marker.remove();

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

      const newMarker = new mapboxgl.Marker({ element: customVehicleMarker })
        .setLngLat(lngLat)
        .addTo(map);

      //.setPopup(popup)
      //.togglePopup();
      // .setPopup(
      //   new mapboxgl.Popup({
      //     offset: 25,
      //     closeButton: false,
      //     className: "popup",
      //   }).setHTML(popupToHTML)
      // );

      // newMarker.getPopup().addTo(map); //adds it on load

      //newMarker.togglePopup();

      //map.setCenter(latLng as LngLatLike);
      //37.8145265888254, 23.830558263983175
      // const coord = MercatorCoordinate.fromLngLat(lngLat as LngLatLike);
      // const t = coord.toLngLat();

      // const distanceFromVehicleToClient = getPreciseDistance(
      //   [t.lat, t.lng] as LngLatLike,
      //   [clientPosition[0], clientPosition[1]] as LngLatLike
      // );

      // const withinRangeOfOtherPickup = coordinates.some(
      //   (coord) =>
      //     getPreciseDistance([coord.latitude, coord.longitude], [
      //       t.lat,
      //       t.lng,
      //     ] as LngLatLike) <= 100
      // );

      // const arrivingInOwnPickup =
      //   distanceFromVehicleToClient <= 200 && distanceFromVehicleToClient > 80;

      // const arrivedAtOwnPickup = distanceFromVehicleToClient <= 80;

      // console.log("distanceFromVehicleToClient", distanceFromVehicleToClient);
      // console.log("withinRangeOfOtherPickup", withinRangeOfOtherPickup);
      // console.log("arrivingInOwnPickup", arrivingInOwnPickup);
      // console.log("arrivedAtOwnPickup", arrivedAtOwnPickup);

      const shouldHidePopup =
        !trackingData?.data?.arrivedAtOwnPickup &&
        !trackingData?.data?.arrivingInOwnPickup &&
        !trackingData?.data?.withinRangeOfOtherPickup;

      if (shouldHidePopup) {
        newMarker.setPopup(undefined);
      }

      if (trackingData?.data?.arrivedAtOwnPickup) {
        newMarker.setPopup(arrivedPopup).togglePopup();
      }

      if (trackingData?.data?.arrivingInOwnPickup) {
        newMarker.setPopup(ownPickupPopup).togglePopup();
      }

      if (trackingData?.data?.withinRangeOfOtherPickup) {
        newMarker.setPopup(otherPickupPopup).togglePopup();
      }

      setMarker(newMarker);
    }
    // eslint-disable-next-line
  }, [lngLat]);

  return null;
};

export default MovingMarker;
