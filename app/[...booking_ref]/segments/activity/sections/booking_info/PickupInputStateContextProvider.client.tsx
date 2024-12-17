"use client";
import { createContext, useState, ReactNode } from "react";

//SERVER COMPONENTS PASSED AS CHILDREN TO CLIENT COMPONENTS ARE RENDERED ON THE SERVER NORMALLY
//https://www.thisdot.co/blog/communication-between-client-components-in-next-js

type ContextValue = {
  isPickupInputShown: boolean;
  togglePickupInputShown: () => void;
};

export const PickupInputStateContext = createContext<ContextValue>({
  isPickupInputShown: false,
  togglePickupInputShown: () => {},
});

export interface PickupInputProviderProps {
  children?: ReactNode;
}

export default function PickupInputStateContextProvider({
  children,
}: PickupInputProviderProps) {
  const [isPickupInputShown, setPickupInputShown] = useState(false);

  return (
    <PickupInputStateContext.Provider
      value={{
        isPickupInputShown,
        togglePickupInputShown: () => setPickupInputShown(!isPickupInputShown),
      }}
    >
      {children}
    </PickupInputStateContext.Provider>
  );
}
