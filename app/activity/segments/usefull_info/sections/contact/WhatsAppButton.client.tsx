"use client";

import { IoLogoWhatsapp } from "react-icons/io";
import getPhoneNumberOnDuty from "@/app/server/server_actions/getPhoneNumberOnDuty";
import toast from "react-hot-toast";
import { FiExternalLink } from "react-icons/fi";
import useAddUserAction from "@/app/useAddUserAction";

//---------------------------------------------------------

const WhatsAppButton = ({
  booking_ref,
  client_name,
}: {
  booking_ref: string | undefined;
  client_name: string | undefined;
}) => {
  const { triggerUserAction } = useAddUserAction();
  const handleGetPhoneNumberOnDuty = async () => {
    const toastId = "messages-toast";

    toast.loading("Getting agents on duty ...", { id: toastId });
    const { status, message, data } = await getPhoneNumberOnDuty();
    await triggerUserAction("CONTACT_BUTTON_CLICK");

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
    <button
      onClick={handleGetPhoneNumberOnDuty}
      className="contact-button"
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
      }}
    >
      <div className="contact-button-icon">
        <IoLogoWhatsapp size={18} color="#ffffff" />
      </div>
      <span className="contact-button-text">WhatsApp</span>
      <FiExternalLink size={14} color="#ffffff" style={{ opacity: 0.8 }} />
    </button>
  );
};

export default WhatsAppButton;
