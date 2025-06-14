
# 📄 FixMyPDF – Финална версия

Модерно уеб приложение за редактиране и обработка на PDF файлове с Freemium модел, Stripe плащане и OCR.

---

## 🚀 Функционалности

- 📥 Качване и визуализация на PDF
- ↻ Завъртане и 🗑️ изтриване на страници
- ✍️ Подпис и позициониране с мишка/пръст
- 💾 Генериране на нов PDF
- 🧠 OCR + експорт към Word (.docx)
- 💳 Stripe Checkout (платен PRO достъп)
- 🔓 Freemium: 3 действия на ден без вход
- ✅ Success Page – активиране на PRO след плащане

---

## 🛠️ Инсталация (локално)

```bash
npm install
npm run dev
```

Или с Yarn:

```bash
yarn
yarn dev
```

---

## 📂 Структура

| Папка/Файл                  | Описание                                  |
|----------------------------|--------------------------------------------|
| `FixMyPDF.jsx`             | Главният компонент                        |
| `StripeButton.jsx`         | Stripe Checkout бутон                     |
| `create-checkout-session.js` | API за създаване на Stripe сесия         |
| `SuccessPage.jsx`          | Страница след успешно плащане             |
| `ui-preview.html`          | Примерни UI бутони                        |

---

## 💳 Stripe конфигурация

1. Създай Stripe акаунт: https://dashboard.stripe.com
2. Замени:
   - `sk_test_YourSecretKey` в `create-checkout-session.js`
   - `success_url` и `cancel_url` със свои URL-и
3. Деплой с Vercel, Netlify или други

---

## ☁️ Деплой на Vercel (препоръчително)

1. Качи проекта в GitHub
2. Отиди на: https://vercel.com/import
3. Влез с GitHub акаунт и избери проекта
4. Настройки:
   - Framework: **React** или **Next.js**
   - Environment:
     - `STRIPE_SECRET_KEY=sk_test_...`

---

## ✅ Freemium/PRO логика

- Freemium: до 3 действия на ден
- След успешно плащане: `localStorage.setItem('fixmypdf_pro', 'true')`

---

## 🧠 OCR Езици

```js
Tesseract.recognize(file, 'eng+bul');
```

---

## 📌 Забележка

Това е MVP версия. За продакшън се препоръчва:
- Проверка на Stripe Webhooks за сигурност
- Бекенд за управление на PRO достъпа

---

## 📧 Контакт

Изградено от FixMyPDF Creator · 2025
