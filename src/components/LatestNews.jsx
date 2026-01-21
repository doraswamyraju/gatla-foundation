import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';

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
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading || error || news.length === 0) {
        return null; // Don't show section if no news or error
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                            {item.image_path && (
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={item.image_path.startsWith('http') ? item.image_path : `https://gatlafoundation.org/api/uploads/${item.image_path}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mr-3">
                                        {item.category}
                                    </span>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(item.created_at).toLocaleDateString()}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3 input-content flex-1">
                                    {/* Simple text rendering, could be improved if HTML content is stored */}
                                    {item.content.substring(0, 150)}...
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center group">
                                        Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
