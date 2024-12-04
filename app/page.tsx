import styles from "./page.module.css";
import ConfirmStatus from "./home/sections/confirm/ConfirmStatus";
import Sim from "./home/sections/sim/Sim";
import Review from "./home/sections/review/Review";
import Contact from "./home/sections/contact/Contact";
import Promo from "./home/sections/promo/Promo";

//---------------------------------------------------------

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ConfirmStatus />
        <Sim />
        <Review />
        <Promo />
        <Contact />
      </div>
    </div>
  );
}
