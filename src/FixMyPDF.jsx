import React from 'react';
import StripeButton from './components/StripeButton';

const FixMyPDF = ({ isPro }) => {
  const exportPDF = () => {
    // Dummy export function
    alert("Exporting PDF...");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">FixMyPDF</h1>
      <button
        onClick={exportPDF}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow"
      >
        Свали PDF
      </button>

      {!isPro && (
        <div className="mt-4">
          <StripeButton />
        </div>
      )}
    </div>
  );
};

export default FixMyPDF;
