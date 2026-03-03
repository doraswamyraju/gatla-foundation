import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const EventsPreview = ({ onNavigate }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/get_events.php`)
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error(err));
    }, []);

    // Filter Logic for Upcoming Only
    const today = new Date().toISOString().split('T')[0];
    const upcomingEvents = events.filter(e => {
        const endDate = e.end_date || e.event_date;
        return endDate >= today;
    }).sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
        .slice(0, 3); // Top 3 only

    if (events.length === 0) return <div className="h-0 opacity-0"></div>; // prevents IntersectionObserver issues
    if (upcomingEvents.length === 0) return null; // Don't show section if no upcoming events

    return (
        <section className="bg-[#050914] py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2">Upcoming Activities</h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">Events & Announcements</h3>
                    </div>
                    <button
                        onClick={() => onNavigate('events')}
                        className="hidden md:flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                        View All Events <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map(evt => (
                        <div
                            key={evt.id}
                            className="group bg-[#0B1120] border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-amber-500/50 hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={evt.image_path.startsWith('http') ? evt.image_path : `https://gatlafoundation.org/${evt.image_path}`} alt={evt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 bg-amber-500 text-[#0B1120] px-3 py-1 rounded font-bold text-xs uppercase tracking-wider">
                                    Upcoming
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col gap-2 text-xs text-slate-400 mb-4">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                        {evt.event_date}
                                        {(evt.end_date &&
                                            evt.end_date !== '0000-00-00' &&
                                            evt.end_date !== evt.event_date)
                                            ? ` - ${evt.end_date}` : ''}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-amber-500" /> {evt.event_time}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">{evt.title}</h3>
                                <p className="text-sm text-slate-400 flex items-center gap-2 mb-4"><MapPin className="w-4 h-4 text-amber-500 shrink-0" /> <span className="truncate">{evt.location}</span></p>
                                <button onClick={() => onNavigate('events')} className="w-full text-center border border-slate-700 text-slate-300 py-2 rounded-lg text-xs font-bold uppercase tracking-wider group-hover:border-amber-500 group-hover:text-amber-500 transition-colors">
                                    View Full Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <button
                        onClick={() => onNavigate('events')}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                        View All Events <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EventsPreview;
