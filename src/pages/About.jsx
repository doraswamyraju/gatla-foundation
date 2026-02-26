import React, { useState } from 'react';
import { Globe, Trophy, CheckCircle2, Quote, X } from 'lucide-react';


const About = () => {
  // Base path for existing images (public/assets/images/)
  const imageBasePath = process.env.PUBLIC_URL + "/assets/images/";
  // Specific path for the new about image (public/assets/about/)
  const aboutAssetPath = process.env.PUBLIC_URL + "/assets/about/";
  const [showFounderModal, setShowFounderModal] = useState(false);

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

            {/* 1. Left Side: Philosophy Box (Fixed Height) */}
            <div className="w-full lg:w-1/3 flex-none">
              <div className="relative w-full h-[500px] bg-[#0F172A] border border-slate-700 flex flex-col items-center justify-center p-8 text-center shadow-2xl rounded-lg hover:border-amber-500/30 transition-colors group">
                {/* UPDATED: Uses '1.png' from assets/images/ as requested */}
                <img
                  src={imageBasePath + "1.png"}
                  alt="Foundation Logo"
                  className="w-32 h-32 mb-8 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
                <h4 className="text-2xl font-serif text-white mb-4 group-hover:text-amber-500 transition-colors">Our Philosophy</h4>
                <div className="w-12 h-0.5 bg-slate-600 mb-6"></div>
                <p className="text-slate-400 italic text-lg leading-relaxed">"We don't just help;<br />we elevate."</p>
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

            {/* 3. Right Side: Image (1.png from about folder) */}
            <div className="w-full lg:w-1/3 flex-none">
              <div className="relative w-full h-[500px] group overflow-hidden rounded-lg border border-slate-700 shadow-2xl">
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>

                {/* Image with Zoom Effect */}
                <img
                  src={aboutAssetPath + "1.png"}
                  alt="About Us"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[10%] group-hover:grayscale-0"
                />

                {/* Caption on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0B1120] to-transparent z-20 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-1">Our Journey</p>
                  <p className="text-white font-serif text-lg">Serving with Purpose</p>
                </div>
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

                <div className="mt-8 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setShowFounderModal(true)}
                    className="px-6 py-2.5 bg-amber-500 text-[#0B1120] font-bold text-sm uppercase tracking-wider rounded border border-amber-400 hover:bg-amber-400 transition-colors shadow-lg hover:shadow-amber-500/20"
                  >
                    Know More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Profile Modal */}
      {showFounderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#0F172A] border border-amber-500/30 rounded-xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">

            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-[#0B1120] shrink-0">
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white">H.E. Hon. Dr. Gatla Srinivasa Reddy</h3>
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mt-1">Founder & President of Gatla Foundation</p>
              </div>
              <button
                onClick={() => setShowFounderModal(false)}
                className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700 p-2 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar text-slate-300 text-sm md:text-base leading-relaxed space-y-6">

              <div className="flex flex-col md:flex-row gap-6 md:gap-8 float-none md:float-left md:mr-8 md:mb-4 w-full md:w-1/3">
                <img
                  src={imageBasePath + "Founder.jpeg"}
                  alt="H.E. Hon. Dr. Gatla Srinivasa Reddy"
                  className="w-full h-auto rounded-lg border-2 border-amber-500/50 shadow-xl object-cover"
                />
              </div>

              <p className="italic text-amber-500 font-medium text-lg border-l-4 border-amber-500 pl-4 bg-amber-500/5 p-4 rounded-r-lg">
                "He is a reformer, educationist and social activist relentlessly put his efforts to uplift the underprivileged and disabled sections in educating and showing the path of survival."
              </p>

              <p className="italic text-slate-400">
                “An ordinary steel shop store keeper helped more than 35000 blind persons through his education and now he become a Doctorate and World Record Holder”
              </p>

              <p>
                Born in 1981, May 31st at Palnadu area, Dachepalli in Guntur District at Andhra Pradesh State. He came from Agricultural poor family. During the time of his education, he was dropped his education after the completion of his tenth class and he had joined in steel shop as a store keeper in the year 1997 for Rs.500 monthly salary. In the year 1999 he had thought the real life crisis of the disabled and poor, one day he had decided to continue his education again, after that he had joined in intermediate CEC course and he had secured state 6th Rank in the Andhra Pradesh state. In the year 2001 he was joined in Narasarao Peta city in Andhra Pradesh state for complete of Graduation and in that year onwards his life was turned in to social service side due to he has observed physically blind students had faced more problems in getting their education.
              </p>

              <p>
                In the year 2001 they had no facilities of blind script Braille books for improving their knowledge and explain to scriber for writing their exams on his behalf. Nobody come forward and showed interest for writing the exams on their behalf as a scriber so that many blind students were dropped their studies due to scribers unavailability, nor their college management could provide the scriber during the exam time.
              </p>

              <p>
                He had voluntarily showed interest helping an intermediate blind student Mr.Thulasi Ram, who passed in first classes in two consecutive exams. He took this candidate as a challenge to build his social service career. He struggled a lot for Thulasi Ram in providing all facilities for educating him. But his family circumstances could not make him to survive.
              </p>

              <p>
                Like this he had taken interest in bringing such people for help since his motto is to help others like, Orphans, Old age persons, economically backward students and sport persons. Since 2001 he had rendered voluntarily service to more than 35000 blind persons, Orphans, Old age people and poor students across India and also as many as 500 blind students were helped by him in writing examinations up to Post Graduation level and they had settled in Government services as well as some other fields.
              </p>

              <p>
                He had not only educated them but also provided all the required resources in cassette form along with tape recorder, such resources in connection to attempting competitive examinations. He had distributed such resources throughout Andhra Pradesh in between 2002 to 2007 for the blind students since Braille scripts were not available those days. Apart from educating them, he also organized Chess competition among the blind students in district level. He had conducted state level blind cricket tournament focusing a blind student named Mr. Ajay Kumar Reddy who is now captain of the Indian Blind cricket team and Arjuna Awardee. Till now, he has helped more than 500 blind cricket players from village level to international level, out of which 6 have been selected for Andhra Pradesh State Team and 2 for National Team. This all he had done to encourage the blind Sportsmen ship right from the village level to international level. He also organized state-level and national-level singing competitions for the blind, encouraging them to become singers, music directors, and music teachers. State level quiz competitions were conducted among the Orphans and Blinds for their betterment. To enhance the personality, knowledge and competitive spirit, he conducted personality development programs in various levels for the blind students. He had conducted eye donation camps and blood donation camps in different places by taking prior intimation for the eye donations from different people in hospitals with their signatures well in advance. He distributed food, bed sheets, rice bags, vegetables and drinking water to homeless people, Orphans, Beggars and backward families are being done across India and also, he has been conducting awareness programs in rural areas about Covid-19 pandemic virus disease and he is motivating and educating to uneducated people for usage of PPE and how to take safety precautions regarding Covid-19.
              </p>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <h4 className="text-xl font-bold text-white mb-4">Achievements & Honors</h4>
                <p>
                  He has achieved Honorary Doctorate Degree from Royal Academy of Global Peace (American Higher Educational Academy), USA in the year 2019 for his social works and he occupied a place among with eminent Guinness World Record Holders cine actress and Director late Vijaya Nirmala and Actor Ali, Dance director Sivasankar master, writer & motivational speaker Yandamuri Veerenadra Nath, Paddabalasiksha writer Gajula Satyanaraya, Padmasree awardee Daripally Ramaiah too received “Honorary Doctorate” degree from this same university. In continuation with he had achieved India Best Social Activist Award from “The Aryavarth Express” the National English Newspaper in the year 2020, as of now he achieved 33 World Records, 79 Government Certificates and 221 International & National Awards and Honors.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-6 text-center rounded-lg mt-8">
                <h4 className="text-lg md:text-2xl font-bold text-amber-500 tracking-wider">“EDUCATION IS MORE IMPORTANT THAN MONEY”</h4>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;