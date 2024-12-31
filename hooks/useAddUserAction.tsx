"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
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
import addUserAction from "@/app/server/server_actions/addUserAction";
import { UserActionType } from "@/app/server/getaways-shared-models/schemas/portalSessionSchema";

//---------------------------------------------------------

const useAddUserAction = () => {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? null;
  const uniqueId = searchParams.get("uniqueId") ?? null;

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

  const triggerUserAction = useCallback(
    async (action: UserActionType) => {
      try {
        // Trigger the server action with the gathered data
        const result = await addUserAction(
          ref,
          uniqueId,
          action,
          platform,
          osName,
          osVersion,
          browserName,
          browserVersion,
          mobileVendor,
          mobileModel
        );
        console.log("User action added successfully:", result);
      } catch (error) {
        console.error("Error adding user action:", error);
      }
    },
    [ref, uniqueId, platform]
  );

  return { triggerUserAction };
};

export default useAddUserAction;
