-- CREATE TABLES FOR GEHU ROBOTICS CLUB (PRODUCTION)

-- 1. Campus configuration
CREATE TABLE campuses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  address TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed campuses
INSERT INTO campuses (name, code, address) VALUES 
('Bhimtal', 'bhimtal', 'Graphic Era Hill University SatTal Road, Bhimtal, Nainital, Uttarakhand 263136'),
('Dehradun', 'dehradun', 'Graphic Era Hill University Bell Road, Clement Town Dehradun Uttarakhand'),
('Haldwani', 'haldwani', 'Graphic Era Hill University Tularampur, Near Mahalaxmi Temple, opp. Middas Squar, Haldwani, Uttarakhand 263139');

-- 2. User profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  roll_number TEXT UNIQUE,
  phone TEXT,
  branch TEXT DEFAULT 'ECE',
  year_of_study INT,
  campus_id UUID REFERENCES campuses(id),
  role TEXT DEFAULT 'member' CHECK (role IN ('super_admin', 'faculty', 'president', 'management', 'member')),
  position TEXT,
  avatar_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  joined_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Events
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('workshop', 'competition', 'hackathon', 'seminar', 'meetup', 'other')),
  date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  venue TEXT,
  campus_id UUID REFERENCES campuses(id),
  max_participants INT,
  registration_fee DECIMAL(10,2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  cover_image TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Registrations
CREATE TABLE event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  roll_number TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'free')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount DECIMAL(10,2) DEFAULT 0,
  registered_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Certificates
CREATE TABLE certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  event_id UUID REFERENCES events(id),
  certificate_number TEXT UNIQUE NOT NULL,
  roll_number TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  event_title TEXT NOT NULL,
  issue_date DATE DEFAULT CURRENT_DATE,
  certificate_url TEXT,
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Media
CREATE TABLE club_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  campus_id UUID REFERENCES campuses(id),
  uploaded_by UUID REFERENCES profiles(id),
  category TEXT DEFAULT 'general',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE RLS
ALTER TABLE campuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_media ENABLE ROW LEVEL SECURITY;

-- POLICIES (Simple Production Defaults)
-- Public can read campuses
CREATE POLICY "Public read campuses" ON campuses FOR SELECT USING (true);
-- Profiles: Everyone can read, only user can update their own
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Events: Everyone can read active, admins/faculty can manage
CREATE POLICY "Public read active events" ON events FOR SELECT USING (is_active = true);
-- (Add more granular RBAC policies based on the 'role' column in next steps)
