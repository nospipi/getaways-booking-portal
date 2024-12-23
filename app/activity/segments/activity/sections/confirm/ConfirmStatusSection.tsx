import ConfirmButton from "./ConfirmButton";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import InterchangableConfirmSection from "./InterchangableConfirmSection";
//---------------------------------------------------------

const ConfirmStatusSection = async ({ uniqueId }: { uniqueId: string }) => {
  const { unique_booking_id, client_response_status } =
    await getBookingByUniqueId(uniqueId);
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
