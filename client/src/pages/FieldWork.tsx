import { Link } from 'wouter';

/**
 * Field Work Page
 * Design: Timeline of candidate activities and field meetings
 * Features: Timeline cards, event details, location information
 */

interface FieldWorkPageProps {
  language: 'ar' | 'fr' | 'en';
}

export default function FieldWorkPage({ language }: FieldWorkPageProps) {
  const content = {
    ar: {
      title: 'الميدان والإنصات',
      subtitle: 'لقاءات مستمرة ومباشرة مع المواطنين في القرى والأحياء للإنصات المباشر والتخطيط للتقدم المحلي.',
      timelineTitle: 'جدول اللقاءات الميدانية',
      events: [
        {
          date: '12 يونيو 2026',
          location: 'سيدي الزوين',
          title: 'جولة سيدي الزوين',
          description: 'حوار تعاوني مع المهنيين المحليين في سيدي الزوين حول التنمية واللوجستيك.',
          type: 'meeting',
          image: '/field.jpeg',
        },
      ],
    },
    fr: {
      title: 'Proximité de Terrain et Dialogues Locaux',
      subtitle: 'Des rencontres continues et directes avec les citoyens dans les villages et quartiers pour écouter directement et planifier le progrès local.',
      timelineTitle: 'Calendrier des Rencontres de Terrain',
      events: [
        {
          date: '12 juin 2026',
          location: 'Sidi Zouine',
          title: 'Tournée de Sidi Zouine',
          description: 'Un dialogue collaboratif avec les professionnels locaux à Sidi Zouine pour discuter du développement et de la logistique.',
          type: 'meeting',
          image: '/field.jpeg',
        },
      ],
    },
    en: {
      title: 'Field Proximity & Local Dialogues',
      subtitle: 'Continuous and live meetings with citizens in villages and neighborhoods to listen directly and plan local progress.',
      timelineTitle: 'Field Meeting Calendar',
      events: [
        {
          date: 'June 12, 2026',
          location: 'Sidi Zouine',
          title: 'Sidi Zouine Tour',
          description: 'A collaborative dialogue with local professionals in Sidi Zouine to discuss development and logistics.',
          type: 'meeting',
          image: '/field.jpeg',
        },
      ],
    },
  };

  const c = content[language];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'launch':
        return '🚀';
      case 'workshop':
        return '📚';
      case 'meeting':
        return '🤝';
      default:
        return '📅';
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

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-2">{c.timelineTitle}</h2>
          <div className="h-1 bg-accent w-20 mb-12"></div>

          <div className="max-w-3xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-accent/30 transform md:-translate-x-1/2"></div>

              {/* Timeline Events */}
              <div className="space-y-8">
                {c.events.map((event, idx) => (
                  <div
                    key={idx}
                    className={`relative pl-20 md:pl-0 ${
                      idx % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 top-2 w-8 h-8 bg-accent rounded-full border-4 border-background flex items-center justify-center text-sm transform md:-translate-x-1/2">
                      {getEventIcon(event.type)}
                    </div>

                    {/* Event Card */}
                    <div
                      className={`bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row ${
                        idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                      }`}
                    >
                      <div className="p-6 flex-1 flex flex-col gap-3">
                        {/* Event Type Badge */}
                        <div>
                          <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                            {event.type === 'launch'
                              ? language === 'ar'
                                ? 'إطلاق'
                                : language === 'fr'
                                ? 'Lancement'
                                : 'Launch'
                              : event.type === 'workshop'
                              ? language === 'ar'
                                ? 'ورشة عمل'
                                : language === 'fr'
                                ? 'Atelier'
                                : 'Workshop'
                              : language === 'ar'
                              ? 'لقاء'
                              : language === 'fr'
                              ? 'Réunion'
                              : 'Meeting'}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground">
                          {event.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                          <p className="font-semibold text-accent">
                            {event.date}
                          </p>
                          <p className="text-muted-foreground">
                            📍 {event.location}
                          </p>
                        </div>

                        <p className="text-foreground/80 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Event Image */}
                      {event.image && (
                        <div className="w-full sm:w-56 md:w-72 h-56 sm:h-auto shrink-0 order-first sm:order-last">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'ar'
              ? 'هل تريد لقاء المرشح؟'
              : language === 'fr'
              ? 'Voulez-vous rencontrer le candidat?'
              : 'Want to meet the candidate?'}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'سجل شكايتك أو اقترحاتك وسيتواصل معك الفريق الميداني'
              : language === 'fr'
              ? 'Enregistrez votre réclamation ou suggestion et l\'équipe de terrain vous contactera'
              : 'Register your complaint or suggestion and the field team will contact you'}
          </p>
          <Link href="/proximity-board" className="cta-button">
            {language === 'ar'
              ? 'سجل الآن'
              : language === 'fr'
              ? 'Enregistrez-vous maintenant'
              : 'Register Now'}
          </Link>
        </div>
      </section>
    </div>
  );
}