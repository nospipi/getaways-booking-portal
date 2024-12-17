"use client";

import { FaLocationDot } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaMapMarked } from "react-icons/fa";

//---------------------------------------------------------

const NavigateButton = ({ url }: { url: string }) => {
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
