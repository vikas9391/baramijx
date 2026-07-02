import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  language: 'ar' | 'fr' | 'en';
  setLanguage: (lang: 'ar' | 'fr' | 'en') => void;
}

/**
 * Header Component
 * Design: Two-tier navigation
 *   - Top bar: dark navy, party tagline + language switcher + services link
 *   - Main bar: navy, logo + menu + CTA button
 *   - Mobile: hamburger toggle opens a slide-down panel with nav, languages, CTA
 */
export default function Header({ language, setLanguage }: HeaderProps) {
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

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground border-b border-primary-foreground/10">
        <div className="container mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2 text-sm">
          <p className="font-medium truncate hidden sm:block">{topTagline[language]}</p>
          <p className="font-medium truncate sm:hidden text-[11px] max-w-[40%]">{topTagline[language]}</p>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-colors ${
                  language === 'ar'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-colors ${
                  language === 'fr'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                <span className="hidden sm:inline">Français</span>
                <span className="sm:hidden">FR</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-colors ${
                  language === 'en'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                <span className="hidden sm:inline">English</span>
                <span className="sm:hidden">EN</span>
              </button>
            </div>

            <Link
              href="/election-services"
              className="text-accent font-semibold text-xs whitespace-nowrap hover:underline hidden sm:inline"
            >
              {servicesLink[language]}
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="shadow-md border-b" style={{ backgroundColor: '#F8F7F5', borderColor: '#e5e2dc' }}>
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0" onClick={closeMobile}>
              <img
                src="/logo.jpeg"
                alt="PML Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              />
              <div className="hidden sm:block">
                <div className="text-lg font-bold" style={{ color: '#0F1419' }}>الحزب المغربي الحر</div>
                <div className="text-xs text-accent">PARTI MAROCAIN LIBÉRAL</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems[language].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent"
                  style={
                    location === item.href
                      ? { backgroundColor: '#0F1419', color: '#F8F7F5' }
                      : { color: '#0F1419cc' }
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA + Mobile hamburger */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/proximity-board"
                className="cta-button text-sm hidden sm:inline-block"
              >
                {cta[language]}
              </Link>

              {/* Hamburger toggle - mobile only */}
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={menuLabel[language]}
                aria-expanded={mobileOpen}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg border transition-colors duration-200"
                style={{
                  borderColor: '#0F1419',
                  color: '#0F1419',
                  backgroundColor: mobileOpen ? '#0F1419' : 'transparent',
                }}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: mobileOpen ? '#F8F7F5' : '#0F1419' }} />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile slide-down panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ backgroundColor: '#0F1419' }}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems[language].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className="px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
                style={
                  location === item.href
                    ? { backgroundColor: '#D4A574', color: '#0F1419' }
                    : { color: '#F8F7F5cc' }
                }
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/election-services"
              onClick={closeMobile}
              className="px-4 py-3 rounded-lg text-base font-medium text-accent"
            >
              {servicesLink[language]}
            </Link>

            <Link
              href="/proximity-board"
              onClick={closeMobile}
              className="cta-button text-center mt-3"
            >
              {cta[language]}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}