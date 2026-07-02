import { useState } from 'react';
import Hero from '@/components/Hero';

/**
 * Home Page - Main campaign website
 * Design: Modern Political Authority with Grassroots Warmth
 * Color Scheme: Navy (#0F1419) + Gold (#D4A574) + Light Cream (#F8F7F5)
 * Typography: Arabic-first with Almarai/Tajawal fonts
 */

interface SectionProps {
  language: 'ar' | 'fr' | 'en';
}

/* ---------------- Program Icons (inline SVG, replaces manus-storage PNGs) ---------------- */
function HealthIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
      <path d="M24 14v20M14 24h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function InfrastructureIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 38h36M10 38V20l14-10 14 10v18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 38V26h12v12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 10v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EducationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 18l20-9 20 9-20 9-20-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 22v9c0 2.8 4.9 5 11 5s11-2.2 11-5v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 18v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function YouthIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M4 40c0-7 5.4-12 12-12s12 5 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 40c0-7 5.4-12 12-12s12 5 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- Program Section ---------------- */
function ProgramSection({ language }: SectionProps) {
  const content = {
    ar: {
      partyName: 'الحزب الليبرالي المغربي (PML)',
      title: 'أولويات برنامجنا الانتخابي لـمراكش المنارة',
      subtitle: 'برنامجنا مبني على تشخيص دقيق للخصاص بالمنطقة، بعيداً عن الوعود المستحيلة وقريباً من الواقع اليومي للساكنة.',
      programs: [
        {
          title: 'الصحة والكرامة الإنسانية',
          description: 'تجهيز مستوصفات سيدي الزوين والاوداية والارتقاء بجودة الخدمات الطبية الأولية وتقليص مواعيد الانتظار.',
        },
        {
          title: 'البنية التحتية والعدالة المجالية',
          description: 'فك العزلة عن الدواوير التابعة لايت ايمور واكفاي، وإصلاح الطرقات وتعميم الإنارة والماء الصالح للشرب.',
        },
        {
          title: 'التعليم والحد من الهدر المدرسي',
          description: 'تأهيل المدارس الابتدائية والفرعيات القروية، وتوفير النقل المدرسي للفتيات لضمان حقهن في التعليم.',
        },
        {
          title: 'تمكين الشباب وتشجيع التشغيل',
          description: 'إحداث مراكز للتكوين المهني والتوجيه ودعم التعاونيات الفلاحية والخدماتية المحلية للشباب.',
        },
      ],
    },
    fr: {
      partyName: 'Parti Marocain Libéral (PML)',
      title: 'Priorités de notre programme électoral pour Marrakech-Menara',
      subtitle: 'Notre programme est basé sur un diagnostic précis des lacunes de la région, loin des promesses impossibles et proche de la réalité quotidienne des habitants.',
      programs: [
        {
          title: 'Santé et Dignité Humaine',
          description: 'Équiper les dispensaires de Sidi Zouine et Oudaïa et améliorer la qualité des services médicaux de base.',
        },
        {
          title: 'Infrastructure et Justice Territoriale',
          description: 'Briser l\'isolement des villages, réparer les routes et généraliser l\'électrification et l\'eau potable.',
        },
        {
          title: 'Éducation et Réduction de l\'Abandon Scolaire',
          description: 'Réhabiliter les écoles primaires et secondaires rurales et fournir le transport scolaire aux filles.',
        },
        {
          title: 'Autonomisation des Jeunes et Emploi',
          description: 'Créer des centres de formation professionnelle et soutenir les coopératives agricoles locales.',
        },
      ],
    },
    en: {
      partyName: 'Moroccan Liberal Party (PML)',
      title: 'Our Electoral Priorities for Marrakech-Menara',
      subtitle: 'Our program is built on a precise diagnosis of the local needs, focusing on the daily reality of our citizens rather than impossible promises.',
      programs: [
        {
          title: 'Healthcare & Human Dignity',
          description: 'Equipping local clinics in Sidi Zouine and Oudaya, improving medical service quality, and reducing waiting times.',
        },
        {
          title: 'Infrastructure & Spatial Justice',
          description: 'Unlocking isolated villages in Ait Imour and Akfay, repairing roads, and ensuring clean drinking water and lighting.',
        },
        {
          title: 'Education & Reducing School Dropouts',
          description: 'Rehabilitating primary schools and rural branches, providing school transport for girls to guarantee education rights.',
        },
        {
          title: 'Youth Empowerment & Employment',
          description: 'Establishing vocational training and guidance centers, and supporting local agricultural and service cooperatives.',
        },
      ],
    },
  };
  const c = content[language];
  const icons = [HealthIcon, InfrastructureIcon, EducationIcon, YouthIcon];

  return (
    <section id="program" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-accent font-semibold mb-2 text-sm sm:text-base">{c.partyName}</p>
          <h2 className="section-title text-xl sm:text-2xl md:text-3xl">{c.title}</h2>
          <div className="h-1 bg-accent w-16 sm:w-20 mx-auto mb-4 sm:mb-6"></div>
          <p className="section-subtitle max-w-2xl mx-auto text-sm sm:text-base">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {c.programs.map((program, idx) => {
            const Icon = icons[idx];
            return (
              <div key={idx} className="program-card group hover:border-accent transition-all duration-300">
                <Icon className="program-card-icon text-accent group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-bold text-foreground mb-3">{program.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Regional Section ---------------- */
function RegionalSection({ language }: SectionProps) {
  const [activeRegion, setActiveRegion] = useState(0);

  
  const content = {
    ar: {
      partyName: 'الحزب الليبرالي المغربي (PML)',
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
      partyName: 'Parti Marocain Libéral (PML)',
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
          name: 'Mhamid et Massira (secteurs urbains)',
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
      partyName: 'Moroccan Liberal Party (PML)',
      title: 'What are the local issues in your area?',
      subtitle: 'Click on your region to view the concrete commitments we propose to solve daily problems.',
      regions: [
        {
          name: 'Sidi Zouine & Nearby Rural Areas',
          problems: [
            'Weak equipment and medical supplies in Sidi Zouine clinic',
            'Logistics and public transport challenges connecting to Marrakech',
            'Lack of direct support for local agricultural cooperatives',
          ],
          solutions: [
            'Immediate advocacy to equip Sidi Zouine clinic with an emergency room',
            'Improving transport lines and road networks to connect Sidi Zouine to Marrakech',
            'Creating a logistics and technical support fund for youth farming cooperatives',
          ],
        },
        {
          name: 'Mhamid & Massira (Urban Sectors)',
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
          name: 'Oudaya, Souihla, Ait Imour, Akfay, Saada',
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
    <section id="regional" className="py-12 sm:py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-title text-primary-foreground text-xl sm:text-2xl md:text-3xl">{c.title}</h2>
          <div className="h-1 bg-accent w-16 sm:w-20 mx-auto mb-4 sm:mb-6"></div>
          <p className="section-subtitle text-primary-foreground/80 max-w-2xl mx-auto text-sm sm:text-base">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {c.regions.map((r, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRegion(idx)}
              className={`p-3 sm:p-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeRegion === idx
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className="bg-primary-foreground/5 rounded-lg p-5 sm:p-8 border border-primary-foreground/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-accent">
                {language === 'ar' ? 'المشاكل المرصودة بالمنطقة:' : language === 'fr' ? 'Problèmes identifiés:' : 'Identified Problems:'}
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {region.problems.map((problem, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span className="text-primary-foreground/90 text-sm sm:text-base">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-accent">
                {language === 'ar' ? 'حلولنا والتزاماتنا:' : language === 'fr' ? 'Nos solutions:' : 'Our Solutions:'}
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {region.solutions.map((solution, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-primary-foreground/90 text-sm sm:text-base">{solution}</span>
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

/* ---------------- Chat Icon (replaces manus-storage pml-logo PNG) ---------------- */
function CandidateAvatarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="currentColor" className="text-accent" />
      <circle cx="16" cy="13" r="5" fill="var(--primary)" />
      <path d="M6 27c0-5.5 4.5-9 10-9s10 3.5 10 9" fill="var(--primary)" />
    </svg>
  );
}

/* ---------------- Chat Section ---------------- */
function ChatSection({ language }: SectionProps) {
  const [activeTopic, setActiveTopic] = useState(0);
  const isRTL = language === 'ar';

  const content = {
    ar: {
      title: 'سولوا المرشح ديالكم مباشرة (تفاعل ذكي)',
      subtitle: 'اضغطوا على أي موضوع كيهّمكم باش تعرفوا الإجابة والموقف المباشر للمهندس عبد المنعم الزويني بكل وضوح.',
      chatTitle: 'المستشار التفاعلي للمرشح عبد المنعم الزويني',
      liveChat: 'LIVE CHAT',
      greeting: 'مرحباً بكم يا أهل دائرتنا الأوفياء بمراكش المنارة. أنا المهندس عبد المنعم الزويني، رهن إشارتكم. سألوني على برنامجي في الصحة، فك العزلة عن العالم القروي، التعليم، أو رؤيتي للجمع بين الفن، الشطرنج والسياسة القريبة من المواطن.',
      prompt: 'اضغطو على الأزرار في الجانب لطرح الأسئلة.',
      reset: 'إعادة تعيين المحادثة',
      topics: [
        { label: 'الصحة والكرامة 🏥', response: 'الصحة هي أساس التنمية. التزامي هو تجهيز مستوصفات سيدي الزوين والاوداية بأحدث المعدات الطبية، وتقليص مواعيد الانتظار، وضمان الخدمات الطبية الأولية الجيدة لكل مواطن. الكرامة الإنسانية تبدأ بصحة جيدة.' },
        { label: 'فك العزلة اللوجستيكية 🛣️', response: 'العزلة اللوجستيكية هي عائق أمام التنمية. سأعمل على تطوير شبكة الطرقات، تحسين خطوط النقل العمومي، وربط الدواوير بمراكش بسلاسة. كل قرية وحي يستحق الوصول السهل إلى الخدمات الأساسية.' },
        { label: 'التعليم والحد من الهدر 🏫', response: 'التعليم هو مفتاح المستقبل. سأركز على تأهيل المدارس القروية، توفير النقل المدرسي للفتيات، ودعم المعلمين. الهدر المدرسي يجب أن ينتهي، وكل طفل يستحق فرصة تعليمية عادلة.' },
        { label: 'الشطرنج والمسرح والسياسة 🎭', response: 'الفن والرياضة والثقافة جزء من هويتنا. أؤمن بأن السياسة يجب أن تكون قريبة من الناس، وأن الفن والرياضة يعززان الوعي المدني. سأدعم المراكز الثقافية والرياضية المحلية.' },
      ],
    },
    fr: {
      title: 'Posez vos questions au candidat (Interaction intelligente)',
      subtitle: 'Cliquez sur n\'importe quel sujet pour connaître la réponse et la position directe de l\'ingénieur Abdelmounaim Zouini.',
      chatTitle: 'Conseiller interactif du candidat Abdelmounaim Zouini',
      liveChat: 'CHAT EN DIRECT',
      greeting: 'Bienvenue, citoyens de la circonscription de Marrakech-Menara. Je suis l\'ingénieur Abdelmounaim Zouini, à votre service. Posez-moi des questions sur mon programme de santé, de lutte contre l\'isolement rural, d\'éducation, ou ma vision d\'une politique de proximité.',
      prompt: 'Cliquez sur les boutons pour poser vos questions.',
      reset: 'Réinitialiser la conversation',
      topics: [
        { label: 'Santé et Dignité 🏥', response: 'La santé est la base du développement. Je m\'engage à équiper les dispensaires de Sidi Zouine et Oudaïa, réduire les délais d\'attente, et garantir des services de santé primaire de qualité pour chaque citoyen. La dignité humaine commence par une bonne santé.' },
        { label: 'Briser l\'isolement logistique 🛣️', response: 'L\'isolement logistique est un obstacle au développement. Je travaillerai à améliorer le réseau routier, les transports publics, et connecter les villages à Marrakech. Chaque communauté mérite l\'accès facile aux services essentiels.' },
        { label: 'Éducation et Réduction de l\'abandon 🏫', response: 'L\'éducation est la clé de l\'avenir. Je me concentrerai sur la réhabilitation des écoles rurales, le transport scolaire pour les filles, et le soutien aux enseignants. Chaque enfant mérite une chance éducative équitable.' },
        { label: 'Échecs, Théâtre et Politique 🎭', response: 'L\'art, le sport et la culture font partie de notre identité. Je crois que la politique doit être proche des gens, et que l\'art et le sport renforcent la conscience civique. Je soutiens les centres culturels et sportifs locaux.' },
      ],
    },
    en: {
      title: 'Ask Your Candidate Directly (Smart QA)',
      subtitle: 'Click on any topic of interest to see Engineer Abdelmounaim Zouini\'s direct, transparent position.',
      chatTitle: 'Interactive Advisor for Candidate Abdelmounaim Zouini',
      liveChat: 'LIVE CHAT',
      greeting: 'Welcome, dear citizens of Marrakech-Menara. I am Engineer Abdelmounaim Zouini, at your service. Ask me about healthcare, rural infrastructure, education, or how I combine art, chess, and proximity politics.',
      prompt: 'Click the buttons on the side to ask questions.',
      reset: 'Reset Conversation',
      topics: [
        { label: 'Health and Dignity 🏥', response: 'Health is the foundation of development. I commit to equipping health centers in Sidi Zouine and Oudaïa, reducing wait times, and ensuring quality primary healthcare for every citizen. Human dignity begins with good health.' },
        { label: 'Breaking Logistical Isolation 🛣️', response: 'Logistical isolation is an obstacle to development. I will work to improve road networks, public transport, and connect villages to Marrakech. Every community deserves easy access to essential services.' },
        { label: 'Education and Dropout Reduction 🏫', response: 'Education is the key to the future. I will focus on rehabilitating rural schools, school transport for girls, and teacher support. Every child deserves an equal educational opportunity.' },
        { label: 'Chess, Theater and Politics 🎭', response: 'Art, sports, and culture are part of our identity. I believe politics must be close to people, and that art and sports strengthen civic awareness. I support local cultural and sports centers.' },
      ],
    },
  };

  const c = content[language];
  const topic = c.topics[activeTopic];

  return (
    <section id="chat" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-title text-xl sm:text-2xl md:text-3xl">{c.title}</h2>
          <div className="h-1 bg-accent w-16 sm:w-20 mx-auto mb-4 sm:mb-6"></div>
          <p className="section-subtitle max-w-2xl mx-auto text-sm sm:text-base">{c.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
            <div className="bg-primary text-primary-foreground p-5 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold">{c.chatTitle}</h3>
              <p className="text-sm text-primary-foreground/80 mt-1">{c.liveChat}</p>
            </div>

            <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CandidateAvatarIcon className="w-8 h-8 shrink-0" />
                  <span className="font-semibold text-foreground text-sm sm:text-base">
                    {language === 'ar' ? 'عبد المنعم الزويني:' : language === 'fr' ? 'Abdelmounaim Zouini:' : 'Abdelmounaim Zouini:'}
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed bg-muted/30 p-4 rounded-lg text-sm sm:text-base">{topic.response}</p>
              </div>

              {activeTopic === 0 && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <CandidateAvatarIcon className="w-8 h-8 shrink-0" />
                    <span className="font-semibold text-foreground text-sm sm:text-base">
                      {language === 'ar' ? 'عبد المنعم الزويني:' : language === 'fr' ? 'Abdelmounaim Zouini:' : 'Abdelmounaim Zouini:'}
                    </span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed bg-muted/30 p-4 rounded-lg text-sm sm:text-base">{c.greeting}</p>
                  <p className="text-sm text-muted-foreground italic pt-2">{c.prompt}</p>
                </div>
              )}
            </div>

            <div className="bg-muted/50 p-5 sm:p-6 border-t border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.topics.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTopic(idx)}
                    className={`p-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                      isRTL ? 'text-right' : 'text-left'
                    } ${
                      activeTopic === idx
                        ? 'bg-accent text-accent-foreground shadow-md'
                        : 'bg-card text-foreground border border-border hover:border-accent'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setActiveTopic(0)}
                className="w-full mt-4 px-4 py-2.5 sm:py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors duration-200"
              >
                {c.reset}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Home Page ---------------- */
interface HomeProps {
  language: 'ar' | 'fr' | 'en';
}

export default function Home({ language }: HomeProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero language={language} />
      <ProgramSection language={language} />
      <RegionalSection language={language} />
      <ChatSection language={language} />
    </div>
  );
}