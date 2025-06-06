import { FaUserTie } from "react-icons/fa6";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";

//---------------------------------------------------------

const TourHosts = async ({ uniqueId }: { uniqueId: string }) => {
  const booking = await getBookingByUniqueId(uniqueId);
  const hasCrew = booking?.task?.assignees?.length > 0;
  return (
    <section className="section-container">
      <header className="section-title-container">
        Your Getaways Tour Hosts
      </header>
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
    </section>
  );
};

export default TourHosts;
