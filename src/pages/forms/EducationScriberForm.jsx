import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

const EducationScriberForm = ({ onClose, initialData, onSaveSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    full_name: '',
    father_name: '',
    phone_no: '',
    email_id: '',
    aadhaar_no: '',
    address: '',
    qualification: '',
    occupation: '',
    subjects_of_interest: '',
    present_location: '',
    ...initialData
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = new FormData();
    Object.keys(formData).forEach(key => payload.append(key, formData[key]));

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const baseUrl = isLocal ? 'http://localhost/gatla-foundation/api' : 'https://gatlafoundation.org/api';
      const apiUrl = `${baseUrl}/submit_education_scriber.php`;

      const response = await fetch(apiUrl, { method: 'POST', body: payload });
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
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white text-slate-800">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label><input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Father Name</label><input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile No</label><input type="tel" name="phone_no" required value={formData.phone_no} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email ID</label><input type="email" name="email_id" value={formData.email_id} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Aadhaar No</label><input type="text" name="aadhaar_no" value={formData.aadhaar_no} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Present Location</label><input type="text" name="present_location" value={formData.present_location} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
        <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Address</label><textarea name="address" rows="2" value={formData.address} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
      </div>

      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 pt-2 mb-2">Professional Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Qualification</label><input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Occupation</label><input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
        <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subjects Interested</label><textarea name="subjects_of_interest" rows="2" value={formData.subjects_of_interest} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none bg-white" /></div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md flex items-center gap-2">{isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}{initialData ? 'Update Scribe' : 'Add Scribe'}</button>
      </div>
    </form>
  );
};

export default EducationScriberForm;