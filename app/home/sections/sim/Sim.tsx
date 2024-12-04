import "@/app/globals.css";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import Button from "@mui/material/Button";

//---------------------------------------------------------

const Sim = () => {
  return (
    <div className="section-container">
      <div className="section-title-container">
        Looking for an e-Sim phone number for your trip ?
      </div>
      <div className="section-content-container">
        <div className="section-content-item-top-container">
          <div className="section-content-icon-container">
            <MdOutlinePhoneAndroid size={20} />
          </div>
          <div className="section-content-text-container">
            Buy an international virtual eSIM card with unlimited data, stay
            connected wherever you go, and avoid expensive phone bills on your
            trip
            <div />
          </div>
        </div>
        <div className="section-content-item-container">
          <Button fullWidth variant="contained" color="success">
            GET YOUR eSIM NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sim;
