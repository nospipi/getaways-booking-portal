import Button from "@mui/material/Button";
import Link from "next/link";

//---------------------------------------------------------

const DetailsFormNavigateButton = ({
  unique_booking_id,
}: {
  unique_booking_id: string;
}) => {
  return (
    <div className="shimmer-button-container">
      <Link href={`/traveler-details-form?uniqueId=${unique_booking_id}`}>
        <Button
          fullWidth
          variant="contained"
          color="warning"
          className="shimmer-button"
        >
          CONFIRM TRAVELLER DETAILS
        </Button>
      </Link>
    </div>
  );
};

export default DetailsFormNavigateButton;
