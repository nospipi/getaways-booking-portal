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
          className="section-content-item-container"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
        >
          <div className="section-content-icon-container">
            <FaThumbsUp style={{ color: "darkgreen" }} size={15} />
          </div>
          <div
            className="section-content-text-container"
            style={{
              color: "darkgreen",
            }}
          >
            <span
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              You have confirmed
              <i
                style={{
                  fontSize: "18px",
                }}
              >
                👏
              </i>
            </span>
            <div />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={2}
          className="section-content-item-container"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
        >
          <div className="section-content-icon-container">
            <FaHourglassStart style={{ color: "indianred" }} size={15} />
          </div>
          <div
            className="section-content-text-container"
            style={{
              color: "indianred",
            }}
          >
            PENDING
            <div />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InterchangableConfirmSection;
