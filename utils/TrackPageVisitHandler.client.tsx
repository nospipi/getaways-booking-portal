"use client";
import { useEffect } from "react";

//---------------------------------------------------------

const TrackPageVisitHandler = ({
  booking_ref,
}: {
  booking_ref: string | undefined;
}) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      //console.log(document.visibilityState, ref);
      if (document.visibilityState === "visible") {
        if (booking_ref) {
          console.log("User is active on the page", booking_ref);
          //  openSessionToDb(ref, {
          //    platform,
          //    osName,
          //    osVersion,
          //    browserName,
          //    browserVersion,
          //    mobileVendor,
          //    mobileModel,
          //  });
        }
      } else {
        console.log("User is NOT active on the page", booking_ref);
        // closeSessionToDb(ref as string);
      }
    };
    //    const handlePageHide = () => {
    //      closeSessionToDb(ref as string);
    //    };

    //    const handleBeforeUnload = () => {
    //      closeSessionToDb(ref as string);
    //    };

    //    const handleUnload = () => {
    //      closeSessionToDb(ref as string);
    //    };

    // Invoke the visibility change handler immediately is needed to trigger if (document.visibilityState === "visible") on page load
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    //    document.addEventListener("pagehide", handlePageHide);
    //    document.addEventListener("beforeunload", handleBeforeUnload);
    //    document.addEventListener("unload", handleUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      //  document.removeEventListener("pagehide", handlePageHide);
      //  document.removeEventListener("beforeunload", handleBeforeUnload);
      //  document.removeEventListener("unload", handleUnload);
    };
  }, [booking_ref]);
  return null;
};

export default TrackPageVisitHandler;
