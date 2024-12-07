"use client";
import React, {
  useState,
  useEffect,
  useRef,
  Children,
  ReactElement,
} from "react";
import { MdExpandMore } from "react-icons/md";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";

//---------------------------------------------------------

const ExpandableSectionItem = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  const firstChild = Children.toArray(children)[0];
  const remainingChildren = Children.toArray(children).slice(1);

  const firstChildRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (firstChildRef.current) {
      const sectionContentTextContainer = firstChildRef.current.querySelector(
        ".section-content-text-container"
      );

      if (sectionContentTextContainer) {
        if (expanded) {
          sectionContentTextContainer.style.borderLeft = "2px solid #d67600";
        } else {
          sectionContentTextContainer.style.borderLeft = "2px solid #599cdf";
        }
      }
    }
  }, [expanded]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Button
        variant="contained"
        sx={{
          minHeight: "45px",
          maxHeight: "45px",
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: "10px",
          width: "100%",
          color: "black",
          backgroundColor: "transparent",
          borderRadius: "0px",
          boxShadow: "none",
          textTransform: "none",
        }}
        disableElevation
        onClick={() => setExpanded(!expanded)}
      >
        {React.isValidElement(firstChild) &&
          React.cloneElement(firstChild as ReactElement, {
            ref: firstChildRef,
          })}
        <motion.div
          animate={{ rotateX: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MdExpandMore size={20} />
        </motion.div>
      </Button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key={15}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              overflow: "hidden",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: expanded ? "auto" : 0,
              opacity: expanded ? 1 : 0,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            layout
          >
            {remainingChildren}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableSectionItem;
