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
      title: 'اللقاءات والميدان',
      subtitle: 'لقاءات مستمرة مع المواطنين في القرى والأحياء',
      timelineTitle: 'جدول اللقاءات الميدانية',
      events: [
        {
          date: '12 يونيو 2026',
          location: 'سيدي الزوين',
          title: 'حوار مع المهندسين والمهنيين المحليين',
          description: 'حوار تعاوني مع المهنيين المحليين حول التنمية واللوجستيك والنقل.',
          type: 'meeting',
        },
        {
          date: '10 يونيو 2026',
          location: 'ايت ايمور',
          title: 'لقاء مع نساء الحي',
          description: 'نقاش حول التعليم والنقل المدرسي والفرص الاقتصادية للنساء.',
          type: 'meeting',
        },
        {
          date: '8 يونيو 2026',
          location: 'المحاميد',
          title: 'ندوة حول الشباب والتشغيل',
          description: 'لقاء مع شباب الحي لمناقشة فرص التكوين والتشغيل والتعاونيات.',
          type: 'workshop',
        },
        {
          date: '5 يونيو 2026',
          location: 'الاوداية',
          title: 'حوار مع الجمعيات المحلية',
          description: 'لقاء مع جمعيات المجتمع المدني لمناقشة احتياجات الحي.',
          type: 'meeting',
        },
        {
          date: '1 يونيو 2026',
          location: 'مراكش المنارة',
          title: 'إطلاق الحملة الانتخابية',
          description: 'إطلاق رسمي للحملة الانتخابية مع أعضاء الحزب والمواطنين.',
          type: 'launch',
        },
      ],
    },
    fr: {
      title: 'Proximité de Terrain et Dialogues Locaux',
      subtitle: 'Réunions continues avec les citoyens dans les villages et quartiers',
      timelineTitle: 'Calendrier des Rencontres de Terrain',
      events: [
        {
          date: '12 juin 2026',
          location: 'Sidi Zouine',
          title: 'Dialogue avec les ingénieurs et professionnels locaux',
          description: 'Un dialogue collaboratif avec les professionnels locaux sur le développement et la logistique.',
          type: 'meeting',
        },
        {
          date: '10 juin 2026',
          location: 'Aït Imour',
          title: 'Rencontre avec les femmes du quartier',
          description: 'Discussion sur l\'éducation, le transport scolaire et les opportunités économiques pour les femmes.',
          type: 'meeting',
        },
        {
          date: '8 juin 2026',
          location: 'Mhamid',
          title: 'Séminaire sur la jeunesse et l\'emploi',
          description: 'Rencontre avec les jeunes du quartier pour discuter des opportunités de formation et d\'emploi.',
          type: 'workshop',
        },
        {
          date: '5 juin 2026',
          location: 'Oudaïa',
          title: 'Dialogue avec les associations locales',
          description: 'Rencontre avec les associations de la société civile pour discuter des besoins du quartier.',
          type: 'meeting',
        },
        {
          date: '1er juin 2026',
          location: 'Marrakech-Menara',
          title: 'Lancement de la campagne électorale',
          description: 'Lancement officiel de la campagne électorale avec les membres du parti et les citoyens.',
          type: 'launch',
        },
      ],
    },
    en: {
      title: 'Field Proximity & Local Dialogues',
      subtitle: 'Continuous meetings with citizens in villages and neighborhoods',
      timelineTitle: 'Field Meeting Calendar',
      events: [
        {
          date: 'June 12, 2026',
          location: 'Sidi Zouine',
          title: 'Dialogue with Local Engineers and Professionals',
          description: 'A collaborative dialogue with local professionals discussing development and logistics.',
          type: 'meeting',
        },
        {
          date: 'June 10, 2026',
          location: 'Aït Imour',
          title: 'Meeting with Women of the Neighborhood',
          description: 'Discussion on education, school transportation, and economic opportunities for women.',
          type: 'meeting',
        },
        {
          date: 'June 8, 2026',
          location: 'Mhamid',
          title: 'Youth and Employment Seminar',
          description: 'Meeting with neighborhood youth to discuss training and employment opportunities.',
          type: 'workshop',
        },
        {
          date: 'June 5, 2026',
          location: 'Oudaïa',
          title: 'Dialogue with Local Associations',
          description: 'Meeting with civil society associations to discuss neighborhood needs.',
          type: 'meeting',
        },
        {
          date: 'June 1, 2026',
          location: 'Marrakech-Menara',
          title: 'Campaign Launch',
          description: 'Official launch of the electoral campaign with party members and citizens.',
          type: 'launch',
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
                      className={`bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300 ${
                        idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm font-semibold text-accent">
                            {event.date}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            📍 {event.location}
                          </p>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {event.title}
                      </h3>

                      <p className="text-foreground/80 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Event Type Badge */}
                      <div className="mt-4 inline-block">
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
          <button className="cta-button">
            {language === 'ar'
              ? 'سجل الآن'
              : language === 'fr'
              ? 'Enregistrez-vous maintenant'
              : 'Register Now'}
          </button>
        </div>
      </section>
    </div>
  );
}
