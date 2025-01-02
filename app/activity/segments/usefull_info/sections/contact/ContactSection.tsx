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
            <Suspense>
              {/* wrapped in Suspense because it accesses useSearchParams hook (through useAddUserAction hook) */}
              {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
              <IMessageButton
                booking_ref={booking.ref}
                client_name={booking.client_name}
              />
            </Suspense>

            <Suspense>
              {/* wrapped in Suspense because it accesses useSearchParams hook (through useAddUserAction hook) */}
              {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
              <WhatsAppButton
                booking_ref={booking.ref}
                client_name={booking.client_name}
              />
            </Suspense>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Suspense>
              {/* wrapped in Suspense because it accesses useSearchParams hook (through useAddUserAction hook) */}
              {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
              <ViberButton
                booking_ref={booking.ref}
                client_name={booking.client_name}
              />
            </Suspense>

            <Suspense>
              {/* wrapped in Suspense because it accesses useSearchParams hook (through useAddUserAction hook) */}
              {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
              <EmailButton
                booking_ref={booking.ref}
                client_name={booking.client_name}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
