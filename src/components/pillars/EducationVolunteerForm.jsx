import React, { useState } from 'react';
import { UserPlus, Save } from 'lucide-react';

const EducationVolunteerForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', address: '', phone: '', email: '',
    aadhar: '', pan: '', qualification: '', occupation: '',
    availability: '', startDate: '', endDate: '',
    clubPreference: 'Education Club' // Hardcoded
  });

  const [files, setFiles] = useState({ aadhaarFile: null, photoFile: null });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    Object.keys(formData).forEach(key => payload.append(key, formData[key]));

    if (files.aadhaarFile) payload.append('aadhaarFile', files.aadhaarFile);
    if (files.photoFile) payload.append('photoFile', files.photoFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/submit_volunteer.php`, {
        method: 'POST',
        body: payload
      });

      const text = await response.text();
      try {
        const result = JSON.parse(text);
        if (result.status === 'success') {
          alert("Education Volunteer Application Submitted Successfully!");
          if (onClose) onClose();
        } else {
          alert("Error: " + result.message);
        }
      } catch (jsonError) {
        console.error("Server Crash:", text);
        alert("Server Error");
      }
    } catch (error) {
      console.error(error);
      alert("Network Connection Error");
    }
    setLoading(false);
  };

  return (
    <div className="w-full bg-[#0B1120] text-white">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-green-500 flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> Education Volunteer Registration
          </h2>
          <p className="text-xs text-slate-400 mt-1">Join the Education Wing</p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required name="fullName" value={formData.fullName} placeholder="Full Name" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
            <input required name="fatherName" value={formData.fatherName} placeholder="Father Name" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
          </div>

          <textarea required name="address" value={formData.address} rows="2" placeholder="Full Address" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none"></textarea>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required name="phone" value={formData.phone} type="tel" placeholder="Phone No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
            <input required name="email" value={formData.email} type="email" placeholder="Email ID" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required name="aadhar" value={formData.aadhar} placeholder="Aadhar No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
            <input required name="pan" value={formData.pan} placeholder="PAN Card No" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required name="qualification" value={formData.qualification} placeholder="Qualification" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
            <input required name="occupation" value={formData.occupation} placeholder="Occupation" onChange={handleChange} className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Availability (Days/Hours)</label>
              <input required name="availability" value={formData.availability} placeholder="e.g. Weekends" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Starting Date</label>
              <input required type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ending Date</label>
              <input required type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-green-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Upload Aadhaar (PDF/Image)</label>
              <input type="file" name="aadhaarFile" accept="image/*,.pdf" onChange={handleFileChange} className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Passport Size Photo</label>
              <input type="file" name="photoFile" accept="image/*" onChange={handleFileChange} className="w-full bg-slate-900 border border-slate-700 text-slate-300 p-2 rounded-lg text-sm" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-green-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-green-400 transition-all flex justify-center items-center gap-2">
            {loading ? 'Submitting...' : <><Save className="w-5 h-5" /> Submit Application</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EducationVolunteerForm;