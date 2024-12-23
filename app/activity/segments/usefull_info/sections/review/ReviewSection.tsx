import { TbBrandTripadvisor } from "react-icons/tb";
import { TfiArrowCircleRight } from "react-icons/tfi";
import getBookingById from "@/app/server/server_actions/getBookingById";
import Button from "@mui/material/Button";
import Link from "next/link";

//---------------------------------------------------------

const ReviewSection = async ({ id }: { id: string }) => {
  const booking = await getBookingById(id);

  return (
    <section className="section-container">
      <header className="section-title-container">Leave us a review !</header>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <TbBrandTripadvisor size={20} />
          </div>
          <div className="section-content-text-container">
            Write an honest review about your experience with Getaways Greece.
            We would love to hear your feedback
          </div>
        </div>
        <aside className="section-content-item-button-container">
          <Link
            href={booking?.product?.review_link || "/"}
            style={{
              width: "100%",
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="success"
              endIcon={<TfiArrowCircleRight size={15} />}
            >
              REVIEW US ON TRIPADVISOR
            </Button>
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default ReviewSection;
