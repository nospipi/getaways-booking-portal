"use client";
import { useInView } from "react-intersection-observer";

//---------------------------------------------------------

const BottomViewTarget = () => {
  const { ref } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        //write SCROLLED_TO_BOTTOM action
      }
    },
    //rootMargin: "0px 0px 100px 0px",
  });

  return (
    <div
      ref={ref}
      style={{
        marginTop: "-50px",
        height: 0,
      }}
    />
  );
};

export default BottomViewTarget;
