import React, { useState } from 'react';
import { Save, Loader2, User, FileText, Phone, CreditCard, Image } from 'lucide-react';

const CricketPlayerForm = ({ onClose, initialData, onSaveSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState({
    aadhaar_file: null,
    disability_cert_file: null,
    photo_file: null
  });

  const [formData, setFormData] = useState({
    id: '',
    full_name: '',
    father_name: '',
    address: '',
    phone_no: '',
    email_id: '',
    aadhaar_no: '',
    disability_cert_no: '',
    category: 'B1',
    aadhaar_path: '',
    disability_cert_path: '',
    photo_path: '',
    ...initialData
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [fieldName]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));

    // Append files if they exist
    if (files.aadhaar_file) data.append('aadhaar_file', files.aadhaar_file);
    if (files.disability_cert_file) data.append('disability_cert_file', files.disability_cert_file);
    if (files.photo_file) data.append('photo_file', files.photo_file);

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isLocal ? 'http://localhost/gatla-foundation/api/submit_cricket_player.php' : 'https://gatlafoundation.org/api/submit_cricket_player.php';

      const res = await fetch(apiUrl, { method: 'POST', body: data });
      const result = await res.json();

      if (result.status === 'success') {
        if (onSaveSuccess) onSaveSuccess();
        onClose();
      } else {
        alert(result.message || 'Submission failed');
      }
    } catch (err) {
      alert('Network Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFileInput = (label, name, currentPath, icon) => (
    <div className="space-y-1">
      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{label}</label>
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer relative transition-colors h-32">
        {icon}
        <span className="text-xs font-bold text-slate-600 mt-2 text-center">
          {files[name] ? files[name].name : (currentPath ? "File Uploaded (Click to Change)" : "Click to Upload")}
        </span>
        <input
          type="file"
          name={name}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => handleFileChange(e, name)}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white text-slate-900">

      {/* 1. Personal Information */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
          <User className="w-4 h-4" /> Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name *</label><input name="full_name" value={formData.full_name} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-amber-500 outline-none transition-colors" /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Father Name *</label><input name="father_name" value={formData.father_name} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-amber-500 outline-none transition-colors" /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role/Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-amber-500 outline-none transition-colors bg-white">
              <option value="B1">Category B1 (Totally Blind)</option>
              <option value="B2">Category B2 (Partially Blind)</option>
              <option value="B3">Category B3 (Low Vision)</option>
            </select>
          </div>
          <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Address *</label><textarea name="address" rows="2" value={formData.address} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-amber-500 outline-none transition-colors" /></div>
        </div>
      </div>

      {/* 2. Contact Details */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
          <Phone className="w-4 h-4" /> Contact Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile No *</label><input type="tel" name="phone_no" value={formData.phone_no} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-amber-500 outline-none transition-colors" /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email ID</label><input type="email" name="email_id" value={formData.email_id} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-amber-500 outline-none transition-colors" /></div>
        </div>
      </div>

      {/* 3. Documents & Proofs */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Documents & Proofs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Aadhaar No *</label><input name="aadhaar_no" value={formData.aadhaar_no} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-amber-500 outline-none transition-colors" /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Disability Cert No *</label><input name="disability_cert_no" value={formData.disability_cert_no} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-amber-500 outline-none transition-colors" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {renderFileInput("Upload Aadhaar", "aadhaar_file", formData.aadhaar_path, <CreditCard className="w-6 h-6 text-amber-500" />)}
          {renderFileInput("Disability Cert", "disability_cert_file", formData.disability_cert_path, <FileText className="w-6 h-6 text-amber-500" />)}
          {renderFileInput("Passport Photo", "photo_file", formData.photo_path, <Image className="w-6 h-6 text-amber-500" />)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md flex items-center gap-2 transition-transform active:scale-95">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData ? 'Update Player' : 'Register Player'}
        </button>
      </div>
    </form>
  );
};

export default CricketPlayerForm;