'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Save, Loader2, CheckCircle } from 'lucide-react';
import type { Profile } from '@/types';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function SettingsPage() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          if (data) setProfile(data);
        }
      } catch {}
    };
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.from('profiles').update({
        full_name: profile.full_name,
        phone: profile.phone,
        position: profile.position,
      }).eq('id', profile.id);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {} finally { setLoading(false); }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your profile and preferences</p>
      </motion.div>

      <motion.div variants={fadeInUp} className="glass-card p-6 max-w-xl">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><User className="w-5 h-5 text-cyan-400" /> Profile</h3>
        <form onSubmit={handleSave} className="space-y-4">
          {saved && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Profile updated successfully!
            </div>
          )}
          <div>
            <label className="form-label text-slate-300">Full Name</label>
            <input value={profile.full_name || ''} onChange={e => setProfile({...profile, full_name: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" />
          </div>
          <div>
            <label className="form-label text-slate-300">Email</label>
            <input value={profile.email || ''} disabled className="form-input !bg-white/5 !border-white/10 !text-slate-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="form-label text-slate-300">Roll Number</label>
            <input value={profile.roll_number || ''} disabled className="form-input !bg-white/5 !border-white/10 !text-slate-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="form-label text-slate-300">Phone</label>
            <input value={profile.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" />
          </div>
          <div>
            <label className="form-label text-slate-300">Position</label>
            <input value={profile.position || ''} onChange={e => setProfile({...profile, position: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" placeholder="e.g. Technical Lead" />
          </div>
          <div>
            <label className="form-label text-slate-300">Role</label>
            <input value={profile.role?.replace('_', ' ') || ''} disabled className="form-input !bg-white/5 !border-white/10 !text-cyan-400 cursor-not-allowed capitalize" />
            <p className="text-slate-600 text-xs mt-1">Roles can only be changed by the Faculty Advisor</p>
          </div>
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 !py-2.5 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
