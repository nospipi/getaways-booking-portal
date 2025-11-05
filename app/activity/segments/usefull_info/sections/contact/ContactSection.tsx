import { BsChatFill } from "react-icons/bs";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import IMessageButton from "./IMessageButton.client";
import WhatsAppButton from "./WhatsAppButton.client";
import ViberButton from "./ViberButton.client";
import EmailButton from "./EmailButton";
import { Suspense } from "react";

//---------------------------------------------------------

const ContactSection = async ({ id }: { id: string }) => {
  const booking = await getBookingByUniqueId(id);

  return (
    <div className="modern-card">
      <div className="modern-card-header">
        <div className="modern-card-title">Have questions?</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">
            <BsChatFill size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Contact us</div>
            <div className="modern-info-value" style={{ fontSize: "14px", color: "#e5e5e5" }}>
              Send us a message using one of the platforms below
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            marginTop: "8px",
          }}
        >
          <Suspense>
            <IMessageButton
              booking_ref={booking.ref}
              client_name={booking.client_name}
            />
          </Suspense>

          <Suspense>
            <WhatsAppButton
              booking_ref={booking.ref}
              client_name={booking.client_name}
            />
          </Suspense>

          <Suspense>
            <ViberButton
              booking_ref={booking.ref}
              client_name={booking.client_name}
            />
          </Suspense>

          <Suspense>
            <EmailButton
              booking_ref={booking.ref}
              client_name={booking.client_name}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
