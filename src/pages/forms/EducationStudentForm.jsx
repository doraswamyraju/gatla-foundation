import React, { useState } from 'react';
import { Save, Loader2, UploadCloud } from 'lucide-react';

const EducationStudentForm = ({ onClose, initialData, onSaveSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  
  // Initialize state (Empty for Add, Populated for Edit)
  const [formData, setFormData] = useState({
    id: '',
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
    ...initialData // Overwrite with existing data if editing
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => { if (e.target.files[0]) setFile(e.target.files[0]); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = new FormData();
    Object.keys(formData).forEach(key => payload.append(key, formData[key]));
    if (file) payload.append('disability_certificate', file);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost/gatla-foundation/api';
      const response = await fetch(`${apiUrl}/submit_education_student.php`, {
        method: 'POST',
        body: payload
      });
      
      const result = await response.json();
      if (result.status === 'success') {
        alert(initialData ? 'Updated Successfully!' : 'Added Successfully!');
        if (onSaveSuccess) onSaveSuccess();
        onClose();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      alert('Network Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      
      {/* 1. Personal Details */}
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Student Name</label>
          <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Father Name</label>
          <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile No</label>
          <input type="tel" name="phone_no" required value={formData.phone_no} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email ID</label>
          <input type="email" name="email_id" value={formData.email_id} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Aadhaar No</label>
          <input type="text" name="aadhaar_no" value={formData.aadhaar_no} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Address</label>
          <textarea name="address" rows="2" value={formData.address} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
      </div>

      {/* 2. Academic Details */}
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 pt-2 mb-2">Academic Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">College/School Name</label>
          <input type="text" name="school_college_name" value={formData.school_college_name} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Class/Year</label>
          <input type="text" name="current_class_year" value={formData.current_class_year} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">College Address</label>
          <textarea name="college_address" rows="2" value={formData.college_address} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
      </div>

      {/* 3. Exam & Disability Details */}
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 pt-2 mb-2">Exam & Disability</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Scriber Subject</label>
          <input type="text" name="scriber_subject" value={formData.scriber_subject} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Place of Exam</label>
          <input type="text" name="place_of_exam" value={formData.place_of_exam} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date of Exam</label>
          <input type="date" name="date_of_exam" value={formData.date_of_exam} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Disability Cert No</label>
          <input type="text" name="disability_cert_no" value={formData.disability_cert_no} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div className="md:col-span-2">
           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Upload Certificate</label>
           <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer relative">
              <UploadCloud className="w-8 h-8 mb-2 text-amber-500" />
              <span className="text-sm font-bold text-slate-600">
                  {file ? file.name : (formData.disability_certificate_path ? "File Uploaded (Click to Change)" : "Click to Upload Certificate")}
              </span>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
           </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md flex items-center gap-2">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData ? 'Update Student' : 'Add Student'}
        </button>
      </div>
    </form>
  );
};

export default EducationStudentForm;