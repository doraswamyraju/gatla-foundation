import React, { useState } from 'react';
import { Award, Save, UploadCloud } from 'lucide-react';

const AwardsApplicationForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '', fatherName: '', address: '', phone: '', email: '',
        aadhar: '', disabilityCategory: '', occupation: '', experience: '', achievement: ''
    });
    const [files, setFiles] = useState({
        aadhaarFile: null, disabilityFile: null, pressClipsFile: null, biodataFile: null, photoFile: null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setFiles({ ...files, [e.target.name]: e.target.files[0] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = new FormData();
        Object.keys(formData).forEach(key => payload.append(key, formData[key]));
        Object.keys(files).forEach(key => {
            if (files[key]) payload.append(key, files[key]);
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/submit_awards_application.php`, {
                method: 'POST',
                body: payload
            });
            const result = await response.json();
            if (result.status === 'success') {
                alert("Application Submitted Successfully!");
                if (onClose) onClose();
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            alert("Network Error");
        }
        setLoading(false);
    };

    return (
        <div className="w-full bg-[#0B1120] text-white">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" /> Awards Nomination Form
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Apply for the Gatla Awards</p>
                </div>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="fullName" placeholder="Full Name" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <input required name="fatherName" placeholder="Father Name" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="phone" type="tel" placeholder="Phone No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <input required name="email" type="email" placeholder="Email ID" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                    </div>
                    <textarea required name="address" rows="2" placeholder="Full Address" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none"></textarea>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="aadhar" placeholder="Aadhaar No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <select name="disabilityCategory" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-slate-300 p-3 rounded-lg focus:border-amber-500 outline-none">
                            <option value="">Select Disability Category</option>
                            <option value="General">General</option>
                            <option value="Blind">Blind</option>
                            <option value="Deaf & Dumb">Deaf & Dumb</option>
                            <option value="Physical Handicap">Physical Handicap</option>
                            <option value="Wheel Chair">Wheel Chair</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select name="occupation" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-slate-300 p-3 rounded-lg focus:border-amber-500 outline-none">
                            <option value="">Select Occupation</option>
                            <option value="Education">Education</option>
                            <option value="Business">Business</option>
                            <option value="Sports">Sports</option>
                            <option value="Service">Service</option>
                            <option value="Other">Other</option>
                        </select>
                        <input required name="experience" placeholder="Experience" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
                    </div>

                    <textarea required name="achievement" rows="3" placeholder="Achievements (Describe briefly)" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none"></textarea>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Aadhaar Card</label>
                            <input type="file" name="aadhaarFile" onChange={handleFileChange} className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2 rounded-lg text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Disability Certificate</label>
                            <input type="file" name="disabilityFile" onChange={handleFileChange} className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2 rounded-lg text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Passport Photo</label>
                            <input type="file" name="photoFile" onChange={handleFileChange} className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2 rounded-lg text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Press Clips (Optional)</label>
                            <input type="file" name="pressClipsFile" onChange={handleFileChange} className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2 rounded-lg text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Biodata / Resume</label>
                            <input type="file" name="biodataFile" onChange={handleFileChange} className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2 rounded-lg text-sm" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition-all flex justify-center items-center gap-2">
                        {loading ? 'Submitting...' : <><Save className="w-5 h-5" /> Submit Application</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AwardsApplicationForm;
