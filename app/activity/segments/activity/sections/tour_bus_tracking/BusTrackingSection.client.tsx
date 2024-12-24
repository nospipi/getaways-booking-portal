"use client";

import { useState } from "react";
import { FaRoute } from "react-icons/fa";
import { PiClockCountdownFill } from "react-icons/pi";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import Countdown, { CountdownRenderProps } from "react-countdown";
import Button from "@mui/material/Button";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

//---------------------------------------------------------------------------------------------

const BusTrackingSection = ({ uniqueId }: { uniqueId: string }) => {
  const [isNavigatingToTracking, setIsNavigatingToTracking] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["TRACKING_DATA", uniqueId],
    queryFn: () => getTrackingData(uniqueId),
    //refetchInterval: 10000,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const isError = data?.status === "error";
  const errorText =
    isError && data?.message ? data.message.split("&")[0] : undefined;
  const targetDate = data?.message ? data.message.split("&")[1] : undefined;
  const shouldCountdown = isError && targetDate;
  const errorWithoutCountdown = isError && !targetDate;

  const errorRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    return (
      <section className="section-container">
        <header className="section-title-container">Tour Bus Tracking</header>
        <div className="section-content-container">
          <div className="section-content-item-container">
            <div className="section-content-icon-container">
              <FaRoute size={16} />
            </div>

            <div
              className="section-content-text-container"
              style={{
                color: "indianred",
                width: "100%",
              }}
            >
              {errorText}
            </div>
          </div>
          {!completed && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                backgroundColor: "whitesmoke",
                padding: "10px",
                gap: "10px",
                //border: "1px solid #ccc",
                borderRadius: "10px",
                //borderLeft: "3px solid dodgerblue",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Bus tracking will open in
              </span>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  gap: "6px",
                  fontSize: "13px",
                  borderRadius: "100px",
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
                />
                {days > 0 && <span>{days} days</span>}
                {hours > 0 && <span>{hours} hours</span>}
                {minutes > 0 && <span>{minutes} minutes</span>}
                {seconds > 0 && days === 0 && <span>{seconds} seconds</span>}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };

  if (shouldCountdown) {
    return (
      <Countdown
        date={targetDate}
        renderer={errorRenderer}
        onComplete={() => {
          //when countdown is completed, refetch the tracking data to return success status and render the button
          console.log("onComplete ran");
          refetch();
        }}
      />
    );
  }

  if (errorWithoutCountdown) {
    return (
      <section className="section-container">
        <header className="section-title-container">Tour Bus Tracking</header>
        <div className="section-content-container">
          <div className="section-content-item-container">
            <div className="section-content-icon-container">
              <FaRoute size={16} />
            </div>
            <div
              className="section-content-text-container"
              style={{
                color: "indianred",
                width: "100%",
              }}
            >
              {errorText}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-container">
      <header className="section-title-container">Tour Bus Tracking</header>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <FaRoute size={16} />
          </div>
          <div
            className="section-content-text-container"
            style={{
              color: "darkgreen",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span>Tracking is Open !</span>
              <div className="pulsing-dot" />
            </div>
          </div>
        </div>
        <Link href={`bus-tracking/?uniqueId=${uniqueId}`} prefetch={true}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={() => setIsNavigatingToTracking(true)}
            sx={{
              minHeight: "40px",
            }}
          >
            {isNavigatingToTracking ? (
              <RotatingLines width="15" strokeColor="white" />
            ) : (
              <span>VIEW BUS TRACKING</span>
            )}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BusTrackingSection;
