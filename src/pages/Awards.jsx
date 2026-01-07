import React, { useEffect, useRef, useState } from 'react'; 
import { Trophy, Star, CheckCircle2, Medal, Globe, X } from 'lucide-react';

// --- AWARDS DESCRIPTIONS DATA & FILE MAPPING ---
// UPDATED: Synced with your filenames.txt. 
// Removed IDs like '1a', '1b', '12b' etc. because they do not exist in the folder list you provided.
const AWARD_DATA_MAP = [
    ["Honarary Doctorate of Social Works, Degree certificate received from Royal Academy Global Peace, American Higher Education Academy in 2019", ["1"]],
    ["National best social worker award received from the Aryavarth Express, National English Newspaper", ["2", "2a", "2b", "2c"]], // Added 2b, 2c as they exist
    ["Recongnition from Kutai Mulawarman Kingdom, Indonesia", ["3"]],
    ["Recognition from Sack Ki Dastak, Magazine of India", ["4"]],
    ["Recognition from Amazon & WAC Book of Records", ["5"]],
    ["Recognition from United Nations ESC", ["6"]],
    ["Recognition from UN WIFO", ["7"]],
    ["Recognition from World Humanity Commission", ["8"]],
    ["Accreditation approval letter from Kutai Mulawarman Kingdom, Indonesia", ["9"]],
    ["Recognition from United World Institution Foundation & Organization", ["10"]],
    ["Recognition from H.I.M Prof.MSPA.lansyah Rechza. FW, Ph.D, King of Kutai Mulawarman Kingdom, Indonesia and Mentor of International Gatla Foundation", ["11"]],
    ["Word Record certificate received from Indiaan World Records for voluntarily social service given to more than 30000 blind persons", ["12"]],
    ["Word Record certificate received from Exclusive World Records for Helping Most Blind Persons", ["13"]],
    ["Word Record certificate received from Cholan Book of World Record for voluntarily social service given to more than 30000 blind persons", ["14"]],
    ["Word Record certificate received from WAC Book of Records for Maximum Social Service provided to Blind Perons", ["15"]],
    ["Mahatma Gandhi International Nobel Peace Award received from Hope International World Record", ["16"]],
    ["Best Social Worker award received from High Range Book of World Records", ["17"]],
    ["Kalki Gaurav Samman Award received from Kalki News", ["18"]],
    ["Award from Exclusive World Record", ["19"]],
    ["International Icon Award received from WAC People Council", ["20"]],
    ["Honor from Asian University International", ["21"]],
    ["Honour from Ex.Minister, Sri Kasu Krishna Reddy Garu", ["22"]],
    ["Honor from Niti Aayog Board Member & Founder of International Commission of Culture and Diplomatic Relations", ["23"]],
    ["Honor from the Aryavarth Express, National English News paper", ["24"]],
];

// Define the base path for assets
const imageBasePath = process.env.PUBLIC_URL + "/assets/awards/";
// Fallback image (Logo) in case an award image is missing
const fallbackImage = process.env.PUBLIC_URL + "/assets/images/1.png";

const SLIDER_IMAGES = AWARD_DATA_MAP.flatMap(([description, fileIds]) => {
    return fileIds.map((fileId) => ({
        id: fileId,
        src: imageBasePath + `${fileId}.jpeg`, 
        description: description,
    }));
});

const ACHIEVEMENTS = [
    {
        type: 'International',
        title: 'World Record Achievement',
        description: 'Secured the maximum number of volunteer-provided scribes for blind students in a single academic year, setting a global benchmark for service.',
        date: 'August 2024',
        icon: <Globe className="w-6 h-6 text-white" />,
        color: 'bg-blue-600',
    },
    {
        type: 'National',
        title: 'Lifetime Service Award (India)',
        description: 'Awarded by the Ministry of Social Justice and Empowerment for two decades of selfless dedication to visually impaired communities across all major states.',
        date: 'October 2023',
        icon: <Medal className="w-6 h-6 text-white" />,
        color: 'bg-green-600',
    },
    {
        type: 'Sports',
        title: 'Excellence in Blind Cricket',
        description: 'Recognized for mentoring and supporting the Captain of the Indian Blind Cricket Team and promoting the sport at grassroots levels.',
        date: 'January 2023',
        icon: <Trophy className="w-6 h-6 text-white" />,
        color: 'bg-purple-600',
    },
];

