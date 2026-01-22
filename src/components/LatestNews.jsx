import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const LatestNews = ({ onNavigate }) => { // Accept onNavigate prop
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const hostname = window.location.hostname;
                const apiUrl = (hostname === 'localhost' || hostname === '127.0.0.1')
                    ? 'http://localhost/gatla-foundation/api'
                    : 'https://gatlafoundation.org/api';

                const response = await fetch(`${apiUrl}/get_blogs.php?status=Published&limit=3`);
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading || error || news.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-[#050914] border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">
                        Updates & Stories
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
                        Latest News
                    </h3>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                        >
                            {/* Image Container */}
                            {item.image_path && (
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img
                                        src={item.image_path.startsWith('http') ? item.image_path : `https://gatlafoundation.org/api/uploads/${item.image_path}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-amber-500/90 backdrop-blur-sm text-[#0B1120] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-lg">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 md:p-8 flex-1 flex flex-col">
                                <div className="flex items-center text-xs font-medium text-slate-500 mb-4 space-x-2">
                                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                    <span>{new Date(item.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>

                                <h3 className="text-xl font-serif font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 input-content flex-1">
                                    {item.content.substring(0, 150)}...
                                </p>

                                <div className="mt-auto pt-4 border-t border-slate-800/50">
                                    <button
                                        onClick={() => onNavigate('News', item.id)} // Navigate to Full Page
                                        className="text-amber-500 text-xs font-bold uppercase tracking-widest hover:text-amber-400 transition-colors flex items-center group/btn"
                                    >
                                        Read Story <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
