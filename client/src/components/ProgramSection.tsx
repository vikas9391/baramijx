/**
 * ProgramSection Component
 * Design: Light background with card-based layout, gold accents
 * Features: Four program pillars (Health, Infrastructure, Education, Youth)
 */

interface ProgramSectionProps {
  language: 'ar' | 'fr' | 'en';
}

export default function ProgramSection({ language }: ProgramSectionProps) {
  const content = {
    ar: {
      title: 'أولويات برنامجنا الانتخابي لـمراكش المنارة',
      subtitle: 'برنامجنا مبني على تشخيص دقيق للخصاص بالمنطقة، بعيداً عن الوعود المستحيلة وقريباً من الواقع اليومي للساكنة.',
      programs: [
        {
          title: 'الصحة والكرامة الإنسانية',
          description: 'تجهيز مستوصفات سيدي الزوين والاوداية والارتقاء بجودة الخدمات الطبية الأولية وتقليص مواعيد الانتظار.',
          icon: '/manus-storage/program-health-icon_02d95530.png',
        },
        {
          title: 'البنية التحتية والعدالة المجالية',
          description: 'فك العزلة عن الدواوير التابعة لايت ايمور واكفاي، وإصلاح الطرقات وتعميم الإنارة والماء الصالح للشرب.',
          icon: '/manus-storage/program-infrastructure-icon_0728d93b.png',
        },
        {
          title: 'التعليم والحد من الهدر المدرسي',
          description: 'تأهيل المدارس الابتدائية والفرعيات القروية، وتوفير النقل المدرسي للفتيات لضمان حقهن في التعليم.',
          icon: '/manus-storage/program-education-icon_73633312.png',
        },
        {
          title: 'تمكين الشباب وتشجيع التشغيل',
          description: 'إحداث مراكز للتكوين المهني والتوجيه ودعم التعاونيات الفلاحية والخدماتية المحلية للشباب.',
          icon: '/manus-storage/program-education-icon_73633312.png',
        },
      ],
    },
    fr: {
      title: 'Priorités de notre programme électoral pour Marrakech-Menara',
      subtitle: 'Notre programme est basé sur un diagnostic précis des lacunes de la région, loin des promesses impossibles et proche de la réalité quotidienne des habitants.',
      programs: [
        {
          title: 'Santé et Dignité Humaine',
          description: 'Équiper les dispensaires de Sidi Zouine et Oudaïa et améliorer la qualité des services médicaux de base.',
          icon: '/manus-storage/program-health-icon_02d95530.png',
        },
        {
          title: 'Infrastructure et Justice Territoriale',
          description: 'Briser l\'isolement des villages, réparer les routes et généraliser l\'électrification et l\'eau potable.',
          icon: '/manus-storage/program-infrastructure-icon_0728d93b.png',
        },
        {
          title: 'Éducation et Réduction de l\'Abandon Scolaire',
          description: 'Réhabiliter les écoles primaires et secondaires rurales et fournir le transport scolaire aux filles.',
          icon: '/manus-storage/program-education-icon_73633312.png',
        },
        {
          title: 'Autonomisation des Jeunes et Emploi',
          description: 'Créer des centres de formation professionnelle et soutenir les coopératives agricoles locales.',
          icon: '/manus-storage/program-education-icon_73633312.png',
        },
      ],
    },
    en: {
      title: 'Electoral Program Priorities for Marrakech-Menara',
      subtitle: 'Our program is based on a precise diagnosis of regional gaps, far from impossible promises and close to the daily reality of residents.',
      programs: [
        {
          title: 'Health and Human Dignity',
          description: 'Equip health centers in Sidi Zouine and Oudaïa and improve primary healthcare services quality.',
          icon: '/manus-storage/program-health-icon_02d95530.png',
        },
        {
          title: 'Infrastructure and Territorial Justice',
          description: 'Break the isolation of villages, repair roads, and generalize electrification and drinking water.',
          icon: '/manus-storage/program-infrastructure-icon_0728d93b.png',
        },
        {
          title: 'Education and Dropout Reduction',
          description: 'Rehabilitate rural primary and secondary schools and provide school transport for girls.',
          icon: '/manus-storage/program-education-icon_73633312.png',
        },
        {
          title: 'Youth Empowerment and Employment',
          description: 'Create vocational training centers and support local agricultural cooperatives.',
          icon: '/manus-storage/program-education-icon_73633312.png',
        },
      ],
    },
  };

  const c = content[language];

  return (
    <section id="program" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent font-semibold mb-2">الحزب المغربي الحر</p>
          <h2 className="section-title">{c.title}</h2>
          <div className="h-1 bg-accent w-20 mx-auto mb-6"></div>
          <p className="section-subtitle max-w-2xl mx-auto">{c.subtitle}</p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.programs.map((program, idx) => (
            <div
              key={idx}
              className="program-card group hover:border-accent transition-all duration-300"
            >
              <img
                src={program.icon}
                alt={program.title}
                className="program-card-icon group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-lg font-bold text-foreground mb-3">
                {program.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
