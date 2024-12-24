"use client";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";
// import { FaExternalLinkAlt } from "react-icons/fa";
// import { TbChevronLeftPipe } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
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
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          position: "relative",
        }}
      >
        <FaArrowLeft
          size={16}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <span>VIEW YOUR BOOKING DETAILS</span>
      </Button>
    </Link>
  );
};

export default BackButton;
