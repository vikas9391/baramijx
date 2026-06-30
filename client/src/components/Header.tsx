import { Button } from '@/components/ui/button';

interface HeaderProps {
  language: 'ar' | 'fr' | 'en';
  setLanguage: (lang: 'ar' | 'fr' | 'en') => void;
}

/**
 * Header Component
 * Design: Navy background with gold accents, RTL-aware navigation
 * Features: Language switcher, party logo, main navigation menu
 */
export default function Header({ language, setLanguage }: HeaderProps) {
  const navItems = {
    ar: [
      { label: 'الرئيسية', href: '#home' },
      { label: 'المرشح وسيرته', href: '#candidate' },
      { label: 'البرنامج الانتخابي', href: '#program' },
      { label: 'سبورة القرب والشكايات', href: '#regional' },
      { label: 'اللقاءات والميدان', href: '#events' },
    ],
    fr: [
      { label: 'Accueil', href: '#home' },
      { label: 'Candidat', href: '#candidate' },
      { label: 'Programme', href: '#program' },
      { label: 'Régions', href: '#regional' },
      { label: 'Événements', href: '#events' },
    ],
    en: [
      { label: 'Home', href: '#home' },
      { label: 'Candidate', href: '#candidate' },
      { label: 'Program', href: '#program' },
      { label: 'Regions', href: '#regional' },
      { label: 'Events', href: '#events' },
    ],
  };

  const cta = {
    ar: 'سجل شكايتك المباشرة',
    fr: 'Enregistrez votre réclamation',
    en: 'Register Your Complaint',
  };

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/manus-storage/pml-logo_3ded0a5a.png" 
              alt="PML Logo" 
              className="h-12 w-12"
            />
            <div className="hidden sm:block">
              <div className="text-lg font-bold">الحزب المغربي الحر</div>
              <div className="text-xs text-accent">PARTI MAROCAIN LIBÉRAL</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems[language].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-button text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1 border-l border-primary-foreground/20 pl-2">
              <button
                onClick={() => setLanguage('ar')}
                className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                  language === 'ar'
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:text-accent'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                  language === 'fr'
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:text-accent'
                }`}
              >
                Français
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                  language === 'en'
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:text-accent'
                }`}
              >
                English
              </button>
            </div>

            <button className="cta-button text-sm hidden sm:inline-block">
              {cta[language]}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
