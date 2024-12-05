import SimSection from "./sections/sim/SimSection";
import ReviewSection from "./sections/review/ReviewSection";
import PromoSection from "./sections/promo/PromoSection";
import ContactSection from "./sections/contact/ContactSection";
import SegmentHeader from "../SegmentHeader";

//---------------------------------------------------------

const UsefullInfoSegment = () => {
  return (
    <div className="segment-container">
      <SegmentHeader />
      <SimSection />
      <ReviewSection />
      <PromoSection />
      <ContactSection />
    </div>
  );
};

export default UsefullInfoSegment;
