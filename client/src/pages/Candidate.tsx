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
      title: 'المهندس عبد المنعم الزويني',
      subtitle: 'مرشح الدائرة التشريعية مراكش المنارة',
      highlights: [
        'مهندس بحري الدولة - خريج المعهد العالي للدراسات البحرية',
        'ماستر أوروبي في اللوجستيك والنقل',
        'بطل المغرب الوطني في الشطرنج (1986)',
        'كاتب ومخرج مسرحي',
      ],
      bioTitle: 'السيرة الذاتية',
      bioText: 'عبد المنعم الزويني، من مواليد 22 غشت 1971. يجمع بين التكوين الهندسي العلمي والخبرة الإدارية والتدبيرية الكبرى في كبريات الشركات الوطنية والأجنبية، وبين الشغف الثقافي والمسرحي، والتفكير الاستراتيجي الرياضي كبطل وطني سابق في الشطرنج.',
      credentialsTitle: 'المؤهلات الأكاديمية',
      credentials: [
        'مهندس بحري الدولة - خريج المعهد العالي للدراسات البحرية (ISEM)',
        'ماستر أوروبي في اللوجستيك والنقل',
      ],
      experienceTitle: 'الخبرة المهنية',
      experience: [
        'نائب المدير العام لشركة دراپور',
        'المدير التقني لشركة إنتر شيبينج للنقل البحري',
        'المدير التقني لمجموعة سوريمار البحرية',
        'مهندس رئيسي على عدة سفن شحن دولية',
      ],
      civicTitle: 'الخبرة المدنية والثقافية',
      civic: [
        'قائد فاعل في المجتمع المدني بمراكش',
        'كاتب ومخرج مسرحي',
        'بطل المغرب الوطني في الشطرنج (1986)',
      ],
      charterTitle: 'ميثاق الشرف',
      charterText: 'أتعهد لمواطني ومواطنات دائرة مراكش المنارة أن أظل صوتاً صادقاً، أدافع عن كرامة المواطن وأحارب عدم المساواة المجالية بين العالم القروي والحضر في دائرتنا.',
      charterSignature: 'عبد المنعم الزويني',
      charterSubtitle: 'ميثاق الالتزام والمسؤولية الملزم',
    },
    fr: {
      title: 'Ingénieur Abdelmounaim Zouini',
      subtitle: 'Candidat de la circonscription législative de Marrakech-Menara',
      highlights: [
        'Ingénieur d\'État en Marine - Diplômé de l\'Institut Supérieur d\'Études Maritimes',
        'Master Européen en Logistique et Transport',
        'Champion National du Maroc aux Échecs (1986)',
        'Écrivain et Metteur en Scène Théâtral',
      ],
      bioTitle: 'Biographie',
      bioText: 'Abdelmounaim Zouini, né le 22 août 1971. Il combine une formation en ingénierie scientifique avec une vaste expérience administrative et managériale dans les plus grandes entreprises nationales et étrangères, ainsi qu\'une passion pour la culture et le théâtre, et une pensée stratégique sportive en tant qu\'ancien champion national aux échecs.',
      credentialsTitle: 'Diplômes Académiques',
      credentials: [
        'Ingénieur d\'État en Marine - Diplômé de l\'Institut Supérieur d\'Études Maritimes (ISEM)',
        'Master Européen en Logistique et Transport',
      ],
      experienceTitle: 'Expérience Professionnelle',
      experience: [
        'Vice-Directeur Général de DRAPOR',
        'Directeur Technique d\'Inter Shipping Compagnie de Transport Maritime',
        'Directeur Technique du Groupe SORIMAR Marine',
        'Ingénieur en Chef sur plusieurs navires de fret internationaux',
      ],
      civicTitle: 'Expérience Civique et Culturelle',
      civic: [
        'Leader actif de la société civile à Marrakech',
        'Écrivain et metteur en scène théâtral',
        'Champion National du Maroc aux Échecs (1986)',
      ],
      charterTitle: 'Charte d\'Honneur',
      charterText: 'Je m\'engage auprès des citoyens et citoyennes de la circonscription de Marrakech-Menara à rester une voix sincère, défendant la dignité des citoyens et combattant les inégalités spatiales entre le monde rural et urbain dans notre circonscription.',
      charterSignature: 'Abdelmounaim Zouini',
      charterSubtitle: 'Charte d\'Engagement et de Responsabilité Contraignante',
    },
    en: {
      title: 'Engineer Abdelmounaim Zouini',
      subtitle: 'Candidate for Marrakech-Menara Parliamentary Constituency',
      highlights: [
        'State Marine Engineer - Graduate of the Higher Institute of Maritime Studies',
        'European Master\'s Degree in Logistics and Transportation',
        'Moroccan National Chess Champion (1986)',
        'Writer and Theatre Director',
      ],
      bioTitle: 'Biography',
      bioText: 'Abdelmounaim Zouini, born August 22, 1971. He combines scientific engineering training with extensive administrative and managerial experience in major national and international companies, alongside a passion for culture and theatre, and strategic sporting thinking as a former national chess champion.',
      credentialsTitle: 'Academic Credentials',
      credentials: [
        'State Marine Engineer - Graduate of the Higher Institute of Maritime Studies (ISEM)',
        'European Master\'s Degree in Logistics and Transportation',
      ],
      experienceTitle: 'Professional Experience',
      experience: [
        'Deputy General Manager of DRAPOR',
        'Technical Director of Inter Shipping Maritime Transportation Company',
        'Technical Director of SORIMAR Marine Group',
        'Chief Engineer on several international cargo vessels',
      ],
      civicTitle: 'Civic & Cultural Experience',
      civic: [
        'Active civil society leader in Marrakech',
        'Writer and theatre director',
        'Moroccan National Chess Champion (1986)',
      ],
      charterTitle: 'Honor Charter',
      charterText: 'I pledge to the citizens of Marrakech-Menara to remain a truthful voice, defending citizen dignity and fighting spatial inequalities between rural and urban sectors in our constituency.',
      charterSignature: 'Abdelmounaim Zouini',
      charterSubtitle: 'Binding Accountability Charter',
    },
  };

  const c = content[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">{c.title}</h1>
              <div className="h-1 bg-accent w-20"></div>
              <p className="text-lg text-primary-foreground/80">{c.subtitle}</p>
            </div>

            {/* Right: Image */}
            <div className="flex justify-center">
              <img
                src="/manus-storage/CandidateProfilePic_057ec8d9.jpeg"
                alt={c.title}
                className="w-full max-w-md rounded-lg shadow-2xl border-4 border-accent/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.highlights.map((highlight, idx) => (
              <div key={idx} className="program-card group">
                <div className="text-4xl mb-4 text-accent">✓</div>
                <p className="text-foreground font-semibold leading-relaxed">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{c.bioTitle}</h2>
            <div className="h-1 bg-accent w-20 mb-8"></div>
            <p className="text-lg leading-relaxed text-primary-foreground/90">
              {c.bioText}
            </p>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title">{c.credentialsTitle}</h2>
            <div className="h-1 bg-accent w-20 mb-8"></div>
            <ul className="space-y-4">
              {c.credentials.map((cred, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-accent font-bold text-xl">•</span>
                  <span className="text-foreground/80">{cred}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title">{c.experienceTitle}</h2>
            <div className="h-1 bg-accent w-20 mb-8"></div>
            <ul className="space-y-4">
              {c.experience.map((exp, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-accent font-bold text-xl">•</span>
                  <span className="text-foreground/80">{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Civic Experience Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title">{c.civicTitle}</h2>
            <div className="h-1 bg-accent w-20 mb-8"></div>
            <ul className="space-y-4">
              {c.civic.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-accent font-bold text-xl">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Honor Charter Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{c.charterTitle}</h2>
            <div className="h-1 bg-accent w-20 mb-8"></div>
            
            <div className="bg-accent/10 border-l-4 border-accent p-8 rounded-lg mb-8">
              <p className="text-lg leading-relaxed text-primary-foreground/90 italic mb-6">
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
