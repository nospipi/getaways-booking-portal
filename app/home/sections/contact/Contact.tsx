import "@/app/globals.css";
import { BsChatFill } from "react-icons/bs";
import { FaViber } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import Button from "@mui/material/Button";

//---------------------------------------------------------

const Contact = () => {
  return (
    <div className="section-container">
      <div className="section-title-container">Have questions ?</div>
      <div className="section-content-container">
        <div className="section-content-item-top-container">
          <div className="section-content-icon-container">
            <BsChatFill size={15} />
          </div>
          <div className="section-content-text-container">
            Send us a message using one of the platforms below
            <div />
          </div>
        </div>

        <div className="section-content-item-container">
          <Button
            fullWidth
            variant="contained"
            color="info"
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <IoLogoWhatsapp size={15} />
            <div className="platform-text-container ">WhatsApp</div>
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="info"
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <FaViber size={15} />
            <div className="platform-text-container ">Viber</div>
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="info"
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <MdEmail size={15} />
            <div className="platform-text-container ">Email</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
