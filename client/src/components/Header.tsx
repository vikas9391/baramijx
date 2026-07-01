import { Link, useLocation } from 'wouter';

interface HeaderProps {
  language: 'ar' | 'fr' | 'en';
  setLanguage: (lang: 'ar' | 'fr' | 'en') => void;
}

/**
 * Header Component
 * Design: Two-tier navigation
 *   - Top bar: dark navy, party tagline + language switcher + services link
 *   - Main bar: navy, logo + menu + CTA button
 */
export default function Header({ language, setLanguage }: HeaderProps) {
  const [location] = useLocation();

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

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <p className="font-medium truncate">{topTagline[language]}</p>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('ar')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  language === 'ar'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  language === 'fr'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                Français
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  language === 'en'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                English
              </button>
            </div>

            <Link
              href="/field-work"
              className="text-accent font-semibold text-xs whitespace-nowrap hover:underline"
            >
              {servicesLink[language]}
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="shadow-md border-b" style={{ backgroundColor: '#F8F7F5', borderColor: '#e5e2dc' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/logo.jpeg"
                alt="PML Logo"
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:block">
                <div className="text-lg font-bold" style={{ color: '#0F1419' }}>الحزب المغربي الحر</div>
                <div className="text-xs text-accent">PARTI MAROCAIN LIBÉRAL</div>
              </div>
            </Link>

            {/* Navigation */}
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

            {/* CTA */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/proximity-board"
                className="cta-button text-sm hidden sm:inline-block"
              >
                {cta[language]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}