// src/pages/forms/SupporterForm.jsx
import React from 'react';
import { User, Mail, Phone, MapPin, FileText, Briefcase, Heart, ChevronDown } from 'lucide-react';

const PillarFormWrapper = ({ title, description, children, accentColor = 'text-green-500' }) => (
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

const SupporterForm = () => {
    const fields = [
        { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
        { key: 'fatherName', label: 'Father Name', icon: User, type: 'text' },
        { key: 'fullAddress', label: 'Full Address', icon: MapPin, type: 'textarea' },
        { key: 'phoneNo', label: 'Phone No', icon: Phone, type: 'tel' },
        { key: 'mailId', label: 'Mail Id', icon: Mail, type: 'email' },
        { key: 'aadharNo', label: 'Aadhar No', icon: FileText, type: 'text' },
        { key: 'panCardNo', label: 'PAN Card No', icon: FileText, type: 'text' },
        { key: 'occupation', label: 'Occupation', icon: Briefcase, type: 'text' },
        { key: 'areasOfInterest', label: 'Areas of Interest', icon: Heart, type: 'text', placeholder: 'Education, Sports, Music, Business, Awards' },
        { key: 'supportThrough', label: 'Support Through', icon: Heart, type: 'select', options: ['Physical Participation', 'Donation'] },
    ];

    return (
        <PillarFormWrapper 
            title="Supporter Form" 
            description="Register to become a valued supporter of the Gatla Foundation."
            accentColor='text-blue-500'
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(field => (
                    <div key={field.key} className={field.type === 'textarea' || field.type === 'select' ? 'md:col-span-2' : ''}>
                        <label className="block text-slate-400 text-sm mb-1">{field.label}</label>
                        <div className="relative">
                            <field.icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
                            {field.type === 'textarea' ? (
                                <textarea
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-blue-500/50 outline-none"
                                    rows="3"
                                    placeholder={field.placeholder || field.label}
                                />
                            ) : field.type === 'select' ? (
                                <>
                                    <select
                                        className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-blue-500/50 outline-none appearance-none"
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
                                    className="w-full pl-10 pr-3 py-2 bg-[#050914] border border-slate-700 text-white rounded-lg focus:ring focus:ring-blue-500/50 outline-none"
                                    placeholder={field.placeholder || field.label}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </PillarFormWrapper>
    );
};

export default SupporterForm;