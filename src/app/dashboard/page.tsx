'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, Award, CreditCard, TrendingUp, ArrowUpRight } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const STATS = [
  { label: 'Total Members', value: '52', change: '+8 this month', icon: Users, bgClass: 'icon-bg-cyan', textClass: 'icon-text-cyan' },
  { label: 'Active Events', value: '6', change: '3 upcoming', icon: Calendar, bgClass: 'icon-bg-blue', textClass: 'icon-text-blue' },
  { label: 'Certificates', value: '128', change: '+24 issued', icon: Award, bgClass: 'icon-bg-amber', textClass: 'icon-text-amber' },
  { label: 'Revenue', value: '₹15,400', change: 'From registrations', icon: CreditCard, bgClass: 'icon-bg-emerald', textClass: 'icon-text-emerald' },
];

export default function DashboardPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back! Here&apos;s an overview of your club.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp} className="glass-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgClass} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.textClass}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
            <p className="text-emerald-400 text-xs mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp} className="glass-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Create Event', href: '/dashboard/events', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
            { label: 'Add Member', href: '/dashboard/members', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
            { label: 'Issue Certificate', href: '/dashboard/certificates', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
            { label: 'Upload Media', href: '/dashboard/media', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
          ].map((action) => (
            <a key={action.label} href={action.href} className={`p-4 rounded-xl border text-center text-sm font-medium transition-all hover:scale-105 ${action.color}`}>
              {action.label}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={fadeInUp} className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { text: 'New member registration: Roll No. 2301045', time: '2 hours ago' },
            { text: 'Payment received: ₹299 for Robo Wars 2026', time: '5 hours ago' },
            { text: 'Certificate issued for IoT Workshop', time: '1 day ago' },
            { text: 'New event created: Drone Building Hackathon', time: '2 days ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <p className="text-slate-300 text-sm">{item.text}</p>
              <span className="text-slate-500 text-xs shrink-0 ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
