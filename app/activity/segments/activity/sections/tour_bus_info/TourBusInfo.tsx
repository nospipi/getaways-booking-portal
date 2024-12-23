import { FaBus } from "react-icons/fa6";
import getBookingById from "@/app/server/server_actions/getBookingById";

//---------------------------------------------------------

const TourBusInfo = async ({ id }: { id: string }) => {
  const booking = await getBookingById(id);
  const hasVehicle = booking?.task?.vehicle?.plate;

  return (
    <section className="section-container">
      <header className="section-title-container">Tour Bus information</header>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <FaBus size={16} />
          </div>
          <div
            className="section-content-text-container"
            style={{
              color: hasVehicle ? "black" : "indianred",
            }}
          >
            {hasVehicle
              ? `${booking?.task?.vehicle?.plate} (${booking?.task?.vehicle?.type} / ${booking?.task?.vehicle?.color})`
              : "NOT AVAILABLE"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourBusInfo;
