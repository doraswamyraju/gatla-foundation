// src/pages/forms/EmpireForm.jsx (CORRECTED IMPORTS)

import React, { useState } from 'react';
// --- FIX: ADDED MISSING ICONS TO IMPORTS ---
import { User, Mail, Phone, MapPin, FileText, Award, UploadCloud } from 'lucide-react'; 

// Reusable wrapper (Copy-pasted from MusicJudgeForm.jsx)
const PillarFormWrapper = ({ title, description, children, accentColor = 'text-blue-500' }) => (
    <div className="bg-[#0B1120] p-6 md:p-8 rounded-xl border border-slate-700 shadow-2xl">
        <h2 className={`text-2xl font-serif font-bold text-white mb-2 ${accentColor}`}>{title}</h2>
        <p className="text-slate-400 text-sm mb-6 border-b border-slate-800 pb-4">{description}</p>
        
        <form className="space-y-6">
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

const EmpireForm = () => {
    const [formData, setFormData] = useState({}); 

    const fields = [
        { key: 'fullName', label: 'Empire Full Name', icon: User, type: 'text' },
        { key: 'fatherName', label: 'Father Name', icon: User, type: 'text' },
        { key: 'fullAddress', label: 'Full Address', icon: MapPin, type: 'textarea' },
        { key: 'phoneNo', label: 'Phone No', icon: Phone, type: 'tel' },
        { key: 'emailId', label: 'Email Id', icon: Mail, type: 'email' },
        { key: 'aadharNo', label: 'Aadhar No', icon: FileText, type: 'text' },
        { key: 'matchesParticipated', label: 'Matches Participated', icon: Award, type: 'number' },
        { key: 'experience', label: 'Years Experience', icon: FileText, type: 'text' },
    ];

    const fileUploads = [
        { label: 'Upload Aadhar', key: 'aadharUpload' },
        { label: 'Upload Passport Photo', key: 'photoUpload' },
    ];

    return (
        <PillarFormWrapper 
            title="Cricket Umpire (Empire) Form" 
            description="Register to officiate matches for the Gatla Cricket Club. Ensure all fields are accurate."
            accentColor='text-blue-500'
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(field => (
                    <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className="block text-slate-400 text-sm mb-1">{field.label}</label>
                        <div className="relative">
                            <field.icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
                            {field.type === 'textarea' ? (
                                <textarea
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-blue-500/50 outline-none"
                                    rows="3"
                                    placeholder={field.label}
                                    onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-blue-500/50 outline-none"
                                    placeholder={field.label}
                                    onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800 mt-6">
                {fileUploads.map(upload => (
                    <div key={upload.key} className="text-center">
                        <label className="block text-slate-400 text-sm mb-2">{upload.label}</label>
                        <div className="flex items-center justify-center border-2 border-dashed border-blue-500/50 h-32 text-slate-500 rounded-lg hover:border-blue-500 transition cursor-pointer">
                            <UploadCloud className="w-6 h-6 text-blue-600 mr-2" />
                            <span className="text-sm">Click to Upload</span>
                        </div>
                    </div>
                ))}
            </div>
        </PillarFormWrapper>
    );
};

export default EmpireForm;