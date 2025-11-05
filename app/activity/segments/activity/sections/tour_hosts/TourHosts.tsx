import { FaUserTie } from "react-icons/fa6";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";

//---------------------------------------------------------

const TourHosts = async ({ uniqueId }: { uniqueId: string }) => {
  const booking = await getBookingByUniqueId(uniqueId);
  const hasCrew = booking?.task?.assignees?.length > 0;
  return (
    <div className="modern-card">
      <div className="modern-card-header">
        <div className="modern-card-title">Tour Hosts</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">
            <FaUserTie size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Hosts</div>
            <div
              className="modern-info-value"
              style={{
                color: hasCrew ? "#ffffff" : "#ff6b6b",
                fontWeight: hasCrew ? "500" : "600",
              }}
            >
              {hasCrew ? booking?.task?.assignees.join(", ") : "To be announced"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHosts;
