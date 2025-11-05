import { TbBrandTripadvisor } from "react-icons/tb";
import { TfiArrowCircleRight } from "react-icons/tfi";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import Button from "@mui/material/Button";
import Link from "next/link";
import ReviewButton from "./ReviewButton";
import { Suspense } from "react";

//---------------------------------------------------------

const ReviewSection = async ({ id }: { id: string }) => {
  const booking = await getBookingByUniqueId(id);

  return (
    <div className="modern-card">
      <div className="modern-card-header">
        <div className="modern-card-title">Leave a Review</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">
            <TbBrandTripadvisor size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Share Your Experience</div>
            <div className="modern-info-value" style={{ fontSize: "14px", color: "#4a4a4a" }}>
              Write an honest review about your experience with Getaways Greece.
              We would love to hear your feedback
            </div>
          </div>
        </div>
        <div style={{ marginTop: "8px" }}>
          <Link
            href={booking?.product?.review_link || "/"}
            style={{
              width: "100%",
              display: "block",
            }}
          >
            <Suspense>
              <ReviewButton />
            </Suspense>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
