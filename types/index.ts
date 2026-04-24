export type SectionId = "home" | "about" | "team" | "events" | "gallery" | "contact";

export type TeamDepartment =
  | "Tech"
  | "Design"
  | "Events"
  | "Social"
  | "Secretary"
  | "Faculty";

export type TeamFilter = "All" | TeamDepartment;

export type EventType = "Workshop" | "TechTalk" | "Hackathon" | "Meetup" | "Other";
export type EventStatus = "upcoming" | "past";
export type GalleryCategory = "All" | "Workshops" | "Hackathons" | "TechTalks" | "Campus";

export interface NavLink {
  label: string;
  href: string;
  section: SectionId;
}

export interface AnnouncementItem {
  id: string;
  label: string;
  ctaLabel: string;
  ctaHref: string;
  text: string;
  sessionStorageKey: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
  detail?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department: TeamDepartment;
  image: string;
  alt: string;
  initials: string;
  featured?: boolean;
  year?: string;
}

export interface TeamSection {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export interface EventItem {
  id: string;
  title: string;
  dateLabel: string;
  dateValue: string;
  location: string;
  speaker?: string;
  summary: string;
  type: EventType;
  status: EventStatus;
  ctaLabel?: string;
  ctaHref?: string;
  tag?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  thumb: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface FeatureCard {
  title: string;
  description: string;
  accent?: string;
}

export interface TimelineEntry {
  year: string;
  name: string;
  avatar: string;
  role: string;
}
