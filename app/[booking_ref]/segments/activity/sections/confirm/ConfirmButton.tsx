"use client";
import Button from "@mui/material/Button";
import confirmBookingByUniqueId from "@/app/server/server_actions/confirmBookingByUniqueId";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

//---------------------------------------------------------

const ConfirmButton = ({
  unique_booking_id,
}: {
  unique_booking_id: string;
}) => {
  const router = useRouter();
  const handleConfirm = async () => {
    const toastId = "manual-confirm";
    try {
      toast.loading("Confirming booking...", { id: toastId });
      await confirmBookingByUniqueId(unique_booking_id);
      router.refresh(); // rehydrate
      toast.dismiss(toastId);
    } catch (e) {
      console.log(e?.toString());
      toast.error(e?.toString() || "An error occurred", { id: toastId });
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      color="success"
      onClick={() => {
        if (
          window.confirm(`Are you sure you want to confirm?

Scroll down and review the details of your booking, such as the meeting point and time carefully before confirming`)
        ) {
          handleConfirm();
        }
      }}
    >
      CONFIRM
    </Button>
  );
};

export default ConfirmButton;
