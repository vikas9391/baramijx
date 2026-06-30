import { useState } from 'react';

/**
 * RegionalSection Component
 * Design: Interactive accordion with regional tabs and detailed solutions
 * Features: Three regional areas with specific problems and commitments
 */

interface RegionalSectionProps {
  language: 'ar' | 'fr' | 'en';
}

export default function RegionalSection({ language }: RegionalSectionProps) {
  const [activeRegion, setActiveRegion] = useState(0);

  const content = {
    ar: {
      title: 'شنو هما المشاكل والحلول في المنطقة ديالكم؟',
      subtitle: 'اضغطوا على منطقتكم باش تشوفو الالتزامات الملموسة والواقعية اللي كنقدموها.',
      regions: [
        {
          name: 'سيدي الزوين والمناطق المجاورة',
          problems: [
            'ضعف التجهيزات والمستلزمات الطبية بمستوصف سيدي الزوين',
            'تحديات اللوجستيك والنقل العمومي والربط بمراكش',
            'نقص الدعم الموجه للتعاونيات الفلاحية المحلية',
          ],
          solutions: [
            'الترافع الفوري لتجهيز مستوصف سيدي الزوين بقسم مستعجلات مجهز',
            'تطوير خطوط النقل وشبكة الطرق لربط سيدي الزوين بسلاسة بوسط مراكش',
            'إحداث صندوق دعم لوجستيكي وتقني للتعاونيات الفلاحية للشباب',
          ],
        },
        {
          name: 'المحاميد والمسيرة (المجال الحضري)',
          problems: [
            'نقص الخدمات الاجتماعية والصحية',
            'تدهور البنية التحتية والطرقات',
            'ضعف فرص التشغيل والتكوين',
          ],
          solutions: [
            'تحسين الخدمات الصحية والاجتماعية',
            'إعادة تأهيل الطرقات والبنية التحتية',
            'إنشاء مراكز تكوين مهني',
          ],
        },
        {
          name: 'الاوداية، السويهلة، ايت ايمور، اكفاي، السعادة',
          problems: [
            'العزلة الجغرافية واللوجستيكية',
            'نقص الخدمات التعليمية',
            'ضعف الكهرباء والماء الصالح للشرب',
          ],
          solutions: [
            'فك العزلة عن طريق تحسين الطرقات والنقل',
            'بناء مدارس وتوفير النقل المدرسي',
            'تعميم الكهرباء والماء الصالح للشرب',
          ],
        },
      ],
    },
    fr: {
      title: 'Quels sont les problèmes et solutions dans votre région?',
      subtitle: 'Cliquez sur votre région pour voir les engagements concrets et réalistes que nous vous proposons.',
      regions: [
        {
          name: 'Sidi Zouine et régions voisines',
          problems: [
            'Faiblesse des équipements médicaux au dispensaire de Sidi Zouine',
            'Défis logistiques et transports publics',
            'Manque de soutien aux coopératives agricoles',
          ],
          solutions: [
            'Équiper le dispensaire de Sidi Zouine d\'une urgence',
            'Développer les lignes de transport et les routes',
            'Créer un fonds de soutien logistique pour les coopératives',
          ],
        },
        {
          name: 'Hammamidate et Masira (zone urbaine)',
          problems: [
            'Manque de services sociaux et sanitaires',
            'Détérioration des routes et infrastructure',
            'Faibles opportunités d\'emploi',
          ],
          solutions: [
            'Améliorer les services de santé et sociaux',
            'Réhabiliter les routes et infrastructure',
            'Créer des centres de formation professionnelle',
          ],
        },
        {
          name: 'Oudaïa, Souihla, Aït Imour, Akfay, Saada',
          problems: [
            'Isolement géographique et logistique',
            'Manque de services éducatifs',
            'Électricité et eau potable insuffisantes',
          ],
          solutions: [
            'Briser l\'isolement par l\'amélioration des routes',
            'Construire des écoles et fournir le transport scolaire',
            'Généraliser l\'électricité et l\'eau potable',
          ],
        },
      ],
    },
    en: {
      title: 'What are the problems and solutions in your region?',
      subtitle: 'Click on your region to see the concrete and realistic commitments we offer you.',
      regions: [
        {
          name: 'Sidi Zouine and neighboring regions',
          problems: [
            'Weak medical equipment at Sidi Zouine health center',
            'Logistical and public transport challenges',
            'Lack of support for agricultural cooperatives',
          ],
          solutions: [
            'Equip Sidi Zouine health center with emergency services',
            'Develop transport lines and roads',
            'Create a logistical support fund for cooperatives',
          ],
        },
        {
          name: 'Hammamidate and Masira (urban area)',
          problems: [
            'Lack of social and health services',
            'Road and infrastructure deterioration',
            'Weak employment opportunities',
          ],
          solutions: [
            'Improve health and social services',
            'Rehabilitate roads and infrastructure',
            'Create vocational training centers',
          ],
        },
        {
          name: 'Oudaïa, Souihla, Aït Imour, Akfay, Saada',
          problems: [
            'Geographic and logistical isolation',
            'Lack of educational services',
            'Insufficient electricity and drinking water',
          ],
          solutions: [
            'Break isolation through road improvement',
            'Build schools and provide school transport',
            'Generalize electricity and drinking water',
          ],
        },
      ],
    },
  };

  const c = content[language];
  const region = c.regions[activeRegion];

  return (
    <section id="regional" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-primary-foreground">{c.title}</h2>
          <div className="h-1 bg-accent w-20 mx-auto mb-6"></div>
          <p className="section-subtitle text-primary-foreground/80 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>

        {/* Region Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {c.regions.map((r, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRegion(idx)}
              className={`p-4 rounded-lg font-semibold transition-all duration-300 ${
                activeRegion === idx
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Region Details */}
        <div className="bg-primary-foreground/5 rounded-lg p-8 border border-primary-foreground/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Problems */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-accent">
                {language === 'ar' ? 'المشاكل المرصودة بالمنطقة:' : language === 'fr' ? 'Problèmes identifiés:' : 'Identified Problems:'}
              </h3>
              <ul className="space-y-3">
                {region.problems.map((problem, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span className="text-primary-foreground/90">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-accent">
                {language === 'ar' ? 'حلولنا والتزاماتنا:' : language === 'fr' ? 'Nos solutions:' : 'Our Solutions:'}
              </h3>
              <ul className="space-y-3">
                {region.solutions.map((solution, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-primary-foreground/90">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
