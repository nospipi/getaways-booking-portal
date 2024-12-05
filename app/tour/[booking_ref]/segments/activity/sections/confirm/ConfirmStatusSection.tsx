import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import ConfirmButton from "./ConfirmButton";
import getBooking from "@/app/server/server_actions/getBooking";

//---------------------------------------------------------

const ConfirmStatusSection = async ({ id }: { id: string }) => {
  const booking = await getBooking(id);
  const isConfirmed = booking?.client_response_status === "CONFIRMED";

  return (
    <div className="section-container">
      <div className="section-title-container">
        Traveller confirmation status
      </div>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <FaThumbsUp
              style={{ color: isConfirmed ? "#6A914F" : "indianred" }}
              size={15}
            />
          </div>
          <div
            className="section-content-text-container"
            style={{
              color: isConfirmed ? "#6A914F" : "indianred",
            }}
          >
            {isConfirmed ? (
              <span
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                You have confirmed
                <i
                  style={{
                    fontSize: "18px",
                  }}
                >
                  👏
                </i>
              </span>
            ) : (
              "PENDING"
            )}
            <div />
          </div>
        </div>

        {!isConfirmed && <ConfirmButton id={id} />}
      </div>
    </div>
  );
};

export default ConfirmStatusSection;
