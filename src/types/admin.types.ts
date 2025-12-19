// src/types/admin.types.ts

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location?: string;  // اضافه شد
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'design' | 'manufacturing' | 'programming' | 'quality';
  proficiency: number;
  yearsOfExperience: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface Project {
  id: string;
  title: string;
  duration?: string;  // اضافه شد
  status: 'completed' | 'in-progress' | 'planned';
  description: string;
  technologies: string[];
  results: string[];
  images?: string[];
  links?: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
}

export interface UploadedFile {
  id: string;
  name: string;
  type: 'resume' | 'certificate' | 'project-image' | 'other';
  category?: string;
  language?: 'en' | 'sv' | 'fa';
  size: number;
  mimeType: string;
  data: string;
  uploadDate: string;
  metadata?: {
    projectId?: string;
    certificationId?: string;
    description?: string;
  };
}

export interface FileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  compress?: boolean;
  quality?: number;
}

export interface PortfolioData {
  experiences: Experience[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  files?: UploadedFile[];
}