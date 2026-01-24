// src/pages/MusicClub.jsx
import React, { useState } from 'react';
import { Music, CheckCircle2, User, FileText, Gift, ArrowRight, Award, X } from 'lucide-react';
import MusicDonorForm from '../components/pillars/MusicDonorForm';
import MusicMemberForm from './forms/MusicMemberForm';

import MusicSingerForm from './forms/MusicSingerForm';
import MusicJudgeForm from './forms/MusicJudgeForm';

const MusicClub = ({ onNavigate }) => {
  const [activeForm, setActiveForm] = useState(null);
  const accentClass = 'text-purple-500';
  const borderClass = 'border-purple-500/50';

  return (
    <div className="pt-20 pb-16 bg-[#050914] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header and Title */}
        <div className="text-center mb-12 border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Music Club</h1>
          <p className="text-lg font-bold text-purple-500 uppercase tracking-widest">For the Blind</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* About The Wing */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className={`${accentClass} font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2`}>
                <Music className="w-4 h-4" /> ABOUT THE WING
              </h2>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Nurturing Musical Talent Among the Visually Impaired.</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Conducting singing competitions at various levels to identify and nurture musical talent among the visually impaired. Music Club events give members confidence and a platform to showcase their artistic abilities to a wider audience.
              </p>
            </div>

            {/* Key Activities */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">KEY ACTIVITIES</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Club Level Singing Competitions", icon: CheckCircle2 },
                  { title: "Zone Level Contests", icon: CheckCircle2 },
                  { title: "State Level Championships", icon: CheckCircle2 },
                  { title: "National Singing Idol", icon: CheckCircle2 },
                  { title: "International Level Competitions", icon: CheckCircle2 },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-slate-700 rounded-md hover:border-purple-500/50 transition">
                    <activity.icon className={`w-6 h-6 ${accentClass} mt-1 shrink-0`} />
                    <div>
                      <p className="text-white font-semibold">{activity.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">Encouraging artistic expression.</p>
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
                  // TARGETS: These IDs trigger the modal via App.jsx's onNavClick function
                  { name: "Member Form", icon: User, target: "music-member", isLocal: true },
                  { name: "Singer Form", icon: FileText, target: "music-singer", isLocal: true },
                  { name: "Judge Form", icon: Award, target: "music-judge" },
                  { name: "Supporter Form", icon: User, target: "music-supporter" }, // Added
                  { name: "Donor Form", icon: Gift, target: "music-donor", isLocal: true },
                ].map((form, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (form.isLocal) {
                        if (form.target === 'music-member') setActiveForm('member');
                        else if (form.target === 'music-singer') setActiveForm('singer');
                        else setActiveForm('donor');
                      } else {
                        onNavigate(form.target);
                      }
                    }}
                    className={`w-full flex justify-between items-center bg-[#050914] text-slate-300 p-3 rounded-md border border-slate-800 hover:bg-purple-600 hover:text-white transition group`}
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
            <MusicDonorForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}

      {/* LOCAL MODAL FOR MEMBER FORM */}
      {activeForm === 'member' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col overflow-y-auto">
            <button onClick={() => setActiveForm(null)} className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
            <MusicMemberForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}

      {/* LOCAL MODAL FOR SINGER FORM */}
      {activeForm === 'singer' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col overflow-y-auto">
            <button onClick={() => setActiveForm(null)} className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
            <MusicSingerForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}

      {/* LOCAL MODAL FOR JUDGE FORM */}
      {activeForm === 'judge' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col overflow-y-auto">
            <button onClick={() => setActiveForm(null)} className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
            <MusicJudgeForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicClub;