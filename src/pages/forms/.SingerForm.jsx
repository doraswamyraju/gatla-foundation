// src/pages/forms/SingerForm.jsx - COMPLETE FUNCTIONAL CODE

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, FileText, UploadCloud, Shield, Music, ChevronDown } from 'lucide-react'; 

// --- Reusable Submission Wrapper ---
const PillarFormWrapper = ({ title, description, children, accentColor = 'text-purple-500', onClose, formData }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // CRITICAL: Set the form_type key to match PHP's 'music_singer' case
        const dataToSend = {
            form_type: 'music_singer', 
            payload: formData
        };
        
        try {
            const API_URL = 'http://localhost/gatla-foundation/api/submit_form_dynamic.php'; 
            
            const response = await fetch(API_URL, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server returned status ${response.status}. Response content starts with: ${errorText.substring(0, 30)}...`);
            }

            const result = await response.json(); 
            
            alert(`Submission successful! ID: ${result.id || 'N/A'}`);
            
            if (onClose) onClose();
            
        } catch (error) {
            console.error("Submission error:", error);
            alert(`Submission failed. Check Console for details. Error: ${error.message}`);
        }
    };
    
    return (
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

// Main Form Component: SingerForm
const SingerForm = ({ onClose }) => { 
    const [formData, setFormData] = useState({}); 

    const musicCategories = [
        'Singer\'s Choice', 
        'Classical', 
        'Folk', 
        'Light Music (Lalitha Sangeetham)', 
        'Melody'
    ];

    const fields = [
        { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
        { key: 'fatherName', label: 'Father Name', icon: User, type: 'text' },
        { key: 'fullAddress', label: 'Full Address', icon: MapPin, type: 'textarea' },
        { key: 'phoneNo', label: 'Phone No', icon: Phone, type: 'tel' },
        { key: 'aadharNo', label: 'Aadhar No', icon: FileText, type: 'text' },
        { key: 'emailId', label: 'Email Id', icon: Mail, type: 'email' },
        { key: 'disabilityCertNo', label: 'Disability Certificate No', icon: Shield, type: 'text' },
        { key: 'musicCategory', label: 'Music Category', icon: Music, type: 'select', options: musicCategories },
        { key: 'goal', label: 'Goal', icon: FileText, type: 'text' },
    ];

    const fileUploads = [
        { label: 'Upload Aadhar', key: 'aadharUpload' },
        { label: 'Upload Disability Certificate', key: 'disabilityUpload' },
        { label: 'Upload Passport Size Photo', key: 'photoUpload' },
    ];

    // Helper function to update state on change (MUST be added for submission)
    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };


    return (
        <PillarFormWrapper 
            title="Music Club Singer Form" 
            description="Register to participate as a singer in the Music Club competitions."
            accentColor='text-purple-500'
            onClose={onClose} 
            formData={formData} // Pass state to wrapper
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(field => {
                    const IconComponent = field.icon;
                    return (
                    <div key={field.key} className={field.type === 'textarea' || field.type === 'select' ? 'md:col-span-2' : ''}>
                        <label className="block text-slate-400 text-sm mb-1">{field.label}</label>
                        <div className="relative">
                            <IconComponent className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
                            
                            {field.type === 'textarea' ? (
                                <textarea
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-purple-500/50 outline-none"
                                    rows="3"
                                    placeholder={field.label}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    value={formData[field.key] || ''}
                                />
                            ) : field.type === 'select' ? (
                                <>
                                    <select
                                        className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-purple-500/50 outline-none appearance-none"
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        value={formData[field.key] || ''}
                                    >
                                        <option value="">Select Category</option>
                                        {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-slate-600" />
                                    </div>
                                </>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800 mt-6">
                {fileUploads.map(upload => (
                    <div key={upload.key} className="text-center">
                        <label className="block text-slate-400 text-sm mb-2">{upload.label}</label>
                        <div className="flex items-center justify-center border-2 border-dashed border-purple-500/50 h-32 text-slate-500 rounded-lg hover:border-purple-500 transition cursor-pointer">
                            <UploadCloud className="w-6 h-6 text-purple-600 mr-2" />
                            <span className="text-sm">Click to Upload</span>
                        </div>
                    </div>
                ))}
            </div>
        </PillarFormWrapper>
    );
};

export default SingerForm;