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
    const toastId = "messages-toast";

    toast.loading("Getting agents on duty ...", { id: toastId });
    const { status, message, data } = await getPhoneNumberOnDuty();

    if (status === "error") {
      toast.error(message, { id: toastId });
      return;
    } else {
      toast.loading(
        `You are talking with ${data?.agent_name}, opening WhatsApp ...`,
        { id: toastId }
      );
    }

    const encodedEmailText = `
                [${booking_ref}/${client_name}]
                --- YOUR MESSAGE BELOW ---
              `
      .split("\n")
      .map((line) => encodeURIComponent(line))
      .join("%0A");

    setTimeout(() => {
      toast.dismiss(toastId);
      window.open(
        `whatsapp://send?&phone=${data?.phone_number}&abid=${data?.phone_number}&text=${encodedEmailText}`,
        "_blank"
      );
    }, 3000);
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
