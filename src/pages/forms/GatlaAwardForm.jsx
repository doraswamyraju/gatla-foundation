// src/pages/forms/GatlaAwardForm.jsx
import React from 'react';
import { User, Mail, Phone, MapPin, FileText, Briefcase, Award, UploadCloud, ChevronDown } from 'lucide-react';

const PillarFormWrapper = ({ title, description, children, accentColor = 'text-amber-500' }) => (
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

const GatlaAwardForm = () => {
    const disabilityCategories = ['Blind', 'Deaf & Dumb', 'Physical Handicap', 'Mentally Challenged', 'Wheel Chair', 'Other'];
    const occupationOptions = ['Sports', 'Education', 'Music', 'Business', 'Sports Service', 'Other'];

    const fields = [
        { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
        { key: 'fatherName', label: 'Father Name', icon: User, type: 'text' },
        { key: 'fullAddress', label: 'Full Address', icon: MapPin, type: 'textarea' },
        { key: 'phoneNo', label: 'Phone No', icon: Phone, type: 'tel' },
        { key: 'emailId', label: 'Email Id', icon: Mail, type: 'email' },
        { key: 'aadharId', label: 'Aadhar Id', icon: FileText, type: 'text' },
        { key: 'disabilityCategory', label: 'Disability Category', icon: FileText, type: 'select', options: disabilityCategories },
        { key: 'occupation', label: 'Occupation', icon: Briefcase, type: 'select', options: occupationOptions },
        { key: 'experience', label: 'Experience (Years)', icon: FileText, type: 'number' },
        { key: 'achievements', label: 'Achievements', icon: Award, type: 'textarea' },
    ];

    const fileUploads = [
        { label: 'Upload Aadhar/Passport', key: 'aadharPassportUpload' },
        { label: 'Upload Disability Certificate', key: 'disabilityCertUpload' },
        { label: 'Upload Photo', key: 'photoUpload' },
        { label: 'Upload Achievements Data', key: 'dataUpload' },
    ];

    return (
        <PillarFormWrapper 
            title="Gatla Award Application Form" 
            description="Submit your achievements for consideration for the annual Gatla Awards."
            accentColor='text-amber-500'
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(field => (
                    <div key={field.key} className={field.type === 'textarea' || field.type === 'select' ? 'md:col-span-2' : ''}>
                        <label className="block text-slate-400 text-sm mb-1">{field.label}</label>
                        <div className="relative">
                            <field.icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
                            {field.type === 'textarea' ? (
                                <textarea
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-amber-500/50 outline-none"
                                    rows="3"
                                    placeholder={field.label}
                                />
                            ) : field.type === 'select' ? (
                                <>
                                    <select
                                        className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-amber-500/50 outline-none appearance-none"
                                    >
                                        <option value="">Select Option</option>
                                        {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-slate-600" />
                                    </div>
                                </>
                            ) : (
                                <input
                                    type={field.type}
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-amber-500/50 outline-none"
                                    placeholder={field.label}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-slate-800 mt-6">
                {fileUploads.map(upload => (
                    <div key={upload.key} className="text-center">
                        <label className="block text-slate-400 text-sm mb-2">{upload.label}</label>
                        <div className="flex items-center justify-center border-2 border-dashed border-amber-500/50 h-32 text-slate-500 rounded-lg hover:border-amber-500 transition cursor-pointer">
                            <UploadCloud className="w-6 h-6 text-amber-600 mr-2" />
                            <span className="text-sm">Click to Upload</span>
                        </div>
                    </div>
                ))}
            </div>
        </PillarFormWrapper>
    );
};

export default GatlaAwardForm;