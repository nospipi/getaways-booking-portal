"use client";

import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

const BackButton = ({ uniqueId }: { uniqueId: string | undefined }) => {
  return (
    <Link 
      href={`/activity?uniqueId=${uniqueId}`} 
      prefetch={true}
      style={{
        alignSelf: "flex-start",
        marginBottom: "16px",
      }}
    >
      <button
        style={{
          backgroundColor: "transparent",
          padding: "10px 16px",
          border: "1px solid #e0e0e0",
          cursor: "pointer",
          fontSize: "clamp(13px, 3.5vw, 14px)",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#1a1a1a",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#1E90FF";
          e.currentTarget.style.color = "#1E90FF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#e0e0e0";
          e.currentTarget.style.color = "#1a1a1a";
        }}
      >
        <IoMdArrowRoundBack size={18} />
        <span>Back to Booking</span>
      </button>
    </Link>
  );
};

export default BackButton;
