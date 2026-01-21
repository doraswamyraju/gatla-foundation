import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

const EducationDonorForm = ({ onClose, initialData, onSaveSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: '', name: '', email: '', phone: '', pan: '', amount: '',
    payment_id: 'MANUAL_ENTRY', support_purpose: 'Support Gatla Education Club', ...initialData
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true);

    // Format data for process_donation.php
    const payload = {
      name: formData.name, // Was full_name
      email: formData.email, // Was email_id
      phone: formData.phone, // Was phone_no
      pan: formData.pan,   // Was pan_no
      amount: formData.amount,
      payment_id: formData.payment_id,
      club: 'education' // CRITICAL: Routes to education_donors table
    };

    try {
      const isLocal = window.location.hostname === 'localhost';
      const apiUrl = isLocal ? 'http://localhost/gatla-foundation/api/process_donation.php' : 'https://gatlafoundation.org/api/process_donation.php';

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (result.status === 'success') {
        alert(result.message); // Show actual backend message (including email errors)
        onSaveSuccess();
        onClose();
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) { alert(err.message); } finally { setIsSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
      <div className="grid grid-cols-2 gap-4">
        <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Donor Name" className="border p-2 rounded" required />
        <input name="amount" value={formData.amount || ''} onChange={handleChange} placeholder="Amount" type="number" className="border p-2 rounded" required />
        <input name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
        <input name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
        <input name="pan" value={formData.pan || ''} onChange={handleChange} placeholder="PAN" className="border p-2 rounded" />
        <input name="payment_id" value={formData.payment_id || ''} onChange={handleChange} placeholder="Payment/Transaction ID" className="border p-2 rounded" />
        <input name="support_purpose" value={formData.support_purpose} onChange={handleChange} className="col-span-2 border p-2 rounded bg-slate-100" readOnly />
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 text-white py-2 rounded flex justify-center gap-2">
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />} Save & Send Receipt
      </button>
    </form>
  );
};
export default EducationDonorForm;