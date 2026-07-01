import { useState } from 'react';

/**
 * Proximity Board Page
 * Design: Complaint form and published issues display
 * Features: Form submission, issue cards, citizen support tracking
 */

interface ProximityBoardPageProps {
  language: 'ar' | 'fr' | 'en';
}

interface Issue {
  id: string;
  author: string;
  date: string;
  location: string;
  description: string;
  affected: number;
  supports: number;
}

export default function ProximityBoardPage({ language }: ProximityBoardPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    commune: '',
    description: '',
  });

  const seedIssues: Record<'ar' | 'fr' | 'en', Issue[]> = {
    ar: [
      {
        id: '1',
        author: 'حميد ز',
        date: '2026-06-12',
        location: 'سيدي الزوين',
        description: 'العيادة المحلية تفتقر للأدوية الأساسية والمواطنون يسافرون إلى مراكش للفحوصات الطبية البسيطة.',
        affected: 56,
        supports: 12,
      },
      {
        id: '2',
        author: 'مريم أ',
        date: '2026-06-10',
        location: 'ايت ايمور',
        description: 'الفتيات يتوقفن عن الدراسة بسبب نقص النقل المدرسي.',
        affected: 48,
        supports: 8,
      },
      {
        id: '3',
        author: 'سعيد ب',
        date: '2026-06-08',
        location: 'المحاميد',
        description: 'الشباب يحتاجون لمساحات ثقافية وملاعب رياضية قريبة.',
        affected: 32,
        supports: 5,
      },
    ],
    fr: [
      {
        id: '1',
        author: 'Hamid Z.',
        date: '12/06/2026',
        location: 'Sidi Zouine',
        description:
          "Le dispensaire local manque de médicaments essentiels, et les habitants doivent se rendre à Marrakech pour de simples examens médicaux.",
        affected: 56,
        supports: 12,
      },
      {
        id: '2',
        author: 'Meriam A.',
        date: '10/06/2026',
        location: 'Aït Imour',
        description: "Les filles abandonnent l'école faute de transport scolaire.",
        affected: 48,
        supports: 8,
      },
      {
        id: '3',
        author: 'Saïd B.',
        date: '08/06/2026',
        location: 'Mahamid',
        description: "Les jeunes ont besoin d'espaces culturels et de terrains de sport à proximité.",
        affected: 32,
        supports: 5,
      },
    ],
    en: [
      {
        id: '1',
        author: 'Hamid Z.',
        date: '2026-06-12',
        location: 'Sidi Zouine',
        description:
          'The local clinic lacks basic medicines, and residents must travel to Marrakech for simple medical tests.',
        affected: 56,
        supports: 12,
      },
      {
        id: '2',
        author: 'Meriam A.',
        date: '2026-06-10',
        location: 'Aït Imour',
        description: 'Girls are dropping out of school due to the lack of school transportation.',
        affected: 48,
        supports: 8,
      },
      {
        id: '3',
        author: 'Saïd B.',
        date: '2026-06-08',
        location: 'Mahamid',
        description: 'Young people need nearby cultural spaces and sports facilities.',
        affected: 32,
        supports: 5,
      },
    ],
  };

  const [issues, setIssues] = useState<Issue[]>(seedIssues[language]);
  const [supportedIssues, setSupportedIssues] = useState<string[]>([]);

  const content = {
    ar: {
      title: 'سبورة القرب والشكايات',
      subtitle: 'بوابة مفتوحة يراقبها مباشرة المهندس عبد المنعم الزويني وفريقه الميداني.',
      formTitle: 'سجل شكايتك',
      formDescription: 'شارك مشاكلك ومشاكل حيك مع المرشح والفريق الميداني',
      namePlaceholder: 'الاسم الكامل',
      communePlaceholder: 'الحي / الجماعة',
      descriptionPlaceholder: 'وصف المشكلة',
      submitButton: 'أرسل الشكاية',
      issuesTitle: 'الشكايات المنشورة',
      issuesSubtitle: 'آخر الشكايات والمشاكل المسجلة من المواطنين',
      supportButton: 'أعاني من نفس المشكلة',
      supported: 'دعمت هذه الشكاية',
      affected: 'مواطن متأثر',
      supports: 'دعم',
      success: 'تم إرسال شكايتك بنجاح!',
    },
    fr: {
      title: 'Tableau de Proximité et Réclamations',
      subtitle: 'Un portail ouvert surveillé directement par l\'ingénieur Abdelmounaim Zouini et son équipe de terrain.',
      formTitle: 'Enregistrez votre réclamation',
      formDescription: 'Partagez vos problèmes et ceux de votre quartier avec le candidat et l\'équipe de terrain',
      namePlaceholder: 'Nom complet',
      communePlaceholder: 'Quartier / Commune',
      descriptionPlaceholder: 'Description du problème',
      submitButton: 'Soumettre la réclamation',
      issuesTitle: 'Réclamations Publiées',
      issuesSubtitle: 'Dernières réclamations et problèmes enregistrés par les citoyens',
      supportButton: 'Je souffre du même problème',
      supported: 'Vous avez soutenu cette réclamation',
      affected: 'citoyen affecté',
      supports: 'soutien',
      success: 'Votre réclamation a été envoyée avec succès!',
    },
    en: {
      title: 'Citizen Grievance & Proximity Board',
      subtitle: 'An open portal monitored directly by Engineer Abdelmounaim Zouini and his field team.',
      formTitle: 'Register Your Complaint',
      formDescription: 'Share your problems and those of your neighborhood with the candidate and field team',
      namePlaceholder: 'Full Name',
      communePlaceholder: 'Neighborhood / Commune',
      descriptionPlaceholder: 'Issue Description',
      submitButton: 'Post Issue',
      issuesTitle: 'Published Issues',
      issuesSubtitle: 'Latest complaints and problems registered by citizens',
      supportButton: 'I suffer from the same issue',
      supported: 'You supported this issue',
      affected: 'citizen affected',
      supports: 'support',
      success: 'Your complaint was submitted successfully!',
    },
  };

  const c = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.commune && formData.description) {
      const newIssue: Issue = {
        id: String(issues.length + 1),
        author: formData.name,
        date: new Date().toISOString().split('T')[0],
        location: formData.commune,
        description: formData.description,
        affected: 1,
        supports: 0,
      };
      setIssues([newIssue, ...issues]);
      setFormData({ name: '', commune: '', description: '' });
    }
  };

  const handleSupport = (issueId: string) => {
    if (!supportedIssues.includes(issueId)) {
      setSupportedIssues([...supportedIssues, issueId]);
      setIssues(
        issues.map((issue) =>
          issue.id === issueId
            ? { ...issue, supports: issue.supports + 1 }
            : issue
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{c.title}</h1>
          <div className="h-1 bg-accent w-20 mb-6"></div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">{c.subtitle}</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="section-title mb-2">{c.formTitle}</h2>
            <div className="h-1 bg-accent w-20 mb-4"></div>
            <p className="section-subtitle mb-8">{c.formDescription}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder={c.namePlaceholder}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder={c.communePlaceholder}
                  value={formData.commune}
                  onChange={(e) =>
                    setFormData({ ...formData, commune: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <textarea
                  placeholder={c.descriptionPlaceholder}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <button type="submit" className="cta-button w-full">
                {c.submitButton}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Issues Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-2">{c.issuesTitle}</h2>
          <div className="h-1 bg-accent w-20 mb-4"></div>
          <p className="section-subtitle mb-12">{c.issuesSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => {
              const hasSupported = supportedIssues.includes(issue.id);

              return (
                <div
                  key={issue.id}
                  className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
                >
                  {/* Header */}
                  <div className="mb-4 pb-4 border-b border-border">
                    <p className="font-bold text-foreground">{issue.author}</p>
                    <p className="text-xs text-muted-foreground">{issue.date}</p>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-accent">
                      📍 {issue.location}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                    {issue.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-bold text-accent">
                        {issue.affected}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {c.affected}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-accent">
                        {issue.supports}
                      </p>
                      <p className="text-xs text-muted-foreground">{c.supports}</p>
                    </div>
                  </div>

                  {/* Support Button */}
                  <button
                    onClick={() => handleSupport(issue.id)}
                    disabled={hasSupported}
                    className={`w-full py-2 rounded-lg font-semibold transition-all duration-200 text-sm ${
                      hasSupported
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-accent text-accent-foreground hover:opacity-90'
                    }`}
                  >
                    {hasSupported ? c.supported : c.supportButton}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}