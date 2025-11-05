import Button from "@mui/material/Button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

//---------------------------------------------------------

const DetailsFormNavigateButton = ({
  unique_booking_id,
}: {
  unique_booking_id: string;
}) => {
  return (
    <Link
      href={`/traveler-details-form?uniqueId=${unique_booking_id}`}
      prefetch={true}
    >
      <button
        className="confirm-button"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <span>Submit Traveller Details</span>
        <FaArrowRight size={14} />
      </button>
    </Link>
  );
};

export default DetailsFormNavigateButton;
