// src/types/portfolio.types.ts
export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    bio: string;
    availability: string;
  }
  
  export interface Education {
    id: string;
    degree: string;
    field: string;
    institution: string;
    startYear: string;
    endYear: string;
    gpa?: string;
    thesis?: string;
  }
  
  export interface Language {
    name: string;
    level: string;
    proficiency: number;
  }
  
  export interface Value {
    title: string;
    description: string;
    icon: string;
  }