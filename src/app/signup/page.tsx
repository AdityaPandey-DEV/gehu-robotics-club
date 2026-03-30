'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Mail, Lock, User, Phone, Hash, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { CLUB_NAME, BRANCHES } from '@/lib/constants';

export default function SignupPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', rollNumber: '', phone: '', branch: 'Electronics and Communication Engineering', year: '1' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullName,
            roll_number: form.rollNumber,
            phone: form.phone,
            branch: form.branch,
            year_of_study: parseInt(form.year),
          },
        },
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-slate-400 mb-6">Check your email to verify your account. Once verified, your membership will be reviewed by the club admin.</p>
          <Link href="/login" className="btn-primary inline-flex items-center gap-2">Go to Login <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Join {CLUB_NAME}</h1>
          <p className="text-slate-400 text-sm mt-1">Create your account to get started</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="form-label text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white pl-10" placeholder="John Doe" required />
                </div>
              </div>
              <div>
                <label htmlFor="rollNumber" className="form-label text-slate-300">Roll Number</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input id="rollNumber" name="rollNumber" value={form.rollNumber} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white pl-10" placeholder="e.g. 2301001" required />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="form-label text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white pl-10" placeholder="your@email.com" required />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="form-label text-slate-300">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white pl-10" placeholder="+91 ..." />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="branch" className="form-label text-slate-300">Branch</label>
                <select id="branch" name="branch" value={form.branch} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white">
                  {BRANCHES.map((b) => <option key={b} value={b} className="bg-slate-900">{b}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="year" className="form-label text-slate-300">Year</label>
                <select id="year" name="year" value={form.year} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white">
                  {[1,2,3,4].map((y) => <option key={y} value={y} className="bg-slate-900">Year {y}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} className="form-input !bg-white/5 !border-white/10 !text-white pl-10 pr-10" placeholder="Min 6 characters" required minLength={6} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-50 !mt-6">
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account? <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
