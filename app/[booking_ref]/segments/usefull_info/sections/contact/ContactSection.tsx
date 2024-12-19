import { BsChatFill } from "react-icons/bs";
import getBookingById from "@/app/server/server_actions/getBookingById";
import IMessageButton from "./IMessageButton.client";
import WhatsAppButton from "./WhatsAppButton.client";
import ViberButton from "./ViberButton.client";
import EmailButton from "./EmailButton";

//---------------------------------------------------------

const ContactSection = async ({ id }: { id: string }) => {
  const booking = await getBookingById(id);

  return (
    <section className="section-container">
      <header className="section-title-container">Have questions ?</header>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <BsChatFill size={15} />
          </div>
          <div className="section-content-text-container">
            Send us a message using one of the platforms below
            <div />
          </div>
        </div>

        <div className="section-content-item-button-container">
          <EmailButton
            booking_ref={booking.ref}
            client_name={booking.client_name}
          />
          <IMessageButton
            booking_ref={booking.ref}
            client_name={booking.client_name}
          />
          <WhatsAppButton
            booking_ref={booking.ref}
            client_name={booking.client_name}
          />
          <ViberButton
            booking_ref={booking.ref}
            client_name={booking.client_name}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
