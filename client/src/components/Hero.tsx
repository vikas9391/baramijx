/**
 * Hero Component
 * Design: Dark navy background with gold accents, candidate profile image
 * Features: Candidate name, tagline, main message, CTA buttons
 */

interface HeroProps {
  language: 'ar' | 'fr' | 'en';
}

export default function Hero({ language }: HeroProps) {
  const content = {
    ar: {
      election: 'الاستحقاقات الانتخابية 2026',
      title: 'المهندس عبد المنعم الزويني',
      subtitle: 'مرشح الدائرة التشريعية مراكش المنارة',
      party: 'الحزب المغربي الحر',
      tagline: 'تنمية عادلة . كرامة مصونة . سياسة القرب',
      message: 'أخواتي وإخواني، ساكنة دائرة مراكش المنارة، بمختلف جماعاتها الحضرية والقروية، وخاصة ساكنة سيدي الزوين والمناطق المجاورة من الاوداية والسويهلة وايت ايمور، واكفاي، والسعادة والمحاميد والمسيرة...\n\nأتوجه إليكم اليوم بكل صدق ومسؤولية، لأعلن قراري خوض غمار الاستحقاقات الانتخابية المقبلة، إيماناً مني بأن العمل السياسي النبيل يظل وسيلة للترافع الجاد عن قضايا المواطن، والإنصات الحقيقي لانشغالاته، والعمل المشترك من أجل تحقيق تنمية عادلة ومتوازنة تستجيب لتطلعات الجميع.',
      cta1: 'اكتشف برنامجنا الانتخابي',
      cta2: 'سجل مشكلتك بالحي',
    },
    fr: {
      election: 'Élections 2026',
      title: 'Ingénieur Abdelmounaim Zouini',
      subtitle: 'Candidat de la circonscription de Marrakech-Menara',
      party: 'Parti Marocain Libéral',
      tagline: 'Développement équitable . Dignité préservée . Politique de proximité',
      message: 'Citoyens et citoyennes de la circonscription de Marrakech-Menara, je me présente devant vous aujourd\'hui avec sincérité et responsabilité pour annoncer ma candidature aux prochaines élections législatives. Je crois fermement que l\'action politique noble reste un moyen de défendre les causes des citoyens, d\'écouter vraiment leurs préoccupations, et de travailler ensemble pour réaliser un développement équitable et équilibré.',
      cta1: 'Découvrez notre programme',
      cta2: 'Enregistrez votre problème',
    },
    en: {
      election: '2026 Elections',
      title: 'Engineer Abdelmounaim Zouini',
      subtitle: 'Candidate for Marrakech-Menara Legislative District',
      party: 'Liberal Moroccan Party',
      tagline: 'Fair Development . Preserved Dignity . Proximity Politics',
      message: 'Citizens of Marrakech-Menara district, I stand before you today with sincerity and responsibility to announce my candidacy for the upcoming legislative elections. I firmly believe that noble political action remains a means to advocate for citizens\' issues, truly listen to their concerns, and work together to achieve fair and balanced development that meets everyone\'s aspirations.',
      cta1: 'Discover Our Program',
      cta2: 'Register Your Problem',
    },
  };

  const c = content[language];

  return (
    <section id="home" className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <div className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold">
              {c.election}
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{c.title}</h1>
              <div className="h-1 bg-accent w-20 mb-4"></div>
              <p className="text-lg text-primary-foreground/80">{c.subtitle}</p>
              <p className="text-sm text-accent mt-2">{c.party}</p>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-semibold text-accent">{c.tagline}</p>
              <p className="text-base leading-relaxed text-primary-foreground/90">
                {c.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="cta-button">
                {c.cta1}
              </button>
              <button className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors duration-200">
                {c.cta2}
              </button>
            </div>
          </div>

          {/* Right: Candidate Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-lg blur-xl"></div>
              <img
                src="/manus-storage/CandidateProfilePic_057ec8d9.jpeg"
                alt={c.title}
                className="relative w-full max-w-md rounded-lg shadow-2xl border-4 border-accent/30"
              />
              <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-sm font-semibold text-accent">{c.election}</p>
                <p className="text-xs text-primary-foreground">{c.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
