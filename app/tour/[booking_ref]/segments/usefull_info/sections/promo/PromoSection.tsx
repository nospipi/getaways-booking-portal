import { FaShoppingCart } from "react-icons/fa";
import { TfiArrowCircleRight } from "react-icons/tfi";
import Button from "@mui/material/Button";

//---------------------------------------------------------

const PromoSection = () => {
  return (
    <div className="section-container">
      <div className="section-title-container">
        Book your next tour with Getaways !
      </div>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <FaShoppingCart size={15} />
          </div>
          <div className="section-content-text-container">
            <div>
              Use the promo code :{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: "darkgreen",
                }}
              >
                PROMO_APP
              </span>{" "}
              during the checkout process to get a{" "}
              <span
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                15%
              </span>{" "}
              discount on your next booking
            </div>
            <div />
          </div>
        </div>
        <div className="section-content-item-button-container">
          <Button
            fullWidth
            variant="outlined"
            color="success"
            endIcon={<TfiArrowCircleRight size={15} />}
          >
            VIEW OFFERS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
