"use client";
import Button from "@mui/material/Button";
import { useFormStatus } from "react-dom";
import { RotatingLines } from "react-loader-spinner";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className="traveler-submit-button"
      disabled={pending}
      sx={{
        backgroundColor: pending ? "#a0a0a0" : "#627a96",
        minHeight: "50px",
        marginTop: "20px",
        cursor: pending ? "not-allowed" : "pointer",
      }}
    >
      {pending ? (
        <RotatingLines width="15" strokeColor="white" />
      ) : (
        <span>SUBMIT TRAVELER DETAILS</span>
      )}
    </Button>
  );
};

export default SubmitButton;
