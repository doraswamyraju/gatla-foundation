import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const GalleryHighlights = ({ onNavigate }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const hostname = window.location.hostname;
                const apiUrl = (hostname === 'localhost' || hostname === '127.0.0.1')
                    ? 'http://localhost/gatla-foundation/api'
                    : 'https://gatlafoundation.org/api';

                // Fetch latest 6 images for highlights
                const res = await fetch(`${apiUrl}/get_gallery.php?limit=6`);
                const data = await res.json();
                setImages(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load gallery highlights", err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (loading || images.length === 0) return null;

    return (
        <section className="bg-[#050914] py-20 relative overflow-hidden border-t border-slate-900/50">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 text-center md:text-left">
                    <div>
                        <h4 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-2">Our impact in pictures</h4>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Gallery Highlights</h2>
                    </div>
                    <button
                        onClick={() => onNavigate('Gallery')}
                        className="group flex items-center text-slate-400 hover:text-amber-500 transition-colors text-xs uppercase tracking-widest font-bold border border-slate-800 px-6 py-3 rounded-full hover:border-amber-500/50"
                    >
                        View All Photos <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 aspect-[4/3]"
                        >
                            <img
                                src={img.image_path.startsWith('http') ? img.image_path : `https://gatlafoundation.org/uploads/${img.image_path}`}
                                alt={img.title || "Gallery Highlight"}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Gatla+Foundation'; }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] block mb-1">{img.category || 'Foundation'}</span>
                                    <h3 className="text-white font-serif font-bold text-lg">{img.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button
                        onClick={() => onNavigate('Gallery')}
                        className="w-full py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl border border-slate-800"
                    >
                        View Full Gallery
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GalleryHighlights;
