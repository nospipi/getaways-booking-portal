import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { PiListPlusFill } from "react-icons/pi";
import { IoCaretForwardOutline } from "react-icons/io5";
import ExpandableSectionItem from "../booking_info/ExpandableSectionItem.client";
import Image from "next/image";
import moment from "moment";
import placeholder from "@/public/elementor-placeholder-image.webp";
const FILE_SERVE_BASE_URL = process.env.FILE_SERVE_BASE_URL;

//---------------------------------------------------------

const TourInfoSection = async ({ uniqueId }: { uniqueId: string }) => {
  const booking = await getBookingByUniqueId(uniqueId);
  const product_title = booking?.product?.platform_product_name;
  const hasImage = booking?.product.product_pictures[0]?.file_id ? true : false;
  const image_url = hasImage
    ? `${FILE_SERVE_BASE_URL}${booking.product.product_pictures[0].file_id}`
    : placeholder;

  return (
    <div className="modern-card" style={{ gridColumn: "span 2" }}>
      <div className="modern-card-header">
        <div className="modern-card-title">Tour Information</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">
            <BsFillCalendarCheckFill size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Date</div>
            <div className="modern-info-value">
              {moment(booking?.date).format("ddd, DD MMM YYYY")}
            </div>
          </div>
        </div>
        
        {/* Tour Product Card */}
        <div className="tour-product-card">
          <div className="tour-product-image-wrapper">
            <Image
              src={image_url}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(max-width: 800px) 100vw, 400px"
              alt={
                hasImage
                  ? booking?.product.product_pictures[0]?.alt
                  : "No image available"
              }
              quality={20}
            />
          </div>
          <div className="tour-product-details">
            <div className="tour-product-header">
              <MdTour size={20} style={{ color: "#667eea" }} />
              <h3 className="tour-product-name">{product_title}</h3>
            </div>
            {booking?.product?.product_short_description && (
              <p className="tour-product-description">
                {booking.product.product_short_description}
              </p>
            )}
          </div>
        </div>
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
              <FaCamera size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="modern-info-label">Highlights</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
              fontSize: "15px",
              padding: "16px 0 0 0",
              borderTop: "1px solid #252525",
              color: "#e5e5e5",
            }}
          >
            {booking?.product.highlights.map((highlight) => {
              return (
                <div key={highlight} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0" }}>
                  <IoCaretForwardOutline size={14} style={{ color: "#ffffff", flexShrink: 0, marginTop: "2px" }} /> 
                  <span>{highlight}</span>
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
              gap: "12px",
              padding: "12px 0",
            }}
          >
            <div className="modern-info-icon">
              <FaInfoCircle size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="modern-info-label">Know Before You Go</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
              fontSize: "15px",
              padding: "16px 0 0 0",
              borderTop: "1px solid #252525",
              color: "#e5e5e5",
            }}
          >
            {booking?.product?.additional_info?.map((additional_info) => {
              return (
                <div key={additional_info} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0" }}>
                  <IoCaretForwardOutline size={14} style={{ color: "#ffffff", flexShrink: 0, marginTop: "2px" }} />{" "}
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
              gap: "12px",
              padding: "12px 0",
            }}
          >
            <div className="modern-info-icon">
              <PiListPlusFill size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="modern-info-label">Special Instructions</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
              fontSize: "15px",
              padding: "16px 0 0 0",
              borderTop: "1px solid #252525",
              color: "#e5e5e5",
            }}
          >
            {booking?.product?.special_instructions?.map(
              (special_instruction) => {
                return (
                  <div key={special_instruction} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0" }}>
                    <IoCaretForwardOutline size={14} style={{ color: "#ffffff", flexShrink: 0, marginTop: "2px" }} />{" "}
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

export default TourInfoSection;
