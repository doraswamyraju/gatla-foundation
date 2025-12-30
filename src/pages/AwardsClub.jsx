// src/pages/AwardsClub.jsx
import React from 'react';
import { Award, CheckCircle2, User, FileText, Gift, ArrowRight } from 'lucide-react';

const AwardsClub = ({ onNavigate }) => {
  const color = 'amber';
  const accentClass = 'text-amber-500';
  const borderClass = 'border-amber-500/50';
  const hoverClass = 'hover:bg-amber-600'; // Define a class for the hover background effect

  return (
    <div className="pt-20 pb-16 bg-[#050914] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Title */}
        <div className="text-center mb-12 border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Awards Club</h1>
          <p className="text-lg font-bold text-amber-500 uppercase tracking-widest">For Unsung Heroes</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About The Wing */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className={`${accentClass} font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2`}>
                <Award className="w-4 h-4" /> ABOUT THE WING
              </h2>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Honoring Exceptional Achievements by the Differently-Abled.</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                The Awards Club is dedicated to identifying and honoring truly deserving individuals—both visually impaired individuals who overcome great challenges, and the unsung heroes and organizations who tirelessly support them. We believe recognition is a powerful tool for inspiration and social change.
              </p>
            </div>

            {/* Key Activities */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">AWARDING PROCESS</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Nomination Process & Screening", icon: CheckCircle2, desc: "Receiving and vetting nominations from the public and internal teams." },
                  { title: "Jury Evaluation & Selection", icon: CheckCircle2, desc: "A panel of experts reviews candidates based on impact and service." },
                  { title: "Annual Award Ceremony", icon: CheckCircle2, desc: "High-profile event celebrating winners and their contributions." },
                  { title: "Post-Award Mentorship", icon: CheckCircle2, desc: "Supporting winners to amplify their future impact and success." },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-slate-700 rounded-md hover:border-amber-500/50 transition">
                    <activity.icon className={`w-6 h-6 ${accentClass} mt-1 shrink-0`} />
                    <div>
                      <p className="text-white font-semibold">{activity.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{activity.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div> {/* End Main Content Column */}

          {/* Sidebar Forms Column */}
          <div className="lg:col-span-1">
            <div className={`bg-[#0F172A] p-6 rounded-lg border ${borderClass} shadow-2xl sticky top-28`}>
              <h4 className="text-lg font-serif font-bold text-white mb-4">Nomination & Sponsorship</h4>
              <p className="text-slate-400 text-sm mb-6">Nominate an individual or become a sponsor for our annual ceremony.</p>

              <div className="space-y-4">
                {[
                  { name: "Nomination Form", icon: User, target: "nomination_form" },
                  { name: "Sponsor Form", icon: FileText, target: "sponsor_form" },
                  { name: "Event Donor Form", icon: Gift, target: "donate" },
                ].map((form, index) => (
                  <button 
                    key={index}
                    onClick={() => onNavigate(form.target)}
                    className={`w-full flex justify-between items-center bg-[#050914] text-slate-300 p-3 rounded-md border border-slate-800 ${hoverClass} hover:text-[#0B1120] transition group`}
                  >
                    <span className="flex items-center gap-3">
                      <form.icon className={`w-5 h-5 ${accentClass} group-hover:text-[#0B1120] transition`} />
                      {form.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#0B1120] transition" />
                  </button>
                ))}
              </div>
            </div>
          </div> {/* End Sidebar Column */}

        </div>
      </div>
    </div>
  );
};

export default AwardsClub;