import { TbBrandTripadvisor } from "react-icons/tb";
import Button from "@mui/material/Button";

//---------------------------------------------------------

const Review = () => {
  return (
    <div className="section-container">
      <div className="section-title-container">Leave us a review !</div>
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
          <Button fullWidth variant="contained" color="success">
            VIEW OFFERS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;
