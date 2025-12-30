// src/dashboard/components/Sidebar.jsx

import React, { useState } from 'react';
import { 
    LayoutDashboard, 
    Trophy, 
    BookOpen, 
    Music, 
    Briefcase, 
    Award, 
    LogOut,
    ChevronDown,
    ChevronUp,
    PenTool
} from 'lucide-react';

const SidebarGroup = ({ title, icon, id, forms, activeTab, setActiveTab, isOpen, toggleOpen }) => {
  return (
    <div className="mb-2">
      <button 
        onClick={() => toggleOpen(id)}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:text-white hover:bg-slate-800 ${isOpen ? 'text-white' : 'text-slate-400'}`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isOpen && (
        <div className="bg-slate-900/50 py-1">
          {forms.map(form => (
            <button
              key={form.id}
              onClick={() => setActiveTab(form.id)}
              className={`w-full text-left pl-12 pr-4 py-2 text-xs transition-colors ${
                activeTab === form.id 
                  ? 'text-amber-500 font-bold border-r-2 border-amber-500 bg-slate-800' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {form.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen, onLogout }) => {
  // RULE: Start with all groups closed so Overview stands out
  const [openGroups, setOpenGroups] = useState({
    cricket: false,
    education: false,
    music: false,
    business: false,
    awards: false
  });

  const toggleGroup = (group) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const navStructure = [
    {
      id: 'education',
      title: 'Education Club',
      icon: <BookOpen className="w-5 h-5 text-green-400" />,
      forms: [
        { id: 'education-student', label: 'Student Form' },
        { id: 'education-scriber', label: 'Scriber Form' },
        { id: 'education-volunteer', label: 'Volunteer Form' }, 
        { id: 'education-donor', label: 'Donor Form' }, 
      ]
    },
    {
      id: 'cricket',
      title: 'Cricket Club',
      icon: <Trophy className="w-5 h-5 text-blue-400" />,
      forms: [
        { id: 'cricket-club-member', label: 'Club Member Form' },
        { id: 'cricket-player', label: 'Player Form' },
        { id: 'cricket-umpire', label: 'Umpire (Empire) Form' },
        { id: 'volunteer-form', label: 'Volunteer Form' },
        { id: 'supporter-form', label: 'Supporter Form' },
        { id: 'cricket-donor', label: 'Donor Form' },
      ]
    },
    {
      id: 'music',
      title: 'Music Club',
      icon: <Music className="w-5 h-5 text-purple-400" />,
      forms: [
        { id: 'music-member', label: 'Member Form' },
        { id: 'music-singer', label: 'Singer Form' },
        { id: 'music-judge', label: 'Judge Form' },
        { id: 'supporter-form', label: 'Supporter Form' },
        { id: 'music-donor', label: 'Donor Form' },
      ]
    },
    {
      id: 'business',
      title: 'Business Club',
      icon: <Briefcase className="w-5 h-5 text-red-400" />,
      forms: [
        { id: 'business-member', label: 'Club Member Form' },
        { id: 'business-entrepreneur', label: 'Entrepreneur Form' },
        { id: 'business-donor', label: 'Donor Form' },
      ]
    },
    {
      id: 'awards',
      title: 'Awards',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      forms: [
        { id: 'awards-nomination', label: 'Nomination Form' },
        { id: 'awards-sponsor', label: 'Sponsor Form' },
      ]
    }
  ];

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setMobileOpen(false)}></div>
      )}

      <aside className={`fixed top-0 left-0 z-30 h-screen w-64 bg-[#0B1120] border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} overflow-hidden flex flex-col shadow-2xl`}>
        <div className="flex items-center gap-3 p-6 border-b border-slate-800 shrink-0">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-[#0B1120] text-xl">GF</div>
          <div>
            <h1 className="text-white font-bold font-serif leading-none uppercase">Gatla</h1>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-1 font-bold">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {/* DASHBOARD OVERVIEW BUTTON - Visual Sync Fix */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-4 mb-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              activeTab === 'dashboard' 
                ? 'bg-amber-500 text-[#0B1120] shadow-lg shadow-amber-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard Overview
          </button>

          <button
            onClick={() => setActiveTab('blog-manager')}
            className={`w-full flex items-center gap-3 px-4 py-4 mb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              activeTab === 'blog-manager' 
                ? 'bg-amber-500 text-[#0B1120] shadow-lg shadow-amber-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PenTool className="w-5 h-5" />
            Blog Manager
          </button>

          <div className="px-6 mt-6 mb-4 text-[10px] font-black uppercase text-slate-600 tracking-[0.25em]">Management Modules</div>

          {navStructure.map(group => (
            <SidebarGroup
              key={group.id}
              {...group}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isOpen={openGroups[group.id]}
              toggleOpen={toggleGroup}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 shrink-0">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout Session
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;