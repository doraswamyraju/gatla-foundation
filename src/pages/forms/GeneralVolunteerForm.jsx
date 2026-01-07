import React, { useState } from 'react';
import { Save, Loader2, UploadCloud } from 'lucide-react';

const GeneralVolunteerForm = ({ onClose, initialData, onSaveSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    fatherName: '',
    phone: '',
    email: '',
    address: '',
    aadhar: '',        // New Field
    qualification: '', // New Field
    occupation: '',    // New Field
    interest: 'General Help', // New Field
    availability: 'Weekends',
    preferredTime: '',
    ...initialData
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => { if (e.target.files[0]) setFile(e.target.files[0]); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = new FormData();
    Object.keys(formData).forEach(key => payload.append(key, formData[key]));
    if (file) payload.append('document', file);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost/gatla-foundation/api';
      const response = await fetch(`${apiUrl}/submit_general_volunteer.php`, {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Row 1 */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
          <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Father Name</label>
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>

        {/* Row 2 */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email ID</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>

        {/* Row 3 (New Fields) */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Aadhar Card No</label>
          <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Qualification</label>
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>

        {/* Row 4 (New Fields) */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Occupation</label>
          <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Area of Interest</label>
          <select name="interest" value={formData.interest} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none">
            <option value="General Help">General Help</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Row 5 */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Availability</label>
          <select name="availability" value={formData.availability} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none">
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Events Only">Events Only</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preferred Time</label>
          <input type="datetime-local" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>

        {/* Full Width */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Address</label>
          <textarea name="address" rows="2" value={formData.address} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" />
        </div>

        <div className="md:col-span-2">
           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Upload Document (ID/Photo)</label>
           <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer relative">
              <UploadCloud className="w-8 h-8 mb-2 text-amber-500" />
              <span className="text-sm font-bold text-slate-600">
                  {file ? file.name : (formData.document_path ? "File Already Uploaded (Upload to Replace)" : "Click to Upload Document")}
              </span>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
           </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md flex items-center gap-2">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData ? 'Update Volunteer' : 'Add Volunteer'}
        </button>
      </div>
    </form>
  );
};

export default GeneralVolunteerForm;