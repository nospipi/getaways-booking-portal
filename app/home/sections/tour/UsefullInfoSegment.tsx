import Sim from "../sim/Sim";
import Review from "../review/Review";
import Promo from "../promo/Promo";
import Contact from "../contact/Contact";
import ActivityHeader from "./ActivityHeader";

//---------------------------------------------------------

const UsefullInfoSegment = () => {
  return (
    <div className="segment-container">
      <ActivityHeader />
      <Sim />
      <Review />
      <Promo />
      <Contact />
    </div>
  );
};

export default UsefullInfoSegment;
