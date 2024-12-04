import styles from "./page.module.css";
import ConfirmStatus from "./home/sections/confirm/ConfirmStatus";
import Tour from "./home/sections/tour/Tour";
import Sim from "./home/sections/sim/Sim";
import Review from "./home/sections/review/Review";
import Contact from "./home/sections/contact/Contact";
import Promo from "./home/sections/promo/Promo";
import getBookingIds from "./api/server_actions/getBookingIds";

//---------------------------------------------------------

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  try {
    const params = await searchParams;
    const ref = params.tour as string;
    const bookingIds = (await getBookingIds(ref)) as string[];

    return (
      <div className={styles.page}>
        <div className={styles.container}>
          {bookingIds.map((bookingId: string) => (
            <Tour key={bookingId} id={bookingId} />
          ))}
          <ConfirmStatus />
          <Sim />
          <Review />
          <Promo />
          <Contact />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1>{error.message}</h1>
        </div>
      </div>
    );
  }
};

export default Home;
