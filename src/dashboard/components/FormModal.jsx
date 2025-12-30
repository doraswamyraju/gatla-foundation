// src/dashboard/components/FormModal.jsx - FINAL CORRECTED MAPPING

import React from 'react';
import { X } from 'lucide-react';

// --- Import ALL Specialized Form Components ---
// Music Club Forms
import MusicJudgeForm from '../../pages/forms/MusicJudgeForm.jsx';
import SingerForm from '../../pages/forms/SingerForm.jsx';

// Education Club Forms
import EducationStudentForm from '../../pages/forms/EducationStudentForm.jsx';
import EducationScriberForm from '../../pages/forms/EducationScriberForm.jsx';
import EducationVolunteerForm from '../../pages/forms/EducationVolunteerForm.jsx';
// === CRITICAL FIX: Revert the import name to match the file provided by user ===
import EducationDonorForm from '../../pages/forms/EducationDonorForm.jsx'; 

// Cricket Club Forms (Placeholders)
// import CricketPlayerForm from '../../pages/forms/CricketPlayerForm.jsx'; 


const FormModal = ({ isOpen, onClose, categoryId, initialData, onSave }) => {
    if (!isOpen) return null;

    let FormToRender;
    
    // We determine which component to render based on the active table ID
    switch (categoryId) {
        // --- Education Forms ---
        case 'education-student':
            FormToRender = EducationStudentForm;
            break;
        case 'education-scriber':
            FormToRender = EducationScriberForm;
            break;
        case 'education-volunteer': 
            FormToRender = EducationVolunteerForm;
            break;
            
        // === CRITICAL FIX: Map both the 'Donor' link ID and the 'Supporter' ID to the EducationDonorForm component ===
        case 'education-donor': 
        case 'education-supporter': 
            // This component holds the content for the Supporter Form
            FormToRender = EducationDonorForm; 
            break;
            
        // --- Music Forms ---
        case 'music-judge':
            FormToRender = MusicJudgeForm;
            break;
        case 'music-singer':
            FormToRender = SingerForm;
            break;
        
        // --- Generic/Fallback Forms (Used by Navbar links) ---
        case 'volunteer-form':
        case 'supporter-form':
            FormToRender = EducationDonorForm; // Use the Supporter/Donor form for the generic 'donate' link
            break;
            
        default:
            // Fallback for missing forms
            FormToRender = () => <p className="text-white text-lg">Form component not yet created for: {categoryId}</p>;
            break;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0B1120] rounded-xl w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition z-10"
                >
                    <X className="w-6 h-6"/>
                </button>
                <div className="p-0">
                    {/* Render the selected component, passing the necessary props */}
                    {FormToRender ? (
                        <FormToRender 
                            onClose={onClose} 
                            initialData={initialData} 
                        />
                    ) : (
                        <div className="p-8 text-center text-red-400">Error: Component not defined for {categoryId}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormModal;