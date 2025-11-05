import React from "react";
import { FaEdit } from "react-icons/fa";

interface TravellerDetailsProps {
  index: number;
  ticketType: string;
  age: number;
  nationality: string;
}

const TravellerDetailItem: React.FC<TravellerDetailsProps> = ({
  index,
  ticketType,
  age,
  nationality,
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#f8f9fa",
        padding: "16px",
        border: "1px solid #e0e0e0",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "4px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid #e0e0e0",
            padding: "6px 12px",
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Ticket #{index + 1}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="modern-info-label">Type</div>
          <div className="modern-info-value" style={{ fontSize: "14px" }}>
            {ticketType}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="modern-info-label">Age</div>
          <div className="modern-info-value" style={{ fontSize: "14px" }}>{age}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="modern-info-label">Nationality</div>
          <div className="modern-info-value" style={{ fontSize: "14px" }}>
            {nationality}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravellerDetailItem;
