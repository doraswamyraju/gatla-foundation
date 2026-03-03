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

    // Headers for Education Student
    const studentHeaders = [
        { key: 'full_name', label: 'Student Name' },
        { key: 'phone_no', label: 'Mobile No' },
        { key: 'school_college_name', label: 'College' },
        { key: 'scriber_subject', label: 'Subject' },
        { key: 'place_of_exam', label: 'Exam Place' },
        { key: 'date_of_exam', label: 'Exam Date' },
    ];

    // Generic Header if not Student
    const genericHeaders = [
        { key: 'full_name', label: 'Name' },
        { key: 'fullName', label: 'Name' },
        { key: 'donor_name', label: 'Donor Name' },
        { key: 'title', label: 'Title' },
    ];

    const getDisplayName = (row) => {
        return row.full_name || row.fullName || row.donor_name || row.title || row.studentName || row.name || '---';
    };

    const isEducationStudent = type === 'education-student';

    const getApiUrl = () => {
        const hostname = window.location.hostname;
        return (hostname === 'localhost' || hostname === '127.0.0.1')
            ? 'http://localhost/gatla-foundation/api'
            : 'https://gatlafoundation.org/api';
    };

    const renderAttachments = (item) => {
        const baseUrl = getApiUrl();
        const attachments = [];

        if (item.disability_certificate_path) {
            attachments.push({ label: 'Disability Certificate', path: item.disability_certificate_path });
        }
        if (item.aadhaar_path) {
            attachments.push({ label: 'Aadhaar Card', path: item.aadhaar_path });
        }
        if (item.disability_cert_path) {
            attachments.push({ label: 'Disability Cert', path: item.disability_cert_path });
        }
        if (item.photo_path) {
            attachments.push({ label: 'Passport Photo', path: item.photo_path });
        }
        if (item.document_path) {
            attachments.push({ label: 'Volunteer Document', path: item.document_path });
        }

        if (attachments.length === 0) return null;

        return (
            <div className="md:col-span-2 pt-6 mt-4 border-t border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Attached Documents</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {attachments.map((file, idx) => (
                        <a
                            key={idx}
                            href={`${baseUrl}/uploads/${file.path}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 px-4 py-3 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl font-bold uppercase tracking-wide text-[10px] hover:bg-green-500/20 transition-all"
                        >
                            <FileText className="w-4 h-4" /> {file.label}
                        </a>
                    ))}
                </div>
            </div>
        );
    };

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
                            {(isEducationStudent ? studentHeaders : [{ key: 'display_name', label: 'Name' }]).map(h => (
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
                                {(isEducationStudent ? studentHeaders : [{ key: 'display_name' }]).map(h => (
                                    <td key={h.key} className="px-8 py-5 text-sm font-medium text-slate-700 whitespace-nowrap">
                                        {h.key === 'display_name' ? getDisplayName(row) : (row[h.key] || '---')}
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
                                <td colSpan="10" className="px-10 py-20 text-center text-slate-400 font-medium">No Records Found</td>
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
                                <h2 className="text-2xl font-bold text-white tracking-tight">Record Profile</h2>
                                <p className="text-green-400 text-xs font-bold uppercase tracking-wide mt-1">Gatla Foundation Registry</p>
                            </div>
                            <button onClick={() => setSelectedItem(null)} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full transition-all text-slate-300 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto custom-scrollbar bg-[#0f172a]">
                            <ModalBox icon={User} label="Name" value={getDisplayName(selectedItem)} />
                            <ModalBox icon={User} label="Father Name" value={selectedItem.father_name || selectedItem.fatherName} />
                            <ModalBox icon={Phone} label="Mobile Number" value={selectedItem.phone_no || selectedItem.phone} />
                            <ModalBox icon={Mail} label="Email ID" value={selectedItem.email_id || selectedItem.email} />
                            <ModalBox icon={Shield} label="Aadhaar / ID" value={selectedItem.aadhaar_no || selectedItem.aadhar || selectedItem.aadhaar} />

                            {selectedItem.college_address && <ModalBox icon={MapPin} label="College Address" value={selectedItem.college_address} full />}
                            <ModalBox icon={MapPin} label="Residential Address" value={selectedItem.address} full />

                            {selectedItem.school_college_name && <ModalBox icon={Book} label="Institution" value={selectedItem.school_college_name} />}
                            {selectedItem.current_class_year && <ModalBox icon={GraduationCap} label="Class / Year" value={selectedItem.current_class_year} />}

                            {selectedItem.scriber_subject && <ModalBox icon={FileText} label="Subject" value={selectedItem.scriber_subject} />}
                            {selectedItem.place_of_exam && <ModalBox icon={MapPin} label="Exam Center" value={selectedItem.place_of_exam} />}
                            {selectedItem.date_of_exam && <ModalBox icon={Calendar} label="Exam Date" value={selectedItem.date_of_exam} />}

                            {selectedItem.disability_cert_no && <ModalBox icon={Shield} label="Disability Cert No" value={selectedItem.disability_cert_no} />}
                            {selectedItem.category && <ModalBox icon={Shield} label="Category" value={selectedItem.category} />}

                            {renderAttachments(selectedItem)}
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