// src/components/DynamicFormModal.jsx

import React from 'react';
import { X } from 'lucide-react';

// --- IMPORT ALL IMPLEMENTED FORM COMPONENTS ---
import SupporterForm from '../pages/forms/SupporterForm.jsx';
import GatlaAwardForm from '../pages/forms/GatlaAwardForm.jsx';
import MusicJudgeForm from '../pages/forms/MusicJudgeForm.jsx';
import SingerForm from '../pages/forms/SingerForm.jsx';
import EmpireForm from '../pages/forms/EmpireForm.jsx';
// NOTE: Placeholder forms use one of the imported templates above.

// A map to render the correct component based on the formId passed from App.jsx
const FormComponentMap = {
    // Education Club 
    'education-student': SupporterForm, 
    'education-scriber': SupporterForm, 
    'education-donor': SupporterForm,
    
    // Cricket Club
    'cricket-player': EmpireForm, 
    'cricket-umpire': EmpireForm,
    'cricket-club-member': SupporterForm, 
    'cricket-donor': SupporterForm, 
    
    // Music Club
    'music-judge': MusicJudgeForm,
    'music-singer': SingerForm,
    'music-member': MusicJudgeForm,
    'music-donor': SupporterForm,

    // Business Club
    'business-member': SupporterForm,
    'business-entrepreneur': SupporterForm,
    'business-donor': SupporterForm,

    // Awards Club
    'awards-nomination': GatlaAwardForm,
    'awards-sponsor': SupporterForm,
    
    // Global Forms
    'volunteer-form': SupporterForm,
    'supporter-form': SupporterForm,
    
    // Fallback
    'default': () => <p className="text-white p-10 text-center">Form not yet designed. Please check back later.</p>
};

const DynamicFormModal = ({ isOpen, formId, onClose }) => {
    // Determine which component to render
    const ComponentToRender = FormComponentMap[formId] || FormComponentMap['default'];

    if (!isOpen) {
        return null; 
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[70] p-4 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose} 
        >
            <div 
                className="bg-[#050914] w-full max-w-4xl rounded-xl shadow-2xl relative max-h-[95vh] overflow-y-auto transform scale-95 transition-transform duration-300"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-slate-300 bg-slate-900/80 rounded-full p-2 z-10 hover:text-amber-500 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Rendering the component and passing onClose */}
                <ComponentToRender onClose={onClose} /> 
            </div>
        </div>
    );
};

export default DynamicFormModal;