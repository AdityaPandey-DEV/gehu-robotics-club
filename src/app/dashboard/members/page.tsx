'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Shield, ShieldCheck, ShieldX, ChevronDown } from 'lucide-react';
import { ROLES } from '@/lib/constants';
import type { Profile } from '@/types';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function MembersManagePage() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data } = await supabase.from('profiles').select('*').order('joined_at', { ascending: false });
      if (data) setMembers(data);
    } catch {} finally { setLoading(false); }
  };

  const updateRole = async (userId: string, newRole: string) => {
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
      loadMembers();
    } catch {}
  };

  const toggleApproval = async (userId: string, approved: boolean) => {
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.from('profiles').update({ is_approved: approved }).eq('id', userId);
      loadMembers();
    } catch {}
  };

  const filtered = members.filter(m =>
    m.full_name.toLowerCase().includes(search.toLowerCase()) ||
    m.roll_number?.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Member Management</h1>
          <p className="text-slate-400 text-sm mt-1">Approve, promote, and manage club members</p>
        </div>
        <div className="text-slate-400 text-sm">{members.length} members</div>
      </motion.div>

      <motion.div variants={fadeInUp} className="glass-card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input !bg-white/5 !border-white/10 !text-white pl-10"
            placeholder="Search by name, roll number, or email..."
          />
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="glass-card overflow-hidden">
        {loading ? (
          <p className="text-slate-500 text-sm text-center py-12">Loading members...</p>
        ) : filtered.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-12">
            {members.length === 0 ? 'No members yet. Connect Supabase and members will appear here.' : 'No members match your search.'}
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-slate-500 font-medium uppercase tracking-wider px-4 py-3">Member</th>
                <th className="text-left text-xs text-slate-500 font-medium uppercase tracking-wider px-4 py-3">Roll No</th>
                <th className="text-left text-xs text-slate-500 font-medium uppercase tracking-wider px-4 py-3">Role</th>
                <th className="text-left text-xs text-slate-500 font-medium uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs text-slate-500 font-medium uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white text-sm font-medium">{member.full_name}</p>
                    <p className="text-slate-500 text-xs">{member.email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-300 text-sm">{member.roll_number || '—'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={member.role}
                      onChange={e => updateRole(member.id, e.target.value)}
                      className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300"
                    >
                      {Object.entries(ROLES).map(([key, val]) => (
                        <option key={key} value={key} className="bg-slate-900">{val.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${member.is_approved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {member.is_approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleApproval(member.id, !member.is_approved)}
                      className={`text-xs px-3 py-1 rounded ${member.is_approved ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'} transition-colors`}
                    >
                      {member.is_approved ? 'Revoke' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </motion.div>
  );
}
