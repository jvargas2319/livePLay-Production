import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { db } from '@/lib/db'; // Ensure this path matches where your db instance is initialized

// It's good practice to ensure your environment variables are correctly typed.
// If STRIPE_SECRET_KEY is not set, this will default to 'default_value', but you
// might want to handle missing configuration more explicitly in production code.
const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY || 'default_value';
const stripe = new Stripe(stripeSecretKey);

// Explicitly type req as NextApiRequest and res as NextApiResponse
export  async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, userId } = JSON.parse(req.body);

  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents for Stripe
      currency: 'usd',
    });

    // Update user's credits upon successful payment simulation
    await db.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
    });

    res.status(200).json({ success: true, message: 'Credits purchased successfully.', clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Purchase Credits Error:", error);
    res.status(500).json({ success: false, message: 'Server error during credit purchase.' });
  }
}
