import React, { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, Share2, Clock, User } from 'lucide-react';

const BlogPost = ({ id, onNavigate }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const hostname = window.location.hostname;
                const apiUrl = (hostname === 'localhost' || hostname === '127.0.0.1')
                    ? 'http://localhost/gatla-foundation/api'
                    : 'https://gatlafoundation.org/api';

                const response = await fetch(`${apiUrl}/get_blogs.php?status=Published`);
                if (!response.ok) throw new Error('Failed to fetch post');

                const data = await response.json();
                const found = data.find(p => p.id === id || p.id === parseInt(id));

                if (found) {
                    setPost(found);
                } else {
                    setError('Post not found');
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#050914] flex items-center justify-center text-amber-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
    );

    if (error || !post) return (
        <div className="min-h-screen bg-[#050914] pt-32 px-4 text-center">
            <h2 className="text-2xl text-white mb-4">Post not found</h2>
            <button onClick={() => onNavigate('Home')} className="text-amber-500 hover:text-amber-400 font-bold">Back to Home</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8f9fa] md:bg-[#050914] pt-4 md:pt-12 pb-20 font-sans">

            {/* Navigation Breadcrumb - Outside the card on desktop */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <button
                    onClick={() => onNavigate('Home')}
                    className="flex items-center text-sm font-bold text-slate-500 md:text-slate-400 hover:text-amber-500 transition-colors uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
                </button>
            </div>

            {/* Main Content Card */}
            <article className="max-w-5xl mx-auto bg-white rounded-none md:rounded-2xl shadow-xl overflow-hidden min-h-[80vh]">

                {/* Featured Image - Standard Aspect Ratio */}
                {post.image_path && (
                    <div className="w-full h-64 md:h-[500px] overflow-hidden relative group">
                        <img
                            src={post.image_path.startsWith('http') ? post.image_path : `https://gatlafoundation.org/api/uploads/${post.image_path}`}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                    </div>
                )}

                {/* Content Body */}
                <div className="px-6 py-8 md:px-16 md:py-12">

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 font-medium">
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {post.category}
                        </span>
                        <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                            {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-slate-400" />
                            Admin
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Separator */}
                    <hr className="border-slate-100 mb-10" />

                    {/* The Article Text */}
                    <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </div>

                    {/* Footer / Share */}
                    <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
                        <div className="text-slate-400 text-sm italic">
                            Gatla Foundation • Excellence in Service
                        </div>
                        <button className="flex items-center text-slate-600 hover:text-amber-600 font-bold transition-colors space-x-2 text-sm uppercase tracking-wider">
                            <Share2 className="w-4 h-4" /> <span>Share Story</span>
                        </button>
                    </div>

                </div>
            </article>

            {/* Footer Space for aesthetics */}
            <div className="h-20"></div>
        </div>
    );
};

export default BlogPost;
