"use client";

import { PiCaretLeftBold } from "react-icons/pi";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

//---------------------------------------------------------

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "5px",
        padding: "5px 5px 5px 0",
      }}
      onClick={() => router.back()}
    >
      <PiCaretLeftBold size={16} />
      <span>Back to portal</span>
    </Button>
  );
};

export default BackButton;

//---------------------------------------------------------
