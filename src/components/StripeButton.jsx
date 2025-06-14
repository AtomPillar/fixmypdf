import React from 'react';

const StripeButton = () => {
  const handleCheckout = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded shadow"
    >
      Отключи PRO
    </button>
  );
};

export default StripeButton;
