"use client";

import { useMemo } from "react";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { useSearchParams } from "next/navigation";
import useCookieYesConsent from "@/utils/UseCookieYesConsent";

//---------------------------------------------------------

const SimButton = () => {
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
          navigator.sendBeacon(`/server/api/add_sim_link_action`, formData);
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <span>Get Your eSIM Now</span>
      <TfiArrowCircleRight size={15} />
    </button>
  );
};

export default SimButton;
