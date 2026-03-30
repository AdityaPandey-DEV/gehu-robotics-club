'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, ChevronRight, Search, Filter } from 'lucide-react';
import { STOCK_IMAGES, CAMPUS_IMAGES } from '@/lib/constants';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const SAMPLE_EVENTS = [
  { id: '1', title: 'Robo Wars 2026', type: 'Competition', date: 'April 15, 2026', venue: 'GEHU Bhimtal Main Auditorium', fee: 299, img: STOCK_IMAGES.robotics1, spots: 50, registered: 32 },
  { id: '2', title: 'IoT Smart Home Workshop', type: 'Workshop', date: 'April 22, 2026', venue: 'ECE Lab 3', fee: 0, img: STOCK_IMAGES.electronics, spots: 30, registered: 18 },
  { id: '3', title: 'Drone Building Hackathon', type: 'Hackathon', date: 'May 5, 2026', venue: 'Innovation Center', fee: 499, img: STOCK_IMAGES.drone, spots: 40, registered: 25 },
  { id: '4', title: 'PCB Design Masterclass', type: 'Workshop', date: 'May 12, 2026', venue: 'ECE Lab 1', fee: 0, img: STOCK_IMAGES.circuitBoard, spots: 25, registered: 10 },
  { id: '5', title: 'Arduino Programming Basics', type: 'Seminar', date: 'May 20, 2026', venue: 'Lecture Hall B2', fee: 0, img: STOCK_IMAGES.lab, spots: 60, registered: 40 },
  { id: '6', title: 'National Robotics Challenge', type: 'Competition', date: 'June 1, 2026', venue: 'GEHU Stadium', fee: 599, img: STOCK_IMAGES.robotics2, spots: 100, registered: 55 },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-16">
      <div className="container-custom">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-12">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Club <span className="gradient-text-blue">Events</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl">
            Explore our upcoming workshops, competitions, hackathons, and seminars. Register and pay securely.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_EVENTS.map((event) => (
            <motion.div key={event.id} variants={fadeInUp} className="event-card group">
              <div className="relative h-48 overflow-hidden">
                <Image src={event.img} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-cyan-500/90 text-white text-xs font-semibold rounded-full">{event.type}</div>
                <div className="absolute top-3 right-3 px-3 py-1 bg-amber-500/90 text-white text-xs font-semibold rounded-full">
                  {event.fee === 0 ? 'Free' : `₹${event.fee}`}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4 text-cyan-400" /> {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <MapPin className="w-4 h-4 text-cyan-400" /> {event.venue}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Users className="w-4 h-4 text-cyan-400" /> {event.registered}/{event.spots} registered
                  </div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 mb-4">
                  <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${(event.registered / event.spots) * 100}%` }} />
                </div>
                <Link href={`/form/${event.id}`} className="btn-accent w-full flex items-center justify-center gap-2 !py-2.5 !text-sm">
                  Register Now <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
