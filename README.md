
# FixMyPDF – by AtomPillar

A freemium web app for editing, converting, and generating invoices and documents.  
Built with Vite + React + Tailwind CSS + Supabase + Stripe.

## 🛠 Stack
- React 18 (via Vite)
- Supabase (auth, DB)
- Stripe (checkout + webhooks)
- Tailwind CSS
- html2pdf.js
- i18next (multilingual)

## 🚀 Development


# 📄 FixMyPDF – Final version

A modern web application for editing and processing PDF files with a Freemium model, Stripe payment and OCR.

---

## 🚀 Features

- 📥 Upload and preview PDF
- ↻ Rotate and 🗑️ delete pages
- ✍️ Sign and position with mouse/finger
- 💾 Generate new PDF
- 🧠 OCR + export to Word (.docx)
- 💳 Stripe Checkout (paid PRO access)
- 🔓 Freemium: 3 actions per day without login
- ✅ Success Page – activate PRO after payment

---

## 🛠️ Installation (local)
065cc3baa44c7da732827db4b10b412a72fe31c
```bash
npm install
npm run dev
```


## 🔐 Environment Variables (.env)
See `.env.example` for required keys

## 🧾 License
MIT © 2025 Georgi Varbanov / AtomPillar

Or with Yarn:

```bash
yarn
yarn dev
```

---

## 📂 Structure

| Folder/File | Description |
|----------------------------|--------------------------------------|
| `FixMyPDF.jsx` | The main component |
| `StripeButton.jsx` | Stripe Checkout button |
| `create-checkout-session.js` | Stripe session creation API |
| `SuccessPage.jsx` | Page after successful payment |
| `ui-preview.html` | Sample UI buttons |

---

## 💳 Stripe configuration

1. Create a Stripe account: https://dashboard.stripe.com
2. Replace:
- `sk_test_YourSecretKey` in `create-checkout-session.js`
- `success_url` and `cancel_url` with your own URLs
3. Deploy with Vercel, Netlify or others

---

## ☁️ Deploy on Vercel (recommended)

1. Upload the project to GitHub
2. Go to: https://vercel.com/import
3. Log in with your GitHub account and select the project
4. Settings:
- Framework: **React** or **Next.js**
- Environment:
- `STRIPE_SECRET_KEY=sk_test_...`

---

## ✅ Freemium/PRO logic

- Freemium: up to 3 actions per day
- After successful payment: `localStorage.setItem('fixmypdf_pro', 'true')`

---

## 🧠 OCR Languages

```js
Tesseract.recognize(file, 'eng+bul');
```

---

## 📌 Note

This is an MVP version. For production it is recommended to:
- Check Stripe Webhooks for security
- Backend for PRO access management

---

## 📧 Contact

Built by AtomPillar by Georgi Varbanov / Creator · 2025

# fixmypdf
3986475f722978b8d21dfac93e79d7f21d1742da
>>>>>>> 1065cc3baa44c7da732827db4b10b412a72fe31c
