import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, BookOpen, Briefcase, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const EducationScriberForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    father_name: '',
    phone_no: '',
    email_id: '',
    aadhaar_no: '',
    address: '',
    qualification: '',
    occupation: '',
    subjects_of_interest: '',
    present_location: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));

      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const baseUrl = isLocal ? 'http://localhost/gatla-foundation/api' : 'https://gatlafoundation.org/api'; 
      const apiUrl = `${baseUrl}/submit_education_scriber.php`;

      const response = await fetch(apiUrl, { method: 'POST', body: data });
      const result = await response.json();

      if (result.status === 'success') {
        setSuccess(true);
        setTimeout(() => { if(onClose) onClose(); }, 3000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center text-white min-h-[400px]">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
        <p className="text-slate-400">Thank you for volunteering as a scribe.</p>
        <button onClick={onClose} className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors">Close Form</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#0B1120] text-white w-full h-full max-h-full overflow-hidden">
      {/* Header - EXACTLY MATCHING STUDENT FORM */}
      <div className="px-8 py-6 border-b border-slate-800 bg-[#0B1120] shrink-0 z-10">
        <h2 className="text-2xl font-bold text-green-500 tracking-tight">Scribe Registration</h2>
        <p className="text-slate-500 text-sm mt-1">Volunteer to write exams for visually impaired students</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 min-h-0">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* 1. PERSONAL INFO */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest border-l-2 border-green-500 pl-3">1. Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Full Name *</label><input type="text" name="full_name" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Father Name *</label><input type="text" name="father_name" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Mobile No *</label><input type="tel" name="phone_no" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Email ID</label><input type="email" name="email_id" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Aadhaar No</label><input type="text" name="aadhaar_no" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Present Location</label><input type="text" name="present_location" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="md:col-span-2 space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Full Address *</label><textarea name="address" rows="2" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
          </div>
        </div>

        {/* 2. QUALIFICATION & INTEREST */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest border-l-2 border-green-500 pl-3">2. Qualification & Interest</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Qualification</label><input type="text" name="qualification" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Occupation</label><input type="text" name="occupation" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="md:col-span-2 space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Subjects Interested to Scribe</label><textarea name="subjects_of_interest" rows="2" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
          </div>
        </div>

        <div className="pb-4"><button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Application'}</button></div>
      </form>
    </div>
  );
};

export default EducationScriberForm;