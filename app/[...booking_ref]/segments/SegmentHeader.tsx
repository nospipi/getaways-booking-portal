import Button from "@mui/material/Button";
import { ReactNode } from "react";

const SegmentHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Button
      sx={{
        fontSize: "12px",
        color: "black",
        fontWeight: "bold",
        padding: "10px 8px 8px 8px",
        backgroundColor: "#fbe0ff",
        display: "flex",
        position: "sticky",
        top: "0px",
        borderTop: "5px solid white",
        borderBottom: "3px solid rgb(84, 116, 155)",
        borderRadius: "0px",
        zIndex: 2,
        gap: "10px",
        textTransform: "none",
        fontFamily: "inherit",
        span: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }}
      disableElevation
      disableRipple
    >
      {children}
    </Button>
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
