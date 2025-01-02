"use client";

import Button from "@mui/material/Button";
import { MdEmail } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import useAddUserAction from "@/app/useAddUserAction";
const BUSINESS_MAIN_EMAIL = process.env
  .NEXT_PUBLIC_BUSINESS_MAIN_EMAIL as string;

//---------------------------------------------------------

const EmailButton = ({
  booking_ref,
  client_name,
}: {
  booking_ref: string | undefined;
  client_name: string | undefined;
}) => {
  const { triggerUserAction } = useAddUserAction();
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
      onClick={async () => {
        await triggerUserAction("CONTACT_BUTTON_CLICK");
        window.open(
          `mailto:${BUSINESS_MAIN_EMAIL}?subject=${`[${booking_ref}/${client_name}]`}`,
          "_blank"
        );
      }}
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
        <MdEmail
          size={15}
          color="dodgerblue"
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
        <span>Email</span>
        <FiExternalLink size={10} />
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

export default EmailButton;
