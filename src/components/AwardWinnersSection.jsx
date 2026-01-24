import React, { useState, useEffect } from 'react';
import { Award, Calendar, Users, Star } from 'lucide-react';

const AwardWinnersSection = () => {
    const [winners, setWinners] = useState([]);
    const [activeType, setActiveType] = useState('All Medals'); // Default to All
    const [activeCategory, setActiveCategory] = useState('All');
    const [years, setYears] = useState([]);
    const [activeYear, setActiveYear] = useState('All');

    const awardTypes = [
        'All Medals',
        'Gatla Platinum Medal',
        'Gatla Gold Medal',
        'Gatla Silver Medal',
        'Gatla Bronze Medal'
    ];

    const categories = activeType === 'Gatla Platinum Medal'
        ? ['General']
        : ['All', 'Blind', 'Deaf & Dumb', 'Physically Handicapped', 'Wheel Chair'];

    // State for Image Modal
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/get_award_winners.php`)
            .then(res => res.json())
            .then(data => {
                setWinners(data);
                const uniqueYears = [...new Set(data.map(w => w.year))].sort((a, b) => b - a);
                setYears(['All', ...uniqueYears]);
            })
            .catch(err => console.error(err));
    }, []);

    // Reset category when type changes
    useEffect(() => {
        if (activeType === 'Gatla Platinum Medal') {
            setActiveCategory('General');
        } else if (activeCategory === 'General') {
            setActiveCategory('All');
        }
    }, [activeType]);

    // Filter Logic
    const filteredWinners = winners.filter(w => {
        const typeMatch = activeType === 'All Medals' || w.award_type === activeType;
        // For Platinum, category is General. For others, All or Specific.
        const catMatch = activeType === 'Gatla Platinum Medal'
            ? true // Always show (since we auto-set to General or user inputs General)
            : (activeCategory === 'All' || w.category === activeCategory);

        const yearMatch = activeYear === 'All' || w.year == activeYear;
        return typeMatch && catMatch && yearMatch;
    });

    const getMedalColor = (type) => {
        if (type.includes('Platinum')) return 'text-slate-300';
        if (type.includes('Gold')) return 'text-yellow-400';
        if (type.includes('Silver')) return 'text-slate-400';
        if (type.includes('Bronze')) return 'text-amber-700';
        return 'text-amber-500';
    };

    const handleImageClick = (imagePath) => {
        setSelectedImage(imagePath);
        setZoomLevel(1);
    };

    const handleZoomIn = (e) => {
        e.stopPropagation();
        setZoomLevel(prev => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = (e) => {
        e.stopPropagation();
        setZoomLevel(prev => Math.max(prev - 0.5, 1));
    };

    return (
        <div className="py-16 bg-[#050914]">
            {/* IMAGE MODAL */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/50 hover:text-white z-50 p-2"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <img
                            src={`${process.env.PUBLIC_URL}/${selectedImage}`}
                            alt="Full View"
                            className="max-w-full max-h-full object-contain transition-transform duration-300"
                            style={{ transform: `scale(${zoomLevel})` }}
                            onClick={(e) => e.stopPropagation()} // Prevent close on image click
                        />

                        {/* Zoom Controls */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10" onClick={(e) => e.stopPropagation()}>
                            <button onClick={handleZoomOut} className="text-white hover:text-amber-500 disabled:opacity-50" disabled={zoomLevel <= 1}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            </button>
                            <span className="text-white font-mono min-w-[3ch] text-center">{Math.round(zoomLevel * 100)}%</span>
                            <button onClick={handleZoomIn} className="text-white hover:text-amber-500 disabled:opacity-50" disabled={zoomLevel >= 3}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Hall of Fame</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Celebrating the achievements of our exceptional winners across various categories.</p>
                </div>

                {/* AWARD TYPE TABS */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {awardTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider border transition-all ${activeType === type
                                ? 'bg-amber-500 text-[#0B1120] border-amber-500'
                                : 'text-slate-400 border-slate-700 hover:border-amber-500/50 hover:text-white'
                                }`}
                        >
                            {type.replace('Gatla ', '')}
                        </button>
                    ))}
                </div>

                {/* FILTERS ROW */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#0B1120] p-4 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
                        <Users className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === cat ? 'text-white underline decoration-amber-500 decoration-2 underline-offset-4' : 'text-slate-400 hover:text-amber-500'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <select
                            value={activeYear}
                            onChange={(e) => setActiveYear(e.target.value)}
                            className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded p-1 focus:outline-none focus:border-amber-500"
                        >
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>

                {/* CONTENT GRID */}
                {filteredWinners.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredWinners.map(winner => (
                            <div key={winner.id} className="group bg-[#0B1120] border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl">
                                <div
                                    className="h-64 overflow-hidden relative cursor-pointer"
                                    onClick={() => handleImageClick(winner.image_path)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60 z-10 pointer-events-none" />
                                    <img
                                        src={`${process.env.PUBLIC_URL}/${winner.image_path}`}
                                        alt={winner.winner_name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{winner.year}</span>
                                    </div>
                                    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                        <div className="bg-black/50 p-2 rounded-full backdrop-blur-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 relative z-20 -mt-10">
                                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#050914] border border-slate-700 mb-3 group-hover:border-amber-500 transition-colors`}>
                                        <Star className={`w-5 h-5 ${getMedalColor(winner.award_type)}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">{winner.winner_name}</h3>
                                    <p className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-3">{winner.category}</p>
                                    {winner.description && (
                                        <p className="text-slate-400 text-sm line-clamp-2">{winner.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // COMING SOON STATE
                    <div className="flex flex-col items-center justify-center p-12 bg-[#0B1120] rounded-xl border border-dashed border-slate-700">
                        {/* Using Foundation Logo or Placeholder */}
                        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/1.jpg`} alt="Logo" className="w-full h-full object-cover opacity-50" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
                        <p className="text-slate-400 text-center max-w-md">
                            Winners for <span className="text-amber-500">{activeType}</span> ({activeCategory}) are yet to be announced.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AwardWinnersSection;
