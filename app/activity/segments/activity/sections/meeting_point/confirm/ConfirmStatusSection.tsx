import ConfirmButton from "./ConfirmButton";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import InterchangableConfirmSection from "./InterchangableConfirmSection";
import ExpandableSectionItem from "../../booking_info/ExpandableSectionItem.client";
//---------------------------------------------------------

const ConfirmStatusSection = async ({ uniqueId }: { uniqueId: string }) => {
  const { unique_booking_id, client_response_status } =
    await getBookingByUniqueId(uniqueId);
  const isConfirmed = client_response_status === "CONFIRMED";

  return (
    <div
      className="section-content-item-container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <InterchangableConfirmSection isConfirmed={isConfirmed} />

      {!isConfirmed && (
        <>
          <ConfirmButton unique_booking_id={unique_booking_id} />
        </>
      )}
    </div>
  );
};

export default ConfirmStatusSection;
