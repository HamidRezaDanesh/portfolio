import { useTranslation } from 'react-i18next';

interface NavigationProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

export default function Navigation({ isMobile = false, onNavigate }: NavigationProps) {
  const { t } = useTranslation();

  const navItems = [
    { key: 'home', label: t('nav.home'), href: '#home' },
    { key: 'about', label: t('nav.about'), href: '#about' },
    { key: 'experience', label: t('nav.experience'), href: '#experience' },
    { key: 'skills', label: t('nav.skills'), href: '#skills' },
    { key: 'projects', label: t('nav.projects'), href: '#projects' },
    { key: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onNavigate?.();
    }
  };

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="glass-card block px-4 py-3 text-lg hover:shadow-glow-blue transition-all rounded-lg font-semibold"
          >
            {item.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => (
        <a
          key={item.key}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className="relative px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
        >
          {item.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
        </a>
      ))}
    </nav>
  );
}