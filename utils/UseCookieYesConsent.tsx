"use client";

import { useState, useEffect } from "react";

interface CookieYesConsent {
  activeLaw: string;
  categories: {
    necessary: boolean;
    functional: boolean;
    analytics: boolean;
    performance: boolean;
    advertisement: boolean;
  };
  isUserActionCompleted: boolean;
  consentID: string;
  languageCode: string;
}

//-----------------------------------------------------------------------------

const useCookieYesConsent = (): CookieYesConsent | null => {
  const [consent, setConsent] = useState<CookieYesConsent | null>(null);

  useEffect(() => {
    const getCookieYesConsent = () => {
      if (window) {
        const windowHasCookieYes = window as typeof window & {
          getCkyConsent: CookieYesConsent;
        };

        console.log("windowHasCookieYes", windowHasCookieYes);

        if (windowHasCookieYes.getCkyConsent) {
          setConsent(windowHasCookieYes.getCkyConsent);
        }
      }
    };
    getCookieYesConsent();
  }, []);

  return consent;
};

export default useCookieYesConsent;
