import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaQuestionCircle, FaExclamationCircle } from "react-icons/fa";
import Button from "@mui/material/Button";
import getBooking from "@/app/api/server_actions/getBooking";
import PickupInputContainer from "./PickupInputContainer.client";
import PickupInputStateContextProvider from "./PickupInputStateContextProvider.client";
import EditButton from "./EditButton.client";
import PickupPromptText from "./PickupPromptText";
import ConfirmStatus from "../confirm/ConfirmStatus";
import ActivityHeader from "./ActivityHeader";

//---------------------------------------------------------

const Tour = async ({ id }: { id: string }) => {
  const booking = await getBooking(id);

  const hasClientLocation = booking?.client_location?.length > 0;
  const hasPickupLocation =
    booking?.pickup_location?.latitude && booking?.pickup_location?.longitude;
  const pickupIncluded = booking?.product?.pickupIncluded;
  const shouldShowLocation = pickupIncluded && !hasPickupLocation;
  const shouldPromptLocation =
    !hasClientLocation && !hasPickupLocation && pickupIncluded;
  const hasPickupLocationAndTime =
    booking?.pickup_location?.name.length > 0 &&
    booking?.pickup_time.length > 0;
  const seats = Object.values(booking?.tickets).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const tickets = Object.entries(booking?.tickets).map(
    ([key, value]) => `${value}x ${key}`
  );

  return (
    <div className="segment-container">
      <ActivityHeader />
      {hasPickupLocationAndTime && <ConfirmStatus />}
      <div className="section-container">
        <div className="section-title-container">
          Your Getaways booking info
        </div>
        <div className="section-content-container">
          <div className="section-content-item-container">
            <div className="section-content-icon-container">Name</div>
            <div className="section-content-text-container">
              {booking.client_name}
              <div />
            </div>
          </div>
          <div className="section-content-item-container">
            <div className="section-content-icon-container">Seats</div>
            <div className="section-content-text-container">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {seats}
              </span>
              (<span>{tickets.join(", ")}</span>)
              <div />
            </div>
          </div>
          <PickupInputStateContextProvider>
            {shouldShowLocation && (
              <div className="section-content-item-container">
                <div className="section-content-icon-container">Hotel</div>
                <div className="section-content-text-container">
                  {booking.client_location || (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <b>NOT PROVIDED</b>
                      <FaExclamationCircle color="indianred" />
                    </div>
                  )}
                  {!shouldPromptLocation && <EditButton />} {/* CLIENT */}
                  <div />
                </div>
              </div>
            )}
            {shouldPromptLocation && (
              <>
                <PickupPromptText />
                <PickupInputContainer /> {/* CLIENT */}
              </>
            )}
          </PickupInputStateContextProvider>
        </div>
      </div>
    </div>
  );
};

export default Tour;
