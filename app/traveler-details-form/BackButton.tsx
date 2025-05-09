import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

const BackButton = ({ uniqueId }: { uniqueId: string | undefined }) => {
  return (
    <Link href={`/activity?uniqueId=${uniqueId}`} prefetch={true}>
      <button
        style={{
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: "5px",
        }}
      >
        <IoMdArrowRoundBack />
        <span>Back to your booking portal</span>
      </button>
    </Link>
  );
};

export default BackButton;
