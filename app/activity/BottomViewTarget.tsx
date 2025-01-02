"use client";
import { useInView } from "react-intersection-observer";
import useAddUserAction from "@/app/useAddUserAction";

//---------------------------------------------------------

const BottomViewTarget = () => {
  const { triggerUserAction } = useAddUserAction();
  const { ref } = useInView({
    triggerOnce: true,
    onChange: async (inView) => {
      if (inView) {
        //write SCROLLED_TO_BOTTOM action
        await triggerUserAction("SCROLLED_TO_BOTTOM");
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
