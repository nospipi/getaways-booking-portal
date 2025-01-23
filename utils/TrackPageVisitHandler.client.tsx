"use client";
import { useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
//import { useFingerprint } from "./FingerprintProvider.client";
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
import addOpenSession from "@/app/server/server_actions/addOpenSession";
import { throttle } from "lodash";
import useCookieYesConsent from "@/utils/UseCookieYesConsent";
import confirmBookingByUniqueId from "@/app/server/server_actions/confirmBookingByUniqueId";
import { escape } from "validator";
import toast from "react-hot-toast";

//---------------------------------------------------------

const TrackPageVisitHandler = () => {
  const cookieYesConsent = useCookieYesConsent();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? "";
  const uniqueId = searchParams.get("uniqueId") ?? "";
  const confirmUniqueId = searchParams.get("confirm") ?? "";
  const sanitizedRef = escape(ref);
  const sanitizedUniqueId = escape(uniqueId);
  const sanitizedConfirmUniqueId = escape(confirmUniqueId);

  if (sanitizedConfirmUniqueId) {
    console.log("IS_AUTO_CONFIRM", confirmUniqueId);
  }

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

  //we construct formData object to send along with the beacon request as it does not stringify objects by default
  const formData = useMemo(() => {
    const data = new FormData();
    data.append("ref", sanitizedRef);
    data.append("uniqueId", sanitizedUniqueId);
    return data;
  }, [sanitizedRef, sanitizedUniqueId]);

  useEffect(() => {
    const handleConfirm = async () => {
      try {
        await confirmBookingByUniqueId(sanitizedConfirmUniqueId);
        router.refresh(); // rehydrate
      } catch (e) {
        console.log(e?.toString());
        toast.error(e?.toString() || "An error occurred");
      }
    };

    if (sanitizedConfirmUniqueId) {
      handleConfirm();
    }

    const handleAddOpenSession = async () => {
      try {
        if (cookieYesConsent?.categories?.analytics) {
          await addOpenSession(
            sanitizedRef,
            sanitizedUniqueId,
            platform,
            osName,
            osVersion,
            browserName,
            browserVersion,
            mobileVendor,
            mobileModel
          );
        } else {
          console.log("No consent for analytics");
        }
      } catch (e) {
        console.log(e);
      }
    };

    const handleInteraction = async () => {
      if (cookieYesConsent?.categories?.analytics) {
        navigator.sendBeacon(`/server/api/refresh_open_session`, formData);
      } else {
        console.log("No consent for analytics");
      }
    };
    const throttledInteraction = throttle(handleInteraction, 1500); //max 1 request every 1.5 seconds

    if (sanitizedUniqueId || sanitizedRef) {
      const handleVisibilityChange = async () => {
        if (document.visibilityState === "visible") {
          await handleAddOpenSession();
        } else {
          //server action does not work here because
          //it does not have enough time to execute before the page is closed
          //beacon guarantees that the request will be sent before the page is fully unloaded
          //so we sent a beacon to a route in our own server that closes the session on our behalf in the backend
          if (cookieYesConsent?.categories?.analytics) {
            navigator.sendBeacon(`/server/api/close_session`, formData);
          } else {
            console.log("No consent for analytics");
          }
        }
      };

      handleVisibilityChange();
      document.addEventListener("visibilitychange", handleVisibilityChange);

      document.addEventListener("pointermove", throttledInteraction);
      document.addEventListener("pointerup", throttledInteraction);
      document.addEventListener("scroll", throttledInteraction);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        document.removeEventListener("pointermove", throttledInteraction);
        document.removeEventListener("pointerup", throttledInteraction);
        document.removeEventListener("scroll", throttledInteraction);
      };
    }
  }, [
    sanitizedUniqueId,
    sanitizedRef,
    formData,
    platform,
    cookieYesConsent,
    sanitizedConfirmUniqueId,
  ]);
  return null;
};

export default TrackPageVisitHandler;
