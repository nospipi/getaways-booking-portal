"use client";

import { useCallback } from "react";
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
import {
  addUserActionByRef,
  addUserActionByUniqueId,
} from "@/app/server/server_actions/addUserAction";
import {
  UserActionType,
  UserActionData,
} from "@/app/server/getaways-shared-models/schemas/portalSessionSchema";
import { useSearchParams } from "next/navigation";

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

  //---------------------------------------------------------

  const triggerUserAction = useCallback(
    async (action: UserActionType, data?: UserActionData) => {
      try {
        if (ref) {
          await addUserActionByRef(
            ref,
            action,
            platform,
            osName,
            osVersion,
            browserName,
            browserVersion,
            mobileVendor,
            mobileModel,
            data
          );
        }

        if (!ref && uniqueId) {
          await addUserActionByUniqueId(
            uniqueId,
            action,
            platform,
            osName,
            osVersion,
            browserName,
            browserVersion,
            mobileVendor,
            mobileModel,
            data
          );
        }
      } catch (error) {
        console.error("Error adding user action:", error);
      }
    },
    [ref, uniqueId, platform]
  );

  return { triggerUserAction };
};

export default useAddUserAction;
