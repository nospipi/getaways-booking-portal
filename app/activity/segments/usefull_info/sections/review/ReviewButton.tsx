"use client";

import { TfiArrowCircleRight } from "react-icons/tfi";
import Button from "@mui/material/Button";
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
    <Button
      fullWidth
      variant="outlined"
      color="success"
      endIcon={<TfiArrowCircleRight size={15} />}
      onClick={() => {
        //we dont use the useAddUserAction here because we are leaving the page
        //so we sent a beacon and the it will be handled by the server even after we navigated away

        if (cookieYesConsent?.categories?.analytics) {
          navigator.sendBeacon(`/server/api/add_review_link_action`, formData);
        }
      }}
    >
      REVIEW US ON TRIPADVISOR
    </Button>
  );
};

export default ReviewButton;
