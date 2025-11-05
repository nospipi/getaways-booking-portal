import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import { FaLocationDot } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Image from "next/image";
import moment from "moment";
import ConfirmStatusSection from "./confirm/ConfirmStatusSection";
import ExpandableSectionItem from "../booking_info/ExpandableSectionItem.client";
import NavigateButton from "./NavigateButton";
import { Suspense } from "react";

//---------------------------------------------------------

const MeetingPoint = async ({ uniqueId }: { uniqueId: string }) => {
  const booking = await getBookingByUniqueId(uniqueId);
  const hasPickupLocation =
    booking?.pickup_location?.latitude && booking?.pickup_location?.longitude;
  const img_url = booking?.pickup_location?.img_url;

  const hasPickupTime = booking?.pickup_time?.length > 0;
  const time = moment(booking?.pickup_time, "HH:mm").format("h:mm A");

  const shouldShowConfirmButton =
    booking?.pickup_location?.name &&
    booking.pickup_location.name.length > 0 &&
    booking?.pickup_time?.length > 0;

  return (
    <div className="modern-card">
      <div className="modern-card-header">
        <div className="modern-card-title">Meeting Point & Time</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">
            <FaLocationDot size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Location</div>
            <div
              className="modern-info-value"
              style={{
                color: hasPickupLocation ? "#ffffff" : "#ff6b6b",
                fontWeight: hasPickupLocation ? "500" : "600",
              }}
            >
              {hasPickupLocation
                ? booking.pickup_location.name
                : "To be announced"}
            </div>
          </div>
        </div>

        <div className="modern-info-row">
          <div className="modern-info-icon">
            <MdOutlineAccessTimeFilled size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Time</div>
            <div
              className="modern-info-value"
              style={{
                color: hasPickupTime ? "#ffffff" : "#ff6b6b",
                fontWeight: hasPickupTime ? "500" : "600",
              }}
            >
              {hasPickupTime ? time : "To be announced"}
            </div>
          </div>
        </div>

        {shouldShowConfirmButton && (
          <div style={{ marginTop: "8px" }}>
            <ConfirmStatusSection uniqueId={uniqueId} />
          </div>
        )}
        {hasPickupLocation && (
          <>
            <Suspense>
              <div style={{ marginTop: "8px" }}>
                <NavigateButton
                  url={`https://www.google.com.sa/maps/search/${booking.pickup_location.latitude},${booking.pickup_location.longitude}?hl=en`}
                />
              </div>
            </Suspense>
            {booking.pickup_location.instructions && (
              <div className="modern-info-row">
                <div className="modern-info-icon">
                  <FaInfoCircle size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="modern-info-label">Instructions</div>
                  <div className="modern-info-value" style={{ fontSize: "14px", lineHeight: "1.6", color: "#e5e5e5" }}>
                    {booking.pickup_location.instructions}
                  </div>
                </div>
              </div>
            )}
            {img_url && (
              <div style={{ marginTop: "16px" }}>
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
                      <FaEye size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="modern-info-label">Meeting Point Image</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "16px", borderTop: "1px solid #252525", paddingTop: "16px" }}>
                    <Image
                      src={img_url}
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "200px",
                        objectFit: "cover",
                      }}
                      width={0}
                      height={0}
                      sizes="(max-width: 800px) 100vw, 800px"
                      alt="Meeting point"
                      quality={20}
                    />
                  </div>
                </ExpandableSectionItem>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MeetingPoint;
