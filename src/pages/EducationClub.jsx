// src/pages/EducationClub.jsx - FINAL VERSION WITH ADMIN ID CONSISTENCY

import React from 'react';
import { BookOpen, CheckCircle2, User, FileText, Gift, ArrowRight, HeartHandshake, DollarSign } from 'lucide-react';

const EducationClub = ({ onNavigate }) => {
  return (
    <div className="pt-20 pb-16 bg-[#050914] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Title */}
        <div className="text-center mb-12 border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Education Club</h1>
          <p className="text-lg font-bold text-green-500 uppercase tracking-widest">For the Blind</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About The Wing */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className="text-green-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> ABOUT THE WING
              </h2>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Dedicated to Empowering the Visually Impaired.</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Providing scribes, stipends, and accessible exams for visually impaired students. We organize motivation seminars and provide study materials. The Education Club is dedicated to empowering the visually impaired community through structured programs, events, and support systems.
              </p>
            </div>

            {/* Key Activities */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">KEY ACTIVITIES</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Motivation Seminars for Visually Impaired", icon: CheckCircle2 },
                  { title: "Providing Scribes for Exams", icon: CheckCircle2 },
                  { title: "Stipends for Students & Sports Players", icon: CheckCircle2 },
                  { title: "Study Material Distribution", icon: CheckCircle2 },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-slate-700 rounded-md hover:border-green-500/50 transition">
                    <activity.icon className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-white font-semibold">{activity.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">Ensuring full accessibility.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div> {/* End Main Content Column */}

          {/* Sidebar Forms Column */}
          <div className="lg:col-span-1">
            <div className="bg-[#0F172A] p-6 rounded-lg border border-green-500/50 shadow-2xl sticky top-28">
              <h4 className="text-lg font-serif font-bold text-white mb-4">Registration Forms</h4>
              <p className="text-slate-400 text-sm mb-6">Select a form below to apply. You will be redirected to the admin contact page.</p>

              <div className="space-y-4">
                {[
                  // CRITICAL: Using Admin Sidebar IDs for structural consistency
                  { name: "Student Form", icon: User, target: "education-student" },
                  { name: "Scribe Form", icon: FileText, target: "education-scriber" },
                  { name: "Volunteer Form", icon: HeartHandshake, target: "education-volunteer" },
                  { name: "Donor Form", icon: DollarSign, target: "education-donor" },
                ].map((form, index) => (
                  <button 
                    key={index}
                    onClick={() => onNavigate(form.target)}
                    className="w-full flex justify-between items-center bg-[#050914] text-slate-300 p-3 rounded-md border border-slate-800 hover:bg-green-600 hover:text-white transition group"
                  >
                    <span className="flex items-center gap-3">
                      <form.icon className="w-5 h-5 text-green-500 group-hover:text-white transition" />
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
    </div>
  );
};

export default EducationClub;