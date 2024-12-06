import getBooking from "@/app/server/server_actions/getBooking";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { MdTour } from "react-icons/md";
import ExpandableSectionItem from "../booking_info/ExpandableSectionItem.client";
import Image from "next/image";
import moment from "moment";

//---------------------------------------------------------

const TourInfoSection = async ({ id }: { id: string }) => {
  const booking = await getBooking(id);
  const product_title = booking?.product?.platform_product_name;
  return (
    <div className="section-container">
      <div className="section-title-container">Your Getaways Tour Info</div>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <BsFillCalendarCheckFill size={14} />
          </div>
          <div className="section-content-text-container">
            {moment(booking?.date).format("ddd, DD MMM YYYY")}
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
              <MdTour size={19} />
            </div>
            <div className="section-content-text-container">
              {product_title}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              gap: "10px",
            }}
          >
            <Image
              src={booking?.product.product_images[0]}
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
              // alt={imageSource?.alt || "No image available"}
              // title={imageSource?.alt || "No image available"}
            />
            <span
              style={{
                fontSize: "14px",
              }}
            >
              {booking?.product.product_short_description}
            </span>
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
              <MdTour size={19} />
            </div>
            <div className="section-content-text-container">
              {product_title}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              gap: "10px",
            }}
          >
            <Image
              src={booking?.product.product_images[0]}
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
              // alt={imageSource?.alt || "No image available"}
              // title={imageSource?.alt || "No image available"}
            />
            <span
              style={{
                fontSize: "14px",
              }}
            >
              {booking?.product.product_short_description}
            </span>
          </div>
        </ExpandableSectionItem>
      </div>
    </div>
  );
};

export default TourInfoSection;
