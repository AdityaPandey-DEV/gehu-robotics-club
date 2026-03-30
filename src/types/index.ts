export type Campus = {
  id: string;
  name: string;
  code: string;
  address?: string;
  is_active: boolean;
  created_at: string;
};

export type UserRole = 'super_admin' | 'faculty' | 'president' | 'management' | 'member';

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  roll_number?: string;
  phone?: string;
  branch: string;
  year_of_study?: number;
  campus_id?: string;
  role: UserRole;
  position?: string;
  avatar_url?: string;
  is_approved: boolean;
  joined_at: string;
  updated_at: string;
};

export type EventType = 'workshop' | 'competition' | 'hackathon' | 'seminar' | 'meetup' | 'other';

export type ClubEvent = {
  id: string;
  title: string;
  description?: string;
  event_type: EventType;
  date: string;
  end_date?: string;
  venue?: string;
  campus_id?: string;
  max_participants?: number;
  registration_fee: number;
  is_paid: boolean;
  is_active: boolean;
  cover_image?: string;
  created_by?: string;
  created_at: string;
};

export type RegistrationStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'free';

export type EventRegistration = {
  id: string;
  event_id: string;
  user_id?: string;
  full_name: string;
  email: string;
  roll_number: string;
  phone?: string;
  payment_status: RegistrationStatus;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  amount: number;
  registered_at: string;
};

export type Certificate = {
  id: string;
  user_id?: string;
  event_id?: string;
  certificate_number: string;
  roll_number: string;
  recipient_name: string;
  event_title: string;
  issue_date: string;
  certificate_url?: string;
  verified: boolean;
  created_at: string;
};

export type MediaType = 'image' | 'video';

export type ClubMedia = {
  id: string;
  title: string;
  description?: string;
  media_type: MediaType;
  media_url: string;
  thumbnail_url?: string;
  campus_id?: string;
  uploaded_by?: string;
  category: string;
  is_featured: boolean;
  created_at: string;
};

export type ActivityType = 'announcement' | 'achievement' | 'research' | 'news';

export type Activity = {
  id: string;
  title: string;
  content?: string;
  activity_type: ActivityType;
  campus_id?: string;
  cover_image?: string;
  is_published: boolean;
  created_by?: string;
  created_at: string;
};
