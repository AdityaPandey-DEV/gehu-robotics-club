'use client';

import { motion } from 'framer-motion';
import { Newspaper, Plus } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function ActivitiesManagePage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Activities & Announcements</h1>
          <p className="text-slate-400 text-sm mt-1">Post news, achievements, and research updates</p>
        </div>
        <button className="btn-accent flex items-center gap-2 !py-2.5 !px-5 !text-sm">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </motion.div>

      <motion.div variants={fadeInUp} className="glass-card p-6">
        <p className="text-slate-500 text-sm text-center py-12">
          Club activities and announcements will be managed here once Supabase is connected.
        </p>
      </motion.div>
    </motion.div>
  );
}
