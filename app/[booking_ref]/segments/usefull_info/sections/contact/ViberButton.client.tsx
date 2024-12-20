"use client";

import { FaViber } from "react-icons/fa6";
import Button from "@mui/material/Button";
import getPhoneNumberOnDuty from "@/app/server/server_actions/getPhoneNumberOnDuty";
import toast from "react-hot-toast";

//---------------------------------------------------------

const ViberButton = ({
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
        `You are talking with ${data?.agent_name}, opening Viber ...`,
        { id: toastId }
      );
    }

    const formattedPhoneNumber = (data?.phone_number as string).replace(
      "+",
      ""
    );

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
        `viber://chat?number=%2B${formattedPhoneNumber}&draft=${encodedEmailText}`,
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
        <FaViber
          size={14}
          color="#7360f2"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <span>Viber</span>
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

export default ViberButton;
