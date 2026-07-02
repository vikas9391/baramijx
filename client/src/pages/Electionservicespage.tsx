import { useState, useMemo } from 'react';
import { Link } from 'wouter';

interface ElectionServicesPageProps {
  language: 'ar' | 'fr' | 'en';
}

/**
 * Our Election Services Page
 * Design: BaramijX-style single-page service showcase
 * Sections: Hero, Strategic Framework, Why Digital Campaign,
 *           Pricing Packages, Budget Estimator, Compliance
 * NOTE: Header and Footer are rendered globally in App.tsx — do not import them here.
 */
export default function ElectionServicesPage({ language }: ElectionServicesPageProps) {
  const isRTL = language === 'ar';

  const content = {
    ar: {
      eyebrow: 'بنية تحتية سيادية لحملات القرب',
      heroTitle: 'الفوز بالانتخابات عبر القرب والكرامة في المغرب',
      heroSubtitle:
        'نصمم منصات حملات انتخابية أصيلة ومتوافقة مع القانون ومحلية بامتياز، تجمع بين التواصل الرقمي الحديث وقيم القرب المغربية الأصيلة لكسب الثقة والأصوات.',
      exploreBtn: 'اكتشف باقات الحملة',
      demoBtn: 'شاهد نموذج البوابة المحلية',
      stats: [
        { value: '3M+', label: 'ناخب مغربي تم الوصول إليه' },
        { value: '48h', label: 'نشر محلي سريع' },
        { value: '100%', label: 'ثقة قرب أصيلة' },
      ],
      frameworkEyebrow: 'إطار استراتيجي',
      frameworkTitle: 'خدمات القرب السيادية',
      frameworkSubtitle:
        'كل عنصر في محرك حملتنا مُحسّن للقوانين المغربية، مع التركيز على التواصل الحقيقي مع المواطنين، والثقة المجتمعية، والامتثال المطلق.',
      framework: [
        {
          title: 'سياسة القرب',
          desc: 'خرائط تفاعلية للأحياء ولوحات لتظلمات المواطنين تتيح للناخبين تقديم مشاكلهم المحلية مباشرة.',
        },
        {
          title: 'الكرامة والعدالة',
          desc: 'هيكلة البرامج الانتخابية للتركيز على أولويات الناخب الحقيقية: الصحة والتشغيل والتعليم العمومي والبنية التحتية الأساسية.',
        },
        {
          title: 'الشفافية والمحاسبة',
          desc: 'متتبع الالتزامات وميثاق التوقيع العلني لإظهار أن حملتكم تقف مع السياسة النظيفة والصادقة.',
        },
      ],
      whyEyebrow: 'رؤية معاصرة للحملة الانتخابية بالمغرب',
      whyTitle: 'علاش حملة انتخابية إلكترونية؟',
      whyPoints: [
        {
          title: 'توصلوا البرنامج بسهولة ووضوح',
          desc: 'الحملة الانتخابية الإلكترونية ماشي غير وسيلة تواصل، بل فرصة باش المرشح يوصل لكل بيت بطريقة عصرية، منظمة ونظيفة، بعيدًا عن الفوضى والوسائل التقليدية المكلفة.',
        },
        {
          title: 'توسعوا دائرة الوصول والمشاركة',
          desc: 'تخليوا حملتكم حديث الشارع ووسائل التواصل، وتوسعوا دائرة الوصول بشكل كبير، حيث أي شخص توصّل بالمحتوى يقدر يشاركُه تلقائيًا مع الأصدقاء والعائلة.',
        },
      ],
      whyClosing: 'لأن الجديد كيجلب الانتباه، والحملة الذكية كتدخل للناس بلا ضجيج… وكتخلي الأثر يوصل أبعد.',
      pricingEyebrow: 'باقات حملة القرب',
      pricingTitle: 'باقات حملة القرب',
      pricingSubtitle:
        'مستويات شفافة ومحلية مصممة لتناسب الدوائر البلدية والمجالس الجهوية والحملات التشريعية الوطنية.',
      tiers: [
        {
          badge: null,
          name: 'بوابة القرب (جيد)',
          desc: 'بنية تحتية رقمية أساسية للحملات البلدية والجهوية التي تتطلب تواصل قرب فوري ونظيف.',
          price: '15,000',
          packageLabel: 'الباقة السيادية الأساسية',
          features: [
            'بوابة حملة رقمية ثنائية اللغة (عربي/إنجليزي)',
            'مكتب تظلمات واقتراحات المواطنين',
            'استضافة سيادية مغربية وامتثال CNDP',
            'تكامل مع وسائل التواصل الاجتماعي للقرب',
            'تكامل كامل مع الهاتف المحمول وواتساب',
          ],
          cta: 'اقتنِ الباقة',
        },
        {
          badge: 'الأكثر اختيارًا',
          name: 'انخراط الدائرة (أفضل)',
          desc: 'مستوى محلي عالي التأثير مصمم للدوائر التشريعية التنافسية التي تتطلب تواصلًا رقميًا وميدانيًا مطبوعًا مجتمعين.',
          price: '35,000',
          packageLabel: 'باقة نطاق الدائرة',
          features: [
            'كل ما في بوابة القرب',
            'خريطة تفاعلية للأحياء ومتتبع النبض',
            '5,000 منشور قرب مميز وخطة توزيع',
            'موجة رسائل نصية مستهدفة للناخبين (25,000 رسالة)',
            'متتبع الالتزام والميثاق',
          ],
          cta: 'اقتنِ الباقة',
        },
        {
          badge: null,
          name: 'الكرامة السيادية (الأفضل)',
          desc: 'محرك الحملة الشامل والنهائي. يجمع بين العلاقات العامة النخبوية والدعم الإعلامي الكامل وموجات الرسائل النصية الضخمة ولوجستيك الجولات الميدانية.',
          price: '75,000',
          packageLabel: 'الباقة السيادية النخبوية',
          features: [
            'كل ما في انخراط الدائرة',
            'روبوت محادثة تفاعلي بأسلوب ذكاء اصطناعي',
            'بلاغ صحفي مميز مع الصحف المغربية',
            'موجة رسائل نصية ضخمة مستهدفة (100,000 رسالة)',
            'دعم الجولة الميدانية وكتابة الخطابات',
          ],
          cta: 'اقتنِ الباقة',
        },
      ],
      estimatorEyebrow: 'هندسة الميزانية',
      estimatorTitle: 'مخطط ميزانية القرب',
      estimatorSubtitle: 'اضبطوا المعطيات لحساب تقدير دقيق لاحتياجات حملتكم المحلية المغربية.',
      voterLabel: 'حجم الناخبين',
      voterHint: 'اسحب لضبط حجم الناخبين المستهدفين في دائرتكم.',
      smsLabel: 'موجات الرسائل النصية المستهدفة',
      smsOptions: ['بدون موجة رسائل', 'موجة محلية (15,000 رسالة)', 'موجة الدائرة (50,000 رسالة)', 'الموجة السيادية (150,000 رسالة)'],
      flyersLabel: 'منشورات القرب والمطبوعات',
      flyersOptions: ['بدون منشورات مطبوعة', 'توزيع محلي (5,000 منشور)', 'توزيع الدائرة (15,000 منشور)', 'توزيع سيادي (50,000 منشور)'],
      mediaLabel: 'الدعم الإعلامي والعلاقات العامة المغربية',
      mediaOptions: ['تضمين علاقات عامة وإعلام كامل (15,000 د.م)', 'بدون علاقات عامة إعلامية مخصصة'],
      summaryTitle: 'ملخص التكلفة',
      summarySubtitle: 'الاستثمار التقديري للحملة',
      summaryFooter: 'الميزانية الشاملة لخدمات القرب',
      disclaimer: '* التقديرات خاضعة لمراجعات الامتثال التنظيمي وأسعار المشغلين الجهويين.',
      customBtn: 'اطلب حملة مخصصة',
      complianceTitle: '100% متوافق مع القوانين المغربية و CNDP',
      complianceSubtitle:
        'نعمل بامتثال مطلق لمبادئ الانتخابات المغربية ومناشير وزارة الداخلية ومعايير خصوصية البيانات CNDP لحماية حملتكم واحترام الناخبين.',
      complianceItems: ['متوافق مع خصوصية بيانات CNDP', 'مبادئ وزارة الداخلية', 'موافقات المشغلين الرسمية للرسائل النصية'],
    },
    fr: {
      eyebrow: 'Infrastructure Souveraine de Campagne de Proximité',
      heroTitle: 'Gagner les Élections par la Proximité et la Dignité au Maroc',
      heroSubtitle:
        "BaramijX conçoit des plateformes de campagne authentiques, conformes et hautement localisées. Nous combinons le rayonnement numérique moderne avec les valeurs de proximité marocaines pour gagner la confiance et les voix.",
      exploreBtn: 'Explorer les Packages',
      demoBtn: 'Voir le Portail Candidat Localisé',
      stats: [
        { value: '3M+', label: 'Électeurs Marocains Atteints' },
        { value: '48h', label: 'Déploiement Local Rapide' },
        { value: '100%', label: 'Confiance de Proximité Authentique' },
      ],
      frameworkEyebrow: 'Cadre Stratégique',
      frameworkTitle: 'Services de Proximité Souverains',
      frameworkSubtitle:
        'Chaque élément de notre moteur de campagne est optimisé pour la réglementation marocaine, avec un accent sur la connexion citoyenne réelle, la confiance communautaire et une conformité absolue.',
      framework: [
        {
          title: 'Politique de Proximité',
          desc: "Cartographie de quartier interactive et tableaux de doléances citoyennes permettant aux électeurs de soumettre directement leurs problèmes locaux.",
        },
        {
          title: 'Dignité & Justice',
          desc: 'Structuration des programmes électoraux autour des vraies priorités des électeurs : santé, emploi, éducation publique et infrastructures de base.',
        },
        {
          title: 'Transparence & Redevabilité',
          desc: "Suivi des engagements et signature de charte publique pour montrer que votre campagne défend une politique propre et honnête.",
        },
      ],
      whyEyebrow: 'Une Vision Contemporaine de la Campagne Électorale au Maroc',
      whyTitle: 'Pourquoi une Campagne Électorale Numérique ?',
      whyPoints: [
        {
          title: 'Faites Parvenir le Programme avec Clarté',
          desc: "La campagne électorale numérique n'est pas seulement un moyen de communication, mais une opportunité pour le candidat d'atteindre chaque foyer de manière moderne, organisée et propre, loin du chaos et des méthodes traditionnelles coûteuses.",
        },
        {
          title: "Élargissez le Cercle de Portée et de Participation",
          desc: "Faites de votre campagne le sujet de la rue et des réseaux sociaux, et élargissez considérablement votre portée : toute personne touchée par le contenu peut le partager automatiquement avec ses amis et sa famille.",
        },
      ],
      whyClosing: "Parce que le nouveau attire l'attention, et qu'une campagne intelligente touche les gens sans bruit... et fait porter l'impact plus loin.",
      pricingEyebrow: 'Packages de Campagne de Proximité',
      pricingTitle: 'Packages de Campagne de Proximité',
      pricingSubtitle:
        'Des niveaux transparents et localisés conçus pour les districts municipaux, les conseils régionaux et les campagnes législatives nationales.',
      tiers: [
        {
          badge: null,
          name: 'Portail de Proximité (Bien)',
          desc: 'Infrastructure numérique essentielle pour les campagnes municipales et régionales nécessitant un rayonnement de proximité immédiat et propre.',
          price: '15 000',
          packageLabel: 'Package Souverain de Base',
          features: [
            'Portail de Campagne Bilingue (FR/AR)',
            'Bureau de Doléances & Suggestions Citoyennes',
            'Hébergement Souverain Marocain & Conformité CNDP',
            'Intégration de Proximité Réseaux Sociaux',
            'Intégration Mobile & WhatsApp Complète',
          ],
          cta: 'Acquérir le Package',
        },
        {
          badge: 'Le Plus Sélectionné',
          name: 'Engagement de District (Mieux)',
          desc: 'Niveau localisé à fort impact conçu pour les circonscriptions législatives compétitives nécessitant un rayonnement numérique et terrain combiné.',
          price: '35 000',
          packageLabel: 'Package Échelle District',
          features: [
            'Tout dans Portail de Proximité',
            'Carte de Quartier Interactive & Suivi de Pouls',
            '5 000 Flyers de Proximité Premium & Plan de Distribution',
            'Vague SMS Électeurs Ciblée (25 000 SMS)',
            'Suivi des Engagements & Charte',
          ],
          cta: 'Acquérir le Package',
        },
        {
          badge: null,
          name: 'Dignité Souveraine (Meilleur)',
          desc: "Notre moteur de campagne ultime tout-inclus. Combine RP d'élite, support média complet, vagues SMS massives et logistique de tournée terrain.",
          price: '75 000',
          packageLabel: 'Package Élite Souverain',
          features: [
            "Tout dans Engagement de District",
            'Simulation Chatbot Q&R Style IA',
            'Communiqué de Presse Premium avec Journaux Marocains',
            'Vague SMS Électeurs Massive Ciblée (100 000 SMS)',
            'Tournée Terrain de Proximité & Support Rédaction de Discours',
          ],
          cta: 'Acquérir le Package',
        },
      ],
      estimatorEyebrow: 'Architecture Budgétaire',
      estimatorTitle: 'Planificateur de Budget de Proximité',
      estimatorSubtitle: 'Configurez vos paramètres pour calculer une estimation précise des besoins de votre campagne marocaine localisée.',
      voterLabel: 'Taille des Électeurs',
      voterHint: 'Glissez pour ajuster la taille des électeurs ciblés dans votre circonscription.',
      smsLabel: 'Vagues SMS Ciblées',
      smsOptions: ['Pas de Vague SMS', 'Vague Locale (15 000 SMS)', 'Vague District (50 000 SMS)', 'Vague Souveraine (150 000 SMS)'],
      flyersLabel: 'Flyers de Proximité & Supports Imprimés',
      flyersOptions: ['Pas de Flyers Imprimés', 'Distribution Locale (5 000 Flyers)', 'Distribution District (15 000 Flyers)', 'Distribution Souveraine (50 000 Flyers)'],
      mediaLabel: 'Support Média Marocain & RP',
      mediaOptions: ['Inclure RP & Média Complet (15 000 MAD)', 'Pas de RP Média Dédiée'],
      summaryTitle: 'Résumé des Coûts',
      summarySubtitle: "Investissement Estimé de la Campagne",
      summaryFooter: 'Budget de Proximité Tout-Inclus',
      disclaimer: '* Les estimations sont soumises à des révisions de conformité réglementaire et aux tarifs des opérateurs régionaux.',
      customBtn: 'Demander une Campagne Personnalisée',
      complianceTitle: '100% Conforme aux Lois Marocaines & CNDP',
      complianceSubtitle:
        "Nous travaillons en conformité absolue avec les directives électorales marocaines, les circulaires du Ministère de l'Intérieur et les normes de confidentialité des données CNDP pour protéger votre campagne et respecter les électeurs.",
      complianceItems: ['Conforme Confidentialité des Données CNDP', "Directives du Ministère de l'Intérieur", 'Approbations SMS des Opérateurs Officiels'],
    },
    en: {
      eyebrow: 'Sovereign Proximity Campaign Infrastructure',
      heroTitle: 'Winning Elections Through Proximity & Dignity in Morocco',
      heroSubtitle:
        "BaramijX engineers authentic, compliant, and highly localized campaign platforms. We combine modern digital outreach with Morocco's traditional proximity values to win trust and votes.",
      exploreBtn: 'Explore Campaign Packages',
      demoBtn: 'View Localized Candidate Portal',
      stats: [
        { value: '3M+', label: 'Moroccan Voters Reached' },
        { value: '48h', label: 'Rapid Local Deployment' },
        { value: '100%', label: 'Authentic Proximity Trust' },
      ],
      frameworkEyebrow: 'Strategic Framework',
      frameworkTitle: 'Sovereign Proximity Services',
      frameworkSubtitle:
        'Every element of our campaign engine is optimized for Moroccan regulations, focusing on real citizen connection, community trust, and absolute compliance.',
      framework: [
        {
          title: 'Proximity Policy',
          desc: 'Interactive neighborhood mapping and citizen grievance boards that allow voters to submit localized problems directly.',
        },
        {
          title: 'Dignity & Justice',
          desc: 'Structuring electoral programs to focus on real voter priorities: healthcare, employment, public education, and basic infrastructure.',
        },
        {
          title: 'Transparency & Accountability',
          desc: 'Honor commitments tracker and public charter signature to show that your campaign stands for clean, honest politics.',
        },
      ],
      whyEyebrow: 'A Contemporary Vision for the Electoral Campaign in Morocco',
      whyTitle: 'Why an Electronic Election Campaign?',
      whyPoints: [
        {
          title: 'Deliver the Program with Ease and Clarity',
          desc: "An electronic election campaign isn't just a communication tool — it's an opportunity for the candidate to reach every household in a modern, organized, and clean way, far from the chaos and cost of traditional methods.",
        },
        {
          title: 'Expand Your Reach and Engagement',
          desc: "Make your campaign the talk of the street and social media, and greatly expand your reach — anyone who receives the content can automatically share it with friends and family.",
        },
      ],
      whyClosing: "Because what's new grabs attention, and a smart campaign reaches people without noise... and lets the impact travel further.",
      pricingEyebrow: 'Proximity Campaign Packages',
      pricingTitle: 'Proximity Campaign Packages',
      pricingSubtitle:
        'Transparent, localized tiers designed to fit local municipal districts, regional councils, and nationwide legislative campaigns.',
      tiers: [
        {
          badge: null,
          name: 'Proximity Portal (Good)',
          desc: 'Essential digital infrastructure for local municipal and regional campaigns requiring immediate, clean proximity outreach.',
          price: '15,000',
          packageLabel: 'Sovereign Base Package',
          features: [
            'Bilingual Campaign Web Portal (EN/AR)',
            'Citizen Grievance & Suggestion Desk',
            'Moroccan Sovereign Hosting & CNDP Compliance',
            'Social Media Proximity Integration',
            'Full Mobile & WhatsApp Integration',
          ],
          cta: 'Acquire Package',
        },
        {
          badge: 'Most Selected Tier',
          name: 'District Engagement (Better)',
          desc: 'High-impact, localized tier designed for competitive legislative districts requiring combined digital and field print outreach.',
          price: '35,000',
          packageLabel: 'District Scale Package',
          features: [
            'Everything in Proximity Portal',
            'Interactive Neighborhood Map & Pulse Tracker',
            '5,000 Premium Proximity Flyers & Distribution Plan',
            'Targeted SMS Voter Wave (25,000 SMS)',
            'Honor Commitment & Charter Tracker',
          ],
          cta: 'Acquire Package',
        },
        {
          badge: null,
          name: 'Sovereign Dignity (Best)',
          desc: 'Our ultimate, all-inclusive campaign powerhouse. Combines elite PR, full-scale media support, massive SMS waves, and field tour logistics.',
          price: '75,000',
          packageLabel: 'Sovereign Elite Package',
          features: [
            'Everything in District Engagement',
            'AI-Style Proximity Q&A Chatbot Simulation',
            'Premium Press Release PR with Moroccan Newspapers',
            'Massive Targeted SMS Voter Wave (100,000 SMS)',
            'Proximity Field Tour & Speech Writing Support',
          ],
          cta: 'Acquire Package',
        },
      ],
      estimatorEyebrow: 'Budget Architecture',
      estimatorTitle: 'Proximity Budget Planner',
      estimatorSubtitle: 'Configure your parameters to calculate a precise estimate for your localized Moroccan campaign requirements.',
      voterLabel: 'Voter Size',
      voterHint: 'Drag to adjust target voters size in your constituency.',
      smsLabel: 'Targeted SMS Waves',
      smsOptions: ['No SMS Wave', 'Local Wave (15,000 SMS)', 'District Wave (50,000 SMS)', 'Sovereign Wave (150,000 SMS)'],
      flyersLabel: 'Proximity Flyers & Printed Collateral',
      flyersOptions: ['No Printed Flyers', 'Local Distribution (5,000 Flyers)', 'District Distribution (15,000 Flyers)', 'Sovereign Distribution (50,000 Flyers)'],
      mediaLabel: 'Moroccan Media Support & Press PR',
      mediaOptions: ['Include Full PR & Media (MAD 15,000)', 'No Dedicated Media PR'],
      summaryTitle: 'Cost Summary',
      summarySubtitle: 'Estimated Campaign Investment',
      summaryFooter: 'All-Inclusive Proximity Budget',
      disclaimer: '* Estimates are subject to regulatory compliance reviews and regional carrier rates.',
      customBtn: 'Acquire Custom Campaign',
      complianceTitle: '100% Compliant with Moroccan Laws & CNDP',
      complianceSubtitle:
        'We work in absolute compliance with Moroccan election guidelines, Ministry of Interior circulars, and CNDP data privacy standards to protect your campaign and respect voters.',
      complianceItems: ['CNDP Data Privacy Compliant', 'Ministry of Interior Guidelines', 'Official Carrier SMS Approvals'],
    },
  };

  const c = content[language];

  // --- Budget Estimator State ---
  const [voterSize, setVoterSize] = useState(50000);
  const [smsWave, setSmsWave] = useState(0); // index into smsOptions
  const [flyers, setFlyers] = useState(0); // index into flyersOptions
  const [mediaPR, setMediaPR] = useState(false);

  const smsCosts = [0, 4000, 10000, 25000];
  const flyerCosts = [0, 3000, 8000, 20000];

  const total = useMemo(() => {
    const base = 10000 + voterSize * 0.19;
    return Math.round(base + smsCosts[smsWave] + flyerCosts[flyers] + (mediaPR ? 15000 : 0));
  }, [voterSize, smsWave, flyers, mediaPR]);

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <p className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wide mb-3 sm:mb-4">{c.eyebrow}</p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">{c.heroTitle}</h1>
          <p className="text-base sm:text-lg text-primary-foreground/80 mb-6 sm:mb-8">{c.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a href="#pricing" className="cta-button w-full sm:w-auto text-center">
              {c.exploreBtn}
            </a>
            <Link href="/candidate" className="w-full sm:w-auto px-6 py-3 rounded-lg border border-primary-foreground/30 font-semibold hover:bg-primary-foreground/10 transition-colors text-center">
              {c.demoBtn}
            </Link>
          </div>

          {/* Stats: stack on very small screens, 3-up from sm onward */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 mt-12 sm:mt-16 max-w-2xl mx-auto">
            {c.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Framework */}
      <section className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2 text-center">{c.frameworkEyebrow}</p>
          <h2 className="section-title text-center mb-4">{c.frameworkTitle}</h2>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">{c.frameworkSubtitle}</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {c.framework.map((item, idx) => (
              <div key={idx} className="bg-card rounded-lg p-5 sm:p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Digital Campaign */}
      <section className="py-12 sm:py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2 text-center">{c.whyEyebrow}</p>
          <h2 className="section-title text-center mb-8 sm:mb-12">{c.whyTitle}</h2>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {c.whyPoints.map((point, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-sm sm:text-base">{point.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-foreground/80 italic border-t border-border pt-6 sm:pt-8 text-sm sm:text-base">{c.whyClosing}</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2 text-center">{c.pricingEyebrow}</p>
          <h2 className="section-title text-center mb-4">{c.pricingTitle}</h2>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">{c.pricingSubtitle}</p>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 items-start">
            {c.tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-card rounded-lg p-5 sm:p-6 border shadow-sm flex flex-col h-full ${
                  tier.badge ? 'border-accent shadow-lg md:-translate-y-2' : 'border-border'
                }`}
              >
                {tier.badge && (
                  <span className="self-start mb-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    {tier.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">{tier.desc}</p>
                <div className="mb-1">
                  <span className="text-2xl sm:text-3xl font-bold">MAD {tier.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">{tier.packageLabel}</p>

                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a href="#pricing" className="cta-button text-center">
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Estimator */}
      <section className="py-12 sm:py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2 text-center">{c.estimatorEyebrow}</p>
          <h2 className="section-title text-center mb-4">{c.estimatorTitle}</h2>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">{c.estimatorSubtitle}</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-7 sm:space-y-8">
              {/* Voter Size */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-sm">{c.voterLabel}</label>
                  <span className="text-accent font-bold">{voterSize.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={5000}
                  value={voterSize}
                  onChange={(e) => setVoterSize(Number(e.target.value))}
                  className="w-full accent-accent h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{c.voterHint}</p>
              </div>

              {/* SMS Waves */}
              <div>
                <label className="font-semibold text-sm block mb-2">{c.smsLabel}</label>
                <div className="space-y-2">
                  {c.smsOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSmsWave(idx)}
                      className={`w-full text-start px-4 py-2.5 sm:py-2 rounded-lg border text-sm transition-colors ${
                        smsWave === idx
                          ? 'bg-accent/10 border-accent text-accent font-semibold'
                          : 'border-border text-foreground/70 hover:bg-accent/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flyers */}
              <div>
                <label className="font-semibold text-sm block mb-2">{c.flyersLabel}</label>
                <div className="space-y-2">
                  {c.flyersOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFlyers(idx)}
                      className={`w-full text-start px-4 py-2.5 sm:py-2 rounded-lg border text-sm transition-colors ${
                        flyers === idx
                          ? 'bg-accent/10 border-accent text-accent font-semibold'
                          : 'border-border text-foreground/70 hover:bg-accent/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Media PR */}
              <div>
                <label className="font-semibold text-sm block mb-2">{c.mediaLabel}</label>
                <div className="space-y-2">
                  {c.mediaOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMediaPR(idx === 0)}
                      className={`w-full text-start px-4 py-2.5 sm:py-2 rounded-lg border text-sm transition-colors ${
                        (idx === 0) === mediaPR
                          ? 'bg-accent/10 border-accent text-accent font-semibold'
                          : 'border-border text-foreground/70 hover:bg-accent/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary — sticky only from md up, stays inline on mobile */}
            <div className="bg-primary text-primary-foreground rounded-lg p-6 sm:p-8 flex flex-col justify-center text-center h-fit md:sticky md:top-24">
              <p className="text-sm text-primary-foreground/70 mb-2">{c.summaryTitle}</p>
              <p className="text-sm font-semibold mb-4">{c.summarySubtitle}</p>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                MAD {total.toLocaleString()}
              </div>
              <p className="text-sm text-primary-foreground/70 mb-6">{c.summaryFooter}</p>
              <p className="text-xs text-primary-foreground/50 mb-6">{c.disclaimer}</p>
              <a href="#pricing" className="cta-button">
                {c.customBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="section-title mb-4">{c.complianceTitle}</h2>
          <p className="text-foreground/70 mb-6 sm:mb-8 text-sm sm:text-base">{c.complianceSubtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {c.complianceItems.map((item, idx) => (
              <span key={idx} className="text-sm font-medium text-accent">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}