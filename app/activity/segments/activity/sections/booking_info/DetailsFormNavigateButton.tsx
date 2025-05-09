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
    <div className="shimmer-button-container">
      <Link
        href={`/traveler-details-form?uniqueId=${unique_booking_id}`}
        prefetch={true}
      >
        <Button
          fullWidth
          variant="contained"
          color="warning"
          className="shimmer-button"
          sx={{
            backgroundColor: "dodgerblue",
            display: "flex",
            gap: "5px",
          }}
        >
          <span>SUBMIT TRAVELLER DETAILS FORM</span>
          <FaArrowRight />
        </Button>
      </Link>
    </div>
  );
};

export default DetailsFormNavigateButton;
