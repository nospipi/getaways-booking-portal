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
        borderBottom: "3px solid #93baf5",
        borderRadius: "0px",
        zIndex: 600,
        gap: "10px",
        textTransform: "none",
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
