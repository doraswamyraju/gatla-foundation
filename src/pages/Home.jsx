import React, { useState } from 'react';
import { Star, Users, Calendar, Award, Globe, ArrowRight, Trophy, CheckCircle2 } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';

// Utility component for the Image Wheel
const ImageWheel = ({ onNavigate }) => {

  const imageBasePath = process.env.PUBLIC_URL + "/assets/images/";

  const images = [
    // Central logo: kept at w-40 h-40
    { id: 'about', src: imageBasePath + "1.png", size: "w-40 h-40", position: "center" },
    // Spoke logos mapped to routes
    { id: 'education', src: imageBasePath + "2.png", size: "w-24 h-24", angle: 0 },
    { id: 'cricket', src: imageBasePath + "3.png", size: "w-24 h-24", angle: 72 },
    { id: 'music', src: imageBasePath + "4.png", size: "w-24 h-24", angle: 144 },
    { id: 'business', src: imageBasePath + "5.png", size: "w-24 h-24", angle: 216 },
    { id: 'awards', src: imageBasePath + "6.png", size: "w-24 h-24", angle: 288 },
  ];

  // UPDATED: Radius increased to 175 to accommodate larger spokes
  const radius = 175;

  return (
    // UPDATED: Increased container size to fit new radius
    <div className="relative w-[26rem] h-[26rem] flex items-center justify-center animate-spin-slow-reverse"> {/* Added slow spin container if desired, or keep static */}
      {/* Central Logo (1.png) */}
      <div
        onClick={() => onNavigate('about')}
        className={`absolute ${images[0].size} border-2 border-amber-500 rounded-full flex items-center justify-center z-10 p-2 bg-[#0B1120] 
                   shadow-2xl shadow-amber-500/50 
                   hover:shadow-amber-500/80 hover:scale-105 transition-all duration-500 cursor-pointer`}
      >
        <img src={images[0].src} alt="Gatla Foundation Logo" className="w-full h-full object-contain" />
      </div>

      {/* Spokes (2.png to 6.png) */}
      {images.slice(1).map((img) => {
        // Calculate X and Y positions using trigonometry
        const x = radius * Math.cos((img.angle - 90) * (Math.PI / 180));
        const y = radius * Math.sin((img.angle - 90) * (Math.PI / 180));

        return (
          <div
            key={img.id}
            onClick={() => onNavigate(img.id)}
            // UPDATED: Added hover:border-amber-500 and hover:shadow-amber-500/50
            className={`absolute ${img.size} rounded-full border-2 border-slate-700 p-2 bg-[#050914] shadow-lg flex items-center justify-center 
                       transition-all duration-300 hover:scale-110 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer group`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <img src={img.src} alt={`Pillar ${img.id}`} className="w-full h-full object-cover rounded-full group-hover:rotate-12 transition-transform duration-500" />
          </div>
        );
      })}
    </div>
  );
};


const Hero = ({ onNavigate, onSelectWing }) => (
  <div id="home" className="relative bg-[#050914] min-h-[80vh] flex items-center overflow-hidden">
    {/* Animated Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-l from-[#0B1120] via-[#0B1120]/90 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-[#050914] to-[#050914] animate-pulse-slow"></div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1]">
            Vision Beyond <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 animate-gradient-x">Sight</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-amber-500/30 pl-4">
            The Gatla Foundation Tirupati represents the pinnacle of service, orchestrating a brighter future for the visually impaired through five pillars of excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button onClick={() => onNavigate('volunteer')} className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B1120] font-bold text-xs uppercase tracking-widest hover:from-amber-400 hover:to-amber-500 transition shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 duration-300">
              Join The Mission
            </button>
            <button onClick={() => onNavigate('about')} className="px-8 py-3 bg-transparent border border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-widest hover:border-amber-500/50 hover:text-white transition hover:scale-105 duration-300">
              View Heritage
            </button>
          </div>
        </div>

        {/* New Image Wheel Implementation */}
        <div className="relative mt-12 md:mt-0 flex justify-center py-10 md:py-20">
          {/* Pass onSelectWing to ImageWheel so it can navigate to pillars */}
          <ImageWheel onNavigate={onSelectWing} />
        </div>
      </div>
    </div>
  </div>
);

// Utility component to display number with 'start from 1' effect (simple implementation)
const AnimatedNumber = ({ value }) => {
  // Simple logic to show a leading '1' effect if the number is large
  const displayValue = value.replace('+', '').replace('k', '000').replace(',', '');

  // We will just display the original value with plus sign for simplicity, 
  // as the "start from 1" effect is tricky without state/animation logic
  return (
    <h4 className="text-3xl font-serif font-bold text-[#0B1120] mb-1">
      <span className="tabular-nums">{value.replace('+', '')}</span>+
    </h4>
  );
};

const ImpactSection = () => (
  <section className="bg-amber-500 py-12 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Lives Impacted", value: "35k+", icon: <Users className="w-5 h-5" /> },
          { label: "Events", value: "120+", icon: <Calendar className="w-5 h-5" /> },
          { label: "Awards", value: "221+", icon: <Award className="w-5 h-5" /> },
          { label: "World Records", value: "33+", icon: <Globe className="w-5 h-5" /> }
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="p-3 bg-amber-600/30 rounded-full mb-3 text-[#0B1120]">{stat.icon}</div>
            <AnimatedNumber value={stat.value} />
            <p className="text-[#0B1120] font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);



const Home = ({ onNavigate, onSelectWing }) => {
  return (
    <>
      <FadeInSection>
        <Hero onNavigate={onNavigate} onSelectWing={onSelectWing} />
      </FadeInSection>
      <FadeInSection delay={200}>
        <ImpactSection />
      </FadeInSection>
    </>
  );
};

export default Home;