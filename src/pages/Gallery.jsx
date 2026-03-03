import React, { useState, useEffect } from 'react';
import { Filter, Image as ImageIcon } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';

const ImageModal = ({ isOpen, src, alt, category, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 cursor-pointer backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="relative max-w-5xl w-full bg-[#0B1120] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-all group"
                    >
                        <Filter className="w-6 h-6 rotate-45 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                <div className="flex flex-col">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto max-h-[80vh] object-contain bg-black/20"
                    />
                    <div className="p-6 bg-[#0B1120] border-t border-slate-800">
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1 block">{category}</span>
                        <h3 className="text-white font-serif font-bold text-2xl">{alt}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [modalState, setModalState] = useState({ isOpen: false, src: '', alt: '', category: '' });

    const categories = ['All', 'Events', 'Education', 'Projects', 'Awards', 'Media', 'Press Clips', 'General'];

    const openModal = (img) => {
        setModalState({
            isOpen: true,
            src: img.image_path.startsWith('http') ? img.image_path : `https://gatlafoundation.org/uploads/${img.image_path}`,
            alt: img.title,
            category: img.category
        });
    };

    const closeModal = () => setModalState({ ...modalState, isOpen: false });

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const hostname = window.location.hostname;
                const apiUrl = (hostname === 'localhost' || hostname === '127.0.0.1')
                    ? 'http://localhost/gatla-foundation/api'
                    : 'https://gatlafoundation.org/api';

                const res = await fetch(`${apiUrl}/get_gallery.php`);
                const data = await res.json();
                const imgs = Array.isArray(data) ? data : [];
                setImages(imgs);
                setFilteredImages(imgs);
            } catch (err) {
                console.error("Failed to load gallery", err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        if (category === 'All') {
            setFilteredImages(images);
        } else {
            setFilteredImages(images.filter(img => img.category === category));
        }
    }, [category, images]);

    return (
        <div className="min-h-screen bg-[#050914] pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3">Visual Journey</h4>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Gallery</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Capturing the moments that define our mission. Explore the visual stories of impact, service, and community.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider border transition-all duration-300
                        ${category === cat
                                    ? 'bg-amber-500 border-amber-500 text-[#0B1120]'
                                    : 'bg-transparent border-slate-700 text-slate-400 hover:border-amber-500 hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
                    </div>
                ) : filteredImages.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                        <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>No images found in this category.</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {filteredImages.map((img) => (
                            <FadeInSection key={img.id}>
                                <div
                                    onClick={() => openModal(img)}
                                    className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer"
                                >
                                    <img
                                        src={img.image_path.startsWith('http') ? img.image_path : `https://gatlafoundation.org/uploads/${img.image_path}`}
                                        alt={img.title}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <span className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
                                        <h3 className="text-white font-serif font-bold text-xl">{img.title}</h3>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                )}

            </div>

            <ImageModal
                isOpen={modalState.isOpen}
                src={modalState.src}
                alt={modalState.alt}
                category={modalState.category}
                onClose={closeModal}
            />
        </div>
    );
};

export default Gallery;
