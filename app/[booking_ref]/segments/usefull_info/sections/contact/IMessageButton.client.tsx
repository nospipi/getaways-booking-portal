"use client";

import { FaApple } from "react-icons/fa";
import Button from "@mui/material/Button";
import getPhoneNumberOnDuty from "@/app/server/server_actions/getPhoneNumberOnDuty";
import toast from "react-hot-toast";

const IMessageButton = ({
  booking_ref,
  client_name,
}: {
  booking_ref: string | undefined;
  client_name: string | undefined;
}) => {
  const handleGetPhoneNumberOnDuty = async () => {
    try {
      const phone_number = await getPhoneNumberOnDuty();

      const encodedEmailText = `
            [${booking_ref}/${client_name}]
            --- YOUR MESSAGE BELOW ---
          `
        .split("\n")
        .map((line) => encodeURIComponent(line))
        .join("%0A");
      window.open(`sms:${phone_number}&body=${encodedEmailText}`, "_blank");
    } catch (err: unknown) {
      console.log(err);
      toast.error(err?.message || err.toString());
    }
  };

  return (
    <Button
      fullWidth
      variant="text"
      color="success"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        fontSize: "11px",
        textTransform: "none",
        color: "black",
      }}
      onClick={handleGetPhoneNumberOnDuty}
    >
      <FaApple size={15} color="rgb(87 rgb(59 59 59)" />
      <div className="platform-text-container ">iMessage</div>
    </Button>
  );
};

export default IMessageButton;
