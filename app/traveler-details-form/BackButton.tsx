"use client";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      style={{
        backgroundColor: "#f0f0f0",
        borderRadius: "5px",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-start",

        gap: "5px",
      }}
    >
      <IoMdArrowRoundBack />
    </button>
  );
};

export default BackButton;
