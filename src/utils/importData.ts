// src/utils/importData.ts
import type { PortfolioData } from '../types/admin.types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validatePortfolioData(data: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Invalid data format');
    return { isValid: false, errors, warnings };
  }

  if (data.experiences && !Array.isArray(data.experiences)) {
    errors.push('Experiences must be an array');
  }

  if (data.skills && !Array.isArray(data.skills)) {
    errors.push('Skills must be an array');
  }

  if (data.projects && !Array.isArray(data.projects)) {
    errors.push('Projects must be an array');
  }

  if (Array.isArray(data.experiences)) {
    data.experiences.forEach((exp: any, index: number) => {
      if (!exp.company || !exp.position) {
        errors.push(`Experience ${index + 1}: Missing required fields`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function sanitizeData(data: any): Partial<PortfolioData> {
  const sanitized: Partial<PortfolioData> = {};

  if (Array.isArray(data.experiences)) {
    sanitized.experiences = data.experiences.map((exp: any) => ({
      id: exp.id || Date.now().toString() + Math.random(),
      company: exp.company || '',
      position: exp.position || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      current: exp.current || false,
      description: exp.description || '',
      achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
      technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
      companyUrl: exp.companyUrl || ''
    }));
  }

  if (Array.isArray(data.skills)) {
    sanitized.skills = data.skills.map((skill: any) => ({
      id: skill.id || Date.now().toString() + Math.random(),
      name: skill.name || '',
      category: skill.category || 'design',
      proficiency: Math.max(0, Math.min(100, skill.proficiency || 50)),
      yearsOfExperience: Math.max(0, skill.yearsOfExperience || 0)
    }));
  }

  if (Array.isArray(data.certifications)) {
    sanitized.certifications = data.certifications.map((cert: any) => ({
      id: cert.id || Date.now().toString() + Math.random(),
      title: cert.title || '',
      issuer: cert.issuer || '',
      date: cert.date || '',
      credentialUrl: cert.credentialUrl || '',
      credentialId: cert.credentialId || ''
    }));
  }

  if (Array.isArray(data.projects)) {
    sanitized.projects = data.projects.map((project: any) => ({
      id: project.id || Date.now().toString() + Math.random(),
      title: project.title || '',
      status: project.status || 'planned',
      description: project.description || '',
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      results: Array.isArray(project.results) ? project.results : [],
      images: Array.isArray(project.images) ? project.images : [],
      links: project.links || {}
    }));
  }

  if (Array.isArray(data.files)) {
    sanitized.files = data.files;
  }

  return sanitized;
}

export async function importFromJSON(file: File): Promise<{ success: boolean; message: string; data?: Partial<PortfolioData> }> {
  try {
    const text = await file.text();
    const data = JSON.parse(text);

    const validation = validatePortfolioData(data);
    
    if (!validation.isValid) {
      return {
        success: false,
        message: `Validation failed: ${validation.errors.join(', ')}`
      };
    }

    const sanitizedData = sanitizeData(data);

    return {
      success: true,
      message: validation.warnings.length > 0 
        ? `Import successful with warnings: ${validation.warnings.join(', ')}`
        : 'Import successful',
      data: sanitizedData
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Import failed'
    };
  }
}

export function mergeData(existing: PortfolioData, imported: Partial<PortfolioData>, strategy: 'replace' | 'merge'): PortfolioData {
  if (strategy === 'replace') {
    return {
      experiences: imported.experiences || existing.experiences,
      skills: imported.skills || existing.skills,
      certifications: imported.certifications || existing.certifications,
      projects: imported.projects || existing.projects,
      files: imported.files || existing.files
    };
  }

  // Merge strategy
  return {
    experiences: [...existing.experiences, ...(imported.experiences || [])],
    skills: [...existing.skills, ...(imported.skills || [])],
    certifications: [...existing.certifications, ...(imported.certifications || [])],
    projects: [...existing.projects, ...(imported.projects || [])],
    files: [...(existing.files || []), ...(imported.files || [])]
  };
}