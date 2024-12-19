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
      variant="text"
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: "5px",
        fontSize: "11px",
        textTransform: "none",
        color: "black",
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
    </Button>
  );
};

export default EmailButton;
