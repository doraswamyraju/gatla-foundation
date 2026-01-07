import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Building, Calendar, FileText, Upload, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const EducationStudentForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form State - Matches MySQL Columns Exactly
  const [formData, setFormData] = useState({
    full_name: '',
    father_name: '',
    phone_no: '',
    email_id: '',
    aadhaar_no: '',
    age: '',
    address: '',
    school_college_name: '',
    current_class_year: '',
    college_address: '',
    scriber_subject: '',
    place_of_exam: '',
    date_of_exam: '',
    disability_cert_no: '',
    disability_certificate: null 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, disability_certificate: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Prepare Data
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // 2. Determine API URL (Dynamic)
      // Checks if we are on localhost or live server automatically
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const baseUrl = isLocal 
        ? 'http://localhost/gatla-foundation/api' 
        : 'https://gatlafoundation.org/api'; // Replace with your actual domain if different
      
      const apiUrl = `${baseUrl}/submit_education_student.php`;

      console.log("Submitting to:", apiUrl);
      console.log("Form Data:", Object.fromEntries(data));

      // 3. Send Request
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (result.status === 'success') {
        setSuccess(true);
        setTimeout(() => { if(onClose) onClose(); }, 3000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.message || 'Failed to connect to server. Check console for details.');
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
        <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
        <p className="text-slate-400">Your details have been recorded. We will contact you soon.</p>
        <button onClick={onClose} className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors">Close Form</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#0B1120] text-white w-full h-full max-h-full overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-800 bg-[#0B1120] shrink-0 z-10">
        <h2 className="text-2xl font-bold text-green-500 tracking-tight">Student Registration</h2>
        <p className="text-slate-500 text-sm mt-1">Education Club - For Visually Impaired Students</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 min-h-0">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* 1. PERSONAL INFORMATION */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest border-l-2 border-green-500 pl-3">1. Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Student Name *</label><input type="text" name="full_name" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Father Name *</label><input type="text" name="father_name" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Mobile No *</label><input type="tel" name="phone_no" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Email ID</label><input type="email" name="email_id" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Aadhaar No</label><input type="text" name="aadhaar_no" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Age</label><input type="number" name="age" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="md:col-span-2 space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Full Address *</label><textarea name="address" rows="2" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
          </div>
        </div>

        {/* 2. ACADEMIC DETAILS */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest border-l-2 border-green-500 pl-3">2. Academic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">College/School Name</label><input type="text" name="school_college_name" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Class / Year</label><input type="text" name="current_class_year" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="md:col-span-2 space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">College Address</label><input type="text" name="college_address" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
          </div>
        </div>

        {/* 3. EXAM & DISABILITY */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest border-l-2 border-green-500 pl-3">3. Exam & Disability Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Subject for Scribe</label><input type="text" name="scriber_subject" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Place of Exam</label><input type="text" name="place_of_exam" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Date of Exam</label><input type="date" name="date_of_exam" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none text-slate-300" /></div>
            <div className="space-y-1"><label className="text-xs font-medium text-slate-400 ml-1">Disability Cert No</label><input type="text" name="disability_cert_no" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" /></div>
            
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-400 ml-1">Upload Disability Certificate</label>
              <label className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-green-500/50 hover:bg-slate-900 transition-all cursor-pointer group">
                <input type="file" name="disability_certificate" className="hidden" onChange={handleFileChange} />
                <Upload className="w-8 h-8 text-slate-500 mb-2 group-hover:text-green-500 transition-colors" />
                <p className="text-xs text-slate-500 group-hover:text-slate-300">
                  {formData.disability_certificate ? `Selected: ${formData.disability_certificate.name}` : "Click to upload document"}
                </p>
              </label>
            </div>
          </div>
        </div>

        <div className="pb-4"><button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Application'}</button></div>
      </form>
    </div>
  );
};

export default EducationStudentForm;