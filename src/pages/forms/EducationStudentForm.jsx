import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Building, Calendar, FileText, Upload, Shield, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const EducationStudentForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // FIX: URL uses %20 to handle spaces in folder name safely
      const response = await fetch('http://localhost/gatla-foundation%20-%20Copy/api/submit_education_student.php', {
        method: 'POST',
        body: data
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSuccess(true);
        setTimeout(() => {
          onClose(); // Close modal
          window.location.reload(); // Reload to see new data
        }, 2000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to connect. Ensure XAMPP is running.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center text-white">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
        <p className="text-slate-400">The student record has been saved successfully.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0B1120] text-white">
      <div className="px-8 py-6 border-b border-slate-800 bg-[#0B1120]">
        <h2 className="text-2xl font-bold text-green-500 tracking-tight">Student Form</h2>
        <p className="text-slate-500 text-sm mt-1">Please fill in all details accurately</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
        
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
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Student Name</label>
              <input type="text" name="full_name" placeholder="Enter Name" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Father Name</label>
              <input type="text" name="father_name" placeholder="Enter Father Name" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Mobile No</label>
              <input type="tel" name="phone_no" placeholder="Enter Mobile" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Email ID</label>
              <input type="email" name="email_id" placeholder="Enter Email" onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Aadhaar No</label>
              <input type="text" name="aadhaar_no" placeholder="Enter Aadhaar" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Age</label>
              <input type="number" name="age" placeholder="Age" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-400 ml-1">Full Address</label>
              <input type="text" name="address" placeholder="Enter Address" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
          </div>
        </div>

        {/* 2. ACADEMIC DETAILS */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest border-l-2 border-green-500 pl-3">2. Academic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">College Name</label>
              <input type="text" name="school_college_name" placeholder="Enter College" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Year of Study</label>
              <input type="text" name="current_class_year" placeholder="Enter Year" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-400 ml-1">College Address</label>
              <input type="text" name="college_address" placeholder="Enter College Address" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
          </div>
        </div>

        {/* 3. EXAMINATION & DISABILITY DETAILS */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest border-l-2 border-green-500 pl-3">3. Exam & Disability Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Scriber Subject</label>
              <input type="text" name="scriber_subject" placeholder="Enter Subject" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Place of Exam</label>
              <input type="text" name="place_of_exam" placeholder="Enter Place" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Date of Exam</label>
              <input type="date" name="date_of_exam" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none text-slate-300" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Cert No</label>
              <input type="text" name="disability_cert_no" placeholder="Certificate No" required onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-sm focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-400 ml-1">Upload Certificate</label>
              <label className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-green-500/50 hover:bg-slate-900 transition-all cursor-pointer group">
                <input type="file" name="disability_certificate" className="hidden" onChange={handleFileChange} />
                <Upload className="w-8 h-8 text-slate-500 mb-2 group-hover:text-green-500 transition-colors" />
                <p className="text-xs text-slate-500 group-hover:text-slate-300">
                  {formData.disability_certificate ? `Selected: ${formData.disability_certificate.name}` : "Click to upload"}
                </p>
              </label>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default EducationStudentForm;