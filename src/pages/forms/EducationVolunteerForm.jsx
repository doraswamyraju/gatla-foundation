// src/pages/forms/EducationVolunteerForm.jsx - FINAL CORRECTED CONTENT

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, HeartHandshake, FileText, Calendar, Briefcase, ChevronDown, Upload } from 'lucide-react'; 

// Reusable Submission Wrapper (Standard template)
const PillarFormWrapper = ({ title, description, children, accentColor = 'text-green-500', onClose, formData, formType }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const dataToSend = {
            form_type: formType, 
            payload: formData
        };
        
        try {
            const API_URL = 'http://localhost/gatla-foundation/api/submit_form_dynamic_education.php'; 
            
            const response = await fetch(API_URL, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

// Main Form Component: EducationVolunteerForm
const EducationVolunteerForm = ({ onClose }) => { 
    const [formData, setFormData] = useState({}); 
    const uniqueFormType = 'education_volunteer'; 

    const fields = [
        { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
        { key: 'fatherName', label: 'Father Name', icon: User, type: 'text' },
        { key: 'fullAddress', label: 'Full Address', icon: MapPin, type: 'textarea' },
        { key: 'phoneNo', label: 'Phone No', icon: Phone, type: 'tel' },
        { key: 'emailId', label: 'Email Id', icon: Mail, type: 'email' },
        { key: 'aadharCardNo', label: 'Aadhar Card No', icon: FileText, type: 'text' },
        { key: 'qualification', label: 'Qualification', icon: Award, type: 'text' },
        { key: 'occupation', label: 'Occupation/Profession', icon: Briefcase, type: 'text' },
        { key: 'areasOfInterest', label: 'Areas of Interest for Volunteer (Education, Sports...)', icon: HeartHandshake, type: 'textarea' },
        { key: 'preferredDateOption', label: 'Preferred Available Date Option', icon: Calendar, type: 'text' },
    ];

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <PillarFormWrapper 
            title="Education Club Volunteer Registration" 
            description="Register your interest to volunteer for the Education Club."
            accentColor='text-green-500'
            onClose={onClose} 
            formData={formData} 
            formType={uniqueFormType} 
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
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-green-500/50 outline-none"
                                    rows="3"
                                    placeholder={field.label}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    value={formData[field.key] || ''}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-green-500/50 outline-none"
                                    placeholder={field.label}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    value={formData[field.key] || ''}
                                />
                            )}
                        </div>
                    </div>
                );})}

                {/* File Uploads Section (Aadhar and Passport Size) */}
                <div className="md:col-span-1">
                    <label className="block text-slate-400 text-sm mb-1">Upload Aadhar</label>
                    <div className="relative">
                        <input type="file" className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-green-500/50 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600" />
                        <Upload className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
                    </div>
                </div>
                <div className="md:col-span-1">
                    <label className="block text-slate-400 text-sm mb-1">Upload Passport Size Photo</label>
                    <div className="relative">
                        <input type="file" className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-green-500/50 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600" />
                        <Upload className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
                    </div>
                </div>

            </div>
        </PillarFormWrapper>
    );
};

export default EducationVolunteerForm;