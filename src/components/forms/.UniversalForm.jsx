import React, { useState } from 'react';
import { FORM_SCHEMAS } from '../../dashboard/data/FormSchemas';
import { Loader2, CheckCircle, AlertCircle, UploadCloud } from 'lucide-react';

const UniversalForm = ({ formType, onClose }) => {
  const schema = FORM_SCHEMAS[formType];
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null); // State to hold the file
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  if (!schema) return <div className="p-10 text-white text-center">Form configuration not found for: {formType}</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // 1. Prepare FormData (Required for Files)
    const payload = new FormData();
    payload.append('formType', formType);
    
    // Append all text fields
    Object.keys(formData).forEach(key => {
        payload.append(key, formData[key]);
    });

    // Append File if exists
    if (file) {
        payload.append('document', file);
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost/gatla-foundation/api';
      
      // 2. Send as POST (Browser automatically sets Content-Type to multipart/form-data)
      const response = await fetch(`${apiUrl}/submit_common.php`, {
        method: 'POST',
        body: payload 
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setStatus('success');
        setTimeout(() => onClose && onClose(), 2000);
      } else {
        setStatus('error');
        setMsg(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMsg("Network Error: " + error.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-green-500">
        <CheckCircle className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold">Submitted Successfully!</h3>
        <p className="text-slate-400 mt-2">We have received your details.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-2">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white capitalize">{formType.replace(/-/g, ' ')}</h2>
        <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Please fill in the details below</p>
      </div>

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schema.map((field) => (
          <div key={field.name} className={field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : ''}>
            <label className="block text-slate-400 text-xs font-bold uppercase mb-1 ml-1">{field.label}</label>
            
            {field.type === 'select' ? (
              <select
                name={field.name}
                required={field.required}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                onChange={handleChange}
              >
                <option value="">Select Option...</option>
                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                required={field.required}
                rows="3"
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                onChange={handleChange}
              />
            ) : field.type === 'file' ? (
               <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer relative bg-slate-800/50">
                   <UploadCloud className="w-8 h-8 mb-2" />
                   <span className="text-sm font-bold">{file ? file.name : "Click to Upload File"}</span>
                   <input 
                      type="file" 
                      name={field.name}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                   />
               </div>
            ) : (
              <input
                type={field.type} // Handles 'text', 'tel', 'email', 'datetime-local'
                name={field.name}
                required={field.required}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all [color-scheme:dark]"
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2 mt-6">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5" /> : 'SUBMIT APPLICATION'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UniversalForm;