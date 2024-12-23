"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useFingerprint } from "./FingerprintProvider.client";
import {
  isMobile,
  isTablet,
  isDesktop,
  isBrowser,
  osName,
  osVersion,
  browserName,
  browserVersion,
  mobileVendor,
  mobileModel,
} from "react-device-detect";

//---------------------------------------------------------

const TrackPageVisitHandler = () => {
  const { booking_ref } = useParams();
  const fingerprint = useFingerprint();

  const platform = Object.keys({
    isMobile,
    isTablet,
    isDesktop,
    isBrowser,
  })
    .filter((key) => {
      return {
        isMobile,
        isTablet,
        isDesktop,
        isBrowser,
      }[key];
    })[0]
    .replace("is", "");
  //returns Desktop | Mobile | Tablet | Browser

  useEffect(() => {
    if (fingerprint && booking_ref) {
      console.log("Fingerprint:", fingerprint, "Booking ref:", booking_ref);
      const handleVisibilityChange = () => {
        //console.log(document.visibilityState, ref);
        if (document.visibilityState === "visible") {
          navigator.sendBeacon(
            `http://localhost:3000/api/modify/page_visit/${fingerprint}/${booking_ref}`
          );
          //  openSessionToDb(ref, {
          //    platform,
          //    osName,
          //    osVersion,
          //    browserName,
          //    browserVersion,
          //    mobileVendor,
          //    mobileModel,
          //  });
        } else {
          // closeSessionToDb(ref as string);
          navigator.sendBeacon(
            `http://localhost:3000/api/modify/page_leave/${fingerprint}/${booking_ref}`
          );
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
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        //  document.removeEventListener("pagehide", handlePageHide);
        //  document.removeEventListener("beforeunload", handleBeforeUnload);
        //  document.removeEventListener("unload", handleUnload);
      };
    }
  }, [booking_ref, fingerprint, booking_ref]);
  return null;
};

export default TrackPageVisitHandler;
