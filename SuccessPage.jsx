
import { useEffect } from 'react';

const SuccessPage = () => {
  useEffect(() => {
    // Активиране на PRO достъп след успешно плащане
    localStorage.setItem('fixmypdf_pro', 'true');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-600">✅ Плащането е успешно!</h1>
      <p className="text-lg mb-4">Вашият достъп до <strong>FixMyPDF PRO</strong> е активиран.</p>
      <a
        href="/"
        className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition"
      >
        🔁 Върни се в началото
      </a>
    </div>
  );
};

export default SuccessPage;
