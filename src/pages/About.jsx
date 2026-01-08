import React from 'react';
import { Globe, Trophy, CheckCircle2, Quote } from 'lucide-react';

const About = () => {
  // Base path for existing images
  const imageBasePath = process.env.PUBLIC_URL + "/assets/images/";
  // Specific path for the new about image
  const aboutAssetPath = process.env.PUBLIC_URL + "/assets/about/";
  
  return (
    <div className="pt-10">
      {/* About Foundation */}
      <section className="py-20 bg-[#0B1120] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* CREATIVE QUOTE SECTION */}
          <div className="text-center mb-16 relative z-10">
            <div className="inline-block relative">
              <Quote className="absolute -top-8 -left-8 w-12 h-12 text-amber-500/20 rotate-180" />
              <h2 className="text-2xl md:text-4xl font-serif text-white font-medium leading-normal max-w-4xl mx-auto">
                <span className="text-amber-500">"</span>
                The promise given to my friend Yelishetti Biksham (Srinath) in 2001 is firm and eternal!
                <span className="text-amber-500">"</span>
              </h2>
              <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full opacity-60"></div>
            </div>
          </div>

          {/* MAIN CONTENT ROW */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
            
            {/* 1. Left Side: Philosophy Box (Fixed Height to match Image) */}
            <div className="w-full lg:w-1/3 flex-none">
               <div className="relative w-full h-[500px] bg-[#0F172A] border border-slate-700 flex flex-col items-center justify-center p-8 text-center shadow-2xl rounded-lg hover:border-amber-500/30 transition-colors group">
                  {/* Updated to use '1.png' from assets/about */}
                  <img 
                    src={aboutAssetPath + "1.png"} 
                    alt="Foundation Logo" 
                    className="w-32 h-32 mb-8 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500" 
                  />
                  <h4 className="text-2xl font-serif text-white mb-4 group-hover:text-amber-500 transition-colors">Our Philosophy</h4>
                  <div className="w-12 h-0.5 bg-slate-600 mb-6"></div>
                  <p className="text-slate-400 italic text-lg leading-relaxed">"We don't just help;<br/>we elevate."</p>
               </div>
            </div>

            {/* 2. Middle: Text Content */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center text-center lg:text-left py-4">
              <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">About The Foundation</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Empowerment through Excellence.</h3>
              <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
                The <strong className="text-white">Gatla Foundation</strong> was established in Tirupati to provide a platform where the visually impaired can access opportunities usually reserved for the privileged.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
                 {['Skill Development', 'Financial Inclusion', 'Social Dignity', 'Global Exposure'].map((item, i) => (
                   <div key={i} className="flex items-center justify-center lg:justify-start gap-3 text-slate-300 text-sm">
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-amber-500" />
                      </div>
                      <span>{item}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* 3. Right Side: Founders Image (Fixed Height to match Philosophy) */}
            <div className="w-full lg:w-1/3 flex-none">
               <div className="relative w-full h-[500px] group overflow-hidden rounded-lg border border-slate-700 shadow-2xl">
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                  
                  {/* Image with Zoom Effect */}
                  <img 
                    src={aboutAssetPath + "founders.jpeg"} 
                    alt="Founders" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[10%] group-hover:grayscale-0" 
                  />
                  
                  {/* Caption on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0B1120] to-transparent z-20 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-1">Founders</p>
                    <p className="text-white font-serif text-lg">Visionary Leadership</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Founder Profile - (Existing Code Preserved) */}
      <section className="py-24 bg-[#050914] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 relative group">
              <div className="absolute inset-0 bg-amber-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-[#0F172A] p-2 border border-amber-500/30">
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