'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { CLUB_NAME } from '@/lib/constants';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-16 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
          <Cpu className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Join <span className="gradient-text">{CLUB_NAME}</span>
        </h1>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          Become a member of GEHU Bhimtal&apos;s premier robotics club. Access workshops, competitions, lab equipment, and a community of innovators.
        </p>

        <div className="glass-card p-8 text-left space-y-4 mb-8">
          <h3 className="text-white font-semibold flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-400" /> Membership Benefits</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            {[
              'Access to robotics lab and equipment',
              'Priority registration for events & workshops',
              'Participation certificates for all events',
              'Mentorship from faculty advisor',
              'Networking with alumni and industry professionals',
              'Opportunity to participate in national competitions',
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">✓</span> {benefit}
              </li>
            ))}
          </ul>
        </div>

        <Link href="/signup" className="btn-accent inline-flex items-center gap-2 text-lg !px-8 !py-4 group">
          Create Your Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="text-slate-500 text-sm mt-4">
          Already a member? <Link href="/login" className="text-cyan-400 hover:text-cyan-300">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
