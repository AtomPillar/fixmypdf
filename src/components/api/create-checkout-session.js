import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'bgn',
          product_data: {
            name: 'FixMyPDF PRO',
          },
          unit_amount: 990,
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/`,
  });

  res.status(200).json({ url: session.url });
}
