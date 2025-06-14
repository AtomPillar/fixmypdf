// ✅ FixMyPDF компонент с брояч на безплатни употреби и проверка за PRO

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import StripeButton from './components/StripeButton';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const FixMyPDF = () => {
  const [email, setEmail] = useState('');
  const [isPro, setIsPro] = useState(false);
  const [usesToday, setUsesToday] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const usageKey = 'pdf_usage_' + today;
    const count = parseInt(localStorage.getItem(usageKey) || '0');
    setUsesToday(count);
    if (count >= 1 && !isPro) {
      setLimitReached(true);
    }

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const userEmail = session.user.email;
        setEmail(userEmail);
        checkProStatus(userEmail);
      }
    };

    const cachedPro = localStorage.getItem('invoice_pro');
    if (cachedPro) {
      setIsPro(true);
      setLimitReached(false);
    } else {
      checkSession();
    }
  }, []);

  const checkProStatus = async (userEmail) => {
    const { data } = await supabase
      .from('pro_users')
      .select('activated')
      .eq('email', userEmail)
      .single();

    if (data?.activated) {
      setIsPro(true);
      localStorage.setItem('invoice_pro', 'true');
      setLimitReached(false);
    }
  };

  const handlePDFAction = () => {
    if (!isPro && limitReached) {
      alert('Използвахте дневния лимит. Моля, отключете PRO или опитайте утре.');
      return;
    }

    // ... логика за PDF обработка

    const today = new Date().toISOString().split('T')[0];
    const usageKey = 'pdf_usage_' + today;
    const count = parseInt(localStorage.getItem(usageKey) || '0') + 1;
    localStorage.setItem(usageKey, count.toString());
    setUsesToday(count);
    if (count >= 1 && !isPro) {
      setLimitReached(true);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">FixMyPDF</h1>

      {!isPro && (
        <div className="text-sm text-gray-600 mb-2">
          Използвания днес: {usesToday} / 1
        </div>
      )}

      {!isPro && !limitReached && (
        <button
          onClick={handlePDFAction}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow mb-4"
        >
          Използвай безплатно
        </button>
      )}

      {limitReached && !isPro && (
        <div className="text-red-600 mb-4">
          Достигнат е лимитът за днес. Отключи неограничен достъп:
        </div>
      )}

      {!isPro && <StripeButton />}
    </div>
  );
};

export default FixMyPDF;
