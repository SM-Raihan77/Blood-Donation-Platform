import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';


export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');


    const { amount } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }


    const userSession = await auth.api.getSession({
      headers: await headers()
    });


    const user = userSession?.user;

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || undefined,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Platform Funding / Donation',
              description: 'Thank you for your generous support!',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user?.id || 'anonymous',
        userEmail: user?.email || 'anonymous',
        amount: amount,
      },
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donation`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error("Stripe Session Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}