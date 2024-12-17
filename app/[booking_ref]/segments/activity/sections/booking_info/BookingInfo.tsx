import { FaExclamationCircle } from "react-icons/fa";
import getBookingById from "@/app/server/server_actions/getBookingById";
import PickupInputContainer from "@/app/[booking_ref]/segments/activity/sections/booking_info/PickupInputContainer.client";
import PickupInputStateContextProvider from "@/app/[booking_ref]/segments/activity/sections/booking_info/PickupInputStateContextProvider.client";
import EditButton from "@/app/[booking_ref]/segments/activity/sections/booking_info/EditButton.client";
import { IGetBookingReturn } from "@/app/server/server_actions/getBookingById";

//---------------------------------------------------------

const BookingInfo = async ({ id }: { id: string }) => {
  const booking = (await getBookingById(id)) as IGetBookingReturn;

  const hasClientLocation = booking?.client_location?.length > 0;
  const hasPickupLocation =
    booking?.pickup_location?.latitude && booking?.pickup_location?.longitude;
  const pickupIncluded = booking.option.pickup_included;
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
      <section className="section-container">
        <header className="section-title-container">
          Your Getaways Booking Info
        </header>
        <div className="section-content-container">
          <div className="section-content-item-container">
            <div className="section-content-icon-container">Name</div>
            <div className="section-content-text-container">
              {booking.client_name}
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
            </div>
          </div>
          <PickupInputStateContextProvider
            shouldPromptLocation={shouldPromptLocation}
          >
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
                </div>
              </div>
            )}
            {/* {shouldPromptLocation && (
              <>
                <PickupPromptText />
              </>
            )} */}
            <PickupInputContainer
              booking_id={booking._id.toString()}
              client_location={booking.client_location || ""}
            />
            {/* CLIENT */}
          </PickupInputStateContextProvider>
        </div>
      </section>
    </>
  );
};

export default BookingInfo;
