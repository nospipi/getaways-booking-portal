import { ReactNode } from "react";

const SegmentHeader = ({ 
  children, 
  actionButton 
}: { 
  children: ReactNode;
  actionButton?: ReactNode;
}) => {
  return (
    <div
      className="segment-header-sticky"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0 24px 0",
        borderBottom: "1px solid #e0e0e0",
        marginBottom: "0",
        gap: "16px",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#1a1a1a",
          letterSpacing: "-0.02em",
          margin: 0,
          flex: 1,
        }}
      >
        {children}
      </h2>
      {actionButton && (
        <div 
          className="segment-header-action-button-wrapper"
        >
          {actionButton}
        </div>
      )}
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
