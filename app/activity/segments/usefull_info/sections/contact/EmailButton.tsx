"use client";

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
    <button
      className="contact-button"
      style={{
        background: "linear-gradient(135deg, #4285f4 0%, #1a73e8 100%)",
      }}
      onClick={async () => {
        await triggerUserAction("CONTACT_BUTTON_CLICK");
        window.open(
          `mailto:${BUSINESS_MAIN_EMAIL}?subject=${`[${booking_ref}/${client_name}]`}`,
          "_blank"
        );
      }}
    >
      <div className="contact-button-icon">
        <MdEmail size={18} color="#ffffff" />
      </div>
      <span className="contact-button-text">Email</span>
      <FiExternalLink size={14} color="#ffffff" style={{ opacity: 0.8 }} />
    </button>
  );
};

export default EmailButton;
