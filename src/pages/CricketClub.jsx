// src/pages/CricketClub.jsx
import React, { useState } from 'react';
import { Trophy, CheckCircle2, User, FileText, Gift, ArrowRight, X } from 'lucide-react';
import CricketDonorForm from '../components/pillars/CricketDonorForm';
import CricketUmpireForm from './forms/CricketUmpireForm';

const CricketClub = ({ onNavigate }) => {
  const [activeForm, setActiveForm] = useState(null);
  const accentClass = 'text-blue-500';
  const borderClass = 'border-blue-500/50';

  return (
    <div className="pt-20 pb-16 bg-[#050914] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header and Title */}
        <div className="text-center mb-12 border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 flex items-center justify-center gap-3">
            <img src={`${process.env.PUBLIC_URL}/assets/images/3.png`} alt="Cricket Club Logo" className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            Gatla Cricket Club
          </h1>
          <p className="text-lg font-bold text-blue-500 uppercase tracking-widest">Sports & Recreation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* About The Wing */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className={`${accentClass} font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2`}>
                <Trophy className="w-4 h-4" /> ABOUT THE WING
              </h2>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Promoting Physical Fitness and Teamwork.</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Organizing tournaments from Zonal to International levels to encourage blind sportsmen. Promoting physical fitness and teamwork. The Cricket Club identifies, trains, and supports visually impaired athletes, giving them a platform for competitive excellence and personal growth.
              </p>
            </div>

            {/* Key Activities */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">KEY ACTIVITIES</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Club Matches for Blind Players", icon: CheckCircle2 },
                  { title: "Zone Level Cricket Tournaments", icon: CheckCircle2 },
                  { title: "State Level Championships", icon: CheckCircle2 },
                  { title: "National Level Tournaments", icon: CheckCircle2 },
                  { title: "International Level Cups", icon: CheckCircle2 },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-slate-700 rounded-md hover:border-blue-500/50 transition">
                    <activity.icon className={`w-6 h-6 ${accentClass} mt-1 shrink-0`} />
                    <div>
                      <p className="text-white font-semibold">{activity.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">Fostering competitive spirit.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> {/* End Main Content Column */}

          {/* Sidebar Forms Column */}
          <div className="lg:col-span-1">
            <div className={`bg-[#0F172A] p-6 rounded-lg border ${borderClass} shadow-2xl sticky top-28`}>
              <h4 className="text-lg font-serif font-bold text-white mb-4">Registration Forms</h4>
              <p className="text-slate-400 text-sm mb-6">Select a form below to apply. You will be redirected to the admin contact page.</p>

              <div className="space-y-4">
                {[
                  { name: "Club Member Form", icon: User, target: "cricket-club-member" },
                  { name: "Player Form", icon: User, target: "cricket-player" },
                  { name: "Umpire Form", icon: FileText, target: "cricket-umpire", isLocal: true }, // Set to Local
                  { name: "Volunteer Form", icon: User, target: "volunteer-form" },
                  { name: "Supporter Form", icon: User, target: "cricket-supporter" },
                  { name: "Donor Form", icon: Gift, target: "cricket-donor", isLocal: true },
                ].map((form, index) => (
                  <button
                    key={index}
                    onClick={() => form.isLocal ? setActiveForm(form.target === 'cricket-umpire' ? 'umpire' : 'donor') : onNavigate(form.target)}
                    className={`w-full flex justify-between items-center bg-[#050914] text-slate-300 p-3 rounded-md border border-slate-800 hover:bg-blue-600 hover:text-white transition group`}
                  >
                    <span className="flex items-center gap-3">
                      <form.icon className={`w-5 h-5 ${accentClass} group-hover:text-white transition`} />
                      {form.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                  </button>
                ))}
              </div>
            </div>
          </div> {/* End Sidebar Column */}
        </div>
      </div>

      {/* LOCAL MODAL FOR DONOR FORM */}
      {activeForm === 'donor' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <button onClick={() => setActiveForm(null)} className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
            <CricketDonorForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}

      {/* LOCAL MODAL FOR UMPIRE FORM */}
      {activeForm === 'umpire' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col overflow-y-auto">
            <button onClick={() => setActiveForm(null)} className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
            <CricketUmpireForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}

    </div>
  );
};

export default CricketClub;