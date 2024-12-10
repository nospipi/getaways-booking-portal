"use client";
import IconButton from "@mui/material/IconButton";

import { TbEdit, TbEditOff } from "react-icons/tb";
import { useContext } from "react";
import { PickupInputStateContext } from "@/app/[booking_ref]/segments/activity/sections/booking_info/PickupInputStateContextProvider.client";

const EditButton = () => {
  const { isPickupInputShown, togglePickupInputShown } = useContext(
    PickupInputStateContext
  );

  return (
    <IconButton
      variant="outlined"
      // size="small"
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
