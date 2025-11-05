"use client";

import { FaThumbsUp } from "react-icons/fa6";
import { FaHourglassStart } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
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
            background: "#f8f9fa",
            border: "1px solid #e0e0e0",
          }}
        >
          <div className="modern-info-icon" style={{ background: "#31B311" }}>
            <FaThumbsUp size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Status</div>
            <div
              style={{
                fontSize: "15px",
                color: "#257C0F",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Confirmed</span>
              <FaHandsClapping size={18} />
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
            background: "#f8f9fa",
            border: "1px solid #e0e0e0",
          }}
        >
          <div className="modern-info-icon">
            <FaHourglassStart size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="modern-info-label">Status</div>
            <div
              style={{
                fontSize: "15px",
                color: "#ff6b6b",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Pending confirmation</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InterchangableConfirmSection;
