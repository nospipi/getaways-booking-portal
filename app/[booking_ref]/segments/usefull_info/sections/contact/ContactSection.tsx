import { BsChatFill } from "react-icons/bs";
import { FaViber } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import Button from "@mui/material/Button";

//---------------------------------------------------------

const ContactSection = () => {
  return (
    <div className="section-container">
      <div className="section-title-container">Have questions ?</div>
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
          <Button
            fullWidth
            variant="contained"
            color="info"
            sx={{
              display: "flex",
              gap: "10px",
              backgroundColor: "	#22994E",
              fontSize: "12px",
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
              backgroundColor: "	#7360f2",
              fontSize: "12px",
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
              backgroundColor: "	#0077B5",
              fontSize: "12px",
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

export default ContactSection;
