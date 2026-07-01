import { useState } from 'react';

/**
 * Program Page
 * Design: Electoral program with voting system + citizen testimonials
 * Features: Priority cards, citizen testimonials, citizen voting, vote counts
 */

interface ProgramPageProps {
  language: 'ar' | 'fr' | 'en';
}

type CategoryId = 'health' | 'infrastructure' | 'education' | 'employment';

interface Report {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  affected: number;
  support: number;
}

/* ---------------------------------------------------------------------- */
/* Icons — outline style, inherit color via currentColor, 24x24 viewBox    */
/* ---------------------------------------------------------------------- */

function IconHealth({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconInfrastructure({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 20L10 4h4l3 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 6v2.2M12 11v2.2M12 16v2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconEducation({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5.5L3 9.5l9 4 9-4-9-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M7 11.5v4.2c0 .5 3 2.3 5 2.3s5-1.8 5-2.3v-4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 10v5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconEmployment({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="8" width="17" height="11" rx="1.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.5 8V6.5A2 2 0 0110.5 4.5h3A2 2 0 0115.5 6.5V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.5 12.5h17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const ICONS: Record<CategoryId, (props: { className?: string }) => JSX.Element> = {
  health: IconHealth,
  infrastructure: IconInfrastructure,
  education: IconEducation,
  employment: IconEmployment,
};

function IconPin({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0112 3.5a6.5 6.5 0 016.5 6.5c0 5.4-6.5 11-6.5 11z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconCalendar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconUsers({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 19c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5 6.5A3 3 0 0117 12.2M18 19c0-2.2-1.4-4-3.3-4.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHandHeart({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 8.7c-.8-1.3-2.6-1.9-4-.9-1.3.9-1.5 2.7-.4 3.9L12 16l4.4-4.3c1.1-1.2.9-3-.4-3.9-1.4-1-3.2-.4-4 .9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */

export default function ProgramPage({ language }: ProgramPageProps) {
  const [votes, setVotes] = useState<Record<CategoryId, number>>({
    health: 245,
    infrastructure: 198,
    education: 187,
    employment: 154,
  });
  const [userVotes, setUserVotes] = useState<CategoryId[]>([]);

  const [reportAffected, setReportAffected] = useState<Record<string, number>>({
    r1: 56,
    r2: 48,
    r3: 32,
  });
  const [reportedIds, setReportedIds] = useState<string[]>([]);

  const content = {
    ar: {
      title: 'أولويات برنامجنا الانتخابي لـمراكش المنارة',
      subtitle:
        'برنامجنا مبني على تشخيص دقيق للخصاص بالمنطقة، بعيداً عن الوعود المستحيلة وقريباً من الواقع اليومي للساكنة.',
      prioritiesTitle: 'الأولويات الأساسية',
      votingTitle: 'تصويت المواطنين على الأولويات',
      votingSubtitle: 'صوت على الأولويات التي تهمك أكثر',
      testimonialsTitle: 'أصوات المواطنين',
      testimonialsSubtitle: 'شهادات حقيقية من ساكنة الدائرة توضح حجم المشاكل اليومية',
      affectedLabel: 'مواطن متأثر',
      supportLabel: 'دعم',
      reportButton: 'أعاني من نفس المشكلة',
      reportedLabel: 'تم الإبلاغ',
      priorities: [
        {
          id: 'health' as CategoryId,
          title: 'الصحة والكرامة الإنسانية',
          description:
            'تجهيز مستوصفات سيدي الزوين والاوداية والارتقاء بجودة الخدمات الطبية الأولية وتقليص مواعيد الانتظار.',
        },
        {
          id: 'infrastructure' as CategoryId,
          title: 'البنية التحتية والعدالة المجالية',
          description:
            'فك العزلة عن الدواوير التابعة لايت ايمور واكفاي، وإصلاح الطرقات وتعميم الإنارة والماء الصالح للشرب.',
        },
        {
          id: 'education' as CategoryId,
          title: 'التعليم والحد من الهدر المدرسي',
          description:
            'تأهيل المدارس الابتدائية والفرعيات القروية، وتوفير النقل المدرسي للفتيات لضمان حقهن في التعليم.',
        },
        {
          id: 'employment' as CategoryId,
          title: 'تمكين الشباب وتشجيع التشغيل',
          description:
            'إحداث مراكز للتكوين المهني والتوجيه ودعم التعاونيات الفلاحية والخدماتية المحلية للشباب.',
        },
      ],
      votingCards: [
        { id: 'health' as CategoryId, title: 'الصحة', description: 'تجهيز عيادة سيدي الزوين بقسم مستعجلات.' },
        { id: 'infrastructure' as CategoryId, title: 'البنية التحتية', description: 'تعبيد الطرقات في ايت ايمور واكفاي.' },
        { id: 'education' as CategoryId, title: 'التعليم', description: 'النقل المدرسي المجاني.' },
        { id: 'employment' as CategoryId, title: 'التشغيل', description: 'صندوق دعم تعاونيات الشباب اللوجستية.' },
      ],
      reports: [
        {
          id: 'r1',
          name: 'حميد ز',
          date: '2026-06-12',
          location: 'سيدي الزوين',
          description:
            'العيادة المحلية تفتقر للأدوية الأساسية والمواطنون يسافرون إلى مراكش للفحوصات الطبية البسيطة.',
          support: 12,
        },
        {
          id: 'r2',
          name: 'مريم أ',
          date: '2026-06-10',
          location: 'ايت ايمور',
          description: 'الفتيات يتوقفن عن الدراسة بسبب نقص النقل المدرسي.',
          support: 8,
        },
        {
          id: 'r3',
          name: 'سعيد ب',
          date: '2026-06-08',
          location: 'المحاميد',
          description: 'الشباب يحتاجون لمساحات ثقافية وملاعب رياضية قريبة.',
          support: 5,
        },
      ] as Omit<Report, 'affected'>[],
      voteButton: 'صوت على هذه الأولوية',
      voted: 'صوتت بالفعل',
      votes: 'صوت',
      ofVotes: 'من إجمالي الأصوات',
    },
    fr: {
      title: 'Priorités de notre programme électoral pour Marrakech-Menara',
      subtitle:
        "Notre programme est basé sur un diagnostic précis des lacunes de la région, loin des promesses impossibles et proche de la réalité quotidienne des habitants.",
      prioritiesTitle: 'Priorités Principales',
      votingTitle: 'Vote des Citoyens sur les Priorités',
      votingSubtitle: 'Votez pour les priorités qui vous importent le plus',
      testimonialsTitle: 'La Voix des Citoyens',
      testimonialsSubtitle:
        "Des témoignages réels d'habitants de la circonscription illustrant l'ampleur des difficultés quotidiennes",
      affectedLabel: 'citoyens concernés',
      supportLabel: 'soutiens',
      reportButton: 'Je souffre du même problème',
      reportedLabel: 'Signalé',
      priorities: [
        {
          id: 'health' as CategoryId,
          title: 'Santé et Dignité Humaine',
          description:
            'Équiper les dispensaires de Sidi Zouine et Oudaïa et améliorer la qualité des services médicaux de base.',
        },
        {
          id: 'infrastructure' as CategoryId,
          title: 'Infrastructure et Justice Territoriale',
          description:
            "Briser l'isolement des villages, réparer les routes et généraliser l'électrification et l'eau potable.",
        },
        {
          id: 'education' as CategoryId,
          title: "Éducation et Réduction de l'Abandon Scolaire",
          description:
            'Réhabiliter les écoles primaires et secondaires rurales et fournir le transport scolaire aux filles.',
        },
        {
          id: 'employment' as CategoryId,
          title: 'Autonomisation des Jeunes et Emploi',
          description:
            'Créer des centres de formation professionnelle et soutenir les coopératives agricoles locales.',
        },
      ],
      votingCards: [
        { id: 'health' as CategoryId, title: 'Santé', description: "Équiper la clinique de Sidi Zouine d'une urgence." },
        { id: 'infrastructure' as CategoryId, title: 'Infrastructure', description: 'Paver les routes à Aït Imour et Akfay.' },
        { id: 'education' as CategoryId, title: 'Éducation', description: 'Transport scolaire gratuit.' },
        { id: 'employment' as CategoryId, title: 'Emploi', description: 'Fonds de soutien aux coopératives logistiques des jeunes.' },
      ],
      reports: [
        {
          id: 'r1',
          name: 'Hamid Z.',
          date: '12/06/2026',
          location: 'Sidi Zouine',
          description:
            'Le dispensaire local manque de médicaments essentiels, et les habitants doivent se rendre à Marrakech pour de simples examens médicaux.',
          support: 12,
        },
        {
          id: 'r2',
          name: 'Meriam A.',
          date: '10/06/2026',
          location: 'Aït Imour',
          description: "Les filles abandonnent l'école faute de transport scolaire.",
          support: 8,
        },
        {
          id: 'r3',
          name: 'Saïd B.',
          date: '08/06/2026',
          location: 'Mahamid',
          description: 'Les jeunes ont besoin d\'espaces culturels et de terrains de sport à proximité.',
          support: 5,
        },
      ] as Omit<Report, 'affected'>[],
      voteButton: 'Voter pour cette priorité',
      voted: 'Déjà voté',
      votes: 'votes',
      ofVotes: 'des votes exprimés',
    },
    en: {
      title: 'Electoral Program Priorities for Marrakech-Menara',
      subtitle:
        'Our program is based on a precise diagnosis of regional gaps, far from impossible promises and close to the daily reality of residents.',
      prioritiesTitle: 'Main Priorities',
      votingTitle: 'Citizen Voting on Priorities',
      votingSubtitle: 'Vote for the priorities that matter most to you',
      testimonialsTitle: 'Citizen Voices',
      testimonialsSubtitle: 'Real accounts from residents of the district showing the scale of everyday challenges',
      affectedLabel: 'citizen affected',
      supportLabel: 'support',
      reportButton: 'I suffer from the same issue',
      reportedLabel: 'Reported',
      priorities: [
        {
          id: 'health' as CategoryId,
          title: 'Health and Human Dignity',
          description:
            'Equip health centers in Sidi Zouine and Oudaïa and improve primary healthcare services quality.',
        },
        {
          id: 'infrastructure' as CategoryId,
          title: 'Infrastructure and Territorial Justice',
          description:
            'Break the isolation of villages, repair roads, and generalize electrification and drinking water.',
        },
        {
          id: 'education' as CategoryId,
          title: 'Education and Dropout Reduction',
          description: 'Rehabilitate rural primary and secondary schools and provide school transport for girls.',
        },
        {
          id: 'employment' as CategoryId,
          title: 'Youth Empowerment and Employment',
          description: 'Create vocational training centers and support local agricultural cooperatives.',
        },
      ],
      votingCards: [
        { id: 'health' as CategoryId, title: 'Health', description: 'Equip Sidi Zouine clinic with emergency room.' },
        { id: 'infrastructure' as CategoryId, title: 'Infrastructure', description: 'Pave roads in Aït Imour and Akfay.' },
        { id: 'education' as CategoryId, title: 'Education', description: 'Free school transportation.' },
        { id: 'employment' as CategoryId, title: 'Employment', description: 'Youth logistics cooperative fund.' },
      ],
      reports: [
        {
          id: 'r1',
          name: 'Hamid Z.',
          date: '2026-06-12',
          location: 'Sidi Zouine',
          description:
            'The local clinic lacks basic medicines, and residents must travel to Marrakech for simple medical tests.',
          support: 12,
        },
        {
          id: 'r2',
          name: 'Meriam A.',
          date: '2026-06-10',
          location: 'Aït Imour',
          description: 'Girls are dropping out of school due to the lack of school transportation.',
          support: 8,
        },
        {
          id: 'r3',
          name: 'Saïd B.',
          date: '2026-06-08',
          location: 'Mahamid',
          description: 'Young people need nearby cultural spaces and sports facilities.',
          support: 5,
        },
      ] as Omit<Report, 'affected'>[],
      voteButton: 'Vote as Priority',
      voted: 'Already Voted',
      votes: 'votes',
      ofVotes: 'of votes cast',
    },
  };

  const c = content[language];
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);

  const handleVote = (id: CategoryId) => {
    if (userVotes.includes(id)) return;
    setUserVotes([...userVotes, id]);
    setVotes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleReport = (id: string) => {
    if (reportedIds.includes(id)) return;
    setReportedIds([...reportedIds, id]);
    setReportAffected((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3">{c.title}</h1>
          <div className="h-1 w-20 bg-accent mb-6" />
          <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">{c.subtitle}</p>
        </div>
      </section>

      {/* Citizen Voices / Testimonials Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="section-title">{c.testimonialsTitle}</h2>
            <div className="h-1 w-20 bg-accent mx-auto my-4" />
            <p className="section-subtitle max-w-2xl mx-auto">{c.testimonialsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.reports.map((report) => {
              const hasReported = reportedIds.includes(report.id);
              const affected = reportAffected[report.id] ?? 0;

              return (
                <div
                  key={report.id}
                  className="flex flex-col bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-sm shrink-0">
                      {report.name.trim().charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{report.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <IconCalendar className="w-3.5 h-3.5" />
                        <span>{report.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-accent font-medium mb-3">
                    <IconPin className="w-3.5 h-3.5" />
                    <span>{report.location}</span>
                  </div>

                  <p className="text-sm text-foreground/80 leading-relaxed mb-5 flex-1">{report.description}</p>

                  <div className="flex items-center gap-4 mb-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <IconUsers className="w-4 h-4 text-foreground/60" />
                      <span className="font-bold text-foreground text-sm">{affected}</span>
                      <span className="text-xs text-muted-foreground">{c.affectedLabel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <IconHandHeart className="w-4 h-4 text-foreground/60" />
                      <span className="font-bold text-foreground text-sm">{report.support}</span>
                      <span className="text-xs text-muted-foreground">{c.supportLabel}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleReport(report.id)}
                    disabled={hasReported}
                    aria-pressed={hasReported}
                    className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      hasReported
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'cta-button'
                    }`}
                  >
                    {hasReported ? c.reportedLabel : c.reportButton}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Priorities Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="section-title mb-2">{c.prioritiesTitle}</h2>
          <div className="h-1 w-20 bg-accent mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.priorities.map((priority) => {
              const Icon = ICONS[priority.id];
              return (
                <div key={priority.id} className="program-card flex gap-4 items-start rtl:flex-row-reverse">
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">{priority.title}</h3>
                    <p className="text-foreground/75 leading-relaxed text-[15px]">{priority.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voting Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="section-title">{c.votingTitle}</h2>
            <div className="h-1 w-20 bg-accent mx-auto my-4" />
            <p className="section-subtitle">{c.votingSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.votingCards.map((card) => {
              const Icon = ICONS[card.id];
              const voteCount = votes[card.id];
              const hasVoted = userVotes.includes(card.id);
              const percent = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

              return (
                <div
                  key={card.id}
                  className="flex flex-col bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-1.5">{card.title}</h3>
                  <p className="text-sm text-foreground/70 mb-5 leading-relaxed flex-1">{card.description}</p>

                  <div className="mb-4">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="font-bold text-accent text-lg leading-none">{voteCount}</span>
                      <span className="text-xs text-muted-foreground">
                        {percent}% {c.ofVotes}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-accent/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleVote(card.id)}
                    disabled={hasVoted}
                    aria-pressed={hasVoted}
                    className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      hasVoted ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'cta-button'
                    }`}
                  >
                    {hasVoted ? c.voted : c.voteButton}
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