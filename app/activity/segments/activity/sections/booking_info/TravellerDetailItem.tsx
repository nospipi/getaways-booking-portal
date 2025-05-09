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
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "12px",
        //marginBottom: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid #eaeaea",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(50, 75, 104)",
            color: "white",
            borderRadius: "4px",
            padding: "4px 8px",
            fontSize: "11px",
            fontWeight: "bold",
          }}
        >
          Ticket #{index + 1}
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            minWidth: "120px",
          }}
        >
          <div style={{ fontSize: "11px", color: "rgb(84, 116, 155)" }}>
            Type
          </div>
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
            {ticketType}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            minWidth: "80px",
          }}
        >
          <div style={{ fontSize: "11px", color: "rgb(84, 116, 155)" }}>
            Age
          </div>
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>{age}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            minWidth: "120px",
          }}
        >
          <div style={{ fontSize: "11px", color: "rgb(84, 116, 155)" }}>
            Nationality
          </div>
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
            {nationality}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravellerDetailItem;
