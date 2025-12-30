import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  // CRITICAL FIX: Use PUBLIC_URL for the logo path
  const logoPath = process.env.PUBLIC_URL + "/assets/images/1.jpg";

  return (
    <footer id="contact" className="bg-[#02040a] text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 text-sm">
           <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                 {/* Logo path updated */}
                 <img src={logoPath} alt="Gatla Foundation" className="w-10 h-10" /> 
                 <div>
                    <h4 className="text-white font-serif text-lg tracking-wide">GATLA FOUNDATION</h4>
                    <p className="text-[10px] uppercase tracking-widest text-slate-600">Established 2005</p>
                 </div>
              </div>
              <p className="max-w-xs text-slate-500 mb-6">Empowering the visually impaired through education, sports, music, and entrepreneurship.</p>
              <div className="flex gap-4">
                 {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(social => (
                    <a key={social} href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-[#0B1120] transition-colors">
                       <span className="sr-only">{social}</span>
                       <Globe className="w-4 h-4" />
                    </a>
                 ))}
              </div>
           </div>
           
           <div>
              <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h5>
              <div className="space-y-3 flex flex-col items-start">
                 <button onClick={() => onNavigate('events')} className="hover:text-amber-500 transition-colors">Blog</button>
                 <button onClick={() => onNavigate('gallery')} className="hover:text-amber-500 transition-colors">Gallery</button>
                 <button onClick={() => onNavigate('awards')} className="hover:text-amber-500 transition-colors">Awards</button>
                 <button onClick={() => onNavigate('volunteer')} className="hover:text-amber-500 transition-colors">Volunteer</button>
              </div>
           </div>
           
           <div>
              <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h5>
              <div className="space-y-3">
                 {/* Phone number updated */}
                 <div className="flex gap-3"><Phone className="w-4 h-4 text-amber-500" /> <span>+91 70131 38080</span></div>
                 {/* Email updated */}
                 <div className="flex gap-3"><Mail className="w-4 h-4 text-amber-500" /> <span>drgatlasrinivasareddy@gmail.com</span></div>
                 {/* Address updated */}
                 <div className="flex gap-3"><MapPin className="w-4 h-4 text-amber-500 shrink-0" /> <span>Korlagunta, Tirupati,<br/>Andhra Pradesh - 517501</span></div>
              </div>
           </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-900 text-center text-xs text-slate-700 uppercase tracking-widest flex flex-col md:flex-row justify-between items-center">
           <span>&copy; {new Date().getFullYear()} Gatla Foundation. All Rights Reserved.</span>
           <span className="mt-2 md:mt-0">Designed for a Cause.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;