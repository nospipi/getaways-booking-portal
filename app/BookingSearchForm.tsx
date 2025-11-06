"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { RotatingLines } from "react-loader-spinner";
import { FaArrowRight } from "react-icons/fa";

//---------------------------------------------------------

const BookingSearchForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const bookingRef = formData.get("booking_ref") as string;

    if (bookingRef) {
      setIsLoading(true);
      router.push(`/activity/?ref=${bookingRef}`);
    }
  };

  return (
    <search>
      <form
        aria-label="Booking Search Form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        <TextField
          name="booking_ref"
          required
          variant="outlined"
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === " ") {
              e.preventDefault(); // Prevent space from being entered
            }
          }}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          label="Booking Number"
          placeholder="Enter your booking reference"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              fontSize: "clamp(14px, 3.5vw, 15px)",
              "& fieldset": {
                borderColor: "#e0e0e0",
                borderWidth: "1.5px",
              },
              "&:hover fieldset": {
                borderColor: "#1E90FF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1E90FF",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: "clamp(13px, 3.5vw, 14px)",
              color: "#666666",
              "&.Mui-focused": {
                color: "#1E90FF",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "clamp(14px, 4vw, 16px) clamp(12px, 3.5vw, 14px)",
              color: "#1a1a1a",
            },
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="confirm-button"
          style={{
            minHeight: "clamp(52px, 8vw, 56px)",
            borderRadius: "12px",
            fontSize: "clamp(14px, 3.5vw, 15px)",
            fontWeight: 600,
            letterSpacing: "0.02em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: isLoading ? "wait" : "pointer",
            transition: "transform 0.1s ease, opacity 0.1s ease, box-shadow 0.2s ease",
            marginTop: "4px",
          }}
          onMouseDown={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = "scale(0.98)";
              e.currentTarget.style.opacity = "0.9";
            }
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.opacity = "1";
          }}
        >
          {isLoading ? (
            <>
              <RotatingLines width="18" strokeColor="white" strokeWidth="3" />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <span>Search Booking</span>
              <FaArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </search>
  );
};

export default BookingSearchForm;
