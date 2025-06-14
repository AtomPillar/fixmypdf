
// Примерна API функция (Node.js Express или Next.js API route)
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_YourSecretKey', {
  apiVersion: '2023-08-16',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'FixMyPDF PRO достъп',
            },
            unit_amount: 590, // 5.90 EUR
          },
          quantity: 1,
        }],
        success_url: 'https://yourdomain.com/success',
        cancel_url: 'https://yourdomain.com/cancel',
      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
