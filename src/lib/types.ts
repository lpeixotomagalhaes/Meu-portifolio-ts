export type Project = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  coverImage: string;
  aboutImage: string;
  createdAt: string;
  updatedAt: string;
};

export type Skill = {
  id: string;
  name: string;
  description: string;
  order: number;
  createdAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  company: string;
  content: string;
  isRead: boolean;
  createdAt: string;
};

export type Setting = {
  id: string;
  aboutText: string;
  cvUrl: string | null;
  email: string;
  phone: string;
  linkedinUrl: string;
  instagramUrl: string;
  updatedAt: string;
};

export type AdminStats = {
  totalProjetos: number;
  totalSkills: number;
  mensagensNaoLidas: number;
};
