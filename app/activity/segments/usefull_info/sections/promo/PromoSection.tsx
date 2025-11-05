import { FaShoppingCart } from "react-icons/fa";
import ProductCarousel from "./ProductCarousel.client";
import ExpandableSectionItem from "@/app/activity/segments/activity/sections/booking_info/ExpandableSectionItem.client";
import { FaInfoCircle } from "react-icons/fa";
import { IoCaretForwardOutline } from "react-icons/io5";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";

//---------------------------------------------------------

const PromoSection = async ({ id }: { id: string }) => {
  const booking = await getBookingByUniqueId(id);

  return (
    <div className="modern-card promo-section-card">
      <div className="modern-card-header">
        <div className="modern-card-title">Book Your Next Tour</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">
            <FaShoppingCart size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Promo Code</div>
            <div className="modern-info-value" style={{ fontSize: "14px", color: "#4a4a4a" }}>
              Use the code <b style={{ color: "#667eea", fontWeight: "600" }}>PROMO_APP</b> during checkout to get a <b style={{ color: "#667eea" }}>15%</b> discount
            </div>
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
              <FaInfoCircle size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="modern-info-label">Redeeming Instructions</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
              fontSize: "14px",
              padding: "16px 0 0 0",
              borderTop: "1px solid #e0e0e0",
              color: "#4a4a4a",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0" }}>
              <IoCaretForwardOutline
                size={14}
                style={{
                  color: "#667eea",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <span>
                Browse through the variety of guided tours below and click
                &quot;Book Now&quot; to see more details and make a reservation
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0" }}>
              <IoCaretForwardOutline
                size={14}
                style={{
                  color: "#667eea",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <span>
                Add one or more tours to your cart after selecting preferred
                date,time and participants.
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0" }}>
              <IoCaretForwardOutline
                size={14}
                style={{
                  color: "#667eea",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <span>
                When you have finished selecting your tours, click on the
                &quot;Checkout&quot; button to move on to the payment page.
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0" }}>
              <IoCaretForwardOutline
                size={14}
                style={{
                  color: "#667eea",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <span>
                On the payment page, and after adding the traveller&apos;s
                information, locate the input field labeled &quot;Promo
                code&quot;
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0" }}>
              <IoCaretForwardOutline
                size={14}
                style={{
                  color: "#667eea",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <span>
                Enter your coupon code in the input field and click apply.
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0" }}>
              <IoCaretForwardOutline
                size={14}
                style={{
                  color: "#667eea",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <span>
                The system will automatically apply a 15% discount on the value
                of each ordered product once the coupon code is successfully
                validated, and you can proceed to complete your order.
              </span>
            </div>
          </div>
        </ExpandableSectionItem>

        <div style={{ marginTop: "16px" }}>
          <ProductCarousel products={JSON.stringify(booking.suggestedProducts)} />
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
