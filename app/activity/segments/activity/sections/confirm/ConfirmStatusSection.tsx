import ConfirmButton from "./ConfirmButton";
import getBookingById from "@/app/server/server_actions/getBookingById";
import InterchangableConfirmSection from "./InterchangableConfirmSection";
//---------------------------------------------------------

const ConfirmStatusSection = async ({ id }: { id: string }) => {
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
      </div>
    </section>
  );
};

export default ConfirmStatusSection;
