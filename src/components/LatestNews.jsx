import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';

const LatestNews = () => {
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
                console.error("Error fetching news:", err);
                setError("Unable to load news at this time.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <section className="bg-[#050914] py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 flex justify-center">
                    <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                </div>
            </section>
        );
    }

    // If no news, don't show the section
    if (!loading && (!news || news.length === 0)) {
        return null;
    }

    return (
        <section className="bg-[#050914] py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">Latest Updates</h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">News & Stories</h3>
                    </div>
                    {/* Optional: Link to a full blog page if it existed */}
                    {/* <button className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
            View All News <ArrowRight className="w-4 h-4" />
          </button> */}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <div key={item.id} className="group bg-[#0B1120] border border-slate-800 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col h-full">
                            {item.image_path ? (
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={item.image_path.startsWith('http') ? item.image_path : `/gatla-foundation/api/uploads/${item.image_path}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.style.display = 'none'; }} // Hide if broken
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60"></div>
                                </div>
                            ) : (
                                // Fallback decorative header if no image
                                <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700"></div>
                            )}

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 text-slate-500 text-xs mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                    <span className="text-amber-500 font-medium uppercase tracking-wider">{item.category}</span>
                                </div>

                                <h4 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                                    {item.title}
                                </h4>

                                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                                    {item.content}
                                </p>

                                {/* Read More - currently just opens a small alert or could be a modal in future */}
                                {/* For now, just a visual indicator */}
                                <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center text-amber-500 text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    Read More <ArrowRight className="w-4 h-4 ml-2" />
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
