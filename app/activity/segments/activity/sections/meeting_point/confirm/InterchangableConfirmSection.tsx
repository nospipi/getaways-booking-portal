"use client";

import { FaThumbsUp } from "react-icons/fa6";
import { FaHourglassStart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


//---------------------------------------------------------

const InterchangableConfirmSection = ({
  isConfirmed,
}: {
  isConfirmed: boolean;
}) => {
  //   const params = useSearchParams();
  //   const confirmed = params.get("confirmed") === "true" || confirmedOnServer;
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isConfirmed ? (
        <motion.div
          key={1}
          className="modern-info-row"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          style={{
            padding: "16px",
            background: "#1a1a1a",
            border: "1px solid #252525",
          }}
        >
          <div className="modern-info-icon">
            <FaThumbsUp style={{ color: "#ffffff" }} size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Status</div>
            <div
              style={{
                fontSize: "15px",
                color: "#ffffff",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Confirmed</span>
              <span style={{ fontSize: "18px" }}>👏</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={2}
          className="modern-info-row"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          style={{
            padding: "16px",
            background: "#1a1a1a",
            border: "1px solid #252525",
          }}
        >
          <div className="modern-info-icon">
            <FaHourglassStart style={{ color: "#ffffff" }} size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Status</div>
            <div
              style={{
                fontSize: "15px",
                color: "#ff6b6b",
                fontWeight: "600",
              }}
            >
              Pending confirmation
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InterchangableConfirmSection;
