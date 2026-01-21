import React from 'react';
import { Star, ArrowRight, BookOpen, Trophy, Music, Briefcase, Award } from 'lucide-react';

// Reusing SmartImage placeholder for consistency 
const SmartImage = ({ src, alt, fallback, className }) => {
  const [error, setError] = React.useState(false);
  if (error) return <div className={`${className} flex items-center justify-center bg-slate-800 text-slate-500`}>{fallback}</div>;
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

// --- WINGS DATA DEFINITION ---
const WINGS = [
  {
    id: 'education',
    title: 'Gatla Education Club',
    subtitle: 'For the Blind',
    description: 'Providing scribes, stipends, and accessible exams for visually impaired students. We organize motivation seminars and provide study materials.',
    imgSrc: "/assets/images/2.png",
    fallbackIcon: <BookOpen className="w-1/2 h-1/2 text-white" />,
    badgeColor: 'bg-green-600',
    ringColor: 'border-green-400',
    accentColor: 'text-green-600',
  },
  {
    id: 'cricket',
    title: 'Gatla Cricket Club',
    subtitle: 'Sports & Recreation',
    description: 'Organizing tournaments from Zonal to International levels to encourage blind sportsmen. Promoting physical fitness and teamwork.',
    imgSrc: "/assets/images/3.png",
    fallbackIcon: <Trophy className="w-1/2 h-1/2 text-white" />,
    badgeColor: 'bg-blue-600',
    ringColor: 'border-blue-400',
    accentColor: 'text-blue-600',
  },
  {
    id: 'music',
    title: 'Gatla Music Club',
    subtitle: 'For the Blind',
    description: 'Conducting singing competitions at various levels to identify and nurture musical talent among the visually impaired.',
    imgSrc: "/assets/images/4.png",
    fallbackIcon: <Music className="w-1/2 h-1/2 text-white" />,
    badgeColor: 'bg-purple-600',
    ringColor: 'border-purple-400',
    accentColor: 'text-purple-600',
  },
  {
    id: 'business',
    title: 'Gatla Business Club',
    subtitle: 'For the Blind',
    description: 'Supporting visually impaired entrepreneurs through seminars, awareness meetings, and networking opportunities.',
    imgSrc: "/assets/images/5.png",
    fallbackIcon: <Briefcase className="w-1/2 h-1/2 text-white" />,
    badgeColor: 'bg-red-600',
    ringColor: 'border-red-400',
    accentColor: 'text-red-600',
  },
  {
    id: 'awards',
    title: 'Gatla Awards',
    subtitle: 'For Unsung Heroes',
    description: 'Honoring exceptional achievements by the differently-abled and unsung heroes with prestigious medals.',
    imgSrc: "/assets/images/6.png",
    fallbackIcon: <Award className="w-1/2 h-1/2 text-white" />,
    badgeColor: 'bg-amber-500',
    ringColor: 'border-amber-200',
    accentColor: 'text-amber-600',
  }
];

const WingCard = ({ wing, onClick }) => (
  <div onClick={onClick} className={`group relative bg-[#0F172A] border border-slate-800 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer`}>
    <div className={`h-1 w-full ${wing.badgeColor}`}></div>
    <div className="p-6 md:p-8 flex flex-col flex-grow items-center text-center">
      <div className={`w-32 h-32 rounded-full ${wing.badgeColor} border-4 ${wing.ringColor} shadow-lg flex items-center justify-center mb-6 overflow-hidden p-3 group-hover:scale-110 transition-transform`}>
        <SmartImage src={wing.imgSrc} alt={wing.title} fallback={wing.fallbackIcon} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{wing.title}</h3>
      <p className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest mb-4">{wing.subtitle}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{wing.description}</p>
      <div className="mt-auto inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white border-b border-transparent hover:border-amber-500 pb-1">
        Visit Page <ArrowRight className="w-3 h-3 ml-2 text-amber-500" />
      </div>
    </div>
  </div>
);

const Projects = ({ onSelectWing }) => {
  return (
    <div className="pt-20 bg-[#050914] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">Our Projects</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">The Five Pillars</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {WINGS.map((wing) => (
            <WingCard key={wing.id} wing={wing} onClick={() => onSelectWing(wing.id)} />
          ))}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-1 rounded-none flex flex-col h-full hover:-translate-y-2 transition-transform cursor-pointer">
            <div className="h-full bg-[#0B1120] p-8 flex flex-col items-center text-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-amber-500 flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Become a Patron</h3>
              <p className="text-slate-300 text-xs mb-6">Join the elite circle of donors supporting this noble cause.</p>
              {/* FIXED: Button now triggers navigation to 'donate' page */}
              <button
                onClick={() => onSelectWing('donate')}
                className="px-6 py-3 bg-white text-[#0B1120] text-xs font-bold uppercase tracking-widest hover:bg-amber-50 transition"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;