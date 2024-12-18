import BookingSearchForm from "./BookingSearchForm";
import Image from "next/image";
import logo from "@/public/gg_logo.png";
import { FaExclamationCircle } from "react-icons/fa";

//---------------------------------------------------------

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { error } = await searchParams;

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "25px",
          gap: "15px",
          backgroundColor: "rgb(228, 228, 228)",
          borderRadius: "20px",
          maxWidth: "280px",
          //border: "5px solid #768494",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={logo}
            width={185}
            height={50}
            alt="No image available"
            quality={20}
          />
        </div>
        {error && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              alignItems: "center",
              gap: "5px",
              width: "100%",
              backgroundColor: "whitesmoke",
            }}
          >
            <FaExclamationCircle size={15} style={{ color: "indianred" }} />
            <span
              style={{
                color: "indianred",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {error}
            </span>
          </div>
        )}

        <BookingSearchForm />
      </div>
    </main>
  );
};

export default Page;

//---------------------------------------------------------
