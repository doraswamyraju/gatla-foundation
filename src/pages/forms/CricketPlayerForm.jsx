import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

const CricketPlayerForm = ({ onClose, initialData, onSaveSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: '', full_name: '', father_name: '', address: '', phone_no: '', email_id: '',
    aadhaar_no: '', disability_cert_no: '', category: 'B1', ...initialData
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    
    try {
      const isLocal = window.location.hostname === 'localhost';
      const apiUrl = isLocal ? 'http://localhost/gatla-foundation/api/submit_cricket_player.php' : 'https://gatlafoundation.org/api/submit_cricket_player.php';
      const res = await fetch(apiUrl, { method: 'POST', body: data });
      const result = await res.json();
      if(result.status === 'success') { onSaveSuccess(); onClose(); } else alert(result.message);
    } catch(err) { alert(err.message); } finally { setIsSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
      <div className="grid grid-cols-2 gap-4">
        <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Player Name" className="border p-2 rounded" required />
        <input name="father_name" value={formData.father_name} onChange={handleChange} placeholder="Father Name" className="border p-2 rounded" />
        <input name="phone_no" value={formData.phone_no} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" required />
        <input name="email_id" value={formData.email_id} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
        <input name="aadhaar_no" value={formData.aadhaar_no} onChange={handleChange} placeholder="Aadhaar No" className="border p-2 rounded" />
        <input name="disability_cert_no" value={formData.disability_cert_no} onChange={handleChange} placeholder="Disability Cert No" className="border p-2 rounded" />
        <select name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded">
           <option value="B1">B1</option><option value="B2">B2</option><option value="B3">B3</option>
        </select>
        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" className="col-span-2 border p-2 rounded" />
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded flex justify-center gap-2">
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />} Save Player
      </button>
    </form>
  );
};
export default CricketPlayerForm;