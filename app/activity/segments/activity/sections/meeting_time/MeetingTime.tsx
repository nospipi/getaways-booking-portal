import { MdOutlineAccessTimeFilled } from "react-icons/md";
import moment from "moment";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";

//---------------------------------------------------------

const MeetingTime = async ({ uniqueId }: { uniqueId: string }) => {
  const booking = await getBookingByUniqueId(uniqueId);
  const hasPickupTime = booking?.pickup_time?.length > 0;
  const time = moment(booking?.pickup_time, "HH:mm").format("h:mm A");

  return (
    <section className="section-container">
      <header className="section-title-container">Your Meeting Time</header>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <MdOutlineAccessTimeFilled size={15} />
          </div>
          <div
            className="section-content-text-container"
            style={{
              color: hasPickupTime ? "black" : "indianred",
            }}
          >
            {hasPickupTime ? time : "TO BE ANNOUNCED"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetingTime;
