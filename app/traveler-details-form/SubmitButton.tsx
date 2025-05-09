"use client";
import Button from "@mui/material/Button";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className="traveler-submit-button"
      onClick={() => {
        setIsLoading(true);
      }}
      sx={{
        backgroundColor: "#627a96",
        minHeight: "50px",
        marginTop: "20px",
      }}
    >
      {isLoading ? (
        <RotatingLines width="15" strokeColor="white" />
      ) : (
        <span>SUBMIT TRAVELER DETAILS</span>
      )}
    </Button>
  );
};

export default SubmitButton;
