import Button from "@mui/material/Button";

const SegmentHeader = () => {
  return (
    <Button
      sx={{
        fontSize: "12px",
        color: "black",
        fontWeight: "bold",
        padding: "10px 8px 8px 8px",
        backgroundColor: "#fbe0ff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
    >
      <div className="activity-header__title">Activity</div>
      <div className="activity-header__subtitle">
        View and manage your activity
      </div>
    </Button>
  );
};

export default SegmentHeader;
