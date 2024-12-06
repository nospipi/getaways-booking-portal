"use client";
import { useState, Children } from "react";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";

//---------------------------------------------------------

const ExpandableSectionItem = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  const firstChild = Children.toArray(children)[0];
  const remainingChildren = Children.toArray(children).slice(1);

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
          zIndex: 600,
          textTransform: "none",
        }}
        disableElevation
        onClick={() => setExpanded(!expanded)}
      >
        {firstChild}
        <MdExpandMore size={18} />
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
