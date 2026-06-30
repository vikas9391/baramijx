import { useState } from 'react';

/**
 * Program Page
 * Design: Electoral program with voting system
 * Features: Priority cards, citizen voting, vote counts
 */

interface ProgramPageProps {
  language: 'ar' | 'fr' | 'en';
}

export default function ProgramPage({ language }: ProgramPageProps) {
  const [votes, setVotes] = useState({
    health: 245,
    infrastructure: 198,
    education: 187,
    employment: 154,
  });

  const [userVotes, setUserVotes] = useState<string[]>([]);

  const content = {
    ar: {
      title: 'أولويات برنامجنا الانتخابي لـمراكش المنارة',
      subtitle: 'برنامجنا مبني على تشخيص دقيق للخصاص بالمنطقة، بعيداً عن الوعود المستحيلة وقريباً من الواقع اليومي للساكنة.',
      prioritiesTitle: 'الأولويات الأساسية',
      votingTitle: 'تصويت المواطنين على الأولويات',
      votingSubtitle: 'صوت على الأولويات التي تهمك أكثر',
      priorities: [
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
      votingCards: [
        {
          id: 'health',
          title: 'الصحة',
          description: 'تجهيز عيادة سيدي الزوين بقسم مستعجلات.',
          icon: '🏥',
        },
        {
          id: 'infrastructure',
          title: 'البنية التحتية',
          description: 'تعبيد الطرقات في ايت ايمور واكفاي.',
          icon: '🛣️',
        },
        {
          id: 'education',
          title: 'التعليم',
          description: 'النقل المدرسي المجاني.',
          icon: '🏫',
        },
        {
          id: 'employment',
          title: 'التشغيل',
          description: 'صندوق دعم تعاونيات الشباب اللوجستية.',
          icon: '💼',
        },
      ],
      voteButton: 'صوت على هذه الأولوية',
      voted: 'صوتت بالفعل',
      votes: 'صوت',
    },
    fr: {
      title: 'Priorités de notre programme électoral pour Marrakech-Menara',
      subtitle: 'Notre programme est basé sur un diagnostic précis des lacunes de la région, loin des promesses impossibles et proche de la réalité quotidienne des habitants.',
      prioritiesTitle: 'Priorités Principales',
      votingTitle: 'Vote des Citoyens sur les Priorités',
      votingSubtitle: 'Votez pour les priorités qui vous importent le plus',
      priorities: [
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
      votingCards: [
        {
          id: 'health',
          title: 'Santé',
          description: 'Équiper la clinique de Sidi Zouine d\'une urgence.',
          icon: '🏥',
        },
        {
          id: 'infrastructure',
          title: 'Infrastructure',
          description: 'Paver les routes à Aït Imour et Akfay.',
          icon: '🛣️',
        },
        {
          id: 'education',
          title: 'Éducation',
          description: 'Transport scolaire gratuit.',
          icon: '🏫',
        },
        {
          id: 'employment',
          title: 'Emploi',
          description: 'Fonds de soutien aux coopératives logistiques des jeunes.',
          icon: '💼',
        },
      ],
      voteButton: 'Voter pour cette priorité',
      voted: 'Déjà voté',
      votes: 'votes',
    },
    en: {
      title: 'Electoral Program Priorities for Marrakech-Menara',
      subtitle: 'Our program is based on a precise diagnosis of regional gaps, far from impossible promises and close to the daily reality of residents.',
      prioritiesTitle: 'Main Priorities',
      votingTitle: 'Citizen Voting on Priorities',
      votingSubtitle: 'Vote for the priorities that matter most to you',
      priorities: [
        {
          title: 'Health and Human Dignity',
          description: 'Equip health centers in Sidi Zouine and Oudaïa and improve primary healthcare services quality.',
        },
        {
          title: 'Infrastructure and Territorial Justice',
          description: 'Break the isolation of villages, repair roads, and generalize electrification and drinking water.',
        },
        {
          title: 'Education and Dropout Reduction',
          description: 'Rehabilitate rural primary and secondary schools and provide school transport for girls.',
        },
        {
          title: 'Youth Empowerment and Employment',
          description: 'Create vocational training centers and support local agricultural cooperatives.',
        },
      ],
      votingCards: [
        {
          id: 'health',
          title: 'Health',
          description: 'Equip Sidi Zouine clinic with emergency room.',
          icon: '🏥',
        },
        {
          id: 'infrastructure',
          title: 'Infrastructure',
          description: 'Pave roads in Aït Imour and Akfay.',
          icon: '🛣️',
        },
        {
          id: 'education',
          title: 'Education',
          description: 'Free school transportation.',
          icon: '🏫',
        },
        {
          id: 'employment',
          title: 'Employment',
          description: 'Youth logistics cooperative fund.',
          icon: '💼',
        },
      ],
      voteButton: 'Vote as Priority',
      voted: 'Already Voted',
      votes: 'votes',
    },
  };

  const c = content[language];

  const handleVote = (id: string) => {
    if (!userVotes.includes(id)) {
      setUserVotes([...userVotes, id]);
      setVotes({
        ...votes,
        [id]: votes[id as keyof typeof votes] + 1,
      });
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

      {/* Priorities Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-2">{c.prioritiesTitle}</h2>
          <div className="h-1 bg-accent w-20 mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.priorities.map((priority, idx) => (
              <div key={idx} className="program-card">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {priority.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {priority.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voting Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">{c.votingTitle}</h2>
            <div className="h-1 bg-accent w-20 mx-auto mb-4"></div>
            <p className="section-subtitle">{c.votingSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.votingCards.map((card) => {
              const voteCount = votes[card.id as keyof typeof votes];
              const hasVoted = userVotes.includes(card.id);

              return (
                <div
                  key={card.id}
                  className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    {card.description}
                  </p>

                  <div className="mb-4 p-3 bg-accent/10 rounded-lg">
                    <p className="text-center font-bold text-accent">
                      {voteCount} {c.votes}
                    </p>
                  </div>

                  <button
                    onClick={() => handleVote(card.id)}
                    disabled={hasVoted}
                    className={`w-full py-2 rounded-lg font-semibold transition-all duration-200 ${
                      hasVoted
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'cta-button'
                    }`}
                  >
                    {hasVoted ? c.voted : c.voteButton}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
