import React, { useState } from 'react';
import { BookOpen, PenTool, X } from 'lucide-react';

// --- IMPORT THE CORRECT PUBLIC (DARK MODE) FORMS ---
// Make sure these paths point to 'components/pillars', NOT 'pages/forms'
import EducationStudentForm from '../components/pillars/EducationStudentForm';
import EducationScriberForm from '../components/pillars/EducationScriberForm'; 

const EducationClub = () => {
  const [activeForm, setActiveForm] = useState(null); // 'student' or 'scribe'

  return (
    <div className="min-h-screen bg-[#0B1120] text-white font-sans selection:bg-green-500/30">
      
      {/* 1. HERO SECTION */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
            <BookOpen className="w-3 h-3" /> Gatla Foundation Education
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Visually Impaired</span> Students
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We bridge the gap between capability and opportunity by providing scribes, digital tools, and scholarships.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveForm('student')}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Join as Student
            </button>
            <button 
              onClick={() => setActiveForm('scribe')}
              className="px-8 py-4 bg-[#1A2333] hover:bg-[#232D3F] text-white border border-slate-700 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <PenTool className="w-5 h-5" />
              Volunteer as Scribe
            </button>
          </div>
        </div>
      </div>

      {/* 2. MODAL FORMS (The Critical Part) */}
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
              {activeForm === 'student' && (
                <EducationStudentForm onClose={() => setActiveForm(null)} />
              )}
              {activeForm === 'scribe' && (
                <EducationScriberForm onClose={() => setActiveForm(null)} />
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EducationClub;