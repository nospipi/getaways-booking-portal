import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

//----------------------------------------------

type FingerprintContextType = string | undefined;

const FingerprintContext = createContext<FingerprintContextType>(undefined);

interface FingerprintProviderProps {
  children: ReactNode;
}

export const FingerprintProvider = ({ children }: FingerprintProviderProps) => {
  const [fingerprint, setFingerprint] =
    useState<FingerprintContextType>(undefined);

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    loadFingerprint();
  }, []);

  return (
    <FingerprintContext.Provider value={fingerprint}>
      {children}
    </FingerprintContext.Provider>
  );
};

export const useFingerprint = (): FingerprintContextType => {
  const fingerprint = useContext(FingerprintContext);
  return fingerprint;
};
