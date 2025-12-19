// src/utils/exportData.ts
import { storage } from './storage';
import type { PortfolioData } from '../types/admin.types';

export function exportToJSON(data: Partial<PortfolioData> | any, filename?: string): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportExperiences(): void {
  const data = storage.getData();
  const exportData = {
    experiences: data.experiences,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  exportToJSON(exportData, `experiences-${new Date().toISOString().split('T')[0]}.json`);
}

export function exportSkills(): void {
  const data = storage.getData();
  const exportData = {
    skills: data.skills,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  exportToJSON(exportData, `skills-${new Date().toISOString().split('T')[0]}.json`);
}

export function exportProjects(): void {
  const data = storage.getData();
  const exportData = {
    projects: data.projects,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  exportToJSON(exportData, `projects-${new Date().toISOString().split('T')[0]}.json`);
}

export function exportAll(): void {
  const data = storage.getData();
  const exportData = {
    ...data,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  exportToJSON(exportData, `portfolio-full-backup-${new Date().toISOString().split('T')[0]}.json`);
}

export function generateBackupName(): string {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  return `backup-${date}-${time}.json`;
}