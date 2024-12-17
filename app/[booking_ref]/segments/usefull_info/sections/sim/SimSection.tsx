import { MdOutlinePhoneAndroid } from "react-icons/md";
import { TfiArrowCircleRight } from "react-icons/tfi";
import Button from "@mui/material/Button";
import Link from "next/link";

//---------------------------------------------------------

const SimSection = () => {
  return (
    <section className="section-container">
      <header className="section-title-container">
        Looking for an e-Sim phone number for your trip ?
      </header>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <MdOutlinePhoneAndroid size={20} />
          </div>
          <div className="section-content-text-container">
            Buy an international virtual eSIM card with unlimited data, stay
            connected wherever you go, and avoid expensive phone bills on your
            trip
          </div>
        </div>
        <aside className="section-content-item-button-container">
          <Link
            href={"https://connectphone.eu/download-app"}
            style={{
              width: "100%",
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="success"
              endIcon={<TfiArrowCircleRight size={15} />}
            >
              GET YOUR eSIM NOW
            </Button>
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default SimSection;
