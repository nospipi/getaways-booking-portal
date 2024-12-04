"use client";
import { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { PickupInputStateContext } from "./PickupInputStateContextProvider.client";

//------------------------------------------------------------------------------

const PickupInputContainer = () => {
  const { isPickupInputShown } = useContext(PickupInputStateContext);
  return (
    !isPickupInputShown && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <TextField
          label="Hotel name or full address"
          variant="filled"
          fullWidth
          autoFocus
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          //value={locationInputValue}
          //onChange={(e) => setLocationInputValue(e.target.value)}
        />

        <Button fullWidth variant="contained" color="success">
          SUBMIT
        </Button>
      </div>
    )
  );
};

export default PickupInputContainer;
