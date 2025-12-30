// src/pages/forms/MusicJudgeForm.jsx

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, UploadCloud, FileText, Briefcase } from 'lucide-react'; 

// --- Reusable wrapper: NOW HAS ASYNC SUBMISSION LOGIC ---
const PillarFormWrapper = ({ title, description, children, accentColor = 'text-purple-500', onClose, formData }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const dataToSend = {
            form_type: 'music_judge', 
            payload: formData
        };
        
        try {
            // UPDATED URL: Points to the live server
            const API_URL = 'https://gatlafoundation.org/api/submit_form_dynamic.php';

            const response = await fetch(API_URL, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server returned status ${response.status}. ${errorText}`);
            }

            const result = await response.json(); 
            alert(`Submission successful! ID: ${result.id}`);
            if (onClose) onClose();
            
        } catch (error) {
            console.error("Submission error:", error);
            alert(`Submission failed: ${error.message}`);
        }
    };
    
    return (
        // ... (Keep the rest of your JSX exactly the same as before)
        <div className="bg-[#0B1120] p-6 md:p-8 rounded-xl border border-slate-700 shadow-2xl">
            <h2 className={`text-2xl font-serif font-bold text-white mb-2 ${accentColor}`}>{title}</h2>
            <p className="text-slate-400 text-sm mb-6 border-b border-slate-800 pb-4">{description}</p>
            
            <form className="space-y-6" onSubmit={handleSubmit}> 
                {children}
                <div className="pt-4 border-t border-slate-800 flex justify-center">
                    <button 
                        type="submit" 
                        className={`px-10 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B1120] font-bold text-base rounded-lg hover:from-amber-400 transition shadow-lg`}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

// ... (Keep the rest of your component logic: MusicJudgeForm function, fields array, etc.)
const MusicJudgeForm = ({ onClose }) => { 
    const [formData, setFormData] = useState({}); 

    const fields = [
        { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
        { key: 'fatherName', label: 'Father Name', icon: User, type: 'text' },
        { key: 'fullAddress', label: 'Full Address', icon: MapPin, type: 'textarea' },
        { key: 'phoneNo', label: 'Phone No', icon: Phone, type: 'tel' },
        { key: 'emailId', label: 'Email Id', icon: Mail, type: 'email' },
        { key: 'aadharNo', label: 'Aadhar No', icon: FileText, type: 'text' },
        { key: 'qualification', label: 'Qualification', icon: FileText, type: 'text' },
        { key: 'occupation', label: 'Occupation', icon: Briefcase, type: 'text' },
        { key: 'exposure', label: 'Exposure as a Judge', icon: Award, type: 'textarea' },
    ];

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <PillarFormWrapper 
            title="Music Judge Form" 
            description="Submit your details to register as a judge for the Music Club competitions."
            onClose={onClose} 
            formData={formData} 
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(field => {
                    const IconComponent = field.icon;
                    return (
                    <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className="block text-slate-400 text-sm mb-1">{field.label}</label>
                        <div className="relative">
                            {IconComponent && <IconComponent className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />}
                            {field.type === 'textarea' ? (
                                <textarea
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-purple-500/50 outline-none"
                                    rows="3"
                                    placeholder={field.label}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    value={formData[field.key] || ''}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-purple-500/50 outline-none"
                                    placeholder={field.label}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    value={formData[field.key] || ''}
                                />
                            )}
                        </div>
                    </div>
                );})}
            </div>
        </PillarFormWrapper>
    );
};

export default MusicJudgeForm;