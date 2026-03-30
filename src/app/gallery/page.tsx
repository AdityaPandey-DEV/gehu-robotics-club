'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CAMPUS_IMAGES, STOCK_IMAGES } from '@/lib/constants';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const GALLERY_ITEMS = [
  { src: CAMPUS_IMAGES.heroEnhanced, alt: 'GEHU Bhimtal — Innovation Hub', category: 'Campus' },
  { src: CAMPUS_IMAGES.aerialEnhanced, alt: 'Aerial View — Digital Twin', category: 'Campus' },
  { src: CAMPUS_IMAGES.labEnhanced, alt: 'Center of Excellence in Robotics', category: 'Lab' },
  { src: CAMPUS_IMAGES.amphitheater, alt: 'Campus Amphitheater', category: 'Campus' },
  { src: CAMPUS_IMAGES.entrance, alt: 'Main Entrance', category: 'Campus' },
  { src: CAMPUS_IMAGES.love, alt: 'I ❤️ GEHU', category: 'Campus' },
  { src: CAMPUS_IMAGES.playground, alt: 'Sports Complex', category: 'Campus' },
  { src: CAMPUS_IMAGES.side, alt: 'Academic Block', category: 'Campus' },
  { src: STOCK_IMAGES.robotics1, alt: 'Robot Design', category: 'Robotics' },
  { src: STOCK_IMAGES.electronics, alt: 'Electronics Workshop', category: 'Workshop' },
  { src: STOCK_IMAGES.drone, alt: 'Drone Project', category: 'Projects' },
  { src: STOCK_IMAGES.circuitBoard, alt: 'Circuit Design', category: 'Lab' },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-16">
      <div className="container-custom">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-12">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Club <span className="gradient-text-blue">Gallery</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg">
            Photos and videos from our campus, events, workshops, and projects.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={stagger} className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer">
              <Image src={item.src} alt={item.alt} width={400} height={300} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-medium">{item.alt}</p>
                  <p className="text-cyan-400 text-xs">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">More photos and videos will be uploaded by club admins via the dashboard.</p>
        </div>
      </div>
    </div>
  );
}
