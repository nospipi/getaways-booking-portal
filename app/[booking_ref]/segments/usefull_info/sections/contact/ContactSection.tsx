import { BsChatFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Button from "@mui/material/Button";
import getBookingById from "@/app/server/server_actions/getBookingById";
import IMessageButton from "./IMessageButton.client";
import WhatsAppButton from "./WhatsAppButton.client";
import ViberButton from "./ViberButton.client";

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

        <aside className="section-content-item-button-container">
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

          <a
            href={`mailto:operations@getawaysgreece.com?subject=${`[${booking.ref}/${booking.client_name}]`}`}
            target="_blank"
            style={{
              width: "100%",
            }}
          >
            <Button
              fullWidth
              variant="text"
              color="success"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                fontSize: "11px",
                textTransform: "none",
                color: "black",
                borderColor: "rgb(163 163 163) !important",
              }}
            >
              <MdEmail size={15} color="dodgerblue" />
              <div className="platform-text-container ">Email</div>
            </Button>
          </a>
        </aside>
      </div>
    </section>
  );
};

export default ContactSection;
