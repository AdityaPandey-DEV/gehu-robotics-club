import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      eventId,
      fullName,
      email,
      phone,
      rollNumber,
    } = await request.json();

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Payment is verified — save registration to Supabase
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    
    const { error } = await supabase.from('event_registrations').insert({
      event_id: eventId,
      full_name: fullName,
      email,
      phone,
      roll_number: rollNumber,
      payment_status: 'paid',
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: 0, // Will be filled from order
    });

    if (error) throw error;

    return NextResponse.json({ verified: true });
  } catch (error: any) {
    console.error('Payment verification failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
