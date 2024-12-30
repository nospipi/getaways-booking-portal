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

//---------------------------------------------------------

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
    data.append("platform", platform);
    data.append("osName", osName);
    data.append("osVersion", osVersion);
    data.append("browserName", browserName);
    data.append("browserVersion", browserVersion);
    data.append("mobileVendor", mobileVendor);
    data.append("mobileModel", mobileModel);
    return data;
  }, [ref, uniqueId, platform]);

  useEffect(() => {
    if (uniqueId || ref) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          navigator.sendBeacon(`/server/api/open_session`, formData);
        } else {
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
  }, [uniqueId, ref, formData]);
  return null;
};

export default TrackPageVisitHandler;
