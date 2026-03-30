'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { Cpu, User, Mail, Phone, Hash, Calendar, MapPin, CreditCard, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { BRANCHES, CLUB_NAME } from '@/lib/constants';

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Sample event data (in production, fetch from Supabase)
const EVENTS: Record<string, any> = {
  '1': { title: 'Robo Wars 2026', type: 'Competition', date: 'April 15, 2026', venue: 'GEHU Bhimtal Main Auditorium', fee: 299, isPaid: true },
  '2': { title: 'IoT Smart Home Workshop', type: 'Workshop', date: 'April 22, 2026', venue: 'ECE Lab 3', fee: 0, isPaid: false },
  '3': { title: 'Drone Building Hackathon', type: 'Hackathon', date: 'May 5, 2026', venue: 'Innovation Center', fee: 499, isPaid: true },
  '4': { title: 'PCB Design Masterclass', type: 'Workshop', date: 'May 12, 2026', venue: 'ECE Lab 1', fee: 0, isPaid: false },
  '5': { title: 'Arduino Programming Basics', type: 'Seminar', date: 'May 20, 2026', venue: 'Lecture Hall B2', fee: 0, isPaid: false },
  '6': { title: 'National Robotics Challenge', type: 'Competition', date: 'June 1, 2026', venue: 'GEHU Stadium', fee: 599, isPaid: true },
};

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function EventFormPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const event = EVENTS[eventId];

  const [form, setForm] = useState({ fullName: '', email: '', phone: '', rollNumber: '', branch: 'Electronics and Communication Engineering', year: '1' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (event?.isPaid) {
        // Create Razorpay order
        const res = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: event.fee, eventId, ...form }),
        });
        const { orderId } = await res.json();

        // Open Razorpay checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: event.fee * 100,
          currency: 'INR',
          name: CLUB_NAME,
          description: `Registration: ${event.title}`,
          order_id: orderId,
          handler: async (response: any) => {
            // Verify payment
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                eventId,
                ...form,
              }),
            });
            if (verifyRes.ok) {
              setSuccess(true);
            } else {
              setError('Payment verification failed. Contact support.');
            }
          },
          prefill: { name: form.fullName, email: form.email, contact: form.phone },
          theme: { color: '#1e3a8a' },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Free event — just register
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        await supabase.from('event_registrations').insert({
          event_id: eventId,
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          roll_number: form.rollNumber,
          payment_status: 'free',
          amount: 0,
        });
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Event Not Found</h1>
          <p className="text-slate-400">This event doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-24 pb-16 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
          <p className="text-slate-400 mb-2">You have been registered for <span className="text-cyan-400 font-semibold">{event.title}</span>.</p>
          {event.isPaid && <p className="text-emerald-400 text-sm font-medium mb-4">Payment confirmed ✓</p>}
          <p className="text-slate-500 text-sm">A confirmation will be sent to your email.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="min-h-screen bg-[#0f172a] pt-24 pb-16">
        <div className="container-custom max-w-2xl">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {/* Event Info Card */}
            <motion.div variants={fadeInUp} className="glass-card p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full">{event.type}</span>
                  <h1 className="text-2xl font-bold text-white mt-1">{event.title}</h1>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-cyan-400" /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {event.venue}</span>
                    <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-cyan-400" /> {event.isPaid ? `₹${event.fee}` : 'Free'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div variants={fadeInUp} className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-6">Registration Form</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}

                <div>
                  <label className="form-label text-slate-300">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input name="fullName" value={form.fullName} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white pl-10" placeholder="Your full name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label text-slate-300">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input name="email" type="email" value={form.email} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white pl-10" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="form-label text-slate-300">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input name="phone" value={form.phone} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white pl-10" placeholder="+91 ..." required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="form-label text-slate-300">Roll Number *</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input name="rollNumber" value={form.rollNumber} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white pl-10" placeholder="e.g. 2301001" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label text-slate-300">Branch</label>
                    <select name="branch" value={form.branch} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white">
                      {BRANCHES.map((b) => <option key={b} value={b} className="bg-slate-900">{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label text-slate-300">Year</label>
                    <select name="year" value={form.year} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white">
                      {[1,2,3,4].map(y => <option key={y} value={y} className="bg-slate-900">Year {y}</option>)}
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={loading} className={`${event.isPaid ? 'btn-accent' : 'btn-primary'} w-full flex items-center justify-center gap-2 disabled:opacity-50 !mt-6 !py-3.5`}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {event.isPaid ? `Pay ₹${event.fee} & Register` : 'Register for Free'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
