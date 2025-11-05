import { MdOutlinePhoneAndroid } from "react-icons/md";
import Link from "next/link";
import SimButton from "./SimButton.client";
import { Suspense } from "react";

//---------------------------------------------------------

const SimSection = () => {
  return (
    <div className="modern-card">
      <div className="modern-card-header">
        <div className="modern-card-title">e-SIM for Your Trip</div>
      </div>
      <div className="modern-card-content">
        <div className="modern-info-row">
          <div className="modern-info-icon">
            <MdOutlinePhoneAndroid size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Stay Connected</div>
            <div
              className="modern-info-value"
              style={{ fontSize: "14px", color: "#4a4a4a" }}
            >
              Buy an international virtual eSIM card with unlimited data, stay
              connected wherever you go, and avoid expensive phone bills
            </div>
          </div>
        </div>
        <div style={{ marginTop: "8px" }}>
          <Link
            href={"https://connectphone.eu/"}
            target="_blank"
            style={{
              width: "100%",
              display: "block",
            }}
          >
            <Suspense>
              <SimButton />
            </Suspense>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimSection;
