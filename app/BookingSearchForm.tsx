"use client";

import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const BookingSearchForm = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const bookingRef = formData.get("booking_ref") as string;

    if (bookingRef) {
      router.push(`/${bookingRef}`);
    }
  };

  return (
    <search>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <TextField
          name="booking_ref"
          required
          variant="filled"
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === " ") {
              e.preventDefault(); // Prevent space from being entered
            }
          }}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          label="Booking Ref#"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#627a96",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
        >
          SEARCH BOOKING
        </Button>
      </form>
    </search>
  );
};

export default BookingSearchForm;