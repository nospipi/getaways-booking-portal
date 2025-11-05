"use client";

import { TfiArrowCircleRight } from "react-icons/tfi";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useCookieYesConsent from "@/utils/UseCookieYesConsent";

//---------------------------------------------------------

const ReviewButton = () => {
  const searchParams = useSearchParams();
  const cookieYesConsent = useCookieYesConsent();

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
          navigator.sendBeacon(`/server/api/add_review_link_action`, formData);
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <span>Review Us on TripAdvisor</span>
      <TfiArrowCircleRight size={15} />
    </button>
  );
};

export default ReviewButton;
