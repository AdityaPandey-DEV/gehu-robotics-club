'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CAMPUS_IMAGES, CLUB_NAME, UNIVERSITY_NAME, CLUB_DEPARTMENT } from '@/lib/constants';
import { Target, Eye, Cpu, Users, Lightbulb, Award, Bot, CircuitBoard, Zap, Rocket } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-16">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">{CLUB_NAME}</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-3xl">
            The official robotics and electronics club of {CLUB_DEPARTMENT} at {UNIVERSITY_NAME}, Bhimtal Campus.
          </motion.p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div variants={fadeInUp} className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">
              To create an ecosystem of innovation where students can learn, experiment, and build 
              cutting-edge projects in robotics, IoT, embedded systems, and electronics. We bridge 
              the gap between classroom theory and real-world application.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed">
              To become the leading technical club in Uttarakhand, producing engineers who can 
              design and deploy autonomous systems, contribute to cutting-edge research, and 
              participate in national and international robotics competitions.
            </p>
          </motion.div>
        </motion.div>

        {/* Campus Image */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-16">
          <Image src={CAMPUS_IMAGES.aerialEnhanced} alt="GEHU Bhimtal Aerial" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h3 className="text-white text-2xl font-bold">GEHU Bhimtal Campus</h3>
            <p className="text-slate-300 text-sm">SatTal Road, Bhimtal, Nainital, Uttarakhand 263136</p>
          </div>
        </motion.div>

        {/* What We Do */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-8 text-center">What We Do</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Bot, title: 'Build Robots', color: 'cyan' },
              { icon: CircuitBoard, title: 'Design Circuits', color: 'blue' },
              { icon: Zap, title: 'IoT Projects', color: 'amber' },
              { icon: Rocket, title: 'Compete Nationally', color: 'emerald' },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeInUp} className="glass-card p-6 text-center group cursor-default">
                <div className={`w-14 h-14 rounded-xl bg-${item.color}-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 text-${item.color}-400`} />
                </div>
                <h3 className="text-white font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Get In Touch</h2>
          <p className="text-slate-400 mb-4">Interested in joining or have questions? Reach out to us!</p>
          <a href="mailto:enquiry@gehu.ac.in" className="text-cyan-400 hover:text-cyan-300 font-medium text-lg">
            enquiry@gehu.ac.in
          </a>
          <p className="text-slate-500 text-sm mt-2">Or call: 1800-270-1280</p>
        </motion.div>
      </div>
    </div>
  );
}
