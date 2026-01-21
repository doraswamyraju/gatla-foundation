import React, { useState } from 'react';
import { UserPlus, Save } from 'lucide-react';

const SupporterForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '', fatherName: '', address: '', phone: '', email: '',
        aadhar: '', pan: '', qualification: '', occupation: '',
        areasOfInterest: [],
        supportMode: []
    });
    const [loading, setLoading] = useState(false);

    const interestOptions = ['Education', 'Sports', 'Music', 'Business', 'Awards'];
    const supportModeOptions = ['Physical Participation', 'Donation'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e, field) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const distinctValues = new Set(prev[field]);
            if (checked) distinctValues.add(value);
            else distinctValues.delete(value);
            return { ...prev, [field]: Array.from(distinctValues) };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/submit_supporter.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const text = await response.text();
            try {
                const result = JSON.parse(text);
                if (result.status === 'success') {
                    alert(result.message);
                    if (onClose) onClose();
                } else {
                    alert("Error: " + result.message);
                }
            } catch (jsonError) {
                console.error("Server Response:", text);
                alert("Server Error. Check console.");
            }
        } catch (error) {
            console.error(error);
            alert("Network Error");
        }
        setLoading(false);
    };

    return (
        <div className="w-full bg-[#0B1120] text-white">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-amber-500" /> Become a Supporter
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Support our pillars of excellence</p>
                </div>
            </div>

            <div className="p-6 h-[70vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="fullName" value={formData.fullName} placeholder="Full Name" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <input required name="fatherName" value={formData.fatherName} placeholder="Father Name" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                    </div>

                    <textarea required name="address" value={formData.address} rows="2" placeholder="Full Address" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none"></textarea>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="phone" value={formData.phone} type="tel" placeholder="Phone No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <input required name="email" value={formData.email} type="email" placeholder="Email ID" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="aadhar" value={formData.aadhar} placeholder="Aadhar No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <input required name="pan" value={formData.pan} placeholder="PAN Card No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="qualification" value={formData.qualification} placeholder="Qualification" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <input required name="occupation" value={formData.occupation} placeholder="Occupation" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                    </div>

                    {/* Checkboxes Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <label className="block text-sm font-bold text-amber-500 mb-3">Areas of Interest</label>
                            <div className="flex flex-col gap-2">
                                {interestOptions.map(opt => (
                                    <label key={opt} className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white">
                                        <input type="checkbox" value={opt} checked={formData.areasOfInterest.includes(opt)} onChange={(e) => handleCheckboxChange(e, 'areasOfInterest')} className="accent-amber-500 w-4 h-4 rounded" />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <label className="block text-sm font-bold text-amber-500 mb-3">Support Through</label>
                            <div className="flex flex-col gap-2">
                                {supportModeOptions.map(opt => (
                                    <label key={opt} className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white">
                                        <input type="checkbox" value={opt} checked={formData.supportMode.includes(opt)} onChange={(e) => handleCheckboxChange(e, 'supportMode')} className="accent-amber-500 w-4 h-4 rounded" />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition-all flex justify-center items-center gap-2">
                        {loading ? 'Submitting...' : <><Save className="w-5 h-5" /> Submit Supporter Form</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SupporterForm;
