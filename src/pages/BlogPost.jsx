import React, { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, User, Share2 } from 'lucide-react';

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

                // We'll fetch all and find by ID, or if API supports get_blog.php?id=X (we only have get_blogs.php currently)
                // Let's assume we can fetch all and filter, or update get_blogs to filter by ID.
                // For now, let's fetch all (since dataset is small) or check if get_blogs params.

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
        <div className="min-h-screen bg-[#050914] text-slate-300 font-sans selection:bg-amber-500/30">

            {/* Scroll Progress Bar (Optional, can add later) */}

            {/* Hero Section */}
            <div className="relative w-full h-[60vh] md:h-[70vh]">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    {post.image_path && (
                        <img
                            src={post.image_path.startsWith('http') ? post.image_path : `https://gatlafoundation.org/api/uploads/${post.image_path}`}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/60 to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-10 max-w-5xl mx-auto">
                    <button
                        onClick={() => onNavigate('Home')}
                        className="mb-6 flex items-center text-sm font-bold text-amber-500 hover:text-white transition-colors uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
                    </button>

                    <div className="flex flex-wrap gap-3 mb-4">
                        <span className="bg-amber-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-lg">
                            {post.category}
                        </span>
                        <span className="bg-slate-800/80 backdrop-blur text-slate-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm flex items-center">
                            <Calendar className="w-3 h-3 mr-2 text-amber-500" />
                            {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight shadow-sm mb-4">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <div className="prose prose-lg prose-invert prose-amber max-w-none">
                    {/* Content rendering - preserving line breaks */}
                    <div className="text-lg leading-relaxed md:text-xl text-slate-300 whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>

                {/* Share / Footer of Post */}
                <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center">
                    <div className="text-slate-500 text-sm">
                        Posted by <span className="text-amber-500">Admin</span>
                    </div>
                    <button className="flex items-center text-slate-400 hover:text-white transition-colors space-x-2">
                        <Share2 className="w-4 h-4" /> <span>Share this story</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default BlogPost;
