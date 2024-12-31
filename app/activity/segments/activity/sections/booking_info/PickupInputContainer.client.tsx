"use client";
import { useContext, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { PickupInputStateContext } from "./PickupInputStateContextProvider.client";
import addLocation from "@/app/server/server_actions/addLocation";
import { toast } from "react-hot-toast";

//------------------------------------------------------------------------------

const PickupInputContainer = ({
  booking_id,
  client_location,
}: {
  booking_id: string;
  client_location: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { shouldPromptLocation, isPickupInputShown, togglePickupInputShown } =
    useContext(PickupInputStateContext);
  const [locationInputValue, setLocationInputValue] = useState(client_location);
  const locationInputHasEnoughChars = locationInputValue.length > 5;
  const locationInputHasTooManyChars = locationInputValue.length > 100;

  const handleAddLocation = useCallback(async () => {
    const toastId = "location-update"; // unique id  - this uses the same toast instance
    //instead of dismissing and showing a new one every time

    try {
      if (!locationInputHasEnoughChars) {
        toast.error("Please enter a location with at least 6 characters", {
          id: toastId,
        });
        return;
      }

      if (locationInputHasTooManyChars) {
        toast.error("Please enter a location with less than 100 characters", {
          id: toastId,
        });
        return;
      }

      togglePickupInputShown(false);
      toast.loading("Updating location...", { id: toastId });
      await addLocation(booking_id, locationInputValue);
      toast.success("Location updated successfully", { id: toastId });
    } catch (e) {
      console.log(e);
      toast.error(e?.toString() || "An error occurred", { id: toastId });
      togglePickupInputShown(true);
    }
  }, [
    booking_id,
    locationInputValue,
    locationInputHasEnoughChars,
    locationInputHasTooManyChars,
    togglePickupInputShown,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        document.activeElement === inputRef.current
      ) {
        if (isPickupInputShown) {
          handleAddLocation();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleAddLocation, isPickupInputShown]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={15}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          overflow: "hidden",
          marginTop: isPickupInputShown ? "0" : "-10px", //because parent has gap 10px, it creates space between this component and its siblings even when its height is zero, so we account for that space
        }}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isPickupInputShown ? "auto" : 0,
          opacity: isPickupInputShown ? 1 : 0,
        }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.15 }}
        onAnimationComplete={() => {
          if (isPickupInputShown && inputRef.current) {
            inputRef.current.focus();
            // Set cursor to the end of the input
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
          }
        }}
        layout
      >
        {shouldPromptLocation && (
          <span
            style={{
              color: "indianred",
              fontSize: "13px",
              fontStyle: "italic",
              marginBottom: "5px",
            }}
          >
            It seems that you have not added your location details yet. Please
            use the form below to add your&nbsp;
            <mark
              style={{
                backgroundColor: "rgb(255 250 206)",
              }}
            >
              <b>hotel name or apartment/AirBNB full address </b>
            </mark>
            &nbsp;and press submit
          </span>
        )}
        <TextField
          inputRef={inputRef}
          label="Hotel name or full address"
          variant="filled"
          fullWidth
          autoFocus={isPickupInputShown}
          focused
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          color="success"
          error={!locationInputHasEnoughChars || locationInputHasTooManyChars}
          value={locationInputValue}
          onChange={(e) => setLocationInputValue(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={handleAddLocation}
        >
          UPDATE
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default PickupInputContainer;
