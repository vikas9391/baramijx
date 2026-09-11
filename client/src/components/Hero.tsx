import { Link } from 'wouter';
import { useEffect, useState } from 'react';

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
      view: 'عرض الصورة',
      allPhotos: 'جميع الصور',
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
      view: 'Voir l’image',
      allPhotos: 'Toutes les photos',
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
      view: 'View image',
      allPhotos: 'All photos',
    },
  };

  const c = content[language];
  const galleryImages = [
    '/campaign-1.jpeg',
    '/campaign-2.jpeg',
    '/campaign-3.jpeg',
    '/campaign-4.jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.02 AM.jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.03 AM.jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.04 AM.jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.04 AM (1).jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.05 AM.jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.05 AM (1).jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.06 AM.jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.06 AM (1).jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.07 AM.jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.07 AM (1).jpeg',
    '/WhatsApp Image 2026-09-11 at 3.08.07 AM (2).jpeg',
  ];

  const showPrevious = () => {
    setActiveImage((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % galleryImages.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <section id="home" className="bg-primary text-primary-foreground pt-6 pb-12 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
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
              <p className="text-sm md:text-base leading-relaxed text-primary-foreground/90">{c.message1}</p>
              <p className="text-sm md:text-base leading-relaxed text-primary-foreground/90">{c.message2}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <a href="#campaign-gallery" className="cta-button text-center text-sm md:text-base">{c.cta1}</a>
              <Link href="/proximity-board" className="px-5 py-2.5 md:px-6 md:py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors duration-200 text-center text-sm md:text-base">
                {c.cta2}
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5]">
              <div className="absolute inset-0 bg-accent/20 rounded-lg blur-xl"></div>
              <img src="/CandidateProfile.jpeg" alt={c.title} className="relative w-full h-full object-cover rounded-lg shadow-2xl border-4 border-accent/30" />
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-primary/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                <p className="text-xs md:text-sm font-semibold text-accent uppercase tracking-wide">{c.election}</p>
                <p className="text-[11px] md:text-xs text-primary-foreground">{c.title}</p>
              </div>
            </div>
          </div>
        </div>

        <section id="campaign-gallery" className="mt-16 md:mt-24 scroll-mt-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7 md:mb-10">
              <div>
                <p className="text-accent font-semibold text-sm md:text-base tracking-wide">PML • 2026</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">{c.galleryTitle}</h2>
                <div className="h-1 bg-accent w-16 sm:w-20 mt-4"></div>
                <p className="text-primary-foreground/70 text-sm md:text-base max-w-2xl mt-4">{c.gallerySubtitle}</p>
              </div>
              <div className="shrink-0 rounded-full border border-accent/30 bg-white/5 px-4 py-2 text-xs sm:text-sm text-primary-foreground/80">
                {galleryImages.length} {c.allPhotos}
              </div>
            </div>

            <div className="bg-[#F8F7F5] rounded-3xl p-3 sm:p-5 md:p-7 shadow-2xl border border-accent/30">
              {/* Featured image */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-black/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
                aria-label={`${c.view} ${activeImage + 1}`}
              >
                <div className="aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6.5] max-h-[560px]">
                  <img src={galleryImages[activeImage]} alt={`${c.galleryTitle} ${activeImage + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10 opacity-80"></div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-end justify-between gap-4 text-left" dir="ltr">
                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-[0.2em]">PML • 2026</p>
                    <p className="text-white font-semibold text-sm sm:text-base mt-1">{activeImage + 1} / {galleryImages.length}</p>
                  </div>
                  <span className="rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2 text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {c.view} ↗
                  </span>
                </div>
              </button>

              {/* Masonry gallery — preserves the natural proportions of the photos */}
              <div className="mt-5 md:mt-7 columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => {
                      setActiveImage(index);
                      setLightboxOpen(true);
                    }}
                    className={`group relative mb-3 md:mb-4 block w-full overflow-hidden rounded-xl bg-black/5 text-left break-inside-avoid focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/60 ${activeImage === index ? 'ring-2 ring-accent ring-offset-2' : ''}`}
                    aria-label={`${c.view} ${index + 1}`}
                  >
                    <img src={image} alt={`${c.galleryTitle} ${index + 1}`} loading={index > 3 ? 'lazy' : 'eager'} className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity" dir="ltr">
                      <span className="text-white text-xs font-semibold bg-black/35 backdrop-blur-sm rounded-full px-2.5 py-1">{index + 1}</span>
                      <span className="text-white text-xs">↗</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {lightboxOpen && (
          <div className="fixed inset-0 z-[100] bg-black/95 p-3 sm:p-6 flex items-center justify-center" role="dialog" aria-modal="true" onClick={() => setLightboxOpen(false)}>
            <button type="button" aria-label={c.close} onClick={() => setLightboxOpen(false)} className="absolute top-4 end-4 z-10 w-11 h-11 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors">×</button>

            <button type="button" aria-label={c.previous} onClick={(event) => { event.stopPropagation(); showPrevious(); }} className="absolute start-2 sm:start-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground text-white text-3xl backdrop-blur-md transition-colors">‹</button>

            <div className="relative max-w-6xl max-h-full flex flex-col items-center" onClick={(event) => event.stopPropagation()}>
              <img src={galleryImages[activeImage]} alt={`${c.galleryTitle} ${activeImage + 1}`} className="max-w-[92vw] max-h-[82vh] object-contain rounded-lg shadow-2xl" />
              <div className="mt-3 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 text-white text-xs sm:text-sm" dir="ltr">
                {activeImage + 1} / {galleryImages.length}
              </div>
            </div>

            <button type="button" aria-label={c.next} onClick={(event) => { event.stopPropagation(); showNext(); }} className="absolute end-2 sm:end-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground text-white text-3xl backdrop-blur-md transition-colors">›</button>
          </div>
        )}
      </div>
    </section>
  );
}
