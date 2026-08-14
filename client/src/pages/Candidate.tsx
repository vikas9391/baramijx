/**
 * Candidate Page
 * Design: Profile showcase with credentials, biography, and honor charter
 * Features: Highlight cards, biography section, professional experience, honor charter
 */

interface CandidatePageProps {
  language: 'ar' | 'fr' | 'en';
}

export default function CandidatePage({ language }: CandidatePageProps) {
  const content = {
    ar: {
      title: 'عبد المنعم الزويني',
      subtitle: 'مرشح الدائرة التشريعية مراكش المنارة',
      competenceTagline: 'كفاءة تقنية برؤية إنسانية',
      highlights: [
        'مهندس دولة خريج المعهد العالي للدراسات البحرية (ISEM)',
        'ماستر أوروبي في اللوجستيك والنقل',
        'بطل المغرب في الشطرنج (1986)',
        'كاتب ومخرج مسرحي ملتزم',
      ],
      bioTitle: 'من هو عبد المنعم الزويني؟',
      bioText: 'عبد المنعم الزويني، من مواليد 22 غشت 1971. يجمع بين التكوين الهندسي العلمي والخبرة الإدارية والتدبيرية الكبرى في كبريات الشركات الوطنية والأجنبية، وبين الشغف الثقافي والمسرحي، والتفكير الاستراتيجي الرياضي كبطل وطني سابق في الشطرنج.',
      credentialsTitle: 'المؤهلات الأكاديمية',
      credentials: [
        'مهندس بحري الدولة - خريج المعهد العالي للدراسات البحرية (ISEM)',
        'ماستر أوروبي في اللوجستيك والنقل',
      ],
      experienceTitle: 'الخبرة المهنية والتنفيذية',
      experience: [
        'نائب المدير العام لشركة دراپور، الشركة الوطنية الرائدة في أشغال الجرف البحري',
        'المدير التقني لشركة إنتر شيبينج للنقل البحري',
        'المدير التقني لمجموعة سوريمار البحرية',
        'مهندس رئيسي على متن عدة سفن شحن عملاقة عبر المحيطات الدولية',
      ],
      civicTitle: 'الخبرة المدنية والثقافية والمواهب الاستراتيجية',
      civic: [
        'قائد فاعل في المجتمع المدني، ملتزم بالتنمية المحلية وتمكين الساكنة بمراكش',
        'كاتب ومخرج مسرحي، يدافع عن القضايا الاجتماعية عبر الفن',
        'بطل المغرب الوطني في الشطرنج (1986) — تفكير استراتيجي وتخطيط وتركيز',
      ],
      charterTitle: 'ميثاق الشرف والمساءلة العمومية',
      charterText: 'أتعهد لمواطني ومواطنات دائرة مراكش المنارة أن أظل صوتاً صادقاً، أدافع عن كرامة المواطن وأحارب عدم المساواة المجالية بين العالم القروي والحضر في دائرتنا.',
      charterSignature: 'عبد المنعم الزويني',
      charterSubtitle: 'ميثاق الالتزام والمسؤولية الملزم',
    },
    fr: {
      title: 'Abdelmounaim Zouini',
      subtitle: 'Candidat de la circonscription législative de Marrakech-Menara',
      competenceTagline: 'Compétence Technique, Vision Humaine',
      highlights: [
        'Ingénieur d\'État, diplômé de l\'Institut Supérieur d\'Études Maritimes (ISEM)',
        'Master Européen en Logistique et Transport',
        'Champion du Maroc aux Échecs (1986)',
        'Écrivain et metteur en scène théâtral engagé',
      ],
      bioTitle: 'Qui est Abdelmounaim Zouini?',
      bioText: 'Abdelmounaim Zouini, né le 22 août 1971. Il combine une formation en ingénierie scientifique avec une vaste expérience administrative et managériale dans les plus grandes entreprises nationales et étrangères, ainsi qu\'une passion pour la culture et le théâtre, et une pensée stratégique sportive en tant qu\'ancien champion national aux échecs.',
      credentialsTitle: 'Diplômes Académiques',
      credentials: [
        'Ingénieur d\'État en Marine - Diplômé de l\'Institut Supérieur d\'Études Maritimes (ISEM)',
        'Master Européen en Logistique et Transport',
      ],
      experienceTitle: 'Expérience Professionnelle et Exécutive',
      experience: [
        'Vice-Directeur Général de DRAPOR, entreprise nationale leader en travaux de dragage maritime',
        'Directeur Technique d\'Inter Shipping Compagnie de Transport Maritime',
        'Directeur Technique du Groupe SORIMAR Marine',
        'Ingénieur en Chef à bord de plusieurs navires de fret géants à travers les océans internationaux',
      ],
      civicTitle: 'Expérience Civique, Culturelle et Talents Stratégiques',
      civic: [
        'Leader actif de la société civile, engagé dans le développement local et l\'autonomisation des citoyens à Marrakech',
        'Écrivain et metteur en scène théâtral, défendant les enjeux sociaux à travers l\'art',
        'Champion National du Maroc aux Échecs (1986) — pensée stratégique, planification et concentration',
      ],
      charterTitle: 'Charte d\'Honneur et de Responsabilité Publique',
      charterText: 'Je m\'engage auprès des citoyens et citoyennes de la circonscription de Marrakech-Menara à rester une voix sincère, défendant la dignité des citoyens et combattant les inégalités spatiales entre le monde rural et urbain dans notre circonscription.',
      charterSignature: 'Abdelmounaim Zouini',
      charterSubtitle: 'Charte d\'Engagement et de Responsabilité Contraignante',
    },
    en: {
      title: 'Abdelmounaim Zouini',
      subtitle: 'Candidate for Marrakech-Menara Parliamentary Constituency',
      competenceTagline: 'Technical Competence, Humane Vision',
      highlights: [
        'State Engineer, Graduate of the Higher Institute of Maritime Studies (ISEM)',
        'European Master\'s Degree in Logistics and Transportation',
        'Moroccan National Chess Champion (1986)',
        'Committed Writer and Theatre Director',
      ],
      bioTitle: 'Who is Abdelmounaim Zouini?',
      bioText: 'Abdelmounaim Zouini, born August 22, 1971. He combines scientific engineering training with extensive administrative and managerial experience in major national and international companies, alongside a passion for culture and theatre, and strategic sporting thinking as a former national chess champion.',
      credentialsTitle: 'Academic Credentials',
      credentials: [
        'State Marine Engineer - Graduate of the Higher Institute of Maritime Studies (ISEM)',
        'European Master\'s Degree in Logistics and Transportation',
      ],
      experienceTitle: 'Professional & Executive Experience',
      experience: [
        'Deputy General Manager of DRAPOR, the leading national dredging company',
        'Technical Director of Inter Shipping Maritime Transportation Company',
        'Technical Director of SORIMAR Marine Group',
        'Chief Engineer of several giant cargo vessels across international oceans',
      ],
      civicTitle: 'Civic, Cultural & Strategic Talents',
      civic: [
        'Active civil society leader in local development and community empowerment in Marrakech',
        'Creative writer and theater director, advocating for social issues through art',
        '1986 Moroccan National Chess Champion (strategic thinking, planning, and focus)',
      ],
      charterTitle: 'Honor Charter of Commitment & Public Accountability',
      charterText: 'I pledge to the citizens of Marrakech-Menara to remain a truthful voice, defending citizen dignity and fighting spatial inequalities between rural and urban sectors in our constituency.',
      charterSignature: 'Abdelmounaim Zouini',
      charterSubtitle: 'Binding Accountability Charter',
    },
  };

  const c = content[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section — image left, title + bio right */}
      <section className="bg-primary text-primary-foreground py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center order-2 md:order-1">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[4/5]">
                <div className="absolute inset-0 bg-accent/20 rounded-lg blur-xl"></div>
                <img
                  src="CandidateProfile.jpeg"
                  alt={c.title}
                  className="relative w-full h-full object-cover rounded-lg shadow-2xl border-4 border-accent/30"
                />
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 order-1 md:order-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">{c.title}</h1>
              <div className="h-1 bg-accent w-16 md:w-20"></div>
              <p className="text-base md:text-lg text-primary-foreground/80">{c.subtitle}</p>
              <p className="text-accent font-semibold text-sm md:text-base">{c.competenceTagline}</p>

              <div className="pt-2 border-t border-primary-foreground/10 mt-2">
                <h2 className="text-lg md:text-xl font-bold mt-4 mb-2">{c.bioTitle}</h2>
                <p className="text-sm leading-relaxed text-primary-foreground/85">
                  {c.bioText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-8 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.highlights.map((highlight, idx) => (
              <div key={idx} className="program-card group">
                <div className="text-3xl mb-2 text-accent">✓</div>
                <p className="text-foreground font-semibold leading-snug text-sm">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials + Experience — side by side on desktop */}
      <section className="py-8 md:py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <h2 className="section-title text-xl sm:text-2xl md:text-3xl">{c.credentialsTitle}</h2>
              <div className="h-1 bg-accent w-16 mb-4 md:mb-5"></div>
              <ul className="space-y-2.5">
                {c.credentials.map((cred, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span className="text-foreground/80 text-sm leading-snug">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="section-title text-xl sm:text-2xl md:text-3xl">{c.experienceTitle}</h2>
              <div className="h-1 bg-accent w-16 mb-4 md:mb-5"></div>
              <ul className="space-y-2.5">
                {c.experience.map((exp, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span className="text-foreground/80 text-sm leading-snug">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Civic Experience Section */}
      <section className="py-8 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-xl sm:text-2xl md:text-3xl">{c.civicTitle}</h2>
            <div className="h-1 bg-accent w-16 mb-4 md:mb-5"></div>
            <ul className="space-y-2.5">
              {c.civic.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span className="text-foreground/80 text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Honor Charter Section */}
      <section className="py-8 md:py-14 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{c.charterTitle}</h2>
            <div className="h-1 bg-accent w-16 md:w-20 mb-4 md:mb-5"></div>

            <div className="bg-accent/10 border-l-4 border-accent p-4 sm:p-6 rounded-lg mb-4 md:mb-5">
              <p className="text-sm sm:text-base leading-relaxed text-primary-foreground/90 italic mb-4">
                "{c.charterText}"
              </p>
              <p className="text-right font-bold text-accent">
                — {c.charterSignature}
              </p>
            </div>

            <p className="text-center text-sm text-primary-foreground/70 font-semibold">
              {c.charterSubtitle}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}