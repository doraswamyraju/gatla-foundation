import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, MapPin, Clock } from 'lucide-react';

const EventsManager = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '', description: '', eventDate: '', eventTime: '', location: ''
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => { fetchEvents(); }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${apiUrl}/get_events.php`);
            const data = await res.json();
            setEvents(data);
        } catch (error) { console.error(error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Image is required");

        setLoading(true);
        const payload = new FormData();
        Object.keys(formData).forEach(key => payload.append(key, formData[key]));
        payload.append('image', file);

        try {
            const res = await fetch(`${apiUrl}/add_event.php`, { method: 'POST', body: payload });
            const result = await res.json();
            if (result.status === 'success') {
                alert("Event Added!");
                setFormData({ title: '', description: '', eventDate: '', eventTime: '', location: '' });
                setFile(null);
                fetchEvents();
            } else { alert("Error: " + result.message); }
        } catch (error) { alert("Network Error"); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this event?")) return;
        await fetch(`${apiUrl}/delete_event.php`, { method: 'POST', body: JSON.stringify({ id }) });
        fetchEvents();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Calendar className="text-amber-500" /> Manage Events</h2>

            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-lg font-bold mb-4">Create New Event</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required name="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Event Title" className="border p-2 rounded" />
                    <input required name="location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Location" className="border p-2 rounded" />
                    <input required type="date" name="eventDate" value={formData.eventDate} onChange={e => setFormData({ ...formData, eventDate: e.target.value })} className="border p-2 rounded" />
                    <input required type="time" name="eventTime" value={formData.eventTime} onChange={e => setFormData({ ...formData, eventTime: e.target.value })} className="border p-2 rounded" />
                    <textarea required name="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Event Description/Details" className="md:col-span-2 border p-2 rounded h-24" />
                    <div className="md:col-span-2">
                        <label className="block text-sm text-slate-500 mb-1">Event Banner Image</label>
                        <input type="file" onChange={e => setFile(e.target.files[0])} className="border p-2 rounded w-full" />
                    </div>
                    <button type="submit" disabled={loading} className="md:col-span-2 bg-amber-500 text-white font-bold py-2 rounded">
                        {loading ? 'Adding...' : 'Add Event'}
                    </button>
                </form>
            </div>

            <div className="grid gap-4">
                {events.map(evt => (
                    <div key={evt.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <img src={`${process.env.PUBLIC_URL}/${evt.image_path}`} alt={evt.title} className="w-16 h-16 object-cover rounded" />
                            <div>
                                <h4 className="font-bold">{evt.title}</h4>
                                <p className="text-sm text-slate-500">{evt.event_date} @ {evt.event_time} | {evt.location}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(evt.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 className="w-5 h-5" /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsManager;
