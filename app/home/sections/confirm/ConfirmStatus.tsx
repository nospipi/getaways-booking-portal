import { TbBrandTripadvisor } from "react-icons/tb";
import MuiButton from "./MuiButton";

//---------------------------------------------------------

const ConfirmStatus = () => {
  return (
    <div className="section-container">
      <div className="section-title-container">
        Traveller confirmation status
      </div>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <TbBrandTripadvisor size={20} />
          </div>
          <div className="section-content-text-container">
            Write an honest review about your experience with Getaways Greece.
            We would love to hear your feedback
            <div />
          </div>
        </div>
        <div className="section-content-item-button-container">
          <MuiButton text="CONFIRM" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmStatus;
