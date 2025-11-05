"use client";
import React, {
  useState,
  useEffect,
  useRef,
  Children,
  ReactElement,
} from "react";
import { MdExpandMore } from "react-icons/md";
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
      ) as HTMLElement;

      if (sectionContentTextContainer) {
        if (expanded) {
          sectionContentTextContainer.style.borderLeft = "2px solid #667eea";
        } else {
          sectionContentTextContainer.style.borderLeft = "none";
        }
      }
    }
  }, [expanded]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <header
        style={{
          minHeight: "45px",
        }}
      >
        <button
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          style={{
            height: "100%",
            padding: 0,
            paddingRight: "10px",
            width: "100%",
            color: "#1a1a1a",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
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
        </button>
      </header>
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
    </section>
  );
};

export default ExpandableSectionItem;
