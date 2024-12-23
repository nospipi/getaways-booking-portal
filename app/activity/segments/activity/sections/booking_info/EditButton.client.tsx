"use client";
import IconButton from "@mui/material/IconButton";

import { TbEdit, TbEditOff } from "react-icons/tb";
import { useContext } from "react";
import { PickupInputStateContext } from "@/app/activity/segments/activity/sections/booking_info/PickupInputStateContextProvider.client";

const EditButton = () => {
  const { isPickupInputShown, togglePickupInputShown } = useContext(
    PickupInputStateContext
  );

  return (
    <IconButton
      aria-expanded={isPickupInputShown}
      onClick={() => {
        togglePickupInputShown();
      }}
      color={isPickupInputShown ? "error" : "primary"}
    >
      {isPickupInputShown ? <TbEditOff size={17} /> : <TbEdit size={17} />}
    </IconButton>
  );
};

export default EditButton;
