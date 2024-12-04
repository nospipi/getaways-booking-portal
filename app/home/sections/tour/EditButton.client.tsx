"use client";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { PickupInputStateContext } from "./PickupInputStateContextProvider.client";

const EditButton = () => {
  const { isPickupInputShown, togglePickupInputShown } = useContext(
    PickupInputStateContext
  );
  console.log("isPickupInputShown from button", isPickupInputShown);
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => {
        togglePickupInputShown();
      }}
      color={isPickupInputShown ? "error" : "primary"}
      sx={{
        fontSize: "12px",
      }}
    >
      {isPickupInputShown ? "Close" : "Edit ✏️"}
    </Button>
  );
};

export default EditButton;
