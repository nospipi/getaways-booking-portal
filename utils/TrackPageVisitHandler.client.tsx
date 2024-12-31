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

//---------------------------------------------------------

//wrapped in Suspense because it accesses useSearchParams hook
//https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
const TrackPageVisitHandler = () => {
  const searchParams = useSearchParams();

  const ref = searchParams.get("ref") ?? "";
  const uniqueId = searchParams.get("uniqueId") ?? "";

  console.log("Ref client:", ref, "Unique ID client:", uniqueId);

  //we construct formData object to send along with the beacon request as it does not support objects
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
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, [uniqueId, ref, formData, platform]);
  return null;
};

export default TrackPageVisitHandler;
