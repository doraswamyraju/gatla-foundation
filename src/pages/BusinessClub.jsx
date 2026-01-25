// src/pages/BusinessClub.jsx
import React, { useState } from 'react';
import { Briefcase, CheckCircle2, User, FileText, Gift, ArrowRight, X } from 'lucide-react';
import BusinessDonorForm from '../components/pillars/BusinessDonorForm';
import SupporterForm from './forms/SupporterForm';
import BusinessMemberForm from './forms/BusinessMemberForm';
import BusinessEntrepreneurForm from './forms/BusinessEntrepreneurForm';


const BusinessClub = ({ onNavigate }) => {
  const [activeForm, setActiveForm] = useState(null);
  const color = 'red';
  const accentClass = 'text-red-500';
  const borderClass = 'border-red-500/50';

  return (
    <div className="pt-20 pb-16 bg-[#050914] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header and Title */}
        <div className="text-center mb-12 border-b border-slate-700/50 pb-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 flex items-center justify-center gap-3">
            <img src={`${process.env.PUBLIC_URL}/assets/images/5.png`} alt="Business Club Logo" className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            Gatla Business Club
          </h1>
          <p className="text-lg font-bold text-red-500 uppercase tracking-widest">For the Blind</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* About The Wing */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className={`${accentClass} font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2`}>
                <Briefcase className="w-4 h-4" /> ABOUT THE WING
              </h2>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Fostering Entrepreneurship and Economic Independence.</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Supporting visually impaired entrepreneurs through seminars, awareness meetings, and networking opportunities. The Business Club is dedicated to establishing economic independence for its members.
              </p>
            </div>

            {/* Key Activities */}
            <div className="bg-[#0B1120] p-8 rounded-lg border border-slate-800 shadow-xl">
              <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">KEY ACTIVITIES</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Seminars for Entrepreneurs", icon: CheckCircle2 },
                  { title: "GST Awareness Meetings", icon: CheckCircle2 },
                  { title: "Business Networking Events", icon: CheckCircle2 },
                  { title: "Financial Guidance", icon: CheckCircle2 },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-slate-700 rounded-md hover:border-red-500/50 transition">
                    <activity.icon className={`w-6 h-6 ${accentClass} mt-1 shrink-0`} />
                    <div>
                      <p className="text-white font-semibold">{activity.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">Building strong economic foundations.</p>
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
                  { name: "Club Member Form", icon: User, target: "business-member" },
                  { name: "Entrepreneur Form", icon: FileText, target: "business-entrepreneur" },
                  { name: "Supporter Form", icon: User, target: "business-supporter" }, // Added
                  { name: "Donor Form", icon: Gift, target: "business-donor", isLocal: true },
                ].map((form, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (form.isLocal) setActiveForm('donor');
                      else if (form.target === 'business-supporter') setActiveForm('supporter');
                      else if (form.target === 'business-member') setActiveForm('member');
                      else if (form.target === 'business-entrepreneur') setActiveForm('entrepreneur');
                      else onNavigate(form.target);
                    }}
                    className={`w-full flex justify-between items-center bg-[#050914] text-slate-300 p-3 rounded-md border border-slate-800 hover:bg-red-600 hover:text-white transition group`}
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
            <button
              onClick={() => setActiveForm(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <BusinessDonorForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}
      {/* LOCAL MODAL FOR MEMBER FORM */}
      {activeForm === 'member' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col overflow-y-auto">
            <button onClick={() => setActiveForm(null)} className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
            <BusinessMemberForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}
      {/* LOCAL MODAL FOR ENTREPRENEUR FORM */}
      {activeForm === 'entrepreneur' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col overflow-y-auto">
            <button onClick={() => setActiveForm(null)} className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
            <BusinessEntrepreneurForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}

      {/* LOCAL MODAL FOR SUPPORTER FORM */}
      {activeForm === 'supporter' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <button
              onClick={() => setActiveForm(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <SupporterForm onClose={() => setActiveForm(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessClub;