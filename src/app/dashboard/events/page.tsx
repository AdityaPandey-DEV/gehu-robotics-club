'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Edit, Trash2, Eye } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function EventsManagePage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', type: 'workshop', date: '', venue: '', fee: '0', maxParticipants: '50' });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.from('events').insert({
        title: form.title,
        description: form.description,
        event_type: form.type,
        date: form.date,
        venue: form.venue,
        registration_fee: parseFloat(form.fee),
        is_paid: parseFloat(form.fee) > 0,
        max_participants: parseInt(form.maxParticipants),
      });
      setShowForm(false);
      setForm({ title: '', description: '', type: 'workshop', date: '', venue: '', fee: '0', maxParticipants: '50' });
    } catch {}
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Event Management</h1>
          <p className="text-slate-400 text-sm mt-1">Create and manage club events</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-accent flex items-center gap-2 !py-2.5 !px-5 !text-sm">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </motion.div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-6 mb-6">
          <h3 className="text-white font-semibold mb-4">Create New Event</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="form-label text-slate-300">Title</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" required />
            </div>
            <div className="md:col-span-2">
              <label className="form-label text-slate-300">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white h-24 resize-none" />
            </div>
            <div>
              <label className="form-label text-slate-300">Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white">
                {['workshop','competition','hackathon','seminar','meetup','other'].map(t => <option key={t} value={t} className="bg-slate-900 capitalize">{t}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label text-slate-300">Date</label>
              <input type="datetime-local" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" required />
            </div>
            <div>
              <label className="form-label text-slate-300">Venue</label>
              <input value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" />
            </div>
            <div>
              <label className="form-label text-slate-300">Registration Fee (₹)</label>
              <input type="number" value={form.fee} onChange={e => setForm({...form, fee: e.target.value})} className="form-input !bg-white/5 !border-white/10 !text-white" min="0" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary !py-2.5 !px-6 !text-sm">Create Event</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline !py-2.5 !px-6 !text-sm">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      <motion.div variants={fadeInUp} className="glass-card p-6">
        <p className="text-slate-500 text-sm text-center py-8">Events from the database will appear here once Supabase is connected.<br />Use the &quot;New Event&quot; button to create events.</p>
      </motion.div>
    </motion.div>
  );
}
