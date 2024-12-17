import ConfirmButton from "./ConfirmButton";
import getBookingById from "@/app/server/server_actions/getBookingById";
import InterchangableConfirmSection from "./InterchangableConfirmSection";
import { FaExclamationCircle } from "react-icons/fa";

//---------------------------------------------------------

const ConfirmStatusSection = async ({
  id,
  confirmErrorMessage,
}: {
  id: string;
  confirmErrorMessage: string | null;
}) => {
  const { unique_booking_id, client_response_status } = await getBookingById(
    id
  );
  const isConfirmed = client_response_status === "CONFIRMED";

  return (
    <section className="section-container">
      <header className="section-title-container">
        Traveller confirmation status
      </header>
      <div className="section-content-container">
        <InterchangableConfirmSection isConfirmed={isConfirmed} />

        {!isConfirmed && (
          <ConfirmButton unique_booking_id={unique_booking_id} />
        )}

        {confirmErrorMessage && (
          <div
            style={{
              width: "100%",
              backgroundColor: "whitesmoke",
              padding: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FaExclamationCircle
              size={14}
              color="indianred"
              style={{ flexShrink: 0 }}
            />
            <span
              style={{
                color: "indianred",
                fontSize: "14px",
              }}
            >
              {confirmErrorMessage}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConfirmStatusSection;
