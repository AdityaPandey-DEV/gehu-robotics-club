'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Cpu, LayoutDashboard, Calendar, Users, Award, Image as ImageIcon,
  FileText, Settings, LogOut, ChevronLeft, ChevronRight, CreditCard,
  Upload, Newspaper
} from 'lucide-react';
import { CLUB_NAME } from '@/lib/constants';
import type { Profile } from '@/types';

const MENU_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, roles: ['super_admin', 'faculty', 'president', 'management', 'member'] },
  { href: '/dashboard/events', label: 'Events', icon: Calendar, roles: ['super_admin', 'faculty', 'president', 'management'] },
  { href: '/dashboard/members', label: 'Members', icon: Users, roles: ['super_admin', 'faculty', 'president'] },
  { href: '/dashboard/registrations', label: 'Registrations', icon: CreditCard, roles: ['super_admin', 'faculty', 'president', 'management'] },
  { href: '/dashboard/certificates', label: 'Certificates', icon: Award, roles: ['super_admin', 'faculty', 'president'] },
  { href: '/dashboard/media', label: 'Media Upload', icon: Upload, roles: ['super_admin', 'faculty', 'president'] },
  { href: '/dashboard/activities', label: 'Activities', icon: Newspaper, roles: ['super_admin', 'faculty', 'president', 'management'] },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings, roles: ['super_admin', 'faculty', 'president', 'management', 'member'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          if (data) setProfile(data);
        }
      } catch {}
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const userRole = profile?.role || 'member';
  const filteredItems = MENU_ITEMS.filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        className="fixed left-0 top-20 bottom-0 bg-[#0a0f1e] border-r border-white/5 z-40 flex flex-col"
      >
        {/* Menu */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-2">
          {!collapsed && profile && (
            <div className="px-3 py-2">
              <p className="text-white text-sm font-medium truncate">{profile.full_name}</p>
              <p className="text-cyan-400 text-xs capitalize">{profile.role?.replace('_', ' ')}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all ${collapsed ? 'ml-[72px]' : 'ml-[260px]'}`}>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
