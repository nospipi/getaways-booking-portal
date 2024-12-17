import { MdOutlineAccessTimeFilled } from "react-icons/md";
import moment from "moment";
import getBookingById from "@/app/server/server_actions/getBookingById";

//---------------------------------------------------------

const MeetingTime = async ({ id }: { id: string }) => {
  const booking = await getBookingById(id);
  const hasPickupTime = booking?.pickup_time?.length > 0;
  const time = moment(booking?.pickup_time, "HH:mm").format("h:mm A");

  return (
    <div className="section-container">
      <div className="section-title-container">Your Meeting Time</div>
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
    </div>
  );
};

export default MeetingTime;
