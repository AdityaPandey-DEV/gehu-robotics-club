export const CAMPUSES = {
  bhimtal: {
    name: 'Bhimtal',
    code: 'bhimtal',
    address: 'Graphic Era Hill University, SatTal Road, Bhimtal, Nainital, Uttarakhand 263136',
    default: true,
  },
  dehradun: {
    name: 'Dehradun',
    code: 'dehradun',
    address: 'Graphic Era Hill University, Bell Road, Clement Town, Dehradun, Uttarakhand',
    default: false,
  },
  haldwani: {
    name: 'Haldwani',
    code: 'haldwani',
    address: 'Graphic Era Hill University, Tularampur, Near Mahalaxmi Temple, Haldwani, Uttarakhand 263139',
    default: false,
  },
} as const;

export const DEFAULT_CAMPUS = process.env.NEXT_PUBLIC_DEFAULT_CAMPUS || 'bhimtal';

export const CLUB_NAME = 'RoboTech Club';
export const CLUB_FULL_NAME = 'RoboTech Club — GEHU';
export const CLUB_DEPARTMENT = 'Electronics & Communication Engineering';
export const UNIVERSITY_NAME = 'Graphic Era Hill University';
export const UNIVERSITY_SHORT = 'GEHU';

export const ROLES = {
  super_admin: { label: 'Super Admin', level: 5 },
  faculty: { label: 'Faculty Advisor', level: 4 },
  president: { label: 'President', level: 3 },
  management: { label: 'Management', level: 2 },
  member: { label: 'Member', level: 1 },
} as const;

export const ADMIN_ROLES = ['super_admin', 'faculty', 'president', 'management'] as const;
export const ELEVATED_ROLES = ['super_admin', 'faculty'] as const;

export const EVENT_TYPES = [
  { value: 'workshop', label: 'Workshop' },
  { value: 'competition', label: 'Competition' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'meetup', label: 'Meetup' },
  { value: 'other', label: 'Other' },
] as const;

export const BRANCHES = [
  'Computer Science and Engineering',
  'Electronics and Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Computer Application',
  'Management',
  'Commerce',
  'Pharmacy',
  'Nursing',
  'Polytechnic',
  'Allied Sciences',
] as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/activities', label: 'Activities' },
  { href: '/about', label: 'About' },
  { href: '/verify', label: 'Verify Certificate' },
] as const;

// GEHU Bhimtal campus images (real, downloaded + AI-enhanced)
export const CAMPUS_IMAGES = {
  heroEnhanced: '/images/campus/hero-enhanced.png',
  aerialEnhanced: '/images/campus/aerial-enhanced.png',
  labEnhanced: '/images/campus/lab-enhanced.png',
  aerial: '/images/campus/campus-aerial.webp',
  amphitheater: '/images/campus/campus-amphitheater.webp',
  main: '/images/campus/campus-main.webp',
  entrance: '/images/campus/campus-entrance.webp',
  building: '/images/campus/campus-building.webp',
  love: '/images/campus/campus-love.webp',
  playground: '/images/campus/campus-playground.webp',
  side: '/images/campus/campus-side.webp',
} as const;

// Stock images (Unsplash — free to use)
export const STOCK_IMAGES = {
  robotics1: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
  robotics2: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80',
  robotics3: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=800&q=80',
  electronics: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  circuitBoard: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80',
  drone: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  event: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  lab: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  defaultAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
} as const;
