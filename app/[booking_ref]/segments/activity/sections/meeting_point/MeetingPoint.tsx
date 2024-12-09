import getBooking from "@/app/server/server_actions/getBooking";
import { FaLocationDot } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Image from "next/image";
import ExpandableSectionItem from "../booking_info/ExpandableSectionItem.client";
import NavigateButton from "./NavigateButton";

//---------------------------------------------------------

const MeetingPoint = async ({ id }: { id: string }) => {
  const booking = await getBooking(id);
  const hasPickupLocation =
    booking?.pickup_location?.latitude && booking?.pickup_location?.longitude;
  const img_url = booking?.pickup_location?.img_url;

  return (
    <div className="section-container">
      <div className="section-title-container">Your Meeting Point</div>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <FaLocationDot size={15} />
          </div>
          <div
            className="section-content-text-container"
            style={{
              color: hasPickupLocation ? "black" : "indianred",
            }}
          >
            {hasPickupLocation
              ? booking.pickup_location.name
              : "TO BE ANNOUNCED"}
          </div>
        </div>
        {hasPickupLocation && (
          <NavigateButton
            url={`https://www.google.com.sa/maps/search/${booking.pickup_location.latitude},${booking.pickup_location.longitude}?hl=en`}
          />
        )}
        {hasPickupLocation && (
          <div className="section-content-item-container">
            <div className="section-content-icon-container">
              <FaInfoCircle size={15} />
            </div>
            <div className="section-content-text-container">
              {booking.pickup_location.instructions}
            </div>
          </div>
        )}

        {img_url && (
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
                <FaEye size={16} />
              </div>
              <div className="section-content-text-container">
                See your meeting point
              </div>
            </div>
            <Image
              src={img_url}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "2px",
                objectFit: "cover",
              }}
              width={0}
              height={0}
              sizes="(max-width: 800px) 100vw, 800px"
              alt="No image available"
              quality={20}
            />
          </ExpandableSectionItem>
        )}
      </div>
    </div>
  );
};

export default MeetingPoint;
