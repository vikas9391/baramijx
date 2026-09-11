import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  language: 'ar' | 'fr' | 'en';
  setLanguage: (lang: 'ar' | 'fr' | 'en') => void;
  onOpenProgram: () => void;
}

export default function Header({ language, setLanguage, onOpenProgram }: HeaderProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = {
    ar: [
      { label: 'الرئيسية', href: '/' },
      { label: 'المرشح وسيرته', href: '/candidate' },
      { label: 'البرنامج الانتخابي', href: '/program' },
      { label: 'سبورة القرب والشكايات', href: '/proximity-board' },
      { label: 'اللقاءات والميدان', href: '/field-work' },
    ],
    fr: [
      { label: 'Accueil', href: '/' },
      { label: 'Candidat', href: '/candidate' },
      { label: 'Programme', href: '/program' },
      { label: 'Proximité', href: '/proximity-board' },
      { label: 'Événements', href: '/field-work' },
    ],
    en: [
      { label: 'Home', href: '/' },
      { label: 'Candidate', href: '/candidate' },
      { label: 'Electoral Program', href: '/program' },
      { label: 'Proximity Board', href: '/proximity-board' },
      { label: 'Field Work & Interviews', href: '/field-work' },
    ],
  };

  const cta = {
    ar: 'سجل شكايتك المباشرة',
    fr: 'Enregistrez votre réclamation',
    en: 'Register Your Complaint',
  };

  const topTagline = {
    ar: 'الحزب المغربي الحر — الكرامة . الحرية . التنمية العادلة',
    fr: 'Parti Marocain Libéral — Dignité . Liberté . Développement Équitable',
    en: 'Moroccan Liberal Party — Dignity . Freedom . Fair Development',
  };

  const servicesLink = {
    ar: 'خدماتنا الانتخابية',
    fr: 'Nos Services Électoraux',
    en: 'Our Election Services',
  };

  const menuLabel = {
    ar: 'القائمة',
    fr: 'Menu',
    en: 'Menu',
  };

  const programLabel = {
    ar: 'عرض البرنامج الانتخابي',
    fr: 'Voir le programme électoral',
    en: 'View electoral program',
  };

  const closeMobile = () => setMobileOpen(false);

  const openProgram = () => {
    closeMobile();
    onOpenProgram();
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Slim utility bar */}
      <div className="bg-primary text-primary-foreground border-b border-primary-foreground/10">
        <div className="container mx-auto px-3 sm:px-4 h-8 sm:h-9 flex items-center justify-between gap-3 text-xs">
          <p className="font-medium truncate hidden sm:block text-primary-foreground/80">{topTagline[language]}</p>
          <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">
            <Link
              href="/election-services"
              className="text-accent font-semibold hidden sm:inline hover:text-accent/80 transition-colors"
            >
              {servicesLink[language]}
            </Link>
            <div className="flex items-center rounded-md bg-white/5 p-0.5">
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-colors ${language === 'ar' ? 'bg-accent text-accent-foreground' : 'text-primary-foreground/65 hover:text-primary-foreground'}`}
              >
                العربية
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-colors ${language === 'fr' ? 'bg-accent text-accent-foreground' : 'text-primary-foreground/65 hover:text-primary-foreground'}`}
              >
                <span className="hidden sm:inline">Français</span>
                <span className="sm:hidden">FR</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-colors ${language === 'en' ? 'bg-accent text-accent-foreground' : 'text-primary-foreground/65 hover:text-primary-foreground'}`}
              >
                <span className="hidden sm:inline">English</span>
                <span className="sm:hidden">EN</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-[#F8F7F5]/95 backdrop-blur-md shadow-sm border-b border-[#e5e2dc]">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="min-h-[64px] sm:min-h-[76px] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={openProgram}
              aria-label={programLabel[language]}
              title={programLabel[language]}
              className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0 text-start group cursor-pointer py-2"
            >
              <span className="relative shrink-0">
                <img
                  src="/logo.jpeg"
                  alt="PML Logo"
                  className="h-9 w-9 sm:h-12 sm:w-12 object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <span className="absolute -inset-1 rounded-full border border-accent/0 group-hover:border-accent/40 transition-colors" />
              </span>
              <div className="min-w-0 max-w-[180px] sm:max-w-none">
                <div className="text-[13px] sm:text-lg font-bold leading-tight truncate group-hover:text-accent transition-colors" style={{ color: '#0F1419' }}>
                  الحزب المغربي الحر
                </div>
                <div className="text-[8px] sm:text-xs font-medium tracking-wide text-accent leading-tight truncate">
                  PARTI MAROCAIN LIBÉRAL
                </div>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navItems[language].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-2.5 lg:px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent"
                  style={location === item.href ? { color: '#0F1419', fontWeight: 700 } : { color: '#0F1419cc' }}
                >
                  {location === item.href && <span className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-accent" />}
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <Link href="/proximity-board" className="cta-button text-xs sm:text-sm hidden lg:inline-flex items-center whitespace-nowrap">
                {cta[language]}
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={menuLabel[language]}
                aria-expanded={mobileOpen}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl border transition-all duration-200 shrink-0"
                style={{
                  borderColor: mobileOpen ? '#D4A574' : '#0F1419',
                  color: mobileOpen ? '#F8F7F5' : '#0F1419',
                  backgroundColor: mobileOpen ? '#0F1419' : 'transparent',
                }}
              >
                {mobileOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${mobileOpen ? 'max-h-[620px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-primary border-t border-white/10">
            <nav className="container mx-auto px-3 py-3 flex flex-col gap-1">
              {navItems[language].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors"
                  style={location === item.href ? { backgroundColor: '#D4A574', color: '#0F1419' } : { color: '#F8F7F5' }}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/election-services" onClick={closeMobile} className="px-4 py-3.5 rounded-xl text-[15px] font-semibold text-accent hover:bg-white/5 transition-colors">
                {servicesLink[language]}
              </Link>
              <button type="button" onClick={openProgram} className="px-4 py-3.5 rounded-xl text-[15px] font-semibold text-start text-accent hover:bg-white/5 transition-colors">
                {programLabel[language]}
              </button>
              <Link href="/proximity-board" onClick={closeMobile} className="cta-button text-center mt-2 mb-1 py-3.5">
                {cta[language]}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
