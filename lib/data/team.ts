import type { TeamDepartment, TeamFilter, TeamMember, TimelineEntry } from "@/types";

const teamPalette = ["#FA6400", "#111111", "#3D3D3D", "#FF8C3A", "#C04D00"];

function createAvatarDataUri(name: string, background: string, foreground = "#FFFFFF"): string {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="${name}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="#1A1A1A" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="200" fill="url(#g)" />
      <circle cx="200" cy="200" r="142" fill="rgba(255,255,255,0.08)" />
      <text x="200" y="225" text-anchor="middle" font-family="Geist, Arial, sans-serif" font-size="120" font-weight="700" fill="${foreground}">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
}

function createMember(name: string, role: string, department: TeamDepartment, index: number, featured = false): TeamMember {
  const paletteIndex = index % teamPalette.length;

  return {
    name,
    role,
    department,
    image: createAvatarDataUri(name, teamPalette[paletteIndex]),
    alt: `${name}, ${role}`,
    initials: name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase(),
    featured,
  };
}

export const facultyMembers: TeamMember[] = [
  {
    ...createMember("Dr. Pavalarajan", "Faculty Coordinator", "Faculty", 0, true),
    image: "/images/faculty/pavalarajan.jpg",
  },
  {
    ...createMember("Dr. Shahul Hammed", "Faculty Mentor", "Faculty", 1, true),
    image: "/images/faculty/shahul-hammed.jpg",
  },
  {
    ...createMember("Mrs. Preethi", "Faculty Advisor", "Faculty", 2, true),
    image: "/images/faculty/preethi.jpg",
  },
];

export const currentSdc: TeamMember = {
  ...createMember("Ms. Shashti Shree", "Student Developer Champion 2025-26", "Secretary", 3, true),
  featured: true,
};

export const legacyTimeline: TimelineEntry[] = [
  {
    year: "2024-25",
    name: "Ms. Iniya Narayan N",
    avatar: createAvatarDataUri("Ms. Iniya Narayan N", teamPalette[0]),
    role: "Student Developer Champion",
  },
  {
    year: "2023-24",
    name: "Mr. Praveen A",
    avatar: createAvatarDataUri("Mr. Praveen A", teamPalette[1]),
    role: "Student Developer Champion",
  },
  {
    year: "2022-23",
    name: "Mr. Mohammed Aathil",
    avatar: createAvatarDataUri("Mr. Mohammed Aathil", teamPalette[2]),
    role: "Student Developer Champion",
  },
];

export const coreTeamMembers: TeamMember[] = [
  createMember("Boomika B", "Core Team", "Design", 4),
  createMember("Yuvaraj P", "Core Team", "Tech", 5),
  createMember("Dharshini Shri", "Core Team", "Events", 6),
  createMember("Dharani", "Core Team", "Social", 7),
  createMember("Akash I", "Core Team", "Tech", 8),
  createMember("Deepika K", "Core Team", "Design", 9),
  createMember("Haritha", "Core Team", "Events", 10),
  createMember("Sakthi Pranaash V", "Core Team", "Tech", 11),
  createMember("Jegatheesh", "Core Team", "Tech", 12),
  createMember("Praveena S", "Core Team", "Secretary", 13),
  createMember("Madhusudhanan N A", "Core Team", "Social", 14),
  createMember("Narmatha", "Core Team", "Design", 15),
  createMember("Harini MM", "Core Team", "Social", 16),
  createMember("Karthikeyan", "Core Team", "Tech", 17),
  createMember("Lena Sri S", "Core Team", "Events", 18),
  createMember("Karishma J", "Core Team", "Design", 19),
  createMember("Madhan R", "Core Team", "Tech", 20),
];

export const teamFilters: TeamFilter[] = ["All", "Tech", "Design", "Events", "Social", "Secretary"];
