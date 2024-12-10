"use client";
//import placeholder from "@/public/elementor-placeholder-image.webp";
import placeholder from "@/public/test_image.avif";
import Button from "@mui/material/Button";
import { FaCheckCircle } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import Chip from "@mui/material/Chip";
import Image from "next/image";

//---------------------------------------------------------

export default () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "13px",
        borderRadius: "10px",
        backgroundColor: "rgb(251 251 251)",
        borderTop: "4px solid rgb(158 193 229)",
        boxShadow: "0 4px 5px -5px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div>Athens Private City Tour (Skip the Line in Acropolis)</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
        }}
      >
        <Image
          src={placeholder}
          style={{
            width: "40%",
            minHeight: "150px",
            height: "100%",
            borderRadius: "10px",
            objectFit: "cover",
          }}
          width={0}
          height={0}
          sizes="(max-width: 800px) 100vw, 800px"
          alt="No image available"
          quality={20}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              display: "flex",
            }}
          >
            Discover Athens your way with a 4-hour private tour, featuring
            tailored itineraries, expert guidance, and skip-the-line access to
            the Acropolis for a stress-free, enjoyable exploration of the city's
            top highlights
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Chip
          icon={<FaCheckCircle size={15} color="darkgreen" />}
          label="Free cancellation"
        />
        <Chip icon={<IoTime size={15} color="darkgreen" />} label="4 hours" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "5px",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <span>From</span>
            <span
              style={{
                textDecoration: "line-through",
                color: "indianred",
                fontWeight: "bold",
              }}
            >
              €400
            </span>
          </div>

          <span
            style={{
              fontWeight: "bold",
              color: "darkgreen",
            }}
          >
            €320
          </span>
        </div>
        <Button
          variant="contained"
          size="small"
          className="bokunButton"
          //data-src={`https://widgets.bokun.io/online-sales/db6fd107-983c-4e5e-8d51-b37b123ddd0d/experience-calendar/${774339}?partialView=1`}
          data-src={`data-src="https://widgets.bokun.io/online-sales/db6fd107-983c-4e5e-8d51-b37b123ddd0d/experience/${774339}?partialView=1"`}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};
