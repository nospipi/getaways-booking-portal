"use client";
import { useFormStatus } from "react-dom";
import { RotatingLines } from "react-loader-spinner";
import { FaCheck } from "react-icons/fa";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="confirm-button"
      style={{
        width: "100%",
        minHeight: "clamp(52px, 8vw, 56px)",
        fontSize: "clamp(14px, 3.5vw, 15px)",
        fontWeight: 600,
        letterSpacing: "0.02em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        cursor: pending ? "wait" : "pointer",
        transition: "transform 0.1s ease, opacity 0.1s ease",
        marginTop: "24px",
        opacity: pending ? 0.7 : 1,
        boxShadow: "none",
      }}
      onMouseDown={(e) => {
        if (!pending) {
          e.currentTarget.style.transform = "scale(0.98)";
          e.currentTarget.style.opacity = "0.9";
        }
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.opacity = pending ? "0.7" : "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.opacity = pending ? "0.7" : "1";
      }}
    >
      {pending ? (
        <>
          <RotatingLines width="18" strokeColor="white" strokeWidth="3" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          <span>Submit Traveller Details</span>
          <FaCheck size={16} />
        </>
      )}
    </button>
  );
};

export default SubmitButton;
