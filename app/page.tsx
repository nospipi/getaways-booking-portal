import styles from "./page.module.css";
import ConfirmStatus from "./sections/ConfirmStatus";
import Sim from "./sections/Sim";
import Review from "./sections/Review";
import Contact from "./sections/Contact";
import Promo from "./sections/Promo";

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
