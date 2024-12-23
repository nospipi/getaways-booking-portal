"use client";

import { Button } from "@mui/material";
import { ReactNode } from "react";

interface ContactButtonProps {
  icon: ReactNode;
  buttonText: string;
  handler: () => Promise<void>;
}

const ContactButton = ({ icon, buttonText, handler }: ContactButtonProps) => {
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
      onClick={() => handler()}
    >
      {icon}
      <span>{buttonText}</span>
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

export default ContactButton;
