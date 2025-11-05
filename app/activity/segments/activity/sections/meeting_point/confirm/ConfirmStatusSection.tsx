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
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <InterchangableConfirmSection isConfirmed={isConfirmed} />
    </div>
  );
};

export { ConfirmButton };
export default ConfirmStatusSection;
