import { FaExclamationCircle } from "react-icons/fa";
import getBooking from "@/app/server/server_actions/getBooking";
import PickupInputContainer from "@/app/tour/[booking_ref]/segments/activity/sections/booking_info/PickupInputContainer.client";
import PickupInputStateContextProvider from "@/app/tour/[booking_ref]/segments/activity/sections/booking_info/PickupInputStateContextProvider.client";
import EditButton from "@/app/tour/[booking_ref]/segments/activity/sections/booking_info/EditButton.client";
import PickupPromptText from "@/app/tour/[booking_ref]/segments/activity/sections/booking_info/PickupPromptText";

//---------------------------------------------------------

const BookingInfoSection = async ({ id }: { id: string }) => {
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
    <>
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
              </>
            )}
            <PickupInputContainer
              booking_id={booking._id.toString()}
              client_location={booking.client_location || ""}
            />
            {/* CLIENT */}
          </PickupInputStateContextProvider>
        </div>
      </div>
    </>
  );
};

export default BookingInfoSection;
