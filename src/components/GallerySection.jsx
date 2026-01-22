import React, { useState, useEffect } from 'react';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

const GallerySection = ({ onNavigate }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const hostname = window.location.hostname;
                const apiUrl = (hostname === 'localhost' || hostname === '127.0.0.1')
                    ? 'http://localhost/gatla-foundation/api'
                    : 'https://gatlafoundation.org/api';

                // Fetch latest 8 images
                const res = await fetch(`${apiUrl}/get_gallery.php?limit=8`);
                const data = await res.json();
                setImages(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load gallery images", err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (loading || images.length === 0) return null; // Don't show if empty or loading

    return (
        <section className="bg-[#050914] py-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">Our Moments</h4>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Gallery</h2>
                    </div>
                    <button
                        onClick={() => onNavigate('Gallery')}
                        className="group flex items-center text-slate-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
                    >
                        View All Photos <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                        <div
                            key={img.id}
                            className={`relative group overflow-hidden rounded-xl border border-slate-800 ${idx === 0 || idx === 7 ? 'md:col-span-2 md:row-span-2' : ''}`}
                        >
                            <div className={`${idx === 0 || idx === 7 ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-square'} w-full bg-slate-900`}>
                                <img
                                    src={img.image_path.startsWith('http') ? img.image_path : `https://gatlafoundation.org/api/uploads/${img.image_path}`}
                                    alt={img.title || "Gallery Image"}
                                    className="w-full h-full object-contain bg-black/50 transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div>
                                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-1">{img.category}</span>
                                    <h3 className="text-white font-serif font-bold text-lg md:text-xl leading-none">{img.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button
                        onClick={() => onNavigate('Gallery')}
                        className="px-8 py-3 border border-slate-700 text-white font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors"
                    >
                        View Full Gallery
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
