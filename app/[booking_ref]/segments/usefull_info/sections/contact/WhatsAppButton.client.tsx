"use client";

import { IoLogoWhatsapp } from "react-icons/io";
import Button from "@mui/material/Button";
import getPhoneNumberOnDuty from "@/app/server/server_actions/getPhoneNumberOnDuty";
import toast from "react-hot-toast";

//---------------------------------------------------------

const WhatsAppButton = ({
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
      window.open(
        `whatsapp://send?&phone=${phone_number}&abid=${phone_number}&text=${encodedEmailText}`,
        "_blank"
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
        toast.error(err.message || err.toString());
      } else {
        console.log(err);
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <Button
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: "5px",
        fontSize: "11px",
        textTransform: "none",
        color: "black",
        backgroundColor: "rgb(245 245 245)",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        padding: "10px",
        position: "relative",
      }}
      onClick={handleGetPhoneNumberOnDuty}
    >
      <IoLogoWhatsapp size={19} color="#22994E" />
      <div>WhatsApp</div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "3px",
          backgroundColor: "dodgerblue",
        }}
      />
    </Button>
  );
};

export default WhatsAppButton;
