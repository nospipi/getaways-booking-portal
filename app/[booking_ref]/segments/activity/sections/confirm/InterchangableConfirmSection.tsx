"use client";

import { FaThumbsUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
//import { useSearchParams } from "next/navigation";

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
            <FaThumbsUp style={{ color: "#6A914F" }} size={15} />
          </div>
          <div
            className="section-content-text-container"
            style={{
              color: "#6A914F",
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
            <FaThumbsUp style={{ color: "indianred" }} size={15} />
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
