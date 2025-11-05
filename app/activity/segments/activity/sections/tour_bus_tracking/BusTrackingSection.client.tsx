"use client";

import { useState } from "react";
import { FaRoute, FaArrowRight } from "react-icons/fa";
import { PiClockCountdownFill } from "react-icons/pi";
import getTrackingData from "@/app/server/server_actions/getTrackingData";
import Countdown, { CountdownRenderProps } from "react-countdown";
import Button from "@mui/material/Button";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import useAddUserAction from "@/app/useAddUserAction";

//---------------------------------------------------------------------------------------------

const BusTrackingSection = ({ uniqueId }: { uniqueId: string }) => {
  const [isNavigatingToTracking, setIsNavigatingToTracking] = useState(false);
  const { triggerUserAction } = useAddUserAction();
  const { data, refetch } = useQuery({
    queryKey: ["TRACKING_DATA", uniqueId],
    queryFn: () => getTrackingData(uniqueId),
    refetchInterval: 10000,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const isError = data?.status === "error";
  const errorText = isError && data?.message;
  const targetDate = data?.data?.targetDate;
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
      <div className="modern-card">
        <div className="modern-card-header">
          <div className="modern-card-title">Bus Tracking</div>
        </div>
        <div className="modern-card-content">
          <div className="modern-info-row">
            <div className="modern-info-icon">
              <FaRoute size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="modern-info-label">Status</div>
              <div className="modern-info-value" style={{ color: "#ff6b6b", fontSize: "14px" }}>
                {errorText}
              </div>
            </div>
          </div>
          {!completed && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "16px",
                background: "#f8f9fa",
                border: "1px solid #e0e0e0",
              }}
            >
              <div className="modern-info-label" style={{ marginBottom: "4px" }}>
                Tracking opens in
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  background: "#ffffff",
                  border: "1px solid #e0e0e0",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#1a1a1a",
                }}
              >
                <PiClockCountdownFill size={18} />
                {days > 0 && <span>{days}d</span>}
                {hours > 0 && <span>{hours}h</span>}
                {minutes > 0 && <span>{minutes}m</span>}
                {seconds > 0 && days === 0 && <span>{seconds}s</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (shouldCountdown) {
    return (
      <Countdown
        date={targetDate}
        renderer={errorRenderer}
        onComplete={() => {
          //when countdown is completed, refetch the tracking data to return success status and render the button
          refetch();
        }}
      />
    );
  }

  if (errorWithoutCountdown) {
    return (
      <div className="modern-card">
        <div className="modern-card-header">
          <div className="modern-card-title">Bus Tracking</div>
        </div>
        <div className="modern-card-content">
          <div className="modern-info-row">
            <div className="modern-info-icon">
              <FaRoute size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="modern-info-label">Status</div>
              <div className="modern-info-value" style={{ color: "#ff6b6b", fontSize: "14px" }}>
                {errorText}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-card">
      <div className="modern-card-header">
        <div className="modern-card-title">Bus Tracking</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">
            <FaRoute size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Status</div>
            <div
              className="modern-info-value"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#1a1a1a",
              }}
            >
              <span>Tracking active</span>
              <div className="pulsing-dot" />
            </div>
          </div>
        </div>
        <Link href={`bus-tracking/?uniqueId=${uniqueId}`} prefetch={true}>
          <button
            className="confirm-button"
            onClick={async () => {
              setIsNavigatingToTracking(true);
              await triggerUserAction("BUS_TRACKING_MAP_CLICK");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {isNavigatingToTracking ? (
              <RotatingLines width="15" strokeColor="#0a0a0a" />
            ) : (
              <>
                <FaRoute size={16} />
                <span>View Bus Tracking</span>
                <FaArrowRight size={14} />
              </>
            )}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BusTrackingSection;
