"use client";
import { createContext, useState, ReactNode } from "react";

//SERVER COMPONENTS PASSED AS CHILDREN TO CLIENT COMPONENTS ARE RENDERED ON THE SERVER NORMALLY
//https://www.thisdot.co/blog/communication-between-client-components-in-next-js

type ContextValue = {
  shouldPromptLocation: boolean;
  isPickupInputShown: boolean;
  togglePickupInputShown: (value?: boolean) => void;
};

export const PickupInputStateContext = createContext<ContextValue>({
  shouldPromptLocation: false,
  isPickupInputShown: false,
  togglePickupInputShown: () => {},
});

export interface PickupInputProviderProps {
  shouldPromptLocation: boolean;
  children?: ReactNode;
}

export default function PickupInputStateContextProvider({
  shouldPromptLocation,
  children,
}: PickupInputProviderProps) {
  const [isPickupInputShown, setPickupInputShown] =
    useState(shouldPromptLocation);

  return (
    <PickupInputStateContext.Provider
      value={{
        shouldPromptLocation,
        isPickupInputShown,
        togglePickupInputShown: (value) =>
          setPickupInputShown(value ?? !isPickupInputShown),
      }}
    >
      {children}
    </PickupInputStateContext.Provider>
  );
}
