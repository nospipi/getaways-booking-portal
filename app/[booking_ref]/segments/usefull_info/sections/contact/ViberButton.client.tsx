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
      <FaViber size={18} color="#7360f2" />
      <span>Viber</span>
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

export default ViberButton;
