import React from 'react';
import { Globe, Trophy, CheckCircle2 } from 'lucide-react';

const About = () => {
  // CRITICAL FIX: Define PUBLIC_URL for asset paths
  const imageBasePath = process.env.PUBLIC_URL + "/assets/images/";
  
  return (
    <div className="pt-10">
      {/* About Foundation */}
      <section className="py-20 bg-[#0B1120] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 flex justify-center">
               <div className="relative w-64 h-80 bg-[#0F172A] border border-slate-700 flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                  {/* MAIN LOGO: 1.png - PATH UPDATED */}
                  <img src={imageBasePath + "1.png"} alt="Foundation Logo" className="w-20 h-20 mb-6 object-contain" />
                  <h4 className="text-xl font-serif text-white mb-2">Our Philosophy</h4>
                  <p className="text-slate-400 italic text-sm">"We don't just help; we elevate."</p>
               </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">About The Foundation</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Empowerment through Excellence.</h3>
              <p className="text-slate-400 text-sm md:text-base mb-6 leading-relaxed">
                The <strong className="text-white">Gatla Foundation</strong> was established in Tirupati to provide platform where the visually impaired can access opportunities usually reserved for the privileged.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 {['Skill Development', 'Financial Inclusion', 'Social Dignity', 'Global Exposure'].map((item, i) => (
                   <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-amber-500" /> {item}
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-24 bg-[#050914] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 relative group">
              <div className="absolute inset-0 bg-amber-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-[#0F172A] p-2 border border-amber-500/30">
                {/* FOUNDER PHOTO - PATH UPDATED */}
                <img 
                  src={imageBasePath + "Founder.jpeg"} 
                  alt="H.E. Hon. Dr. Gatla Srinivasa Reddy" 
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
                <div className="bg-[#0B1120] p-6 text-center mt-2 border-t border-amber-500/20">
                  <h3 className="text-xl font-serif font-bold text-white">H.E. Hon. Dr. Gatla Srinivasa Reddy</h3>
                  <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mt-2">Founder & President</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4">Leadership Profile</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 leading-tight">
                "Education is More Important <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Than Money</span>"
              </h3>
              
              <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed text-justify">
                <p className="border-l-4 border-amber-500 pl-4 italic text-slate-300">
                  "An ordinary steel shop store keeper who helped more than 35,000 blind persons through his education and has now become a Doctorate and World Record Holder."
                </p>
                <p>
                  Born on May 31, 1981, in the Palnadu area of Guntur District, Andhra Pradesh, Dr. Reddy came from a humble agricultural family. Despite dropping out after the 10th grade to work as a store keeper for a mere ₹500 monthly salary, he returned to education in 1999, driven by the hardships he witnessed among the disabled and poor.
                </p>
                <p>
                  His journey into social service began in 2001 when he observed the severe lack of resources for blind students—no Braille books and no scribes. He voluntarily stepped in to scribe for a student, Mr. Thulasi Ram, marking the beginning of a lifelong mission. Since then, he has rendered voluntary service to over 35,000 blind individuals, orphans, and elderly people across India.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mt-8">
                  <div className="bg-[#0B1120] p-5 border border-slate-800 rounded-lg hover:border-amber-500/30 transition">
                    <Globe className="w-6 h-6 text-amber-500 mb-3" />
                    <h4 className="text-white font-bold mb-2">Global Recognition</h4>
                    <p className="text-xs text-slate-500">Achieved 33 World Records and received an Honorary Doctorate from the Royal Academy of Global Peace, USA (2019).</p>
                  </div>
                  <div className="bg-[#0B1120] p-5 border border-slate-800 rounded-lg hover:border-amber-500/30 transition">
                    <Trophy className="w-6 h-6 text-amber-500 mb-3" />
                    <h4 className="text-white font-bold mb-2">Sports Visionary</h4>
                    <p className="text-xs text-slate-500">Mentored over 500 blind cricketers, including Mr. Ajay Kumar Reddy, Captain of the Indian Blind Cricket Team.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;