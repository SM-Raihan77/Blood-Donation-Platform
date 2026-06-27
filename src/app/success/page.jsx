import { redirect } from 'next/navigation'
import { stripe } from '../../lib/stripe'
import { subscription } from '@/lib/action/pament';


export default async function Success({ searchParams }) {
  // ১. Next.js 15/16-এ searchParams-কে প্রথমে await করতে হবে
  const resolvedSearchParams = await searchParams;
  const session_id = resolvedSearchParams?.session_id;

  // ২. যদি session_id না থাকে
  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  // ৩. স্ট্রাইপ থেকে সেশন রিট্রিভ করা
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });
  const metadata = session?.metadata;
  const status = session?.status;
  const customerEmail = session?.customer_details?.email;

  // ৪. স্ট্যাটাস ওপেন থাকলে রিডাইরেক্ট
  if (status === 'open') return redirect('/');

  // ৫. পেমেন্ট কমপ্লিট হলে সাকসেস মেসেজ দেখানো
  if (status === 'complete') {
    await subscription({...metadata, sessionId: session_id})
    
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return redirect('/');
}