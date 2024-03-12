'use server'
import Stripe from "stripe";
import { redirect } from 'next/navigation';
// Ensure you have the appropriate imports for your environment and setup.

// ====== TRANSACTION PARAMS
declare type CheckoutTransactionParams = {
    plan: string;
    credits: number;
    amount: number;
    buyerId: string;
  };

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: amount,
        product_data: {
          name: transaction.plan,
        },
      },
      quantity: 1,
    }],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  // Check if session.url is not null before redirecting
  if (session.url) {
    redirect(session.url);
  } else {
    // Handle the case where session.url is null
    // You might redirect to an error page or display an error message
    console.error("Session URL is null. Unable to redirect.");
    // Example: redirect('/error-page');
  }
}
