"use client";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

//---------------------------------------------------------

const BackButton = () => {
  const searchParams = useSearchParams();
  const uniqueId = searchParams.get("uniqueId");

  return (
    <Link
      href={`/activity/?uniqueId=${uniqueId}`}
      style={{
        width: "100%",
      }}
    >
      <Button
        fullWidth
        variant="contained"
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <span>VIEW YOUR BOOKING DETAILS</span>
        <FaExternalLinkAlt size={11} />
      </Button>
    </Link>
  );
};

export default BackButton;
