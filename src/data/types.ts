export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;          // short, for the card
  description: string[];     // long case-study paragraphs
  stack: string[];
  cover: string;             // /images path
  gallery: string[];
  repo?: string;
  demo?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  title: string;
  org: string;
  period: string;
  description: string;
  kind: 'work' | 'education';
};

export type JochiMessage = {
  /** section anchor id this message is tied to */
  anchor: string;
  text: string;
};

export type SiteConfig = {
  name: string;
  fullName: string;
  nickname: string;
  role: string;
  tagline: string;
  url: string;        // full site url, e.g. https://jose-garcia.dev
  domain: string;     // bare domain for display, e.g. jose-garcia.dev
  whatsapp: string;   // digits only for wa.me
  instagram: string;  // handle without @
  github: string;     // username
  linkedin: string;   // linkedin.com/in/<this>
  email: string;
  cvUrlEs: string;
  cvUrlEn: string;
};
