import React from 'react';

interface RazorpayButtonProps {
  options: any; // Razorpay options object
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  buttonText?: string;
}

export const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  options,
  onSuccess,
  onError,
  buttonText = 'Pay with Razorpay',
}) => {
  const handlePayment = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const rzp = new (window as any).Razorpay({
        ...options,
        handler: (response: any) => {
          if (onSuccess) onSuccess(response);
        },
        modal: {
          ondismiss: () => {
            if (onError) onError(new Error('Payment cancelled'));
          },
        },
      });
      rzp.open();
    };
    script.onerror = () => {
      if (onError) onError(new Error('Failed to load Razorpay SDK'));
    };
    document.body.appendChild(script);
  };

  return (
    <button type="button" onClick={handlePayment}>
      {buttonText}
    </button>
  );
};
