import Link from 'next/link';
import { Cpu, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { CLUB_NAME, UNIVERSITY_NAME, NAV_LINKS, CAMPUSES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0f1e] text-slate-400 border-t border-white/5">
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-30" />
      
      <div className="relative container-custom section-padding !pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{CLUB_NAME}</h3>
                <p className="text-[10px] text-cyan-400/80 font-medium tracking-wider uppercase">GEHU Bhimtal</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Where innovation meets electronics. Building the future through robotics, IoT, and embedded systems at {UNIVERSITY_NAME}.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: 'https://www.youtube.com/GEHUDehradun', label: 'YouTube' },
                { icon: Globe, href: 'https://www.linkedin.com/company/graphic-era-hilluniversity', label: 'LinkedIn' },
                { icon: Globe, href: 'https://www.instagram.com/graphicerahilluniversity/', label: 'Instagram' },
                { icon: Globe, href: 'https://twitter.com/gehudehradun', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-cyan-500/20 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/register" className="text-sm hover:text-cyan-400 transition-colors">
                  Join the Club
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-sm">{CAMPUSES.bhimtal.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:enquiry@gehu.ac.in" className="text-sm hover:text-cyan-400 transition-colors">
                  enquiry@gehu.ac.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:18002701280" className="text-sm hover:text-cyan-400 transition-colors">
                  1800-270-1280
                </a>
              </li>
            </ul>
          </div>

          {/* Campuses */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">GEHU Campuses</h4>
            <ul className="space-y-2.5">
              {Object.values(CAMPUSES).map((campus) => (
                <li key={campus.code} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${campus.default ? 'bg-cyan-400' : 'bg-white/30'}`} />
                  <span className="text-sm">
                    {campus.name}
                    {campus.default && <span className="text-cyan-400 text-xs ml-1">(Current)</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {CLUB_NAME} — {UNIVERSITY_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Electronics & Communication Engineering</span>
            <span>•</span>
            <span>Bhimtal Campus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
