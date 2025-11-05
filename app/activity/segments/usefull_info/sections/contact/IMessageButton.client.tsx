"use client";

import { FaApple } from "react-icons/fa";
import getPhoneNumberOnDuty from "@/app/server/server_actions/getPhoneNumberOnDuty";
import toast from "react-hot-toast";
import useAddUserAction from "@/app/useAddUserAction";

//---------------------------------------------------------

const IMessageButton = ({
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
        `You are talking with ${data?.agent_name}, opening Messages ...`,
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
        `sms:${data?.phone_number}&body=${encodedEmailText}`,
        "_blank"
      );
    }, 3000);
  };

  return (
    <button
      onClick={handleGetPhoneNumberOnDuty}
      className="contact-button"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="contact-button-icon">
        <FaApple size={18} color="#ffffff" />
      </div>
      <span className="contact-button-text">iMessage</span>
    </button>
  );
};

export default IMessageButton;
