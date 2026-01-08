import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  // Use PUBLIC_URL for the logo path ensures it works in subdirectories
  const logoPath = process.env.PUBLIC_URL + "/assets/images/1.jpg";

  // Social Media Configuration
  // Update the 'href' values with your actual profile URLs
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer id="contact" className="bg-[#02040a] text-slate-400 py-16 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION */}
        <div className="grid md:grid-cols-4 gap-12 text-sm mb-16">
           
           {/* Brand Column */}
           <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                 <img src={logoPath} alt="Gatla Foundation" className="w-12 h-12 rounded-full object-cover border border-slate-800" /> 
                 <div>
                    <h4 className="text-white font-serif text-xl tracking-wide">GATLA FOUNDATION</h4>
                    <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Established 2005</p>
                 </div>
              </div>
              <p className="max-w-xs text-slate-500 mb-8 leading-relaxed">
                Empowering the visually impaired through education, sports, music, and entrepreneurship.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-4">
                 {socialLinks.map((social) => (
                    <a 
                      key={social.name} 
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-[#0B1120] transition-all duration-300 group"
                    >
                       <span className="sr-only">{social.name}</span>
                       <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                 ))}
              </div>
           </div>
           
           {/* Quick Links Column */}
           <div>
              <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-b border-slate-900 pb-2 inline-block">Quick Links</h5>
              <div className="space-y-4 flex flex-col items-start">
                 {['Events', 'Gallery', 'Awards', 'Volunteer'].map((item) => (
                    <button 
                      key={item}
                      onClick={() => onNavigate(item.toLowerCase())} 
                      className="hover:text-amber-500 hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      {item}
                    </button>
                 ))}
              </div>
           </div>
           
           {/* Contact Column */}
           <div>
              <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-b border-slate-900 pb-2 inline-block">Contact</h5>
              <div className="space-y-4">
                 <div className="flex gap-3 items-start group">
                    <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 group-hover:text-white transition-colors" /> 
                    <span className="group-hover:text-slate-300 transition-colors">+91 70131 38080</span>
                 </div>
                 <div className="flex gap-3 items-start group">
                    <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 group-hover:text-white transition-colors" /> 
                    <span className="group-hover:text-slate-300 transition-colors">gatlafoundation@gmail.com</span>
                 </div>
                 <div className="flex gap-3 items-start group">
                    <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 group-hover:text-white transition-colors" /> 
                    <span className="leading-relaxed group-hover:text-slate-300 transition-colors">
                      #22-10-192,<br/>
Near NGM Swimming Pool,<br/>
Koramenugunta, Tirupati (Urban),<br/> 
Andhra Pradesh, India-517501
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-8 border-t border-slate-900 text-xs text-slate-600 flex flex-col md:flex-row justify-between items-center gap-4">
           <span className="uppercase tracking-widest">
             &copy; {new Date().getFullYear()} Gatla Foundation. All Rights Reserved.
           </span>
           
           <span className="flex items-center gap-1 tracking-wide group">
             Built with 
             <Heart className="w-3 h-3 text-red-600 fill-current animate-pulse" /> 
             by 
             <a 
               href="https://rajugariventures.com" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-slate-400 hover:text-amber-500 font-bold ml-1 transition-colors border-b border-transparent hover:border-amber-500"
             >
               Rajugari Ventures
             </a>
           </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;