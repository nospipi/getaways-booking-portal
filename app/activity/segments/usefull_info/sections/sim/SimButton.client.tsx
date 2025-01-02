"use client";

import { useMemo } from "react";
import { TfiArrowCircleRight } from "react-icons/tfi";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";

//---------------------------------------------------------

const SimButton = () => {
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
      fullWidth
      variant="outlined"
      color="success"
      endIcon={<TfiArrowCircleRight size={15} />}
      onClick={() => {
        navigator.sendBeacon(`/server/api/add_sim_link_action`, formData);
      }}
    >
      GET YOUR eSIM NOW
    </Button>
  );
};

export default SimButton;
