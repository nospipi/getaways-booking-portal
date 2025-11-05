"use client";

import { FaViber } from "react-icons/fa6";
import getPhoneNumberOnDuty from "@/app/server/server_actions/getPhoneNumberOnDuty";
import toast from "react-hot-toast";
import useAddUserAction from "@/app/useAddUserAction";

//---------------------------------------------------------

const ViberButton = ({
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
    <button
      onClick={handleGetPhoneNumberOnDuty}
      className="contact-button"
      style={{
        background: "linear-gradient(135deg, #7360f2 0%, #5a4ccf 100%)",
      }}
    >
      <div className="contact-button-icon">
        <FaViber size={18} color="#ffffff" />
      </div>
      <span className="contact-button-text">Viber</span>
    </button>
  );
};

export default ViberButton;
