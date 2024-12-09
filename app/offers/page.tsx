import ExpandableSectionItem from "../[booking_ref]/segments/activity/sections/booking_info/ExpandableSectionItem.client";
import { FaInfoCircle } from "react-icons/fa";
import { IoCaretForwardOutline } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import BackButton from "./BackButton.client";
const BOKUN_LIST_68121 = process.env.BOKUN_LIST_68121;

//---------------------------------------------------------

const Page = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  //   const { booking_ref } = await params;
  //   const bookingIds = (await getBookingIds(booking_ref)) as string[];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="content-container">
          <div className="content-container-wrapper">
            <BackButton />
            <div className="section-content-item-container">
              <div className="section-content-icon-container">
                <IoMdCart size={18} />
              </div>
              <div
                className="section-content-text-container"
                dangerouslySetInnerHTML={{
                  __html:
                    "<span>Use the promo code : <b>PROMO_APP</b> during the checkout process to get a 15% discount on your next booking</span>",
                }}
              />
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
                  <span>Browse through the variety of guided tours below</span>
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
                    "Checkout" button to move on to the payment page.
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
                    On the payment page,and after adding the traveller's
                    information, locate the input field labeled "Promo code"
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
                    The system will automatically apply a 15% discount on the
                    value of each ordered product once the coupon code is
                    successfully validated,and you can proceed to complete your
                    order.
                  </span>
                </div>
              </div>
            </ExpandableSectionItem>
            <div
              className="bokunWidget"
              data-src={BOKUN_LIST_68121}
              style={{
                overflowX: "hidden",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

//---------------------------------------------------------
