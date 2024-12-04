import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import Button from "@mui/material/Button";
import getBooking from "@/app/api/server_actions/getBooking";
import PickupInputContainer from "./PickupInputContainer.client";
import PickupInputStateContextProvider from "./PickupInputStateContextProvider.client";
import EditButton from "./EditButton.client";

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
  const seats = Object.values(booking?.tickets).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const tickets = Object.entries(booking?.tickets).map(
    ([key, value]) => `${value}x ${key}`
  );

  return (
    <div className="section-container">
      <div className="section-title-container">Your Getaways booking info</div>
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
                  <FaQuestionCircle color="indianred" />
                )}
                {!shouldPromptLocation && <EditButton />} {/* CLIENT */}
                <div />
              </div>
            </div>
          )}
          {shouldPromptLocation && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  padding: "10px 10px 11px 10px",
                  backgroundColor: "whitesmoke",
                  borderRadius: "5px",
                }}
              >
                <div className="section-content-item-container">
                  <div
                    className="section-content-text-container"
                    style={{
                      color: "indianred",
                      //fontWeight: "bold",
                      fontSize: "14px",
                      fontStyle: "italic",
                    }}
                  >
                    <span>
                      It seems that you have not added your location details
                      yet. Please use the form below to add your{" "}
                      <span style={{ fontWeight: "bold" }}>
                        hotel name or apartment/AirBNB full address
                      </span>{" "}
                      and press submit.
                      <br /> Please be aware that if your accommodation is
                      situated in a pedestrian-only or narrow area not
                      accessible by our tour vehicles, or if it is outside the
                      designated pickup zone, we will assign the closest
                      possible central meeting point for your pickup.
                    </span>
                  </div>
                </div>
              </div>
              <PickupInputContainer /> {/* CLIENT */}
            </>
          )}
        </PickupInputStateContextProvider>
      </div>
    </div>
  );
};

export default Tour;
