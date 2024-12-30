"use client";
import { useEffect } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
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
  const searchParams = useSearchParams();

  const ref = searchParams.get("ref") ?? "";
  const uniqueId = searchParams.get("uniqueId") ?? "";

  console.log("Ref client:", ref, "Unique ID client:", uniqueId);
  const fingerprint = useFingerprint();

  //we construct formData object to send along with the beacon request as it does not support objects
  const formData = new FormData();
  formData.append("ref", ref);
  formData.append("uniqueId", uniqueId);

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
    if (uniqueId || ref) {
      console.log("Fingerprint:", fingerprint, "param:", uniqueId);
      const handleVisibilityChange = () => {
        //console.log(document.visibilityState, ref);
        if (document.visibilityState === "visible") {
          console.log("Visible");
          navigator.sendBeacon(`/server/api/open_session`, formData);

          //  navigator.sendBeacon(`/server/api/open_session`, {
          //    ref,
          //    uniqueId,
          //  });

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
          console.log("Hidden");
          // closeSessionToDb(ref as string);
          navigator.sendBeacon(`/server/api/close_session`, formData);
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
  }, [uniqueId, ref, fingerprint]);
  return null;
};

export default TrackPageVisitHandler;
