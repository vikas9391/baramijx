import { Link } from 'wouter';

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
      partyBadge: 'الحزب المغربي الحر (PML)',
      title: 'المهندس عبد المنعم الزويني',
      subtitle: 'مرشح الدائرة التشريعية مراكش المنارة',
      party: 'الحزب المغربي الحر',
      tagline: 'تنمية عادلة . كرامة مصونة . سياسة القرب',
      message1: 'أخواتي وإخواني، ساكنة دائرة مراكش المنارة، بمختلف جماعاتها الحضرية والقروية، وخاصة ساكنة سيدي الزوين والمناطق المجاورة من الاوداية والسويهلة وايت ايمور، واكفاي، والسعادة والمحاميد والمسيرة...',
      message2: 'أتوجه إليكم اليوم بكل صدق ومسؤولية، لأعلن قراري خوض غمار الاستحقاقات الانتخابية المقبلة، إيماناً مني بأن العمل السياسي النبيل يظل وسيلة للترافع الجاد عن قضايا المواطن، والإنصات الحقيقي لانشغالاته، والعمل المشترك من أجل تحقيق تنمية عادلة ومتوازنة تستجيب لتطلعات الجميع.',
      cta1: 'اكتشف برنامجنا الانتخابي',
      cta2: 'سجل مشكلتك بالحي',
    },
    fr: {
      election: 'Élections Législatives 2026',
      partyBadge: 'Parti Marocain Libéral (PML)',
      title: 'Ingénieur Abdelmounaim Zouini',
      subtitle: 'Candidat de la circonscription de Marrakech-Menara',
      party: 'Parti Marocain Libéral',
      tagline: 'Développement équitable . Dignité préservée . Politique de proximité',
      message1: 'Mes sœurs et frères, citoyens de la circonscription de Marrakech-Menara, dans toutes ses communes urbaines et rurales, notamment Sidi Zouine, Oudaya, Souihla, Ait Imour, Akfay, Saada, Mhamid et Massira...',
      message2: 'Je m\'adresse à vous aujourd\'hui avec sincérité et responsabilité pour annoncer ma décision de me présenter aux prochaines élections législatives. Je crois fermement que l\'action politique noble reste un outil sérieux pour défendre les droits des citoyens, écouter réellement leurs préoccupations, et œuvrer ensemble pour un développement juste et équilibré.',
      cta1: 'Découvrez notre programme',
      cta2: 'Enregistrez votre problème',
    },
    en: {
      election: 'Legislative Elections 2026',
      partyBadge: 'Moroccan Liberal Party (PML)',
      title: 'Engineer Abdelmounaim Zouini',
      subtitle: 'Candidate for Marrakech-Menara Legislative District',
      party: 'Liberal Moroccan Party',
      tagline: 'Fair Development . Preserved Dignity . Proximity Politics',
      message1: 'My sisters and brothers, citizens of Marrakech-Menara, in all its urban and rural communes, especially sidi Zouine, Oudaya, Souihla, Ait Imour, Akfay, Saada, Mhamid, and Massira...',
      message2: 'I address you today with honesty and responsibility to announce my decision to run in the upcoming legislative elections. I firmly believe that noble political action is a serious tool to advocate for citizens\' rights, listen to their concerns, and work together for fair, balanced development.',
      cta1: 'Discover Our Program',
      cta2: 'Register Your Problem',
    },
  };

  const c = content[language];

  return (
    <section id="home" className="bg-primary text-primary-foreground pt-6 pb-12 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-5 md:space-y-6">
            <div className="inline-block bg-accent text-accent-foreground px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold">
              {c.partyBadge}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight">{c.title}</h1>
              <div className="h-1 bg-accent w-16 md:w-20 mb-3 md:mb-4"></div>
              <p className="text-base md:text-lg text-primary-foreground/80">{c.subtitle}</p>
              <p className="text-sm text-accent mt-2">{c.party}</p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <p className="text-lg md:text-xl font-semibold text-accent">{c.tagline}</p>
              <p className="text-sm md:text-base leading-relaxed text-primary-foreground/90">
                {c.message1}
              </p>
              <p className="text-sm md:text-base leading-relaxed text-primary-foreground/90">
                {c.message2}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <a href="#program" className="cta-button text-center text-sm md:text-base">
                {c.cta1}
              </a>
              <Link
                href="/proximity-board"
                className="px-5 py-2.5 md:px-6 md:py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors duration-200 text-center text-sm md:text-base"
              >
                {c.cta2}
              </Link>
            </div>
          </div>

          {/* Right: Candidate Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5]">
              <div className="absolute inset-0 bg-accent/20 rounded-lg blur-xl"></div>
              <img
                src="/CandidateProfile.jpeg"
                alt={c.title}
                className="relative w-full h-full object-cover rounded-lg shadow-2xl border-4 border-accent/30"
              />
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-primary/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                <p className="text-xs md:text-sm font-semibold text-accent uppercase tracking-wide">{c.election}</p>
                <p className="text-[11px] md:text-xs text-primary-foreground">{c.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}