import Hero from '@/components/Hero';
import AboutPage from './AboutPage';
import ExperiencePage from './ExperiencePage';
import SkillsPage from './SkillsPage';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <AboutPage />
      <ExperiencePage />
      <SkillsPage />
      <ProjectsPage />
      <ContactPage />
      <Footer />
    </div>
  );
}