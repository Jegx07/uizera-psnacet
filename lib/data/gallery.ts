import type { GalleryCategory, GalleryItem } from "@/types";

function createGalleryImage(title: string, accent: string, secondary: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
        <radialGradient id="glow" cx="35%" cy="25%" r="70%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.42)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="1200" height="900" rx="36" fill="url(#bg)" />
      <rect width="1200" height="900" rx="36" fill="url(#glow)" />
      <circle cx="980" cy="140" r="180" fill="rgba(255,255,255,0.12)" />
      <circle cx="165" cy="710" r="240" fill="rgba(255,255,255,0.1)" />
      <path d="M120 580 C250 430, 390 420, 520 570 S820 720, 1060 520" fill="none" stroke="rgba(255,255,255,0.32)" stroke-width="18" stroke-linecap="round" />
      <text x="72" y="128" font-family="Geist, Arial, sans-serif" font-size="38" font-weight="700" fill="rgba(255,255,255,0.9)">${title}</text>
      <rect x="72" y="160" width="220" height="10" rx="5" fill="rgba(255,255,255,0.45)" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
}

function createGalleryItem(id: string, title: string, category: Exclude<GalleryCategory, "All">, accent: string, secondary: string, caption: string, width = 1200, height = 900): GalleryItem {
  return {
    id,
    title,
    category,
    image: createGalleryImage(title, accent, secondary),
    thumb: createGalleryImage(title, accent, secondary),
    alt: title,
    caption,
    width,
    height,
  };
}

export const galleryItems: GalleryItem[] = [
  createGalleryItem("studio-web-workshop", "Studio Web Workshop", "Workshops", "#FA6400", "#C04D00", "Hands-on browser automation practice with UiPath Studio Web."),
  createGalleryItem("automation-hands-on", "Automation Hands-On", "Workshops", "#FF8C3A", "#FA6400", "Students building reusable flows and process automations together."),
  createGalleryItem("agentic-hack", "Agentic Hack", "Hackathons", "#111111", "#3D3D3D", "Fast-paced problem solving with automation-first prototypes."),
  createGalleryItem("problem-solving-night", "Problem Solving Night", "Hackathons", "#C04D00", "#FA6400", "Late-night debugging, demos, and the final showcase run."),
  createGalleryItem("tech-talk-live", "Tech Talk Live", "TechTalks", "#FA6400", "#111111", "Talks focused on RPA strategy, student workflows, and careers."),
  createGalleryItem("future-of-rpa", "Future of RPA", "TechTalks", "#FF8C3A", "#C04D00", "A big-room presentation about automation trends and UiPath."),
  createGalleryItem("campus-poster-wall", "Campus Poster Wall", "Campus", "#111111", "#0A0A0A", "Announcement wall and event motion graphics around campus."),
  createGalleryItem("team-huddle", "Team Huddle", "Campus", "#3D3D3D", "#111111", "Planning sessions, content review, and event coordination."),
  createGalleryItem("workflow-demo", "Workflow Demo", "Workshops", "#FA6400", "#FF8C3A", "Live demonstrations of automation patterns and best practices."),
  createGalleryItem("speaker-session", "Speaker Session", "TechTalks", "#C04D00", "#111111", "Industry speakers sharing practical automation guidance."),
  createGalleryItem("builder-circle", "Builder Circle", "Campus", "#FA6400", "#0A0A0A", "Peer learning, collaboration, and community momentum."),
  createGalleryItem("hack-finale", "Hack Finale", "Hackathons", "#FF8C3A", "#FA6400", "Final presentations, judging, and the closing celebration."),
];

export const galleryFilters: GalleryCategory[] = ["All", "Workshops", "Hackathons", "TechTalks", "Campus"];
