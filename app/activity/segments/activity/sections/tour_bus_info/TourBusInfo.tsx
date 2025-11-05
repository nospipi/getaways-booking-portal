import { FaBus } from "react-icons/fa6";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";

//---------------------------------------------------------

const TourBusInfo = async ({ uniqueId }: { uniqueId: string }) => {
  const booking = await getBookingByUniqueId(uniqueId);
  const hasVehicle = booking?.task?.vehicle?.plate;

  return (
    <div className="modern-card">
      <div className="modern-card-header">
        <div className="modern-card-title">Bus Information</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">
            <FaBus size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Vehicle</div>
            <div
              className="modern-info-value"
              style={{
                color: hasVehicle ? "#ffffff" : "#ff6b6b",
                fontWeight: hasVehicle ? "500" : "600",
              }}
            >
              {hasVehicle
                ? `${booking?.task?.vehicle?.plate} (${booking?.task?.vehicle?.type} / ${booking?.task?.vehicle?.color})`
                : "Not available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourBusInfo;
