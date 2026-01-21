import React, { useState, useEffect } from 'react';
import { UserPlus, Save } from 'lucide-react';

const VolunteerForm = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', address: '', phone: '', email: '',
    aadhar: '', pan: '', qualification: '', occupation: '',
    clubPreference: 'Education Club'
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Make Request
      const response = await fetch(`${process.env.REACT_APP_API_URL}/submit_volunteer.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // 2. Get Raw Text (To debug HTML errors)
      const text = await response.text();

      try {
        // 3. Attempt to Parse JSON
        const result = JSON.parse(text);

        if (result.status === 'success') {
          alert("Application Submitted Successfully!");
          if (onClose) onClose();
          else window.location.reload();
        } else {
          // Show specific database error
          alert("Error: " + result.message);
        }
      } catch (jsonError) {
        // 4. If JSON parse fails, it means PHP crashed. Show the HTML error.
        console.error("Server Crash:", text);
        // Strip HTML tags for a cleaner alert
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

          <button type="submit" disabled={loading} className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition-all flex justify-center items-center gap-2">
            {loading ? 'Submitting...' : <><Save className="w-5 h-5" /> Submit Application</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;