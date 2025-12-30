// src/pages/forms/EducationSupporterForm.jsx

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, FileText, CreditCard, Award, Briefcase, HeartHandshake, ChevronDown } from 'lucide-react'; 

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


// Main Form Component: EducationSupporterForm
const EducationSupporterForm = ({ onClose }) => { 
    const [formData, setFormData] = useState({}); 
    
    // The submission key should map to the supporter table
    const uniqueFormType = 'education_supporter'; 

    const supportOptions = ['Physical Participation', 'Donation'];
    const fields = [
        { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
        { key: 'fatherName', label: 'Father Name', icon: User, type: 'text' },
        { key: 'fullAddress', label: 'Full Address', icon: MapPin, type: 'textarea' },
        { key: 'phoneNo', label: 'Phone No', icon: Phone, type: 'tel' },
        { key: 'emailId', label: 'Mail Id', icon: Mail, type: 'email' },
        { key: 'aadharNo', label: 'Aadhar No', icon: FileText, type: 'text' },
        { key: 'panCardNo', label: 'PAN Card No', icon: CreditCard, type: 'text' },
        { key: 'qualification', label: 'Qualification', icon: Award, type: 'text' },
        { key: 'occupation', label: 'Occupation', icon: Briefcase, type: 'text' },
        { key: 'areasOfInterest', label: 'Areas of Interest (Education, Sports, Music...)', icon: HeartHandshake, type: 'textarea' },
    ];

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <PillarFormWrapper 
            title="Education Club Supporter Form" 
            description="Register to become a supporter of the Education Club."
            accentColor='text-green-500'
            onClose={onClose} 
            formData={formData} 
            formType={uniqueFormType} 
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(field => {
                    const IconComponent = field.icon;
                    return (
                    <div key={field.key} className={field.type === 'textarea' || field.type === 'select' ? 'md:col-span-2' : ''}>
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
                
                {/* Support Through Dropdown - Specific to the Supporter Form */}
                <div className="md:col-span-2">
                    <label className="block text-slate-400 text-sm mb-1">Support Through</label>
                    <div className="relative">
                        <select
                            className="w-full pl-3 pr-10 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-green-500/50 outline-none appearance-none"
                            onChange={(e) => handleChange('supportThrough', e.target.value)}
                            value={formData.supportThrough || ''}
                        >
                            <option value="">Select Support Method</option>
                            {supportOptions.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 pointer-events-none" />
                    </div>
                </div>
                
            </div>
            {/* Note: File uploads section removed for brevity, assuming generic implementation */}
        </PillarFormWrapper>
    );
};

export default EducationSupporterForm;