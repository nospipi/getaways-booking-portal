"use client";

import { useQuery } from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import fake_map from "./fake_map.avif";
import Image from "next/image";
import { IGetBookingReturn } from "@/app/server/server_actions/getBookingById";
import MapboxMap from "./MapboxMap";

//---------------------------------------------------------

const BusTrackingClient = ({ booking }: { booking: string }) => {
  const parsedBooking: IGetBookingReturn = JSON.parse(booking);

  const {
    data = "{}",
    error,
    isError,
  } = useQuery({
    queryKey: ["TRACKING_DATA", parsedBooking._id],
    queryFn: () => getTrackingData(parsedBooking._id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  if (isError || !data) {
    return (
      <div
        style={{
          position: "relative",
        }}
      >
        <Image
          src={fake_map}
          style={{
            width: "100%",
            height: 250,
            borderRadius: "5px",
            objectFit: "cover",
            opacity: 0.5,
          }}
          width={0}
          height={0}
          sizes="(max-width: 800px) 100vw, 800px"
          alt="No image available"
          quality={20}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(2px)",
            color: "white",
            fontSize: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "3px",
          }}
        >
          <span
            style={{
              padding: "5px",
              textAlign: "center",
              width: "80%",
              background: "rgba(0, 0, 0, 0.4)",
              borderRadius: "3px",
            }}
          >
            {error?.message || "An error occured"}
          </span>
        </div>
      </div>
    );
  }

  return <MapboxMap booking={parsedBooking} />;
};

export default BusTrackingClient;
