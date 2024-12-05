import getBooking from "@/app/server/server_actions/getBooking";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import moment from "moment";

//---------------------------------------------------------

const TourInfoSection = async ({ id }: { id: string }) => {
  const booking = await getBooking(id);
  const product_title = booking?.product?.platform_product_name;
  return (
    <div className="section-container">
      <div className="section-title-container">Your Getaways Tour Info</div>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <BsFillCalendarCheckFill size={14} />
          </div>
          <div className="section-content-text-container">
            {moment(booking?.date).format("ddd, DD MMM YYYY")}
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourInfoSection;
