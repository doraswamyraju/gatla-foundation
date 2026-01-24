import React, { useState } from 'react';
import { BookOpen, PenTool, CheckCircle2, X, ArrowRight, Heart, Users } from 'lucide-react';

// --- IMPORT THE CORRECT PUBLIC (DARK MODE) FORMS ---
import EducationStudentForm from '../components/pillars/EducationStudentForm';
import EducationScriberForm from '../components/pillars/EducationScriberForm';
import EducationVolunteerForm from '../components/pillars/EducationVolunteerForm'; // Ensure this exists
import EducationDonorForm from '../components/pillars/EducationDonorForm'; // Ensure this exists
import SupporterForm from './forms/SupporterForm'; // Import Supporter Form


const EducationClub = () => {
  const [activeForm, setActiveForm] = useState(null);

  const activities = [
    { title: "Scribes for Exams", desc: "Providing volunteers to write exams for visually impaired students." },
    { title: "Digital Literacy", desc: "Training students in using screen readers and assistive technology." },
    { title: "Scholarship Support", desc: "Financial aid for meritorious visually impaired students." },
    { title: "Accessible Material", desc: "Converting textbooks into audio and braille formats." }
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white font-sans selection:bg-green-500/30">

      {/* 1. HERO HEADER */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
            <BookOpen className="w-3 h-3" /> Gatla Foundation Education
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Gatla Education Club</h1>
          <p className="text-xl text-green-500 font-medium uppercase tracking-widest mb-8">Empowering Knowledge</p>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT COLUMN: About & Activities */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-green-500" />
                <h3 className="text-sm font-bold text-green-500 uppercase tracking-widest">About The Wing</h3>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Bridging the Gap Through Education.</h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                The Education Club is dedicated to ensuring that visually impaired students have equal access to academic opportunities. We connect students with scribes, provide accessible learning materials, and offer mentorship programs to help them achieve their career goals.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Key Activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activities.map((item, index) => (
                  <div key={index} className="bg-[#111827] border border-slate-800 p-6 rounded-xl hover:border-green-500/30 transition-colors group">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg text-white mb-2 group-hover:text-green-400 transition-colors">{item.title}</h4>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Registration Forms */}
          <div className="lg:col-span-1">
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 sticky top-24 shadow-2xl shadow-black/50">
              <h3 className="text-xl font-bold text-white mb-2">Registration Forms</h3>
              <p className="text-slate-400 text-sm mb-8">Select a form below to apply or volunteer.</p>

              <div className="space-y-4">
                {/* Student Form Button */}
                <button
                  onClick={() => setActiveForm('student')}
                  className="w-full group flex items-center justify-between p-4 bg-[#0B1120] border border-slate-800 hover:border-green-500/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-900/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-white font-bold group-hover:text-green-400 transition-colors">Student Form</span>
                      <span className="text-xs text-slate-500">For Visually Impaired</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Scribe Form Button */}
                <button
                  onClick={() => setActiveForm('scribe')}
                  className="w-full group flex items-center justify-between p-4 bg-[#0B1120] border border-slate-800 hover:border-blue-500/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <PenTool className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-white font-bold group-hover:text-blue-400 transition-colors">Scribe Form</span>
                      <span className="text-xs text-slate-500">Volunteer to Write</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Volunteer Form Button (NEW) */}
                <button
                  onClick={() => setActiveForm('volunteer')}
                  className="w-full group flex items-center justify-between p-4 bg-[#0B1120] border border-slate-800 hover:border-purple-500/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-white font-bold group-hover:text-purple-400 transition-colors">Volunteer Form</span>
                      <span className="text-xs text-slate-500">Join the Cause</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Supporter Form Button (NEW) */}
                <button
                  onClick={() => setActiveForm('supporter')}
                  className="w-full group flex items-center justify-between p-4 bg-[#0B1120] border border-slate-800 hover:border-pink-500/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-900/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-white font-bold group-hover:text-pink-400 transition-colors">Supporter Form</span>
                      <span className="text-xs text-slate-500">Become a Patron</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Donor Form Button (NEW) */}
                <button
                  onClick={() => setActiveForm('donor')}
                  className="w-full group flex items-center justify-between p-4 bg-[#0B1120] border border-slate-800 hover:border-amber-500/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-white font-bold group-hover:text-amber-400 transition-colors">Donor Form</span>
                      <span className="text-xs text-slate-500">Support Financially</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Need Help?</p>
                <p className="text-white font-bold">education@gatlafoundation.org</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. MODAL FORMS (Logic Layer) */}
      {activeForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

            {/* Close Button */}
            <button
              onClick={() => setActiveForm(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Render the Correct Form based on State */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activeForm === 'student' && <EducationStudentForm onClose={() => setActiveForm(null)} />}
              {activeForm === 'scribe' && <EducationScriberForm onClose={() => setActiveForm(null)} />}
              {activeForm === 'volunteer' && <EducationVolunteerForm onClose={() => setActiveForm(null)} />}
              {activeForm === 'donor' && <EducationDonorForm onClose={() => setActiveForm(null)} />}
              {activeForm === 'supporter' && <SupporterForm onClose={() => setActiveForm(null)} />}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EducationClub;