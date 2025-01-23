"use client";

import Button from "@mui/material/Button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaMapMarked } from "react-icons/fa";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useCookieYesConsent from "@/utils/UseCookieYesConsent";

//---------------------------------------------------------

const NavigateButton = ({ url }: { url: string }) => {
  const cookieYesConsent = useCookieYesConsent();
  const searchParams = useSearchParams();

  const ref = searchParams.get("ref") ?? "";
  const uniqueId = searchParams.get("uniqueId") ?? "";

  const formData = useMemo(() => {
    const data = new FormData();
    data.append("ref", ref);
    data.append("uniqueId", uniqueId);
    return data;
  }, [ref, uniqueId]);

  return (
    <Button
      variant="contained"
      sx={{
        minHeight: "45px",
        maxHeight: "45px",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: "10px",
        width: "100%",
        color: "black",
        backgroundColor: "transparent",
        borderRadius: "0px",
        boxShadow: "none",
        textTransform: "none",
        display: "flex",
        justifyContent: "space-between",
      }}
      disableElevation
      onClick={() => {
        //we dont use the useAddUserAction here because we are leaving the page
        //so we sent a beacon and the it will be handled by the server even after we navigated away

        if (cookieYesConsent?.categories?.analytics) {
          navigator.sendBeacon(
            `/server/api/add_navigation_link_action`,
            formData
          );
        } else {
          console.log("No consent for analytics");
        }

        window.open(url, "_blank");
      }}
    >
      <div className="section-content-item-container">
        <div className="section-content-icon-container">
          <FaMapMarked size={15} />
        </div>
        <div
          className="section-content-text-container"
          style={{
            color: "darkgreen",
          }}
        >
          Click to navigate to your pickup
        </div>
      </div>
      <FaExternalLinkAlt size={15} />
    </Button>
  );
};

export default NavigateButton;
