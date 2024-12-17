"use client";
import Button from "@mui/material/Button";
import confirmBooking from "@/app/server/server_actions/confirmBooking";
import { toast } from "react-hot-toast";
//import { useSearchParams } from "next/navigation";

//---------------------------------------------------------

const ConfirmButton = ({ id }: { id: string }) => {
  //const searchParams = useSearchParams();

  const handleConfirm = async () => {
    try {
      // const params = new URLSearchParams(searchParams.toString());
      // params.set("confirmed", "false");
      // window.history.pushState(null, "", `?${params.toString()}`);
      // togglePickupInputShown();
      toast.loading("Confirming booking...");
      await confirmBooking(id);
      toast.dismiss();
      //toast.success("Your booking details are confirmed, thank you!");
    } catch (e) {
      // togglePickupInputShown();
      // const params = new URLSearchParams(searchParams.toString());
      // params.delete("confirmed");
      // window.history.pushState(null, "", `?${params.toString()}`);
      console.log(e?.toString());
      toast.error(e?.toString() || "An error occurred");
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
