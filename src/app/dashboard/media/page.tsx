'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Video, Loader2, CheckCircle } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function MediaUploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setSuccess(false);

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('club-media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage.from('club-media').getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase.from('club_media').insert({
        title,
        description,
        media_type: mediaType,
        media_url: urlData.publicUrl,
        category,
      });

      if (dbError) throw dbError;
      setSuccess(true);
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally { setLoading(false); }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-2xl font-bold text-white">Media Upload</h1>
        <p className="text-slate-400 text-sm mt-1">Upload photos and videos for the club gallery</p>
      </motion.div>

      <motion.div variants={fadeInUp} className="glass-card p-6 max-w-xl">
        <form onSubmit={handleUpload} className="space-y-4">
          {success && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Media uploaded successfully!
            </div>
          )}

          <div>
            <label className="form-label text-slate-300">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="form-input !bg-white/5 !border-white/10 !text-white" placeholder="e.g. Robo Wars 2026 Photos" required />
          </div>

          <div>
            <label className="form-label text-slate-300">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="form-input !bg-white/5 !border-white/10 !text-white h-20 resize-none" placeholder="Optional description" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label text-slate-300">Type</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setMediaType('image')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm transition-colors ${mediaType === 'image' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
                  <ImageIcon className="w-4 h-4" /> Image
                </button>
                <button type="button" onClick={() => setMediaType('video')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm transition-colors ${mediaType === 'video' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
                  <Video className="w-4 h-4" /> Video
                </button>
              </div>
            </div>
            <div>
              <label className="form-label text-slate-300">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="form-input !bg-white/5 !border-white/10 !text-white">
                {['general', 'event', 'workshop', 'campus', 'lab', 'competition'].map(c => <option key={c} value={c} className="bg-slate-900 capitalize">{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label text-slate-300">File</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-colors">
              <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-slate-400 text-sm mb-2">{file ? file.name : 'Click or drag to upload'}</p>
              <input type="file" accept={mediaType === 'image' ? 'image/*' : 'video/*'} onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" style={{ position: 'relative' }} required />
              <p className="text-slate-600 text-xs">Max 50MB</p>
            </div>
          </div>

          <button type="submit" disabled={loading || !file} className="btn-primary flex items-center gap-2 !py-2.5 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Upload Media
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
