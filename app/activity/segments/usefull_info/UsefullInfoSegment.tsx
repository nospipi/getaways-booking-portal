import SimSection from "./sections/sim/SimSection";
import ReviewSection from "./sections/review/ReviewSection";
import PromoSection from "./sections/promo/PromoSection";
import ContactSection from "./sections/contact/ContactSection";
import SegmentHeader from "../SegmentHeader";

//---------------------------------------------------------

const UsefullInfoSegment = ({ id }: { id: string }) => {
  return (
    <article className="segment-container">
      <SegmentHeader>Useful Information</SegmentHeader>
      <div
        className="activity-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "24px",
        }}
      >
        <PromoSection id={id} />
        <SimSection />
        <ReviewSection id={id} />
        <ContactSection id={id} />
      </div>
    </article>
  );
};

export default UsefullInfoSegment;
