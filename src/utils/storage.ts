// src/utils/storage.ts
import type { PortfolioData, UploadedFile } from '../types/admin.types';

const STORAGE_KEY = 'portfolio_data';

export const storage = {
  getData(): PortfolioData {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return this.getDefaultData();
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return this.getDefaultData();
    }
  },

  setData(data: PortfolioData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Please delete some files to free up space.');
      }
    }
  },

  getDefaultData(): PortfolioData {
    return {
      experiences: [
        {
          id: '1',
          company: 'ZF AG Transmissions',
          position: 'Senior Industrial Designer',
          startDate: '2022-09',
          endDate: '',
          current: true,
          description: 'Leading the design of automotive transmission spare parts using SolidWorks.',
          achievements: [
            'Reduced maintenance costs by 30%',
            'Achieved €50,000 in annual savings',
            'Improved efficiency by 50%'
          ],
          technologies: ['SolidWorks', 'AutoCAD', 'Cost Analysis'],
          companyUrl: 'https://www.zf.com'
        },
        {
          id: '2',
          company: 'IBC Iran (SKF)',
          position: 'Mechanical Engineer - Tool Designer',
          startDate: '2020-04',
          endDate: '2022-09',
          current: false,
          description: 'Designed precision tools for bearing assembly processes.',
          achievements: [
            'Excellence Award for Adaptability (2020)',
            'Reduced production time by 20%',
            'Saved 10 tons of grease yearly'
          ],
          technologies: ['CAD Design', 'ISO Standards', 'Manufacturing'],
          companyUrl: 'https://www.skf.com'
        },
        {
          id: '3',
          company: 'Felezkaran Molding Company',
          position: 'Manufacturing Engineer',
          startDate: '2019-11',
          endDate: '2020-04',
          current: false,
          description: 'Specialized in plastic injection molding and quality control.',
          achievements: [
            'Improved mold flow efficiency',
            'Reduced defect rate by 15%'
          ],
          technologies: ['Moldflow', 'Quality Control', 'Injection Molding']
        }
      ],
      skills: [
        { id: '1', name: 'SolidWorks', category: 'design', proficiency: 95, yearsOfExperience: 5 },
        { id: '2', name: 'AutoCAD', category: 'design', proficiency: 90, yearsOfExperience: 4 },
        { id: '3', name: 'CATIA V5', category: 'design', proficiency: 85, yearsOfExperience: 3 },
        { id: '4', name: 'CNC Programming', category: 'manufacturing', proficiency: 90, yearsOfExperience: 3 },
        { id: '5', name: 'Lean Manufacturing', category: 'manufacturing', proficiency: 85, yearsOfExperience: 4 },
        { id: '6', name: 'Six Sigma', category: 'manufacturing', proficiency: 80, yearsOfExperience: 2 },
        { id: '7', name: 'Python', category: 'programming', proficiency: 75, yearsOfExperience: 2 },
        { id: '8', name: 'ISO 9001', category: 'quality', proficiency: 90, yearsOfExperience: 5 }
      ],
      certifications: [
        {
          id: '1',
          title: 'SOLIDWORKS 3D CAD Specialization',
          issuer: 'Dassault Systems (Coursera)',
          date: '2025-08',
          credentialUrl: 'https://coursera.org/verify/specialization/example1'
        },
        {
          id: '2',
          title: 'Six Sigma Yellow Belt',
          issuer: 'Kennesaw State University (Coursera)',
          date: '2025-08',
          credentialUrl: 'https://coursera.org/verify/example2'
        }
      ],
      projects: [
        {
          id: '1',
          title: 'ZF Transmission Components Redesign',
          status: 'in-progress',
          description: 'Comprehensive redesign of 50+ automotive transmission spare parts.',
          technologies: ['SolidWorks', 'Cost Analysis', 'Automotive Engineering'],
          results: [
            '30% reduction in maintenance costs',
            '€50,000 annual savings',
            '50% efficiency improvement'
          ]
        },
        {
          id: '2',
          title: 'SKF Bearing Assembly Tools',
          status: 'completed',
          description: 'Design and development of precision tools and ISO-standard quality gauges.',
          technologies: ['CAD Design', 'ISO Standards', 'Manufacturing'],
          results: [
            'Excellence Award (2020)',
            '20% production time reduction',
            '10 tons yearly grease optimization'
          ]
        }
      ],
      files: []
    };
  },

  clearData(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  getFiles(): UploadedFile[] {
    const data = this.getData();
    return data.files || [];
  },

  addFile(file: UploadedFile): void {
    const data = this.getData();
    data.files = [...(data.files || []), file];
    this.setData(data);
  },

  updateFile(id: string, updates: Partial<UploadedFile>): void {
    const data = this.getData();
    data.files = (data.files || []).map(file =>
      file.id === id ? { ...file, ...updates } : file
    );
    this.setData(data);
  },

  deleteFile(id: string): void {
    const data = this.getData();
    data.files = (data.files || []).filter(file => file.id !== id);
    this.setData(data);
  },

  getStorageUsage(): { used: number; available: number; percentage: number } {
    try {
      const data = JSON.stringify(this.getData());
      const used = new Blob([data]).size;
      const available = 5 * 1024 * 1024;
      const percentage = (used / available) * 100;
      
      return { used, available, percentage };
    } catch {
      return { used: 0, available: 5242880, percentage: 0 };
    }
  }
};