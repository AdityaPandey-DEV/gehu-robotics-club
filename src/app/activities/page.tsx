'use client';

import { motion } from 'framer-motion';
import { Newspaper, Rocket, Award, Lightbulb } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const ACTIVITIES = [
  { title: 'Club Inaugurated!', type: 'Announcement', icon: Rocket, date: 'March 2026', content: 'The RoboTech Club has been officially inaugurated under the ECE department at GEHU Bhimtal campus.' },
  { title: 'First Workshop: Arduino Basics', type: 'News', icon: Lightbulb, date: 'Coming Soon', content: 'Learn the fundamentals of Arduino programming, circuit design, and sensor integration.' },
  { title: 'Research: Autonomous Navigation', type: 'Research', icon: Newspaper, date: 'Ongoing', content: 'Club members are researching autonomous robot navigation using LIDAR and computer vision.' },
  { title: 'Grafest Participation', type: 'Achievement', icon: Award, date: 'Upcoming', content: 'RoboTech Club will showcase projects at the annual GEHU technical fest — Grafest.' },
];

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-16">
      <div className="container-custom max-w-3xl">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Club <span className="gradient-text-blue">Activities</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg mb-12">
            News, announcements, achievements, and ongoing research from the club.
          </motion.p>

          <div className="space-y-6">
            {ACTIVITIES.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="glass-card p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">{item.type}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-2">{item.date}</p>
                  <p className="text-slate-400 text-sm">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="text-center mt-12">
            <p className="text-slate-500 text-sm">More activities will be posted by club admins via the dashboard.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
