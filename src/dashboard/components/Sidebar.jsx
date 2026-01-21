import React, { useState } from 'react';
import {
  LayoutDashboard, Users, DollarSign, Trophy, BookOpen,
  Music, Briefcase, Award, PenTool, LogOut, ChevronUp, ChevronDown
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
              className={`w-full text-left pl-12 pr-4 py-2 text-xs transition-colors ${activeTab === form.id
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
  // All groups are FALSE (closed) by default
  const [openGroups, setOpenGroups] = useState({
    general: false,
    cricket: false,
    education: false,
    music: false,
    business: false,
    awards: false,
    finance: false
  });

  const toggleGroup = (group) => setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));

  // UPDATED STRUCTURE: Preserved Finance/General, Reordered & Renamed Clubs
  const navStructure = [
    // 1. Admin / General Modules (Kept at top for standard access)
    {
      id: 'finance',
      title: 'Donations',
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      forms: [{ id: 'donations-list', label: 'All Donations' }]
    },
    {
      id: 'general',
      title: 'General',
      icon: <Users className="w-5 h-5 text-slate-200" />,
      forms: [{ id: 'volunteer-form', label: 'Volunteer Applications' }]
    },

    // 2. Gatla Education Club
    {
      id: 'education',
      title: 'Gatla Education Club',
      icon: <BookOpen className="w-5 h-5 text-green-400" />,
      forms: [
        { id: 'education-student', label: 'Student Form' },
        { id: 'education-scriber', label: 'Scriber Form' },
        { id: 'education-volunteer', label: 'Volunteer Form' }, // Added
        { id: 'education-donor', label: 'Donor Form' }
      ]
    },

    // 3. Gatla Cricket Club
    {
      id: 'cricket',
      title: 'Gatla Cricket Club',
      icon: <Trophy className="w-5 h-5 text-blue-400" />,
      forms: [
        { id: 'cricket-club-member', label: 'Club Member Form' },
        { id: 'cricket-player', label: 'Player Form' },
        { id: 'cricket-umpire', label: 'Umpire Form' },
        { id: 'cricket-volunteer', label: 'Volunteer Form' }, // Added
        { id: 'cricket-supporter', label: 'Supporter Form' }, // Added
        { id: 'cricket-donor', label: 'Donor Form' }          // Added
      ]
    },

    // 4. Gatla Music Club
    {
      id: 'music',
      title: 'Gatla Music Club',
      icon: <Music className="w-5 h-5 text-purple-400" />,
      forms: [
        { id: 'music-member', label: 'Member Form' },
        { id: 'music-singer', label: 'Singer Form' },
        { id: 'music-judge', label: 'Judge Form' },
        { id: 'music-supporter', label: 'Supporter Form' }, // Added
        { id: 'music-stipend', label: 'Stipend Form' },    // Added
        { id: 'music-donor', label: 'Donor Form' }          // Added
      ]
    },

    // 5. Gatla Business Club
    {
      id: 'business',
      title: 'Gatla Business Club',
      icon: <Briefcase className="w-5 h-5 text-red-400" />,
      forms: [
        { id: 'business-member', label: 'Club Member Form' },
        { id: 'business-entrepreneur', label: 'Entrepreneur Form' },
        { id: 'business-supporter', label: 'Supporter Form' }, // Added
        { id: 'business-donor', label: 'Donor Form' }          // Added
      ]
    },

    // 6. Gatla Awards
    {
      id: 'awards',
      title: 'Gatla Awards',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      forms: [
        { id: 'awards-nomination', label: 'Nomination Form' },
        { id: 'awards-sponsor', label: 'Sponsor Form' }
      ]
    }
  ];

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setMobileOpen(false)}></div>}
      <aside className={`fixed top-0 left-0 z-30 h-screen w-64 bg-[#0B1120] border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} overflow-hidden flex flex-col shadow-2xl`}>
        <div className="flex items-center gap-3 p-6 border-b border-slate-800 shrink-0">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-[#0B1120] text-xl">GF</div>
          <div><h1 className="text-white font-bold font-serif leading-none">GATLA</h1><p className="text-slate-500 text-[10px] uppercase tracking-wider">Admin Panel</p></div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 mb-4 text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-amber-500 text-[#0B1120]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><LayoutDashboard className="w-5 h-5" />Dashboard Overview</button>
          <button onClick={() => setActiveTab('blog-manager')} className={`w-full flex items-center gap-3 px-4 py-3 mb-4 text-sm font-medium transition-colors ${activeTab === 'blog-manager' ? 'bg-amber-500 text-[#0B1120]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><PenTool className="w-5 h-5" />Blog Manager</button>
          <div className="px-4 mb-2 text-[10px] font-bold uppercase text-slate-600 tracking-wider">Management Modules</div>
          {navStructure.map(group => <SidebarGroup key={group.id} {...group} activeTab={activeTab} setActiveTab={setActiveTab} isOpen={openGroups[group.id]} toggleOpen={toggleGroup} />)}
        </nav>
        <div className="p-4 border-t border-slate-800 shrink-0"><button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"><LogOut className="w-5 h-5" />Logout</button></div>
      </aside>
    </>
  );
};

export default Sidebar;