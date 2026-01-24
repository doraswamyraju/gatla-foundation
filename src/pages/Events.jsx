import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, X, ArrowRight } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/get_events.php`)
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error(err));
    }, []);

    // Filter Logic
    const today = new Date().toISOString().split('T')[0];
    const upcomingEvents = events.filter(e => e.event_date >= today).sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
    const pastEvents = events.filter(e => e.event_date < today).sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

    const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

    return (
        <div className="bg-[#050914] min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Events & Announcements</h1>
                    <p className="text-slate-400">Stay updated with our latest activities and completed missions.</p>
                </div>

                {/* TABS */}
                <div className="flex justify-center gap-6 mb-12 border-b border-slate-800 pb-1">
                    {['upcoming', 'past'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab
                                ? 'text-amber-500 border-b-2 border-amber-500'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {tab === 'past' ? 'Completed Events' : 'Upcoming Events'}
                        </button>
                    ))}
                </div>

                {/* GRID */}
                {displayEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayEvents.map(evt => (
                            <div
                                key={evt.id}
                                onClick={() => setSelectedEvent(evt)}
                                className="group bg-[#0B1120] border border-slate-800 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/50 hover:-translate-y-1 transition-all shadow-lg hover:shadow-2xl"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={`${process.env.PUBLIC_URL}/${evt.image_path}`} alt={evt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-amber-500 text-[#0B1120] px-3 py-1 rounded font-bold text-xs uppercase tracking-wider">
                                        {activeTab === 'upcoming' ? 'Upcoming' : 'Completed'}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-amber-500" /> {evt.event_date}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> {evt.event_time}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">{evt.title}</h3>
                                    <p className="text-sm text-slate-400 flex items-center gap-2 mb-4"><MapPin className="w-3 h-3" /> {evt.location}</p>
                                    <button className="text-amber-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                                        View Details <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#0B1120] rounded-xl border border-slate-800 border-dashed">
                        <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No {activeTab} events found</h3>
                        <p className="text-slate-400">Check back later for updates.</p>
                    </div>
                )}

                {/* DETAILS MODAL */}
                {selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-sm animate-in fade-in zoom-in duration-200" onClick={() => setSelectedEvent(null)}>
                        <div className="bg-[#0B1120] w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-6xl sm:rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>

                            {/* Image Side */}
                            <div className="md:w-1/2 h-64 md:h-auto relative shrink-0">
                                <img src={`${process.env.PUBLIC_URL}/${selectedEvent.image_path}`} alt={selectedEvent.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent md:bg-gradient-to-r" />
                            </div>

                            {/* Content Side */}
                            <div className="md:w-1/2 p-8 overflow-y-auto relative custom-scrollbar">
                                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white bg-slate-800/50 p-2 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="mb-6">
                                    <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-3 ${activeTab === 'upcoming' ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-300'}`}>
                                        {activeTab === 'upcoming' ? 'Upcoming Event' : 'Completed Event'}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{selectedEvent.title}</h2>

                                    <div className="space-y-3 mb-6">
                                        <p className="flex items-center gap-3 text-slate-300"><Calendar className="w-5 h-5 text-amber-500 shrink-0" /> {selectedEvent.event_date}</p>
                                        <p className="flex items-center gap-3 text-slate-300"><Clock className="w-5 h-5 text-amber-500 shrink-0" /> {selectedEvent.event_time}</p>
                                        <p className="flex items-center gap-3 text-slate-300"><MapPin className="w-5 h-5 text-amber-500 shrink-0" /> {selectedEvent.location}</p>
                                    </div>
                                </div>

                                <div className="prose prose-invert prose-lg max-w-none text-slate-300 border-t border-slate-800 pt-6">
                                    <p className="whitespace-pre-wrap leading-relaxed">{selectedEvent.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