const HONORS = [
    { title: 'Honorary Doctorate', institution: 'Royal Academy of Global Peace, USA', year: 2019 },
    { title: 'Best Social Service Organization', institution: 'Andhra Pradesh State Government', year: 2021 },
    { title: '33+ World Records', institution: 'Multiple Global Record Books', year: 'Ongoing' },
];

// --- IMAGE ZOOM MODAL COMPONENT ---
const ImageModal = ({ isOpen, src, alt, description, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100] p-4 cursor-pointer"
            onClick={onClose} 
        >
            <div 
                className="relative max-w-5xl max-h-[95vh] bg-[#050914] p-2 md:p-6 rounded-lg shadow-2xl flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 md:top-4 md:right-4 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 transition z-50"
                >
                    <X className="w-6 h-6" />
                </button>
                <img 
                    src={src} 
                    alt={alt} 
                    // ADDED: Error handling for modal image
                    onError={(e) => { e.target.src = fallbackImage; }}
                    className="w-full h-auto max-h-[75vh] object-contain mx-auto rounded-md bg-black/50"
                />
                <p className="text-sm md:text-base text-slate-300 mt-4 text-center max-w-3xl mx-auto">
                    {description}
                </p>
            </div>
        </div>
    );
};

const AchievementCard = ({ achievement }) => (
    <div className="bg-[#0B1120] p-6 border border-slate-800 rounded-lg hover:border-amber-500/30 transition-all duration-300 shadow-xl">
        <div className={`w-10 h-10 ${achievement.color} rounded-full flex items-center justify-center mb-4`}>
            {achievement.icon}
        </div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-1">{achievement.type}</h3>
        <h4 className="text-xl font-serif font-bold text-white mb-3">{achievement.title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{achievement.description}</p>
        <p className="text-slate-500 text-xs mt-4 italic">{achievement.date}</p>
    </div>
);


// --- UPDATED INTERNAL SLIDER COMPONENT ---
const AwardsSlider = ({ openModal }) => {
    const sliderRef = useRef(null);
    const itemRefs = useRef([]);
    const [centerItemId, setCenterItemId] = useState(null);

    const checkCenterItem = () => {
        const slider = sliderRef.current;
        if (!slider || !itemRefs.current.length) return;

        const containerCenter = slider.scrollLeft + slider.clientWidth / 2;
        let closestItem = null;
        let minDistance = Infinity;

        itemRefs.current.forEach((item, index) => {
            if (item) {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = slider.scrollLeft + itemRect.left + itemRect.width / 2 - slider.getBoundingClientRect().left;
                const distance = Math.abs(containerCenter - itemCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestItem = SLIDER_IMAGES[index].id;
                }
            }
        });
        
        if (minDistance < 200) { 
            setCenterItemId(closestItem);
        } else {
            setCenterItemId(null); 
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        checkCenterItem(); 

        const handleScroll = () => {
            requestAnimationFrame(checkCenterItem); 
        };
        
        slider.addEventListener('scroll', handleScroll);

        const scrollInterval = setInterval(() => {
            const itemWidth = 320; 
            const gap = 24; 
            const scrollAmount = itemWidth + gap;

            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
                slider.scrollTo({ left: 0, behavior: 'instant' });
            } else {
                slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3000); 

        return () => {
            clearInterval(scrollInterval);
            slider.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="py-12 -mt-6">
            <div 
                ref={sliderRef}
                onScroll={checkCenterItem} 
                className="overflow-x-scroll whitespace-nowrap snap-x-mandatory" 
                style={{ 
                    WebkitOverflowScrolling: 'touch',
                    scrollSnapType: 'x mandatory',
                    msOverflowStyle: 'none', 
                    scrollbarWidth: 'none', 
                }}
            >
                <div className="inline-flex gap-6 px-4 sm:px-6 lg:px-8 pb-4 py-2">
                    <div className="inline-block flex-shrink-0 w-64 opacity-0 pointer-events-none"></div> 

                    {SLIDER_IMAGES.map((photo, index) => {
                        const isCentered = photo.id === centerItemId;
                        
                        return (
                            <div 
                                key={photo.id} 
                                ref={el => itemRefs.current[index] = el} 
                                className={`inline-block flex-shrink-0 relative transition-all duration-300 cursor-pointer`}
                                onClick={() => openModal(photo)} 
                                style={{ 
                                    scrollSnapAlign: 'center', 
                                    width: '320px', 
                                    transform: isCentered ? 'scale(1.1) z-10' : 'scale(1)',
                                    opacity: isCentered ? 1 : 0.7, 
                                    margin: isCentered ? '0 10px' : '0 0', 
                                }} 
                            >
                                <div className={`relative rounded-lg overflow-hidden border border-slate-700 bg-[#0F172A] shadow-xl group transition-all duration-300 w-full h-80 hover:border-amber-500 mb-3`}>
                                    <img 
                                        src={photo.src} 
                                        alt={`Award ${photo.id}`} 
                                        // CRITICAL: Shows Logo if image fails to load
                                        onError={(e) => { 
                                            e.target.onerror = null; // prevents looping
                                            e.target.src = fallbackImage; 
                                        }}
                                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" 
                                    />
                                </div>
                                
                                <p className={`text-center whitespace-normal text-xs md:text-sm font-semibold transition-colors duration-300 px-2 line-clamp-3 ${
                                    isCentered ? 'text-amber-400' : 'text-slate-500'
                                }`}>
                                    {photo.description}
                                </p>
                            </div>
                        );
                    })}

                    <div className="inline-block flex-shrink-0 w-64 opacity-0 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};


const Awards = () => {
    const [modalState, setModalState] = useState({ isOpen: false, src: '', alt: '', description: '' });

    const openModal = (photo) => {
        setModalState({
            isOpen: true,
            src: photo.src,
            alt: photo.description,
            description: photo.description,
        });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, src: '', alt: '', description: '' });
    };

    return (
        <div className="pt-20 bg-[#050914] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-6">
                    <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">Recognition of Excellence</h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">Awards & Global Achievements</h3>
                </div>

                <AwardsSlider openModal={openModal} />

                <div className="grid md:grid-cols-3 gap-8 pt-10 pb-20">
                {ACHIEVEMENTS.map((ach, index) => (
                    <AchievementCard key={index} achievement={ach} />
                ))}
                </div>

                <div className="bg-[#0B1120] p-8 md:p-12 border border-slate-800 rounded-lg shadow-2xl mb-20">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <Star className="w-10 h-10 text-amber-500 fill-amber-500" />
                        <div>
                            <h4 className="text-white text-2xl font-serif font-bold">Prestigious Honors</h4>
                            <p className="text-slate-400 text-sm">Recognizing the personal commitment of our Founder and the Foundation's impact.</p>
                        </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {HONORS.map((honor, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 border border-slate-700 rounded-md bg-[#0F172A]">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                                <div>
                                    <p className="text-white font-semibold">{honor.title}</p>
                                    <p className="text-slate-500 text-xs mt-0.5">{honor.institution} ({honor.year})</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ImageModal 
                isOpen={modalState.isOpen}
                src={modalState.src}
                alt={modalState.alt}
                description={modalState.description}
                onClose={closeModal}
            />
        </div>
    );
};

export default Awards;