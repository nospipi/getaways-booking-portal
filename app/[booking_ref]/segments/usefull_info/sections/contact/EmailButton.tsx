"use client";

import Button from "@mui/material/Button";
import { MdEmail } from "react-icons/md";

//---------------------------------------------------------

const EmailButton = ({
  booking_ref,
  client_name,
}: {
  booking_ref: string | undefined;
  client_name: string | undefined;
}) => {
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
      onClick={() => {
        window.open(
          `mailto:operations@getawaysgreece.com?subject=${`[${booking_ref}/${client_name}]`}`,
          "_blank"
        );
      }}
    >
      <MdEmail size={20} color="dodgerblue" />
      <div className="platform-text-container ">Email</div>
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

export default EmailButton;
