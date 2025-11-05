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
    <button
      className="confirm-button"
      onClick={() => {
        if (cookieYesConsent?.categories?.analytics) {
          navigator.sendBeacon(
            `/server/api/add_navigation_link_action`,
            formData
          );
        }
        window.open(url, "_blank");
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <FaMapMarked size={16} />
      <span>Navigate to Pickup</span>
      <FaExternalLinkAlt size={14} />
    </button>
  );
};

export default NavigateButton;
