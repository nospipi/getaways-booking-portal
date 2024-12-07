import getBooking from "@/app/server/server_actions/getBooking";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdTour } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { PiListPlusFill } from "react-icons/pi";
import { IoCaretForwardOutline } from "react-icons/io5";
import ExpandableSectionItem from "../booking_info/ExpandableSectionItem.client";
import Image from "next/image";
import moment from "moment";
import placeholder from "@/public/elementor-placeholder-image.webp";

//---------------------------------------------------------

const MeetingPointSection = async ({ id }: { id: string }) => {
  const booking = await getBooking(id);
  const product_title = booking?.product?.platform_product_name;
  const hasPickupLocation =
    booking?.pickup_location?.latitude && booking?.pickup_location?.longitude;

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
              <FaCamera size={15} />
            </div>
            <div className="section-content-text-container">Highlights</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              gap: "10px",
              fontSize: "14px",
              borderLeft: "2px solid #599cdf",
              padding: "10px",
              backgroundColor: "whitesmoke",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            {booking?.product.highlights.map((highlight, index) => {
              return (
                <div key={highlight}>
                  <IoCaretForwardOutline size={11} /> <span>{highlight}</span>
                </div>
              );
            })}
          </div>
        </ExpandableSectionItem>
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
              <FaInfoCircle size={15} />
            </div>
            <div className="section-content-text-container">
              Know Before You Go
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              gap: "10px",
              fontSize: "14px",
              borderLeft: "2px solid #599cdf",
              paddingLeft: "10px",
              padding: "10px",
              backgroundColor: "whitesmoke",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            {booking?.product.additional_info.map((additional_info, index) => {
              return (
                <div key={additional_info}>
                  <IoCaretForwardOutline size={11} />{" "}
                  <span>{additional_info}</span>
                </div>
              );
            })}
          </div>
        </ExpandableSectionItem>
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
              <PiListPlusFill size={17} />
            </div>
            <div className="section-content-text-container">
              Special Instructions
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              gap: "10px",
              fontSize: "14px",
              borderLeft: "2px solid #599cdf",
              paddingLeft: "10px",
              padding: "10px",
              backgroundColor: "whitesmoke",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            {booking?.product.special_instructions.map(
              (special_instruction, index) => {
                return (
                  <div key={special_instruction}>
                    <IoCaretForwardOutline size={11} />{" "}
                    <span>{special_instruction}</span>
                  </div>
                );
              }
            )}
          </div>
        </ExpandableSectionItem>
      </div>
    </div>
  );
};

export default MeetingPointSection;
