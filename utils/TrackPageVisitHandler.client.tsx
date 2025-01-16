"use client";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
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

//---------------------------------------------------------

const TrackPageVisitHandler = () => {
  const searchParams = useSearchParams();

  const ref = searchParams.get("ref") ?? "";
  const uniqueId = searchParams.get("uniqueId") ?? "";

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
    data.append("ref", ref);
    data.append("uniqueId", uniqueId);
    return data;
  }, [ref, uniqueId]);

  useEffect(() => {
    const handleAddOpenSession = async () => {
      try {
        await addOpenSession(
          ref,
          uniqueId,
          platform,
          osName,
          osVersion,
          browserName,
          browserVersion,
          mobileVendor,
          mobileModel
        );
      } catch (e) {
        console.log(e);
      }
    };

    const handleInteraction = async () => {
      navigator.sendBeacon(`/server/api/refresh_open_session`, formData);
    };
    const throttledInteraction = throttle(handleInteraction, 1500); //max 1 request every 1.5 seconds

    if (uniqueId || ref) {
      const handleVisibilityChange = async () => {
        if (document.visibilityState === "visible") {
          await handleAddOpenSession();
        } else {
          //server action does not work here because
          //it does not have enough time to execute before the page is closed
          //beacon guarantees that the request will be sent before the page is fully unloaded
          //so we sent a beacon to a route in our own server that closes the session on our behalf in the backend
          navigator.sendBeacon(`/server/api/close_session`, formData);
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
  }, [uniqueId, ref, formData, platform]);
  return null;
};

export default TrackPageVisitHandler;
