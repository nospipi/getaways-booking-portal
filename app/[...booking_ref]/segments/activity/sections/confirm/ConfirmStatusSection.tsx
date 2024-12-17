import ConfirmButton from "./ConfirmButton";
import getBookingById from "@/app/server/server_actions/getBookingById";
import InterchangableConfirmSection from "./InterchangableConfirmSection";

//---------------------------------------------------------

const ConfirmStatusSection = async ({ id }: { id: string }) => {
  const booking = await getBookingById(id);
  const isConfirmed = booking?.client_response_status === "CONFIRMED";

  return (
    <div className="section-container">
      <div className="section-title-container">
        Traveller confirmation status
      </div>
      <div className="section-content-container">
        <InterchangableConfirmSection isConfirmed={isConfirmed} />

        {!isConfirmed && <ConfirmButton id={id} />}
      </div>
    </div>
  );
};

export default ConfirmStatusSection;
