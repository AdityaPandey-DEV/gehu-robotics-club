'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Award, CheckCircle, XCircle, Hash, Loader2 } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function VerifyPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { found: boolean; data?: any }>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .or(`roll_number.eq.${query},certificate_number.eq.${query}`)
        .limit(5);

      if (error) throw error;
      setResult({ found: data && data.length > 0, data: data || [] });
    } catch {
      setResult({ found: false, data: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-16">
      <div className="container-custom max-w-2xl">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Verify Certificate</h1>
            <p className="text-slate-400">Enter a roll number or certificate number to verify authenticity</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-8">
            <form onSubmit={handleVerify} className="flex gap-3">
              <div className="relative flex-1">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="form-input !bg-white/5 !border-white/10 !text-white pl-10"
                  placeholder="Roll number or certificate number"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 !px-6 disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Verify
              </button>
            </form>
          </motion.div>

          {result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              {result.found ? (
                <div className="space-y-4">
                  {result.data.map((cert: any) => (
                    <div key={cert.id} className="glass-card p-6 border-emerald-500/30">
                      <div className="flex items-start gap-4">
                        <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-1">Certificate Verified ✓</h3>
                          <div className="space-y-1 text-sm text-slate-300">
                            <p><span className="text-slate-500">Name:</span> {cert.recipient_name}</p>
                            <p><span className="text-slate-500">Roll No:</span> {cert.roll_number}</p>
                            <p><span className="text-slate-500">Event:</span> {cert.event_title}</p>
                            <p><span className="text-slate-500">Certificate No:</span> {cert.certificate_number}</p>
                            <p><span className="text-slate-500">Issued:</span> {cert.issue_date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-6 border-red-500/30 flex items-center gap-4">
                  <XCircle className="w-8 h-8 text-red-400 shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">No Certificate Found</h3>
                    <p className="text-slate-400 text-sm">No certificates match &quot;{query}&quot;. Please check and try again.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
