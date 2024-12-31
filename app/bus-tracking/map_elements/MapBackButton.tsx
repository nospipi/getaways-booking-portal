"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import Link from "next/link";

//---------------------------------------------------------

//wrapped in Suspense because it accesses useSearchParams hook
//https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
const MapBackButton = ({
  shouldShowDisclaimer,
}: {
  shouldShowDisclaimer: boolean;
}) => {
  const searchParams = useSearchParams();
  const uniqueId = searchParams.get("uniqueId");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        padding: "10px",
        gap: "5px",
      }}
    >
      {shouldShowDisclaimer && (
        <span
          style={{
            fontSize: "9px",
            textAlign: "right",
            color: "gray",
          }}
        >
          * The blue line does not represent the actual route of the vehicle.
        </span>
      )}
      <Link href={`/activity/?uniqueId=${uniqueId}`}>
        <Button
          onClick={() => setIsLoading(true)}
          variant="contained"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            position: "relative",
            background: "rgba(0, 0, 0, 0.5)",
            boxShadow: "0 0 5px rgba(255, 255, 255, 0.1)",
            borderRadius: "100px",
            padding: "10px",
            width: "100%",
            minHeight: "45px",
            minWidth: "300px",
            maxWidth: "400px",
            fontSize: "12px",
          }}
        >
          <FaArrowAltCircleLeft
            size={23}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          {isLoading ? (
            <RotatingLines width="15" strokeColor="white" />
          ) : (
            <span>VIEW YOUR BOOKING DETAILS</span>
          )}
        </Button>
      </Link>
    </div>
  );
};

export default MapBackButton;
