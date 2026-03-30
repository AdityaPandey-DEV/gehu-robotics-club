'use client';

import { motion } from 'framer-motion';
import { CreditCard, Download, Search } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function RegistrationsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Registrations & Payments</h1>
          <p className="text-slate-400 text-sm mt-1">View all event registrations and payment status</p>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="glass-card p-6">
        <p className="text-slate-500 text-sm text-center py-12">
          Event registrations and payment records will appear here once Supabase is connected.<br />
          Razorpay payment data will be automatically populated for paid events.
        </p>
      </motion.div>
    </motion.div>
  );
}
