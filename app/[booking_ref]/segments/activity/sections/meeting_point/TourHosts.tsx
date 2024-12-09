import { FaUserTie } from "react-icons/fa6";
import getBookingById from "@/app/server/server_actions/getBookingById";

//---------------------------------------------------------

const TourHosts = async ({ id }: { id: string }) => {
  const booking = await getBookingById(id);
  const hasCrew = booking?.task?.assignees?.length > 0;
  return (
    <div className="section-container">
      <div className="section-title-container">Your Getaways Tour Hosts</div>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <FaUserTie size={16} />
          </div>
          <div
            className="section-content-text-container"
            style={{
              color: hasCrew ? "black" : "indianred",
            }}
          >
            {hasCrew ? booking?.task?.assignees.join(", ") : "TO BE ANNOUNCED"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHosts;
