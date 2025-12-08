import React, { useEffect, useRef } from 'react';

interface PayPalButtonProps {
  amount: string;
  currency?: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

export const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency = 'USD',
  onSuccess,
  onError,
}) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=${currency}`;
      script.async = true;
      script.onload = () => renderButton();
      document.body.appendChild(script);
      return;
    }
    renderButton();
    // eslint-disable-next-line
  }, []);

  function renderButton() {
    if (window.paypal && paypalRef.current) {
      window.paypal.Buttons({
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount },
              },
            ],
          });
        },
        onApprove: async (_data: any, actions: any) => {
          const details = await actions.order.capture();
          if (onSuccess) onSuccess(details);
        },
        onError: (err: any) => {
          if (onError) onError(err);
        },
      }).render(paypalRef.current);
    }
  }

  return <div ref={paypalRef} />;
};

declare global {
  interface Window {
    paypal?: any;
  }
}
