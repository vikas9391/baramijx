
import { Link } from 'wouter';

interface FooterProps {
  language: 'ar' | 'fr' | 'en';
}

export default function Footer({ language }: FooterProps) {
  const content = {
    ar: {
      candidateTitle: 'المهندس عبد المنعم الزويني',
      candidateDesc: 'مرشحكم لبرلمان 2026 عن دائرة مراكش المنارة. كفاءة هندسية وتدبيرية في خدمة الصالح العام والتنمية الشاملة.',
      quickLinks: 'بوابات التواصل السريع',
      links: [
        { label: 'الرئيسية', href: '/' },
        { label: 'البرنامج الانتخابي', href: '/program' },
        { label: 'سبورة القرب والشكايات', href: '/proximity-board' },
      ],
      partySection: 'الحزب المغربي الحر',
      partyDesc: 'الحزب المغربي الحر — كرامة المواطن، حرية الاختيار، تنمية عادلة',
      regionalOffice: 'الأمانة الإقليمية لمراكش',
      commitmentTitle: 'التزام ومسؤولية',
      commitments: [
        'الإنصات الدائم والقرب الميداني',
        'الترافع الجاد بمجلس النواب',
      ],
      copyright: '© كل الحقوق محفوظة. حملة المهندس عبد المنعم الزويني 2026.',
      tagline: 'الالتزام الأخلاقي والكفاءة الميدانية',
    },
    fr: {
      candidateTitle: 'Ingénieur Abdelmounaim Zouini',
      candidateDesc: 'Votre candidat au parlement 2026 pour la circonscription de Marrakech-Menara. Compétence technique et gestion au service de l\'intérêt public.',
      quickLinks: 'Liens rapides',
      links: [
        { label: 'Accueil', href: '/' },
        { label: 'Programme', href: '/program' },
        { label: 'Proximité', href: '/proximity-board' },
      ],
      partySection: 'Parti Marocain Libéral',
      partyDesc: 'Parti Marocain Libéral — Dignité du citoyen, liberté de choix, développement équitable',
      regionalOffice: 'Bureau régional de Marrakech',
      commitmentTitle: 'Engagement et Responsabilité',
      commitments: [
        'Écoute permanente et proximité de terrain',
        'Plaidoyer sérieux au parlement',
      ],
      copyright: '© Tous droits réservés. Campagne de l\'ingénieur Abdelmounaim Zouini 2026.',
      tagline: 'Engagement éthique et compétence de terrain',
    },
    en: {
      candidateTitle: 'Engineer Abdelmounaim Zouini',
      candidateDesc: 'Your candidate for parliament 2026 in Marrakech-Menara district. Technical expertise and management in service of public interest.',
      quickLinks: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Electoral Program', href: '/program' },
        { label: 'Proximity Board', href: '/proximity-board' },
      ],
      partySection: 'Liberal Moroccan Party',
      partyDesc: 'Liberal Moroccan Party — Citizen dignity, freedom of choice, fair development',
      regionalOffice: 'Marrakech Regional Office',
      commitmentTitle: 'Commitment and Responsibility',
      commitments: [
        'Constant listening and field proximity',
        'Serious advocacy in parliament',
      ],
      copyright: '© All rights reserved. Campaign of Engineer Abdelmounaim Zouini 2026.',
      tagline: 'Ethical commitment and field competence',
    },
  };

  const c = content[language];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Candidate Info */}
          <div className="space-y-3">
            <img
              src="logo.jpeg"
              alt="PML Logo"
              className="h-10 w-10"
            />
            <h3 className="font-bold text-lg">{c.candidateTitle}</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {c.candidateDesc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-accent mb-4">{c.quickLinks}</h4>
            <ul className="space-y-2">
              {c.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Party Info */}
          <div>
            <h4 className="font-bold text-accent mb-4">{c.partySection}</h4>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-3">
              {c.partyDesc}
            </p>
            <p className="text-xs text-primary-foreground/60">
              {c.regionalOffice}
            </p>
          </div>

          {/* Commitments */}
          <div>
            <h4 className="font-bold text-accent mb-4">{c.commitmentTitle}</h4>
            <ul className="space-y-2">
              {c.commitments.map((commitment, idx) => (
                <li key={idx} className="flex gap-2 text-sm">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-primary-foreground/80">{commitment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          {/* Copyright & Tagline */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/60">{c.copyright}</p>
            <p className="text-sm font-semibold text-accent">{c.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}