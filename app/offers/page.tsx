import Script from "next/script";
const BOKUN_LIST_68121 = process.env.BOKUN_LIST_68121;

const Page = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  //   const { booking_ref } = await params;
  //   const bookingIds = (await getBookingIds(booking_ref)) as string[];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="content-container">
          <div className="content-container-wrapper">
            <iframe
              src={BOKUN_LIST_68121}
              width="100%"
              height="1000"
              style={{
                border: "none",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

//---------------------------------------------------------
