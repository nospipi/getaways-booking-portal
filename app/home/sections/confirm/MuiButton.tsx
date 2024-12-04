"use client";
import "@/app/globals.css";
import Button from "@mui/material/Button";
import { getBooking } from "@/app/api/server_actions";

//---------------------------------------------------------

const MuiButton = ({ text }: { text: string }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="success"
      onClick={async () => {
        try {
          const booking = await getBooking("1204566491");
          const bookingObj = JSON.parse(booking as string);
          console.log("MuiButton booking", bookingObj);
        } catch (error: unknown) {
          console.log("MuiButton error", error);
        }
      }}
    >
      {text}
    </Button>
  );
};

export default MuiButton;
