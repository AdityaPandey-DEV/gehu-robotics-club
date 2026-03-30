import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, eventId, fullName, email, rollNumber } = await request.json();

    // Lazy-init Razorpay (avoids build-time crash when keys aren't set)
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `rcpt_${eventId}_${Date.now()}`,
      notes: { eventId, fullName, email, rollNumber },
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (error: any) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
