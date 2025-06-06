import { MdOutlinePhoneAndroid } from "react-icons/md";
import Link from "next/link";
import SimButton from "./SimButton.client";
import { Suspense } from "react";

//---------------------------------------------------------

const SimSection = () => {
  return (
    <section className="section-container">
      <header className="section-title-container">
        Looking for an e-Sim phone number for your trip ?
      </header>
      <div className="section-content-container">
        <div className="section-content-item-container">
          <div className="section-content-icon-container">
            <MdOutlinePhoneAndroid size={20} />
          </div>
          <div className="section-content-text-container">
            Buy an international virtual eSIM card with unlimited data, stay
            connected wherever you go, and avoid expensive phone bills on your
            trip
          </div>
        </div>
        <aside className="section-content-item-button-container">
          <Link
            //href={"https://connectphone.eu/download-app"}
            href={"https://connectphone.eu/product/greece-e-sim-100-data/"}
            target="_blank"
            style={{
              width: "100%",
            }}
          >
            <Suspense>
              {/* wrapped in Suspense because it accesses useSearchParams hook */}
              {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
              <SimButton />
            </Suspense>
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default SimSection;
