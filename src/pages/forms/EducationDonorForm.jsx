import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

const EducationDonorForm = ({ onClose, initialData, onSaveSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: '', full_name: '', email_id: '', phone_no: '', pan_no: '', amount: '',
    payment_id: 'MANUAL_ENTRY', support_purpose: 'Support Gatla Education Club', ...initialData
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    const data = JSON.stringify(formData);
    try {
      const isLocal = window.location.hostname === 'localhost';
      const apiUrl = isLocal ? 'http://localhost/gatla-foundation/api/submit_education_donor.php' : 'https://gatlafoundation.org/api/submit_education_donor.php';
      const res = await fetch(apiUrl, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: data });
      const result = await res.json();
      if(result.status === 'success') { onSaveSuccess(); onClose(); } else alert(result.message);
    } catch(err) { alert(err.message); } finally { setIsSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
      <div className="grid grid-cols-2 gap-4">
        <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Donor Name" className="border p-2 rounded" required />
        <input name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" type="number" className="border p-2 rounded" required />
        <input name="phone_no" value={formData.phone_no} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
        <input name="email_id" value={formData.email_id} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
        <input name="pan_no" value={formData.pan_no} onChange={handleChange} placeholder="PAN" className="border p-2 rounded" />
        <input name="support_purpose" value={formData.support_purpose} onChange={handleChange} className="col-span-2 border p-2 rounded bg-slate-100" readOnly />
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 text-white py-2 rounded flex justify-center gap-2">
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />} Save
      </button>
    </form>
  );
};
export default EducationDonorForm;