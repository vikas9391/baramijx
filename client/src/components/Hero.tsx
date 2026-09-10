import { Link } from 'wouter';
import { useState } from 'react';

/**
 * Hero Component
 * Design: Dark navy background with gold accents, candidate profile image
 * Features: Candidate name, tagline, main message, CTA buttons, campaign gallery
 */

interface HeroProps {
  language: 'ar' | 'fr' | 'en';
}

export default function Hero({ language }: HeroProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const content = {
    ar: {
      election: 'الاستحقاقات الانتخابية 2026',
      partyBadge: 'الحزب المغربي الحر (PML)',
      title: 'عبد المنعم الزويني',
      subtitle: 'مرشح الدائرة التشريعية مراكش المنارة',
      party: 'الحزب المغربي الحر',
      tagline: 'تنمية عادلة . كرامة مصونة . سياسة القرب',
      message1: 'أخواتي وإخواني، ساكنة دائرة مراكش المنارة، بمختلف جماعاتها الحضرية والقروية، وخاصة ساكنة سيدي الزوين والمناطق المجاورة من الاوداية والسويهلة وايت ايمور، واكفاي، والسعادة والمحاميد والمسيرة...',
      message2: 'أتوجه إليكم اليوم بكل صدق ومسؤولية، لأعلن قراري خوض غمار الاستحقاقات الانتخابية المقبلة، إيماناً مني بأن العمل السياسي النبيل يظل وسيلة للترافع الجاد عن قضايا المواطن، والإنصات الحقيقي لانشغالاته، والعمل المشترك من أجل تحقيق تنمية عادلة ومتوازنة تستجيب لتطلعات الجميع.',
      cta1: 'اكتشف برنامجنا الانتخابي',
      cta2: 'سجل مشكلتك بالحي',
      galleryTitle: 'من برنامجنا وحملتنا الانتخابية',
      gallerySubtitle: 'تصفحوا مواد الحملة والصور التعريفية بالمرشحين والبرنامج.',
      previous: 'الصورة السابقة',
      next: 'الصورة التالية',
      close: 'إغلاق',
    },
    fr: {
      election: 'Élections Législatives 2026',
      partyBadge: 'Parti Marocain Libéral (PML)',
      title: 'Abdelmounaim Zouini',
      subtitle: 'Candidat de la circonscription de Marrakech-Menara',
      party: 'Parti Marocain Libéral',
      tagline: 'Développement équitable . Dignité préservée . Politique de proximité',
      message1: 'Mes sœurs et frères, citoyens de la circonscription de Marrakech-Menara, dans toutes ses communes urbaines et rurales, notamment Sidi Zouine, Oudaya, Souihla, Ait Imour, Akfay, Saada, Mhamid et Massira...',
      message2: 'Je m\'adresse à vous aujourd\'hui avec sincérité et responsabilité pour annoncer ma décision de me présenter aux prochaines élections législatives. Je crois fermement que l\'action politique noble reste un outil sérieux pour défendre les droits des citoyens, écouter réellement leurs préoccupations, et œuvrer ensemble pour un développement juste et équilibré.',
      cta1: 'Découvrez notre programme',
      cta2: 'Enregistrez votre problème',
      galleryTitle: 'Notre programme et notre campagne',
      gallerySubtitle: 'Parcourez les supports de campagne et les présentations des candidats et du programme.',
      previous: 'Image précédente',
      next: 'Image suivante',
      close: 'Fermer',
    },
    en: {
      election: 'Legislative Elections 2026',
      partyBadge: 'Moroccan Liberal Party (PML)',
      title: 'Abdelmounaim Zouini',
      subtitle: 'Candidate for Marrakech-Menara Legislative District',
      party: 'Liberal Moroccan Party',
      tagline: 'Fair Development . Preserved Dignity . Proximity Politics',
      message1: 'My sisters and brothers, citizens of Marrakech-Menara, in all its urban and rural communes, especially sidi Zouine, Oudaya, Souihla, Ait Imour, Akfay, Saada, Mhamid, and Massira...',
      message2: 'I address you today with honesty and responsibility to announce my decision to run in the upcoming legislative elections. I firmly believe that noble political action is a serious tool to advocate for citizens\' rights, listen to their concerns, and work together for fair, balanced development.',
      cta1: 'Discover Our Program',
      cta2: 'Register Your Problem',
      galleryTitle: 'Our Program & Campaign',
      gallerySubtitle: 'Browse campaign materials and presentations of the candidates and program.',
      previous: 'Previous image',
      next: 'Next image',
      close: 'Close',
    },
  };

  const c = content[language];
  const galleryImages = [
    '/campaign-1.svg',
    '/campaign-2.svg',
    '/campaign-3.svg',
    '/campaign-4.svg',
  ];

  const showPrevious = () => {
    setActiveImage((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % galleryImages.length);
  };

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
              <a href="#campaign-gallery" className="cta-button text-center text-sm md:text-base">
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

        {/* Campaign gallery */}
        <section id="campaign-gallery" className="mt-14 md:mt-20 scroll-mt-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <p className="text-accent font-semibold text-sm md:text-base">PML</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">{c.galleryTitle}</h2>
              <div className="h-1 bg-accent w-16 sm:w-20 mx-auto my-4"></div>
              <p className="text-primary-foreground/75 text-sm md:text-base max-w-2xl mx-auto">{c.gallerySubtitle}</p>
            </div>

            <div className="relative bg-[#F8F7F5] rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl border border-accent/30">
              <div className="relative flex items-center justify-center bg-black/5 rounded-xl overflow-hidden min-h-[420px] sm:min-h-[560px] md:min-h-[680px]">
                <img
                  src={galleryImages[activeImage]}
                  alt={`${c.galleryTitle} ${activeImage + 1}`}
                  className="max-h-[680px] w-full h-full object-contain cursor-zoom-in select-none"
                  onClick={() => setLightboxOpen(true)}
                />

                <button
                  type="button"
                  aria-label={language === 'ar' ? c.next : c.next}
                  onClick={language === 'ar' ? showPrevious : showNext}
                  className="absolute top-1/2 -translate-y-1/2 start-3 md:start-5 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/90 text-primary-foreground shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center text-2xl"
                >
                  {language === 'ar' ? '‹' : '‹'}
                </button>
                <button
                  type="button"
                  aria-label={language === 'ar' ? c.previous : c.next}
                  onClick={language === 'ar' ? showNext : showPrevious}
                  className="absolute top-1/2 -translate-y-1/2 end-3 md:end-5 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/90 text-primary-foreground shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center text-2xl"
                >
                  {language === 'ar' ? '›' : '›'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4" aria-label="Gallery navigation">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`${index + 1}`}
                    onClick={() => setActiveImage(index)}
                    className={`h-2.5 rounded-full transition-all ${activeImage === index ? 'w-8 bg-accent' : 'w-2.5 bg-primary/25 hover:bg-accent/60'}`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${activeImage === index ? 'border-accent ring-2 ring-accent/30' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={image} alt="" className="w-full aspect-[3/4] object-cover" />
                  </button>
                ))}
              </div>

              <p className="text-center text-xs text-gray-500 mt-3">{activeImage + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </section>

        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 p-4 sm:p-8 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              aria-label={c.close}
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 end-4 w-11 h-11 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20"
            >
              ×
            </button>
            <img
              src={galleryImages[activeImage]}
              alt={`${c.galleryTitle} ${activeImage + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}