"use client";

import { IoLogoWhatsapp } from "react-icons/io";
import Button from "@mui/material/Button";
import getPhoneNumberOnDuty from "@/app/server/server_actions/getPhoneNumberOnDuty";
import toast from "react-hot-toast";
import { FiExternalLink } from "react-icons/fi";

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
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "5px",
        fontSize: "11px",
        textTransform: "none",
        color: "black",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "10px",
        position: "relative",
        boxShadow: "1px 1px 2px 0px rgba(0,0,0,0.25)",
      }}
      onClick={handleGetPhoneNumberOnDuty}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "white",
          boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.25)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          position: "relative",
        }}
      >
        <IoLogoWhatsapp
          size={16}
          color="#22994E"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>WhatsApp</span>
        <FiExternalLink size={10} color="black" />
      </div>

      <span
        style={{
          opacity: 0,
        }}
      >
        FFF
      </span>
    </Button>
  );
};

export default WhatsAppButton;
