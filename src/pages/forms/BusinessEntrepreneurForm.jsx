import React, { useState } from 'react';
import { UserPlus, Save, Briefcase } from 'lucide-react';

const BusinessEntrepreneurForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '', fatherName: '', address: '', phone: '', email: '',
        aadhar: '', pan: '', companyName: '', companyAddress: '',
        experience: '', occupation: 'Employer'
    });
    const [files, setFiles] = useState({ aadhaarFile: null, photoFile: null });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setFiles({ ...files, [e.target.name]: e.target.files[0] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = new FormData();
        Object.keys(formData).forEach(key => payload.append(key, formData[key]));
        if (files.aadhaarFile) payload.append('aadhaarFile', files.aadhaarFile);
        if (files.photoFile) payload.append('photoFile', files.photoFile);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/submit_business_entrepreneur.php`, {
                method: 'POST',
                body: payload
            });
            const result = await response.json();
            if (result.status === 'success') {
                alert("Entrepreneur Registration Successful!");
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
                        <Briefcase className="w-5 h-5 text-red-500" /> Entrepreneur Registration
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Join the network</p>
                </div>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="fullName" placeholder="Full Name" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none" />
                        <input required name="fatherName" placeholder="Father Name" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="phone" type="tel" placeholder="Phone No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none" />
                        <input required name="email" type="email" placeholder="Email ID" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none" />
                    </div>
                    <textarea required name="address" rows="2" placeholder="Full Address" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none"></textarea>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="aadhar" placeholder="Aadhaar No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none" />
                        <input required name="pan" placeholder="PAN No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="companyName" placeholder="Company Name" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none" />
                        <input required name="experience" placeholder="Experience (Years)" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none" />
                    </div>

                    <textarea required name="companyAddress" rows="2" placeholder="Company Address" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none"></textarea>

                    <div>
                        <label className="block text-xs text-slate-400 mb-1">Occupation Type</label>
                        <select name="occupation" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-red-500 outline-none">
                            <option value="Employer">Employer</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Upload Aadhaar</label>
                            <input type="file" name="aadhaarFile" onChange={handleFileChange} className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2 rounded-lg text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Passport Photo</label>
                            <input type="file" name="photoFile" onChange={handleFileChange} className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2 rounded-lg text-sm" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-500 transition-all flex justify-center items-center gap-2">
                        {loading ? 'Submitting...' : <><Save className="w-5 h-5" /> Submit Application</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BusinessEntrepreneurForm;
