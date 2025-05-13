import { FaExclamationCircle } from "react-icons/fa";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import PickupInputContainer from "@/app/activity/segments/activity/sections/booking_info/PickupInputContainer.client";
import PickupInputStateContextProvider from "@/app/activity/segments/activity/sections/booking_info/PickupInputStateContextProvider.client";
import EditButton from "@/app/activity/segments/activity/sections/booking_info/EditButton.client";
import { IGetBookingReturn } from "@/app/server/server_actions/getBookingByUniqueId";
import { IoDocumentText } from "react-icons/io5";
import DetailsFormNavigateButton from "./DetailsFormNavigateButton";
import TravellerDetailItem from "./TravellerDetailItem";
import Fab from "@mui/material/Fab";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
import ExpandableSectionItem from "./ExpandableSectionItem.client";
import { FaCheck } from "react-icons/fa";

//---------------------------------------------------------

const BookingInfo = async ({ uniqueId }: { uniqueId: string }) => {
  const booking = (await getBookingByUniqueId(uniqueId)) as IGetBookingReturn;

  const hasClientLocation = booking?.client_location?.length > 0;
  const hasPickupLocation =
    booking?.pickup_location?.latitude && booking?.pickup_location?.longitude;
  const pickupIncluded = booking?.option?.pickup_included;
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

  const requiresTravellerDetails =
    booking?.option?.requires_traveller_details_form;

  const travellerDetailsFormSubmitted = booking?.traveller_details_form?.length
    ? true
    : false;

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

          {requiresTravellerDetails && (
            <>
              {travellerDetailsFormSubmitted ? (
                <ExpandableSectionItem>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      gap: "10px",
                      height: "100%",
                    }}
                  >
                    <div className="section-content-icon-container">
                      <IoDocumentText size={18} />
                    </div>
                    <div className="section-content-text-container">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          color: "darkgreen",
                        }}
                      >
                        <span>Traveller details form submitted</span>
                        <FaCheck size={12} />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      flexDirection: "column",
                      width: "100%",
                      height: "100%",
                      gap: "5px",
                      fontSize: "14px",
                      borderLeft: "2px solid #599cdf",
                      paddingLeft: "10px",
                      padding: "10px",
                      backgroundColor: "whitesmoke",
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    {booking?.traveller_details_form?.map(
                      (traveller_details, index) => {
                        return (
                          <TravellerDetailItem
                            key={traveller_details?._id}
                            index={index}
                            ticketType={traveller_details?.ticket_type}
                            age={traveller_details?.age}
                            nationality={traveller_details?.nationality}
                          />
                        );
                      }
                    )}
                    <Link
                      href={`/traveler-details-form?uniqueId=${uniqueId}`}
                      prefetch={true}
                    >
                      <Fab color="primary" aria-label="edit" size="small">
                        <RiEdit2Fill size={18} />
                      </Fab>
                    </Link>
                  </div>
                </ExpandableSectionItem>
              ) : (
                <div className="section-content-item-container">
                  <div className="section-content-icon-container">
                    <IoDocumentText size={18} />
                  </div>
                  <div className="section-content-text-container">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <b>TRAVELLER DETAILS NOT PROVIDED</b>
                      <FaExclamationCircle color="indianred" />
                    </div>
                  </div>
                </div>
              )}

              {!travellerDetailsFormSubmitted && (
                <DetailsFormNavigateButton unique_booking_id={uniqueId} />
              )}
            </>
          )}

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
