"use client";
import { useContext, useState, useEffect, useCallback } from "react";
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
  const { isPickupInputShown, togglePickupInputShown } = useContext(
    PickupInputStateContext
  );
  const [locationInputValue, setLocationInputValue] = useState(client_location);
  const locationInputHasEnoughChars = locationInputValue.length > 6;
  const locationInputHasTooManyChars = locationInputValue.length > 100;

  const handleAddLocation = useCallback(async () => {
    try {
      if (!locationInputHasEnoughChars) {
        toast.error("Please enter a location with at least 6 characters");
        return;
      }

      if (locationInputHasTooManyChars) {
        toast.error("Please enter a location with less than 100 characters");
        return;
      }

      await addLocation(booking_id, locationInputValue);
      toast.success("Location added successfully");
      togglePickupInputShown();
    } catch (e) {
      console.log(e?.toString());
      toast.error(e?.toString() || "An error occurred");
    }
  }, [
    booking_id,
    locationInputValue,
    locationInputHasEnoughChars,
    locationInputHasTooManyChars,
    togglePickupInputShown,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
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
    <AnimatePresence>
      {isPickupInputShown && (
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
          //a little upwards motion when appearing with a little fade in, and the opposite when disappearing
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
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
            SUBMIT
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PickupInputContainer;
