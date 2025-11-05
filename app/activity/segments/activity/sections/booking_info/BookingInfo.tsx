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
    <div className="modern-card">
      <div className="modern-card-header">
        <div className="modern-card-title">Booking Details</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">👤</div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Name</div>
            <div className="modern-info-value">{booking.client_name}</div>
          </div>
        </div>
        <div className="modern-info-row">
          <div className="modern-info-icon">🎫</div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Seats</div>
            <div className="modern-info-value">
              <span style={{ fontWeight: "600" }}>{seats}</span>
              <span style={{ color: "#888888", marginLeft: "8px" }}>
                ({tickets.join(", ")})
              </span>
            </div>
          </div>
        </div>

        {requiresTravellerDetails && (
          <>
            {travellerDetailsFormSubmitted ? (
              <div style={{ marginTop: "8px" }}>
                <ExpandableSectionItem>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      gap: "12px",
                      padding: "12px 0",
                    }}
                  >
                    <div className="modern-info-icon">
                      <IoDocumentText size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="modern-info-label">Traveller Details</div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#ffffff",
                          fontSize: "15px",
                        }}
                      >
                        <span>Form submitted</span>
                        <FaCheck size={14} />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: "12px",
                      padding: "16px 0 0 0",
                      borderTop: "1px solid #252525",
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
              </div>
            ) : (
              <div className="modern-info-row">
                <div className="modern-info-icon">
                  <IoDocumentText size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="modern-info-label">Traveller Details</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#ff6b6b",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    <span>Not provided</span>
                    <FaExclamationCircle size={14} />
                  </div>
                </div>
              </div>
            )}

            {!travellerDetailsFormSubmitted && (
              <div style={{ marginTop: "8px" }}>
                <DetailsFormNavigateButton unique_booking_id={uniqueId} />
              </div>
            )}
          </>
        )}

        <PickupInputStateContextProvider
          shouldPromptLocation={shouldPromptLocation}
        >
          {shouldShowLocation && (
            <div className="modern-info-row">
              <div className="modern-info-icon">🏨</div>
              <div style={{ flex: 1 }}>
                <div className="modern-info-label">Hotel / Location</div>
                <div className="modern-info-value">
                  {booking.client_location || (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#ff6b6b",
                      }}
                    >
                      <span>Not provided</span>
                      <FaExclamationCircle size={14} />
                    </span>
                  )}
                  {!shouldPromptLocation && <EditButton />}
                </div>
              </div>
            </div>
          )}

          <PickupInputContainer
            booking_id={booking._id.toString()}
            client_location={booking.client_location || ""}
          />
        </PickupInputStateContextProvider>
      </div>
    </div>
  );
};

export default BookingInfo;
