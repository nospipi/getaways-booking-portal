import { BsChatFill } from "react-icons/bs";
import getBookingById from "@/app/server/server_actions/getBookingById";
import IMessageButton from "./IMessageButton.client";
import WhatsAppButton from "./WhatsAppButton.client";
import ViberButton from "./ViberButton.client";
import EmailButton from "./EmailButton";
// import ContactButton from "./ContactButton";
// import { FaApple } from "react-icons/fa";

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

        <div
          className="section-content-item-button-container"
          style={{
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <IMessageButton
              booking_ref={booking.ref}
              client_name={booking.client_name}
            />
            {/* <ContactButton
              icon={<FaApple size={15} />}
              buttonText="iMessage"
              handler={async () => {
                "use server";
                console.log("iMessage clicked");
                return;
              }}
            /> */}
            <WhatsAppButton
              booking_ref={booking.ref}
              client_name={booking.client_name}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <ViberButton
              booking_ref={booking.ref}
              client_name={booking.client_name}
            />
            <EmailButton
              booking_ref={booking.ref}
              client_name={booking.client_name}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
