// 🔄 Примерна версия на FixMyPDF.jsx с Supabase PRO проверка
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

  useEffect(() => {
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
    } else {
      checkSession();
    }
  }, []);

  const checkProStatus = async (userEmail) => {
    const { data, error } = await supabase
      .from('pro_users')
      .select('activated')
      .eq('email', userEmail)
      .single();

    if (data?.activated) {
      setIsPro(true);
      localStorage.setItem('invoice_pro', 'true');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">FixMyPDF</h1>

      {!isPro && (
        <div className="mb-4">
          <StripeButton />
        </div>
      )}

      <button className="bg-blue-600 text-white px-6 py-2 rounded shadow">
        Свали PDF
      </button>
    </div>
  );
};

export default FixMyPDF;
