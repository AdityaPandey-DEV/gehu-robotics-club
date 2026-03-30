'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Cpu, Users, Calendar, Award, ArrowRight, ChevronRight,
  Zap, Cog, Lightbulb, Rocket, Bot, CircuitBoard, GraduationCap,
  Trophy, Target, Globe
} from 'lucide-react';
import { CAMPUS_IMAGES, STOCK_IMAGES, CLUB_NAME, UNIVERSITY_NAME, CLUB_DEPARTMENT } from '@/lib/constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <div className="bg-[#0f172a]">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={CAMPUS_IMAGES.heroEnhanced}
            alt="GEHU Bhimtal Campus"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              initial={{ x: `${Math.random() * 100}%`, y: '110%' }}
              animate={{ y: '-10%' }}
              transition={{
                duration: 8 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <div className="relative container-custom pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                <CircuitBoard className="w-4 h-4" />
                {CLUB_DEPARTMENT} — {UNIVERSITY_NAME}
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
                <span className="text-white">Build the</span>
                <br />
                <span className="gradient-text">Future with</span>
                <br />
                <span className="text-white">Robotics</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Join GEHU Bhimtal&rsquo;s premier robotics club. Design circuits, program robots, 
                build drones, and push the boundaries of innovation in Electronics & Communication.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/register" className="btn-accent flex items-center justify-center gap-2 group">
                  Join the Club
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/events" className="btn-outline flex items-center justify-center gap-2">
                  Explore Events
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div variants={fadeInUp} className="flex gap-8 mt-10 justify-center lg:justify-start">
                {[
                  { number: '50+', label: 'Members' },
                  { number: '15+', label: 'Events' },
                  { number: '10+', label: 'Projects' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right side — Floating Image Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full h-[500px]">
                {/* Main card */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 right-0 w-72 h-72 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-white/10"
                >
                  <Image src={CAMPUS_IMAGES.main} alt="GEHU Campus" fill className="object-cover" />
                </motion.div>
                {/* Secondary card */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-0 left-0 w-60 h-60 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10"
                >
                  <Image src={CAMPUS_IMAGES.amphitheater} alt="GEHU Amphitheater" fill className="object-cover" />
                </motion.div>
                {/* Accent card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-1/2 left-12 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10"
                >
                  <Image src={CAMPUS_IMAGES.labEnhanced} alt="Robotics Lab" fill className="object-cover" />
                </motion.div>
                {/* Glow effects */}
                <div className="absolute top-20 right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-36 h-36 bg-blue-500/20 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-20" />
        <div className="container-custom relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Why Join Us
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Innovate. Build. <span className="gradient-text-blue">Transform.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto text-lg">
              The {CLUB_NAME} is the flagship technical club of {CLUB_DEPARTMENT} at GEHU Bhimtal, 
              dedicated to fostering innovation through hands-on projects.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Bot, title: 'Robotics Projects', desc: 'Build autonomous robots, robotic arms, and intelligent machines from scratch.', color: 'cyan' },
              { icon: CircuitBoard, title: 'Electronics Lab', desc: 'Access FPGA boards, oscilloscopes, sensors, and prototyping equipment.', color: 'blue' },
              { icon: Cog, title: 'IoT & Embedded', desc: 'Create smart systems using Arduino, Raspberry Pi, ESP32, and MQTT.', color: 'purple' },
              { icon: Lightbulb, title: 'Workshops & Training', desc: 'Regular hands-on workshops on PCB design, soldering, and programming.', color: 'amber' },
              { icon: Trophy, title: 'Competitions', desc: 'Participate in national and international robotics competitions and hackathons.', color: 'emerald' },
              { icon: GraduationCap, title: 'Research & Papers', desc: 'Conduct research in autonomous systems, signal processing, and communication.', color: 'rose' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="glass-card p-6 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CAMPUS GALLERY ===== */}
      <section className="section-padding bg-[#0a0f1e]">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
              <Globe className="w-4 h-4" />
              Our Campus
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              GEHU <span className="gradient-text-blue">Bhimtal Campus</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 max-w-xl mx-auto">
              Nestled in the hills of Uttarakhand, our campus provides the perfect environment for innovation and learning.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { src: CAMPUS_IMAGES.aerialEnhanced, alt: 'Campus Aerial View', span: 'md:col-span-2 md:row-span-2' },
              { src: CAMPUS_IMAGES.entrance, alt: 'Campus Entrance' },
              { src: CAMPUS_IMAGES.love, alt: 'I Love GEHU' },
              { src: CAMPUS_IMAGES.playground, alt: 'Campus Playground' },
              { src: CAMPUS_IMAGES.side, alt: 'Campus Architecture' },
            ].map((img, i) => (
              <motion.div
                key={img.alt}
                variants={fadeInUp}
                className={`relative rounded-xl overflow-hidden group ${img.span || ''} ${i === 0 ? 'h-64 md:h-full' : 'h-40 md:h-48'}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-3 left-3 text-white text-sm font-medium">{img.alt}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="section-padding relative">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Our Team
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Club <span className="gradient-text">Leadership</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 max-w-xl mx-auto">
              Meet the dedicated team driving innovation and managing the club&apos;s activities.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { name: 'Faculty Advisor', role: 'Faculty Advisor', department: 'ECE Department', color: 'from-blue-600 to-blue-800', icon: GraduationCap },
              { name: 'Club President', role: 'President', department: 'Student Lead', color: 'from-cyan-600 to-cyan-800', icon: Rocket },
              { name: 'Management Team', role: 'Core Team', department: 'Technical & Operations', color: 'from-purple-600 to-purple-800', icon: Cog },
            ].map((member, i) => (
              <motion.div
                key={member.role}
                variants={fadeInUp}
                className="glass-card overflow-hidden group"
              >
                <div className={`h-32 bg-gradient-to-br ${member.color} flex items-center justify-center relative overflow-hidden`}>
                  <member.icon className="w-16 h-16 text-white/30" />
                  <div className="absolute inset-0 animate-shimmer" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                  <p className="text-cyan-400 text-sm font-medium">{member.role}</p>
                  <p className="text-slate-500 text-xs mt-1">{member.department}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-8"
          >
            <p className="text-slate-500 text-sm mb-3">Names will be populated once club management is set up via the admin panel.</p>
            <Link href="/about" className="text-cyan-400 text-sm font-medium hover:text-cyan-300 inline-flex items-center gap-1 group">
              View Full Team <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== EVENTS PREVIEW ===== */}
      <section className="section-padding bg-[#0a0f1e]">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Upcoming Events
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don&apos;t Miss <span className="gradient-text-blue">What&apos;s Next</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: 'Robo Wars 2026', type: 'Competition', date: 'Coming Soon', img: STOCK_IMAGES.robotics1, fee: '₹299' },
              { title: 'IoT Workshop', type: 'Workshop', date: 'Coming Soon', img: STOCK_IMAGES.electronics, fee: 'Free' },
              { title: 'Drone Building Hackathon', type: 'Hackathon', date: 'Coming Soon', img: STOCK_IMAGES.drone, fee: '₹499' },
            ].map((event, i) => (
              <motion.div
                key={event.title}
                variants={fadeInUp}
                className="event-card group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-cyan-500/90 text-white text-xs font-semibold rounded-full">
                    {event.type}
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-amber-500/90 text-white text-xs font-semibold rounded-full">
                    {event.fee}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-1">{event.title}</h3>
                  <p className="text-slate-400 text-sm">{event.date}</p>
                  <Link href="/events" className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                    View Details <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-10"
          >
            <Link href="/events" className="btn-primary inline-flex items-center gap-2">
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={CAMPUS_IMAGES.labEnhanced}
            alt="Robotics Lab"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-[#0f172a]/95 to-cyan-900/90" />
        </div>
        <div className="container-custom relative text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="gradient-text">Build Something Amazing?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-300 max-w-2xl mx-auto text-lg mb-8">
              Whether you&apos;re a complete beginner or an experienced engineer, the {CLUB_NAME} has a place for you. 
              Register now and start your journey in robotics and electronics.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-accent flex items-center justify-center gap-2 group text-lg !px-8 !py-4">
                Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/verify" className="btn-outline flex items-center justify-center gap-2 text-lg !px-8 !py-4">
                <Award className="w-5 h-5" />
                Verify Certificate
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
