import React, { useState } from 'react';
import { 
    FileSpreadsheet, 
    Download, 
    Printer, 
    Eye, 
    X, 
    User, 
    Phone, 
    Book, 
    MapPin, 
    Calendar, 
    Shield, 
    Clock, 
    GraduationCap, 
    FileText, 
    Plus, 
    Mail 
} from 'lucide-react';

const DataTable = ({ type, data, onRefresh, onAdd, onEdit, onDelete }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    // Headers strictly for Education Student
    const studentHeaders = [
        { key: 'studentName', label: 'Student Name' },
        { key: 'phone', label: 'Mobile No' },
        { key: 'college', label: 'College Name' },
        { key: 'subject', label: 'Scriber For' },
        { key: 'examPlace', label: 'Place of Exam' },
        { key: 'examDate', label: 'Date of Exam' },
    ];

    const isEducationStudent = type === 'education-student';

    return (
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden animate-in fade-in duration-500">
            
            {/* TOOLBAR */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-xl text-green-600">
                        <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="font-bold text-slate-800 text-base">Records Registry</span>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Gatla Foundation Management</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all"><Printer className="w-4 h-4" /> PDF</button>
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-green-600 rounded-lg shadow-md shadow-green-100 hover:bg-green-700 transition-all"><Download className="w-4 h-4" /> EXCEL</button>
                    
                    <button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-xs font-bold flex items-center gap-2 ml-2 shadow-lg shadow-blue-100 transition-all">
                        <Plus className="w-4 h-4" /> New Record
                    </button>
                </div>
            </div>

            {/* TABLE VIEW */}
            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                        <tr>
                            {(isEducationStudent ? studentHeaders : [{key:'name', label:'Name'}]).map(h => (
                                <th key={h.key} className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {h.label}
                                </th>
                            ))}
                            <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.length > 0 ? data.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/80 transition-all group">
                                {(isEducationStudent ? studentHeaders : [{key:'name'}]).map(h => (
                                    <td key={h.key} className="px-8 py-5 text-sm font-medium text-slate-700 whitespace-nowrap">
                                        {row[h.key] || '---'}
                                    </td>
                                ))}
                                <td className="px-8 py-5 text-right">
                                    <button onClick={() => setSelectedItem(row)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg transition-all">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="px-10 py-20 text-center text-slate-400 font-medium">No Records Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* DETAIL MODAL POPUP - IMPROVED TYPOGRAPHY */}
            {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#0f172a] border border-slate-700 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                        
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center bg-[#1e293b]">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Student Profile</h2>
                                <p className="text-green-400 text-xs font-bold uppercase tracking-wide mt-1">Gatla Foundation Registry</p>
                            </div>
                            <button onClick={() => setSelectedItem(null)} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full transition-all text-slate-300 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto custom-scrollbar bg-[#0f172a]">
                            <ModalBox icon={User} label="Student Name" value={selectedItem.studentName} />
                            <ModalBox icon={User} label="Father Name" value={selectedItem.fatherName} />
                            <ModalBox icon={Phone} label="Mobile Number" value={selectedItem.phone} />
                            <ModalBox icon={Shield} label="Aadhaar Number" value={selectedItem.aadhaar} />
                            <ModalBox icon={Clock} label="Current Age" value={selectedItem.age} />
                            <ModalBox icon={MapPin} label="Residential Address" value={selectedItem.address} full />
                            <ModalBox icon={Book} label="Institution Name" value={selectedItem.college} />
                            <ModalBox icon={GraduationCap} label="Educational Year" value={selectedItem.year} />
                            <ModalBox icon={MapPin} label="College Location" value={selectedItem.collegeAddress} full />
                            <ModalBox icon={FileText} label="Scriber Subject" value={selectedItem.subject} />
                            <ModalBox icon={MapPin} label="Exam Center" value={selectedItem.examPlace} />
                            <ModalBox icon={Calendar} label="Examination Date" value={selectedItem.examDate} />
                            <ModalBox icon={Shield} label="Disability Cert ID" value={selectedItem.certNo} />
                            
                            {selectedItem.certificate && (
                                <div className="md:col-span-2 pt-6 mt-4 border-t border-slate-800">
                                    <a 
                                        href={`http://localhost/gatla-foundation - Copy/api/${selectedItem.certificate}`} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl font-bold uppercase tracking-wide text-sm hover:bg-green-500/20 transition-all"
                                    >
                                        <FileText className="w-5 h-5" /> View Disability Certificate
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ModalBox = ({ icon: Icon, label, value, full }) => (
    <div className={`${full ? 'md:col-span-2' : ''} flex items-start gap-4 p-5 bg-[#1e293b] border border-slate-700/50 rounded-2xl`}>
        <div className="p-3 bg-slate-800 rounded-xl shrink-0"><Icon className="w-5 h-5 text-green-400" /></div>
        <div className="min-w-0">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
            <p className="text-lg font-medium text-slate-100 break-words leading-relaxed">{value || '---'}</p>
        </div>
    </div>
);

export default DataTable;