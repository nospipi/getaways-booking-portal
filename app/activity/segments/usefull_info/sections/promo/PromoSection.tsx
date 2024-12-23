import { FaShoppingCart } from "react-icons/fa";
import ProductSwiper from "./ProductSwiper";
import ExpandableSectionItem from "@/app/activity/segments/activity/sections/booking_info/ExpandableSectionItem.client";
import { FaInfoCircle } from "react-icons/fa";
import { IoCaretForwardOutline } from "react-icons/io5";
import getBookingByUniqueId from "@/app/server/server_actions/getBookingByUniqueId";

//---------------------------------------------------------

const PromoSection = async ({ id }: { id: string }) => {
  const booking = await getBookingByUniqueId(id);

  return (
    <section className="section-container">
      <header className="section-title-container">
        Book your next tour with Getaways !
      </header>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <FaShoppingCart size={15} />
          </div>
          <div className="section-content-text-container">
            <div>
              Use the promo code :&nbsp;
              <b
                style={{
                  color: "darkgreen",
                }}
              >
                PROMO_APP
              </b>
              &nbsp; during the checkout process to get a <b>15%</b> discount on
              your next booking
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
              gap: "10px",
              height: "100%",
            }}
          >
            <div className="section-content-icon-container">
              <FaInfoCircle size={15} />
            </div>
            <div className="section-content-text-container">
              Redeeming coupon code instructions
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
              padding: "10px",
              backgroundColor: "whitesmoke",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <div className="ca">
              <IoCaretForwardOutline
                size={11}
                style={{
                  marginRight: "5px",
                }}
              />
              <span>
                Browse through the variety of guided tours below and click
                &quot;Book Now&quot; to see more details and make a reservation
              </span>
            </div>
            <div>
              <IoCaretForwardOutline
                size={11}
                style={{
                  marginRight: "5px",
                }}
              />
              <span>
                Add one or more tours to your cart after selecting preferred
                date,time and participants.
              </span>
            </div>
            <div>
              <IoCaretForwardOutline
                size={11}
                style={{
                  marginRight: "5px",
                }}
              />
              <span>
                When you have finished selecting your tours, click on the
                &quot;Checkout&quot; button to move on to the payment page.
              </span>
            </div>
            <div>
              <IoCaretForwardOutline
                size={11}
                style={{
                  marginRight: "5px",
                }}
              />
              <span>
                On the payment page, and after adding the traveller&apos;s
                information, locate the input field labeled &quot;Promo
                code&quot;
              </span>
            </div>
            <div>
              <IoCaretForwardOutline
                size={11}
                style={{
                  marginRight: "5px",
                }}
              />
              <span>
                Enter your coupon code in the input field and click apply.
              </span>
            </div>
            <div>
              <IoCaretForwardOutline
                size={11}
                style={{
                  marginRight: "5px",
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

        <div>
          <ProductSwiper products={JSON.stringify(booking.suggestedProducts)} />
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
