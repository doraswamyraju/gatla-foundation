import React, { useState } from 'react';
import { Menu, X, Star } from 'lucide-react';

// Utility component for the Logo
const FoundationLogo = ({ className = "w-16 h-16" }) => {
    // CRITICAL FIX: Use PUBLIC_URL to ensure paths work correctly 
    // when running on localhost:3000 (Development) and when built to /gatla-foundation/ (Production)
    const logoPath = process.env.PUBLIC_URL + "/assets/images/1.png";

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Image source is now correctly constructed, using the path prefix */}
            <img src={logoPath} alt="Gatla Foundation" className="w-full h-full object-contain" />
        </div>
    );
};

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const mainLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
  ];

  const secondaryLinks = ['Events', 'Awards', 'Gallery', 'Contact']; // Links that follow Projects

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#0B1120] border-b border-amber-500/20 sticky top-0 z-50 backdrop-blur-xl bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 md:h-24">
          
          {/* --- LEFT SECTION: Logo and Name (Always visible in header) --- */}
          <div className="flex items-center gap-3 md:gap-4 cursor-pointer flex-shrink-0" onClick={() => handleNavClick('home')}>
             <FoundationLogo className="w-12 h-12 md:w-16 md:h-16" />
             <div className="hidden sm:block"> {/* Show name starting from small screens up */}
               <h1 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide leading-none">
                 GATLA <span className="text-amber-400">FOUNDATION</span>
               </h1>
               <p className="text-[9px] md:text-[10px] text-amber-200/60 tracking-[0.3em] uppercase mt-1">Excellence in Service • Tirupati</p>
             </div>
             {/* Show only name/logo for small screens in the fixed header bar */}
             <div className="sm:hidden">
                <h1 className="text-xl font-serif font-bold text-white tracking-wide leading-none">
                    GATLA <span className="text-amber-400">FOUNDATION</span>
                </h1>
             </div>
          </div>
          
          {/* --- RIGHT SECTION: Desktop Links (Hidden on mobile) --- */}
          <div className="hidden xl:flex items-center gap-8">
            <div className="flex gap-6">
              {[...mainLinks, ...secondaryLinks.map(name => ({name, id: name.toLowerCase()}))].map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => handleNavClick(link.id)}
                  className="text-xs uppercase tracking-widest text-slate-300 hover:text-amber-400 transition-colors font-medium relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            <div className="flex gap-4 items-center border-l border-slate-700 pl-6 ml-2">
              <button onClick={() => handleNavClick('volunteer')} className="px-4 py-2 border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition-all uppercase tracking-widest text-[10px] font-bold rounded-sm">
                Volunteer
              </button>
              <button onClick={() => handleNavClick('donate')} className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B1120] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all uppercase tracking-widest text-[10px] font-bold rounded-sm shadow-lg">
                Donate
              </button>
            </div>
          </div>

          {/* --- RIGHT SECTION: Mobile Toggle Button --- */}
          <div className="flex items-center xl:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-amber-400 hover:bg-slate-800 rounded-md">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU (Dropdown) --- */}
      {isOpen && (
        <div className="xl:hidden bg-[#0B1120] border-b border-amber-500/20 absolute w-full left-0 top-20 shadow-2xl overflow-y-auto max-h-[80vh] p-4 space-y-1">
          {/* Mobile Main Links */}
          {[...mainLinks.map(l => l.name), ...secondaryLinks].map((item) => (
            <button 
              key={item} 
              onClick={() => handleNavClick(item.toLowerCase())} 
              className="block w-full text-left px-4 py-3 text-slate-300 hover:text-amber-400 border-l-2 border-transparent hover:border-amber-400 transition-all"
            >
              {item}
            </button>
          ))}
          
          {/* Action Buttons (Volunteer & Donate) */}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-800 mt-4">
              <button onClick={() => handleNavClick('volunteer')} className="w-full text-center px-4 py-3 border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition-all uppercase tracking-widest text-sm font-bold rounded-md">
                Volunteer
              </button>
              <button onClick={() => handleNavClick('donate')} className="w-full text-center px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B1120] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all uppercase tracking-widest text-sm font-bold rounded-md shadow-lg">
                Donate
              </button>
          </div>
          
          {/* Admin Dashboard */}
          <button onClick={() => handleNavClick('dashboard')} className="block w-full text-left px-4 py-3 text-slate-500 hover:text-white border-l-2 border-transparent hover:border-slate-500 transition-all mt-4 border-t border-slate-800 pt-4">
             Admin Dashboard
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;