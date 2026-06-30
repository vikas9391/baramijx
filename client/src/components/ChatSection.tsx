import { useState } from 'react';

/**
 * ChatSection Component
 * Design: Interactive chat interface with topic-based responses
 * Features: Four main topics (Health, Infrastructure, Education, Arts/Politics)
 */

interface ChatSectionProps {
  language: 'ar' | 'fr' | 'en';
}

export default function ChatSection({ language }: ChatSectionProps) {
  const [activeTopic, setActiveTopic] = useState(0);

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
        {
          label: 'الصحة والكرامة 🏥',
          response: 'الصحة هي أساس التنمية. التزامي هو تجهيز مستوصفات سيدي الزوين والاوداية بأحدث المعدات الطبية، وتقليص مواعيد الانتظار، وضمان الخدمات الطبية الأولية الجيدة لكل مواطن. الكرامة الإنسانية تبدأ بصحة جيدة.',
        },
        {
          label: 'فك العزلة اللوجستيكية 🛣️',
          response: 'العزلة اللوجستيكية هي عائق أمام التنمية. سأعمل على تطوير شبكة الطرقات، تحسين خطوط النقل العمومي، وربط الدواوير بمراكش بسلاسة. كل قرية وحي يستحق الوصول السهل إلى الخدمات الأساسية.',
        },
        {
          label: 'التعليم والحد من الهدر 🏫',
          response: 'التعليم هو مفتاح المستقبل. سأركز على تأهيل المدارس القروية، توفير النقل المدرسي للفتيات، ودعم المعلمين. الهدر المدرسي يجب أن ينتهي، وكل طفل يستحق فرصة تعليمية عادلة.',
        },
        {
          label: 'الشطرنج والمسرح والسياسة 🎭',
          response: 'الفن والرياضة والثقافة جزء من هويتنا. أؤمن بأن السياسة يجب أن تكون قريبة من الناس، وأن الفن والرياضة يعززان الوعي المدني. سأدعم المراكز الثقافية والرياضية المحلية.',
        },
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
        {
          label: 'Santé et Dignité 🏥',
          response: 'La santé est la base du développement. Je m\'engage à équiper les dispensaires de Sidi Zouine et Oudaïa, réduire les délais d\'attente, et garantir des services de santé primaire de qualité pour chaque citoyen. La dignité humaine commence par une bonne santé.',
        },
        {
          label: 'Briser l\'isolement logistique 🛣️',
          response: 'L\'isolement logistique est un obstacle au développement. Je travaillerai à améliorer le réseau routier, les transports publics, et connecter les villages à Marrakech. Chaque communauté mérite l\'accès facile aux services essentiels.',
        },
        {
          label: 'Éducation et Réduction de l\'abandon 🏫',
          response: 'L\'éducation est la clé de l\'avenir. Je me concentrerai sur la réhabilitation des écoles rurales, le transport scolaire pour les filles, et le soutien aux enseignants. Chaque enfant mérite une chance éducative équitable.',
        },
        {
          label: 'Échecs, Théâtre et Politique 🎭',
          response: 'L\'art, le sport et la culture font partie de notre identité. Je crois que la politique doit être proche des gens, et que l\'art et le sport renforcent la conscience civique. Je soutiens les centres culturels et sportifs locaux.',
        },
      ],
    },
    en: {
      title: 'Ask Your Candidate Directly (Smart Interaction)',
      subtitle: 'Click on any topic to hear the direct answer and position of Engineer Abdelmounaim Zouini.',
      chatTitle: 'Interactive Advisor for Candidate Abdelmounaim Zouini',
      liveChat: 'LIVE CHAT',
      greeting: 'Welcome, citizens of Marrakech-Menara district. I am Engineer Abdelmounaim Zouini, at your service. Ask me about my health program, breaking rural isolation, education, or my vision for proximity politics.',
      prompt: 'Click the buttons to ask your questions.',
      reset: 'Reset Conversation',
      topics: [
        {
          label: 'Health and Dignity 🏥',
          response: 'Health is the foundation of development. I commit to equipping health centers in Sidi Zouine and Oudaïa, reducing wait times, and ensuring quality primary healthcare for every citizen. Human dignity begins with good health.',
        },
        {
          label: 'Breaking Logistical Isolation 🛣️',
          response: 'Logistical isolation is an obstacle to development. I will work to improve road networks, public transport, and connect villages to Marrakech. Every community deserves easy access to essential services.',
        },
        {
          label: 'Education and Dropout Reduction 🏫',
          response: 'Education is the key to the future. I will focus on rehabilitating rural schools, school transport for girls, and teacher support. Every child deserves an equal educational opportunity.',
        },
        {
          label: 'Chess, Theater and Politics 🎭',
          response: 'Art, sports, and culture are part of our identity. I believe politics must be close to people, and that art and sports strengthen civic awareness. I support local cultural and sports centers.',
        },
      ],
    },
  };

  const c = content[language];
  const topic = c.topics[activeTopic];

  return (
    <section id="chat" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">{c.title}</h2>
          <div className="h-1 bg-accent w-20 mx-auto mb-6"></div>
          <p className="section-subtitle max-w-2xl mx-auto">{c.subtitle}</p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
            {/* Chat Header */}
            <div className="bg-primary text-primary-foreground p-6">
              <h3 className="text-xl font-bold">{c.chatTitle}</h3>
              <p className="text-sm text-primary-foreground/80 mt-1">{c.liveChat}</p>
            </div>

            {/* Chat Body */}
            <div className="p-8 space-y-6">
              {/* Candidate Message */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <img
                    src="/manus-storage/pml-logo_3ded0a5a.png"
                    alt="Candidate"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold text-foreground">
                    {language === 'ar' ? 'عبد المنعم الزويني:' : language === 'fr' ? 'Abdelmounaim Zouini:' : 'Abdelmounaim Zouini:'}
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed bg-muted/30 p-4 rounded-lg">
                  {topic.response}
                </p>
              </div>

              {/* Initial Greeting (shown first time) */}
              {activeTopic === 0 && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <img
                      src="/manus-storage/pml-logo_3ded0a5a.png"
                      alt="Candidate"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-semibold text-foreground">
                      {language === 'ar' ? 'عبد المنعم الزويني:' : language === 'fr' ? 'Abdelmounaim Zouini:' : 'Abdelmounaim Zouini:'}
                    </span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed bg-muted/30 p-4 rounded-lg">
                    {c.greeting}
                  </p>
                  <p className="text-sm text-muted-foreground italic pt-2">
                    {c.prompt}
                  </p>
                </div>
              )}
            </div>

            {/* Topic Buttons */}
            <div className="bg-muted/50 p-6 border-t border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.topics.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTopic(idx)}
                    className={`p-3 rounded-lg font-semibold transition-all duration-300 text-left ${
                      activeTopic === idx
                        ? 'bg-accent text-accent-foreground shadow-md'
                        : 'bg-card text-foreground border border-border hover:border-accent'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Reset Button */}
              <button
                onClick={() => setActiveTopic(0)}
                className="w-full mt-4 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors duration-200"
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
