'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Plus, Download, Loader2 } from 'lucide-react';
import { generateCertificateNumber } from '@/lib/utils';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function CertificatesPage() {
  const [form, setForm] = useState({ recipientName: '', rollNumber: '', eventTitle: '' });
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const certNumber = generateCertificateNumber();
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data, error } = await supabase.from('certificates').insert({
        certificate_number: certNumber,
        recipient_name: form.recipientName,
        roll_number: form.rollNumber,
        event_title: form.eventTitle,
        verified: true,
      }).select().single();

      if (error) throw error;
      setGenerated(data);
      setForm({ recipientName: '', rollNumber: '', eventTitle: '' });
    } catch (err: any) {
      alert(err.message || 'Failed to generate certificate');
    } finally { setLoading(false); }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-2xl font-bold text-white">Certificate Management</h1>
        <p className="text-slate-400 text-sm mt-1">Generate and manage participation certificates</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp} className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-cyan-400" /> Generate Certificate</h3>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="form-label text-slate-300">Recipient Name</label>
              <input value={form.recipientName} onChange={e => setForm({...form, recipientName: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" required />
            </div>
            <div>
              <label className="form-label text-slate-300">Roll Number</label>
              <input value={form.rollNumber} onChange={e => setForm({...form, rollNumber: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" required />
            </div>
            <div>
              <label className="form-label text-slate-300">Event Title</label>
              <input value={form.eventTitle} onChange={e => setForm({...form, eventTitle: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" required />
            </div>
            <button type="submit" disabled={loading} className="btn-accent flex items-center gap-2 !py-2.5 disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
              Generate Certificate
            </button>
          </form>
        </motion.div>

        {generated && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 border-emerald-500/30">
            <h3 className="text-emerald-400 font-semibold mb-4 flex items-center gap-2"><Award className="w-5 h-5" /> Certificate Generated!</h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300"><span className="text-slate-500">Certificate No:</span> {generated.certificate_number}</p>
              <p className="text-slate-300"><span className="text-slate-500">Name:</span> {generated.recipient_name}</p>
              <p className="text-slate-300"><span className="text-slate-500">Roll No:</span> {generated.roll_number}</p>
              <p className="text-slate-300"><span className="text-slate-500">Event:</span> {generated.event_title}</p>
              <p className="text-slate-300"><span className="text-slate-500">Issued:</span> {generated.issue_date}</p>
            </div>
            <p className="text-slate-500 text-xs mt-4">This certificate can be verified at /verify using the roll number or certificate number.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
