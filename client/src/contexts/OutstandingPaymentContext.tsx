// src/context/PaymentContext.tsx
import React, {createContext, useState, ReactNode} from "react";

interface OutstandingPaymentContextType {
  paymentDetails: any;
  setPaymentDetails: (details: any) => void;
}

export const OutstandingPaymentContext = createContext<
  OutstandingPaymentContextType | undefined
>(undefined);

export const OutstandingPaymentProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  return (
    <OutstandingPaymentContext.Provider
      value={{paymentDetails, setPaymentDetails}}
    >
      {children}
    </OutstandingPaymentContext.Provider>
  );
};
