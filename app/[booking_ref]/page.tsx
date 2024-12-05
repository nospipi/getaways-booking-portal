import styles from "@/app/page.module.css";
import ConfirmStatus from "@/app/home/sections/confirm/ConfirmStatus";
import Tour from "@/app/home/sections/tour/Tour";
import Sim from "@/app/home/sections/sim/Sim";
import Review from "@/app/home/sections/review/Review";
import Contact from "@/app/home/sections/contact/Contact";
import Promo from "@/app/home/sections/promo/Promo";
import getBookingIds from "@/app/api/server_actions/getBookingIds";

//---------------------------------------------------------

const Page = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { booking_ref } = await params;
  const bookingIds = (await getBookingIds(booking_ref)) as string[];

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
};

export default Page;

//---------------------------------------------------------

// const Page = async ({
//   params,
// }: {
//   params: Promise<{ [key: string]: string | string[] | undefined }>;
// }) => {
//   const { booking_ref } = await params;

//   return <div>{booking_ref}</div>;
// };

// export default Page;
