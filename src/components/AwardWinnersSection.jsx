import React, { useState, useEffect } from 'react';
import { Award, Calendar, Users, Star } from 'lucide-react';

const AwardWinnersSection = () => {
    const [winners, setWinners] = useState([]);
    const [activeType, setActiveType] = useState('Gatla Platinum Medal');
    const [activeCategory, setActiveCategory] = useState('All');
    const [years, setYears] = useState([]);
    const [activeYear, setActiveYear] = useState('All');

    const awardTypes = [
        'Gatla Platinum Medal',
        'Gatla Gold Medal',
        'Gatla Silver Medal',
        'Gatla Bronze Medal'
    ];

    const categories = ['All', 'Blind', 'Deaf & Dumb', 'Physically Handicapped', 'Wheel Chair'];

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/get_award_winners.php`)
            .then(res => res.json())
            .then(data => {
                setWinners(data);
                // Extract unique years
                const uniqueYears = [...new Set(data.map(w => w.year))].sort((a, b) => b - a);
                setYears(['All', ...uniqueYears]);
            })
            .catch(err => console.error(err));
    }, []);

    // Filter Logic
    const filteredWinners = winners.filter(w => {
        const typeMatch = w.award_type === activeType;
        const catMatch = activeCategory === 'All' || w.category === activeCategory;
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

    return (
        <div className="py-16 bg-[#050914]">
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
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60 z-10" />
                                    <img
                                        src={`${process.env.PUBLIC_URL}/${winner.image_path}`}
                                        alt={winner.winner_name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{winner.year}</span>
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
