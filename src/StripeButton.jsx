
import React from 'react';

const StripeButton = () => {
  const handleCheckout = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-purple-600 text-white px-6 py-2 rounded"
    >
      💳 Купи PRO с Stripe
    </button>
  );
};

export default StripeButton;
