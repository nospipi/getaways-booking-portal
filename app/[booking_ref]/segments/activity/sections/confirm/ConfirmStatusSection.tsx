import ConfirmButton from "./ConfirmButton";
import getBooking from "@/app/server/server_actions/getBooking";
import InterchangableConfirmSection from "./InterchangableConfirmSection";

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
        <InterchangableConfirmSection isConfirmed={isConfirmed} />

        {!isConfirmed && <ConfirmButton id={id} />}
      </div>
    </div>
  );
};

export default ConfirmStatusSection;
