import React, { useState, useEffect } from 'react';
import { X, Edit, Plus, Loader2, Save, UploadCloud } from 'lucide-react';

// --- IMPORT SPECIFIC FORMS ---
import GeneralVolunteerForm from '../../pages/forms/GeneralVolunteerForm';
import EducationStudentForm from '../../pages/forms/EducationStudentForm';
import EducationScriberForm from '../../pages/forms/EducationScriberForm';
import EducationVolunteerForm from '../../pages/forms/EducationVolunteerForm'; // NEW IMPORT
import EducationDonorForm from '../../pages/forms/EducationDonorForm';         // NEW IMPORT

import { FORM_SCHEMAS } from '../data/FormSchemas';

const FormModal = ({ isOpen, onClose, categoryId, initialData, onSaveSuccess, onGenericSave, isSaving }) => {
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState(null);

  useEffect(() => { 
     if(isOpen) { 
        setFormData(initialData || {}); 
        setFileData(null); 
     } 
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // --- 1. GENERAL VOLUNTEER ---
  if (categoryId === 'volunteer-form') {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0"><h3 className="font-bold flex items-center gap-2">{initialData ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} {initialData ? 'Edit' : 'Add New'} Volunteer</h3><button onClick={onClose}><X className="w-5 h-5" /></button></div>
                <div className="overflow-y-auto"><GeneralVolunteerForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></div>
            </div>
        </div>
    );
  }

  // --- 2. EDUCATION STUDENT ---
  if (categoryId === 'education-student') {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0"><h3 className="font-bold flex items-center gap-2">{initialData ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} {initialData ? 'Edit' : 'Add New'} Student</h3><button onClick={onClose}><X className="w-5 h-5" /></button></div>
                <div className="overflow-y-auto"><EducationStudentForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></div>
            </div>
        </div>
    );
  }

  // --- 3. EDUCATION SCRIBE ---
  if (categoryId === 'education-scriber') {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0"><h3 className="font-bold flex items-center gap-2">{initialData ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} {initialData ? 'Edit' : 'Add New'} Scribe</h3><button onClick={onClose}><X className="w-5 h-5" /></button></div>
                <div className="overflow-y-auto"><EducationScriberForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></div>
            </div>
        </div>
    );
  }

  // --- 4. EDUCATION VOLUNTEER (NEW - WAS MISSING) ---
  if (categoryId === 'education-volunteer') {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0"><h3 className="font-bold flex items-center gap-2">{initialData ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} {initialData ? 'Edit' : 'Add New'} Edu Volunteer</h3><button onClick={onClose}><X className="w-5 h-5" /></button></div>
                <div className="overflow-y-auto"><EducationVolunteerForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></div>
            </div>
        </div>
    );
  }

  // --- 5. EDUCATION DONOR (NEW - WAS MISSING) ---
  if (categoryId === 'education-donor') {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0"><h3 className="font-bold flex items-center gap-2">{initialData ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} {initialData ? 'Edit' : 'Add New'} Edu Donor</h3><button onClick={onClose}><X className="w-5 h-5" /></button></div>
                <div className="overflow-y-auto"><EducationDonorForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></div>
            </div>
        </div>
    );
  }

  // --- GENERIC FALLBACK ---
  const schema = FORM_SCHEMAS[categoryId] || []; 
  const title = categoryId.replace(/-/g, ' ').toUpperCase();
  const handleSubmit = (e) => { e.preventDefault(); onGenericSave(formData, fileData); };
  const getFieldKey = (field) => field.name || field.key;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0"><h3 className="font-bold flex items-center gap-2">{initialData ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} {title}</h3><button onClick={onClose}><X className="w-5 h-5" /></button></div>
        
        {schema.length === 0 ? (
            <div className="p-10 text-center text-slate-400"><p>This form is under development.</p></div>
        ) : (
            <>
                <div className="p-6 overflow-y-auto">
                  <form id="dynamic-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {schema.map((field) => {
                       const fieldName = getFieldKey(field);
                       return (
                          <div key={fieldName} className={(field.type === 'textarea' || field.type === 'file') ? 'md:col-span-2' : ''}>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{field.label}</label>
                            {field.type === 'textarea' ? (
                              <textarea className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" rows="3" value={formData[fieldName] || ''} onChange={(e) => setFormData({...formData, [fieldName]: e.target.value})} />
                            ) : field.type === 'file' ? (
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center relative"><UploadCloud className="w-8 h-8 mb-2 text-amber-500" /><span className="text-sm">{fileData ? fileData.name : "Upload File"}</span><input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files[0] && setFileData(e.target.files[0])} /></div>
                            ) : (
                              <input type={field.type} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" value={formData[fieldName] || ''} onChange={(e) => setFormData({...formData, [fieldName]: e.target.value})} />
                            )}
                          </div>
                       );
                    })}
                  </form>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0"><button type="submit" form="dynamic-form" disabled={isSaving} className="px-6 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md flex items-center gap-2">{isSaving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />} Save Record</button></div>
            </>
        )}
      </div>
    </div>
  );
};

export default FormModal;