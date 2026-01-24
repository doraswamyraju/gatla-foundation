import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Upload, Award } from 'lucide-react';

const AwardWinnersManager = () => {
    const [winners, setWinners] = useState([]);
    const [formData, setFormData] = useState({
        awardType: 'Gatla Platinum Medal',
        category: 'Blind',
        year: new Date().getFullYear(),
        winnerName: '',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchWinners();
    }, []);

    const fetchWinners = async () => {
        try {
            const res = await fetch(`${apiUrl}/get_award_winners.php`);
            const data = await res.json();
            setWinners(data);
        } catch (error) {
            console.error("Error fetching winners:", error);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Image is required");

        setLoading(true);
        const payload = new FormData();
        Object.keys(formData).forEach(key => payload.append(key, formData[key]));
        payload.append('image', file);

        try {
            const res = await fetch(`${apiUrl}/add_award_winner.php`, {
                method: 'POST',
                body: payload
            });
            const result = await res.json();
            if (result.status === 'success') {
                alert("Winner Added!");
                setFormData({ ...formData, winnerName: '', description: '' });
                setFile(null);
                fetchWinners();
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            alert("Network Error");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this winner?")) return;
        try {
            await fetch(`${apiUrl}/delete_award_winner.php`, {
                method: 'POST',
                body: JSON.stringify({ id })
            });
            fetchWinners();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="text-amber-500" /> Manage Award Winners
            </h2>

            <div className="bg-[#0B1120] p-6 rounded-lg border border-slate-700 mb-8">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Add New Winner</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <select name="awardType" value={formData.awardType} onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded">
                        <option>Gatla Platinum Medal</option>
                        <option>Gatla Gold Medal</option>
                        <option>Gatla Silver Medal</option>
                        <option>Gatla Bronze Medal</option>
                    </select>

                    <select name="category" value={formData.category} onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded">
                        <option>Blind</option>
                        <option>Deaf & Dumb</option>
                        <option>Physically Handicapped</option>
                        <option>Wheel Chair</option>
                    </select>

                    <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" className="bg-slate-900 border border-slate-700 text-white p-3 rounded" />
                    <input type="text" name="winnerName" value={formData.winnerName} onChange={handleChange} placeholder="Winner Name" required className="bg-slate-900 border border-slate-700 text-white p-3 rounded" />

                    <div className="md:col-span-2">
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description / Achievement" className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded h-20" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm text-slate-400 mb-1">Winner Photo</label>
                        <input type="file" onChange={handleFileChange} className="bg-slate-900 text-slate-300 p-2 rounded w-full border border-slate-700" />
                    </div>

                    <button type="submit" disabled={loading} className="md:col-span-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded flex justify-center items-center gap-2 transition-all">
                        {loading ? 'Uploading...' : <><Plus className="w-4 h-4" /> Add Winner</>}
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {winners.map(winner => (
                    <div key={winner.id} className="bg-[#0B1120] border border-slate-800 rounded-lg overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={`${process.env.PUBLIC_URL}/${winner.image_path}`} alt={winner.winner_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <button onClick={() => handleDelete(winner.id)} className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-4">
                            <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider block mb-1">
                                {winner.award_type} • {winner.year}
                            </span>
                            <h4 className="text-white font-bold text-lg">{winner.winner_name}</h4>
                            <p className="text-xs text-slate-400 mt-1">{winner.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AwardWinnersManager;
