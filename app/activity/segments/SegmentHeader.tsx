import Button from "@mui/material/Button";
import { ReactNode } from "react";

const SegmentHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 0 24px 0",
        borderBottom: "1px solid #252525",
        marginBottom: "8px",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#ffffff",
          letterSpacing: "-0.02em",
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  );
};

export default SegmentHeader;

// minHeight: "45px",
//     paddingTop: 0,
//     paddingBottom: 0,
//     paddingLeft: 0,
//     paddingRight: "10px",
//     width: "100%",
//     color: "black",
//     backgroundColor: "transparent",
//     borderRadius: "0px",
//     boxShadow: "none",
//     textTransform: "none",
//     fontFamily: "inherit",
