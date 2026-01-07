import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const EducationVolunteerForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState({ aadhaar_file: null, photo_file: null });

  const [formData, setFormData] = useState({
    full_name: '', father_name: '', address: '', phone_no: '', email_id: '',
    aadhaar_no: '', qualification: '', occupation: '', area_of_interest: 'Education', availability: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFile = (e) => setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    if(files.aadhaar_file) data.append('aadhaar_file', files.aadhaar_file);
    if(files.photo_file) data.append('photo_file', files.photo_file);

    try {
      const isLocal = window.location.hostname === 'localhost';
      const apiUrl = isLocal ? 'http://localhost/gatla-foundation/api/submit_education_volunteer.php' : 'https://gatlafoundation.org/api/submit_education_volunteer.php';
      const res = await fetch(apiUrl, { method: 'POST', body: data });
      const result = await res.json();
      if (result.status === 'success') { setSuccess(true); setTimeout(onClose, 3000); }
      else throw new Error(result.message);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  if (success) return <div className="p-12 text-center text-white"><CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4"/><h3>Submitted Successfully!</h3></div>;

  return (
    <div className="flex flex-col bg-[#0B1120] text-white h-full overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-800"><h2 className="text-2xl font-bold text-green-500">Education Volunteer</h2></div>
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
        {error && <div className="bg-red-500/20 text-red-400 p-4 rounded">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" name="full_name" placeholder="Full Name *" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white" />
          <input type="text" name="father_name" placeholder="Father Name *" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white" />
          <input type="tel" name="phone_no" placeholder="Phone Number *" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white" />
          <input type="email" name="email_id" placeholder="Email ID" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white" />
          <input type="text" name="aadhaar_no" placeholder="Aadhaar No" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white" />
          <input type="text" name="qualification" placeholder="Qualification" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white" />
          <input type="text" name="occupation" placeholder="Occupation" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white" />
          
          <select name="area_of_interest" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white">
            <option value="Education">Education</option><option value="Sports">Sports</option><option value="Music">Music</option><option value="Business">Business</option><option value="Awards">Awards</option>
          </select>

          <input type="text" name="availability" placeholder="Available Date & Time" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white" />
          
          <textarea name="address" rows="2" placeholder="Full Address *" required onChange={handleChange} className="md:col-span-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white" />
          
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-slate-400 mb-1">Upload Aadhaar</label><input type="file" name="aadhaar_file" onChange={handleFile} className="text-sm text-slate-400" /></div>
            <div><label className="block text-xs text-slate-400 mb-1">Upload Photo</label><input type="file" name="photo_file" onChange={handleFile} className="text-sm text-slate-400" /></div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin"/> : 'Register as Volunteer'}
        </button>
      </form>
    </div>
  );
};
export default EducationVolunteerForm;