import React, { useState, useEffect } from 'react';
import { UserPlus, Save } from 'lucide-react';

const VolunteerForm = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', address: '', phone: '', email: '',
    aadhar: '', pan: '', qualification: '', occupation: '',
    availability: '', startDate: '', endDate: '', // CHANGED: startDate/endDate instead of preferredTime
    clubPreference: 'Education Club'
  });
  const [files, setFiles] = useState({ aadhaarFile: null, photoFile: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        clubPreference: initialData.clubPreference || 'Education Club'
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Combine Dates for Backend Compatibility
    const combinedPreferredTime = `From ${formData.startDate} To ${formData.endDate}`;

    // switch to FormData for file upload
    const payload = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'startDate' && key !== 'endDate') {
        payload.append(key, formData[key]);
      }
    });
    // Append the combined field
    payload.append('preferredTime', combinedPreferredTime);

    if (files.aadhaarFile) payload.append('aadhaarFile', files.aadhaarFile);
    if (files.photoFile) payload.append('photoFile', files.photoFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/submit_volunteer.php`, {
        method: 'POST',
        // headers: { 'Content-Type': 'multipart/form-data' }, // DO NOT SET CONTENT-TYPE MANUALLY WITH FORMDATA
        body: payload
      });

      const text = await response.text();

      try {
        const result = JSON.parse(text);

        if (result.status === 'success') {
          alert("Application Submitted Successfully!");
          if (onClose) onClose();
          else window.location.reload();
        } else {
          alert("Error: " + result.message);
        }
      } catch (jsonError) {
        console.error("Server Crash:", text);
        const cleanError = text.replace(/<[^>]*>?/gm, '').substring(0, 200);
        alert("Server Error: " + cleanError);
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
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-amber-500" /> Volunteer Registration
          </h2>
          <p className="text-xs text-slate-400 mt-1">Join us in making a difference</p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Club Preference */}
          <div className="bg-slate-900/50 p-4 rounded-lg border border-amber-500/30">
            <label className="block text-sm font-bold text-amber-500 mb-2">I want to volunteer for:</label>
            <div className="flex flex-wrap gap-4">
              {['Education Club', 'Cricket Club', 'Music Club', 'Business Club', 'Awards Club', 'General'].map(club => (
                <label key={club} className="flex items-center gap-2 text-white cursor-pointer">
                  <input type="radio" name="clubPreference" value={club} checked={formData.clubPreference === club} onChange={handleChange} className="accent-amber-500 w-4 h-4" /> {club}
                </label>
              ))}
            </div>
          </div>

          {/* Fields */}
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

          {/* NEW FIELDS: Availability & Files */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Availability (Days/Hours)</label>
              <input required name="availability" value={formData.availability} placeholder="e.g. Weekends" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Starting Date</label>
              <input required type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ending Date</label>
              <input required type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
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

          <button type="submit" disabled={loading} className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition-all flex justify-center items-center gap-2">
            {loading ? 'Submitting...' : <><Save className="w-5 h-5" /> Submit Application</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;