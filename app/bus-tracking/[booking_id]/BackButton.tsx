"use client";
import IconButton from "@mui/material/IconButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

//---------------------------------------------------------

const BackButton = () => {
  const router = useRouter();

  return (
    <IconButton
      onClick={() => {
        router.back();
      }}
      //   sx={{
      //     background: "white",
      //   }}
    >
      <IoMdArrowRoundBack size={25} color="white" />
    </IconButton>
  );
};

export default BackButton;
