import React, { useState, useEffect } from 'react';
import {
  Menu, X, FileSpreadsheet, File as FileIcon, Plus, Trash2, Edit, Save,
  UploadCloud, Loader2, FileText, ChevronDown, LogOut, ImageIcon, Gift, User
} from 'lucide-react';

// --- EXPORT LIBRARIES ---
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// --- IMPORTS ---
import Sidebar from './components/Sidebar';
import { FORM_SCHEMAS } from './data/FormSchemas';

// --- IMPORT ADMIN FORMS ---
import GeneralVolunteerForm from '../pages/forms/GeneralVolunteerForm';
import EducationStudentForm from '../pages/forms/EducationStudentForm';
import EducationScriberForm from '../pages/forms/EducationScriberForm';
import EducationVolunteerForm from '../pages/forms/EducationVolunteerForm';
import EducationDonorForm from '../pages/forms/EducationDonorForm';
import CricketMemberForm from '../pages/forms/CricketMemberForm'; // Added
import CricketPlayerForm from '../pages/forms/CricketPlayerForm'; // Added


// --- 1. BLOG MANAGER ---
import BlogManager from './components/BlogManager';
import GalleryManager from './components/GalleryManager';
import AwardWinnersManager from './components/AwardWinnersManager';
import EventsManager from './components/EventsManager'; // Added



// --- 2. FORM MODAL ---
const FormModal = ({ isOpen, onClose, categoryId, initialData, onSaveSuccess, onGenericSave, isSaving }) => {
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {});
      setFileData(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // --- Specific Form Checks ---

  if (categoryId.endsWith('-donor') || categoryId === 'awards-sponsor' || categoryId === 'donations-list') {
    return (
      <ModalWrapper title={categoryId.replace(/-/g, ' ').toUpperCase()}>
        <div className="p-10 text-center flex flex-col items-center justify-center">
          <Gift className="w-12 h-12 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Donation Module Offline</h3>
          <p className="text-slate-500 max-w-sm mb-6">
            This donation form is temporarily offline while the new payment system is being integrated. Please use the QR code on the main website.
          </p>
          <button onClick={onClose} className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold">Close</button>
        </div>
      </ModalWrapper>
    );
  }

  if (categoryId === 'volunteer-form') {
    return <ModalWrapper title="Volunteer"><GeneralVolunteerForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></ModalWrapper>;
  }
  if (categoryId === 'education-student') {
    return <ModalWrapper title="Student"><EducationStudentForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></ModalWrapper>;
  }
  if (categoryId === 'education-scriber') {
    return <ModalWrapper title="Scribe"><EducationScriberForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></ModalWrapper>;
  }
  if (categoryId === 'education-volunteer') {
    return <ModalWrapper title="Edu Volunteer"><EducationVolunteerForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></ModalWrapper>;
  }
  // Added Cricket Forms
  if (categoryId === 'cricket-club-member') {
    return <ModalWrapper title="Cricket Club Member Form"><CricketMemberForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></ModalWrapper>;
  }
  if (categoryId === 'cricket-player') {
    return <ModalWrapper title="Cricket Player"><CricketPlayerForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></ModalWrapper>;
  }

  // --- Generic Fallback ---
  const schema = FORM_SCHEMAS[categoryId] || [];
  const title = categoryId.replace(/-/g, ' ').toUpperCase();
  const handleSubmit = (e) => { e.preventDefault(); onGenericSave(formData, fileData); };
  const getFieldKey = (field) => field.name || field.key;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0"><h3 className="font-bold flex items-center gap-2">{initialData ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {title}</h3><button onClick={onClose}><X className="w-5 h-5" /></button></div>
        <div className="p-6 overflow-y-auto">
          <form id="dynamic-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schema.map((field) => {
              const fieldName = getFieldKey(field);
              return (
                <div key={fieldName} className={(field.type === 'textarea' || field.type === 'file') ? 'md:col-span-2' : ''}>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" rows="3" value={formData[fieldName] || ''} onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })} />
                  ) : field.type === 'file' ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center relative"><UploadCloud className="w-8 h-8 mb-2 text-amber-500" /><span className="text-sm">{fileData ? fileData.name : "Upload File"}</span><input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files[0] && setFileData(e.target.files[0])} /></div>
                  ) : (
                    <input type={field.type} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" value={formData[fieldName] || ''} onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })} />
                  )}
                </div>
              );
            })}
          </form>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0"><button type="submit" form="dynamic-form" disabled={isSaving} className="px-6 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md flex items-center gap-2">{isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Record</button></div>
      </div>
    </div>
  );
};

// Helper Wrapper Component
const ModalWrapper = ({ title, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
    <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
      <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0">
        <h3 className="font-bold flex items-center gap-2"><Edit className="w-4 h-4" /> {title}</h3>
      </div>
      <div className="overflow-y-auto">{children}</div>
    </div>
  </div>
);

// --- 3. DATA TABLE ---
const DataTable = ({ type, data, onAdd, onEdit, onDelete, onRefresh }) => {
  const schema = FORM_SCHEMAS[type] || FORM_SCHEMAS['volunteer-form'];
  const getFieldKey = (field) => field.name || field.key;
  // REMOVED SLICE TO SHOW ALL COLUMNS
  const displayHeaders = schema.map(f => ({ key: getFieldKey(f), label: f.label }));

  const getApiUrl = () => {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return 'http://localhost/gatla-foundation/api';
    return 'https://gatlafoundation.org/api';
  };
  const apiUrl = getApiUrl();

  const handleExportExcel = () => {
    if (!data || data.length === 0) return alert("No data to export");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${type}_export_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleExportPDF = () => {
    if (!data || data.length === 0) return alert("No data to export");
    const doc = new jsPDF();
    const tableColumn = displayHeaders.map(col => col.label);
    const tableRows = [];
    data.forEach(item => {
      const rowData = displayHeaders.map(col => item[col.key] || '');
      tableRows.push(rowData);
    });
    doc.text(`${type.replace(/-/g, ' ').toUpperCase()} REPORT`, 14, 15);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save(`${type}_export_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div><h2 className="text-lg font-bold text-slate-800 capitalize">{type.replace(/-/g, ' ')}</h2><p className="text-sm text-slate-500">{data.length} records found</p></div>
        <div className="flex gap-2">
          {onRefresh && (
            <button onClick={onRefresh} className="flex items-center px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200" title="Refresh Data">
              <Loader2 className="w-4 h-4 mr-1" /> Refresh
            </button>
          )}
          {type !== 'donations-list' && (<button onClick={onAdd} className="flex items-center px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"><Plus className="w-4 h-4 mr-2" /> Add New</button>)}
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          <button onClick={handleExportExcel} className="flex items-center px-3 py-2 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 rounded border border-green-200"><FileSpreadsheet className="w-4 h-4 mr-1" /> Excel</button>
          <button onClick={handleExportPDF} className="flex items-center px-3 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200"><FileIcon className="w-4 h-4 mr-1" /> PDF</button>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
            <tr>{displayHeaders.map((header) => (<th key={header.key} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">{header.label}</th>))}<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Status</th><th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-amber-50/50 transition-colors group">
                  {displayHeaders.map((header) => (
                    <td key={header.key} className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
                      {(header.key.includes('path') || header.key === 'document') && row[header.key] ?
                        <a href={`${apiUrl.replace('/api', '')}/uploads/${row[header.key]}`} target="_blank" rel="noreferrer" className="text-blue-500 underline flex items-center gap-1">
                          <FileText className="w-3 h-3" /> View File
                        </a>
                        : row[header.key] || '---'}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right"><span className={`px-2 py-1 rounded-full text-xs font-bold ${row.status === 'Approved' || row.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{row.status || 'Pending'}</span></td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">{type !== 'donations-list' && (<button onClick={() => onEdit(row)} className="p-1 text-slate-400 hover:text-amber-500"><Edit className="w-4 h-4" /></button>)}<button onClick={() => onDelete(row.id)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={displayHeaders.length + 2} className="text-center py-12 text-slate-400"><div className="flex flex-col items-center"><FileText className="w-12 h-12 text-slate-200 mb-2" /><p>No records found.</p></div></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 4. PROFILE SECTION ---
const ProfileSection = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-sm font-medium text-slate-600"><div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold">A</div><span className="hidden md:inline">Admin</span><ChevronDown className="w-4 h-4" /></button>
      {isOpen && (<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-50"><button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</button></div>)}
    </div>
  );
};

// --- 5. LOGIN PAGE ---
const LoginPage = ({ onLogin }) => (<div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4"><div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 text-center"><h2 className="text-2xl font-bold text-slate-900">Admin Login</h2><button onClick={onLogin} className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg">Access Dashboard</button></div></div>);

// --- 7. DASHBOARD STATS COMPONENT ---
const DashboardStats = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-xl border border-slate-200 shadow-sm animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
        <Gift className="w-10 h-10 text-amber-500" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Donation Stats Offline</h3>
      <p className="text-slate-500 text-center max-w-md">
        The donation management and statistics modules are temporarily offline while the Gatla Foundation payment gateway is being activated.
      </p>
      <div className="mt-8 flex gap-4">
        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">Coming Soon</span>
      </div>
    </div>
  );
};

// --- 6. MAIN APP --- (Updated)
const DashboardApp = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [appData, setAppData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [dashboardStats, setDashboardStats] = useState(null); // State for Stats

  // DYNAMIC URL FIX
  const getApiUrl = () => {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return 'http://localhost/gatla-foundation/api';
    return 'https://gatlafoundation.org/api';
  };
  const apiUrl = getApiUrl();

  const currentData = appData[activeTab] || [];
  const handleLogin = () => { }; // Redundant but kept for structure if needed elsewhere
  const handleLogout = onLogout;

  const fetchData = async () => {
    try {
      if (activeTab === 'dashboard') {
        const res = await fetch(`${apiUrl}/get_dashboard_stats.php`);
        const data = await res.json();
        if (data.status === 'success') {
          setDashboardStats(data.data);
        }
      } else if (activeTab === 'blog-manager') {
        const res = await fetch(`${apiUrl}/get_blogs.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'blog-manager': data }));
      } else if (activeTab === 'volunteer-form') {
        const res = await fetch(`${apiUrl}/get_general_volunteers.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'volunteer-form': data }));
      } else if (activeTab === 'supporter-form') {
        const res = await fetch(`${apiUrl}/get_supporters.php`); // FETCH ALL SUPPORTERS
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'supporter-form': data }));
      } else if (activeTab === 'education-supporter') {
        const res = await fetch(`${apiUrl}/get_supporters.php?club=Education`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'education-supporter': data }));
      } else if (activeTab === 'cricket-supporter') {
        const res = await fetch(`${apiUrl}/get_supporters.php?club=Cricket`); // Filter for Cricket
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'cricket-supporter': data }));
      } else if (activeTab === 'music-supporter') {
        const res = await fetch(`${apiUrl}/get_supporters.php?club=Music`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'music-supporter': data }));
      } else if (activeTab === 'business-supporter') {
        const res = await fetch(`${apiUrl}/get_supporters.php?club=Business`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'business-supporter': data }));
      } else if (activeTab === 'awards-supporter') {
        const res = await fetch(`${apiUrl}/get_supporters.php?club=Awards`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'awards-supporter': data }));
      } else if (activeTab === 'donations-list') {
        const res = await fetch(`${apiUrl}/get_donations.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'donations-list': data }));
      } else if (activeTab === 'education-student') {
        const res = await fetch(`${apiUrl}/get_education_students.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'education-student': data }));
      } else if (activeTab === 'education-scriber') {
        const res = await fetch(`${apiUrl}/get_education_scribers.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'education-scriber': data }));
      } else if (activeTab === 'education-volunteer') {
        const res = await fetch(`${apiUrl}/get_education_volunteers.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'education-volunteer': data }));
      } else if (activeTab === 'education-donor') {
        const res = await fetch(`${apiUrl}/get_education_donors.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'education-donor': data }));
      } else if (activeTab === 'cricket-club-member') {
        const res = await fetch(`${apiUrl}/get_cricket_members.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'cricket-club-member': data }));
      } else if (activeTab === 'cricket-player') {
        const res = await fetch(`${apiUrl}/get_cricket_players.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'cricket-player': data }));
      } else if (activeTab === 'cricket-umpire') {
        const res = await fetch(`${apiUrl}/get_cricket_umpires.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'cricket-umpire': data }));
      } else if (activeTab === 'cricket-donor') {
        const res = await fetch(`${apiUrl}/get_cricket_donors.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'cricket-donor': data }));
      } else if (activeTab === 'music-donor') {
        const res = await fetch(`${apiUrl}/get_music_donors.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'music-donor': data }));
      } else if (activeTab === 'business-donor') {
        const res = await fetch(`${apiUrl}/get_business_donors.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'business-donor': data }));
      } else if (activeTab === 'music-member') { // Added
        const res = await fetch(`${apiUrl}/get_music_members.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'music-member': data }));
      } else if (activeTab === 'music-singer') { // Added
        const res = await fetch(`${apiUrl}/get_music_singers.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'music-singer': data }));
      } else if (activeTab === 'music-judge') { // Added
        const res = await fetch(`${apiUrl}/get_music_judges.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'music-judge': data }));

      } else if (activeTab === 'music-volunteer') { // Added
        const res = await fetch(`${apiUrl}/get_general_volunteers.php?club=Music`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'music-volunteer': data }));
      } else if (activeTab === 'business-member') { // Added
        const res = await fetch(`${apiUrl}/get_business_members.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'business-member': data }));
      } else if (activeTab === 'business-entrepreneur') {
        const res = await fetch(`${apiUrl}/get_business_entrepreneurs.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'business-entrepreneur': data }));
      } else if (activeTab === 'awards-application') { // Added
        const res = await fetch(`${apiUrl}/get_awards_applications.php`);
        const data = await res.json();
        setAppData(prev => ({ ...prev, 'awards-application': data }));
      } else {
        // Fallback or other tabs
      }
    } catch (err) { console.error("Fetch error:", err); }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  // DELETE FUNCTION
  const handleDelete = async (id, typeOverride) => {
    if (!window.confirm("Are you sure you want to delete this record? This cannot be undone.")) {
      return;
    }
    const deleteType = typeOverride || activeTab;
    try {
      const response = await fetch(`${apiUrl}/delete_common.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id,
          type: deleteType
        })
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert("Record deleted successfully.");
        fetchData();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Network error while deleting.");
    }
  };

  // SAVE FUNCTION
  const handleGenericSave = async (data, fileData) => {
    setIsSaving(true);
    const payload = new FormData();
    payload.append('formType', activeTab);
    Object.keys(data).forEach(key => payload.append(key, data[key]));
    if (fileData) payload.append('document', fileData);

    try {
      const response = await fetch(`${apiUrl}/submit_common.php`, { method: 'POST', body: payload });
      const result = await response.json();
      if (result.status === 'success') { alert("Saved successfully!"); setModalOpen(false); fetchData(); }
      else { alert("Error: " + result.message); }
    } catch (error) { alert("Network Error"); }
    finally { setIsSaving(false); }
  };

  // No local login check needed as App.jsx handles it

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} onLogout={handleLogout} />
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4"><button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2"><Menu className="w-6 h-6" /></button><h2 className="text-xl font-bold text-slate-800 hidden sm:block capitalize">{activeTab.replace(/-/g, ' ')}</h2></div>
          <ProfileSection onLogout={handleLogout} />
        </header>
        <main className="flex-1 p-6 overflow-hidden flex flex-col overflow-y-auto">
          {activeTab === 'dashboard' ? (<DashboardStats stats={dashboardStats} />)
            : activeTab === 'blog-manager' ? (
              <BlogManager
                posts={appData['blog-manager'] || []}
                onSave={async (postData) => {
                  const formData = new FormData();
                  if (postData.id) formData.append('id', postData.id);
                  formData.append('title', postData.title);
                  formData.append('content', postData.content);
                  formData.append('category', postData.category);
                  formData.append('status', postData.status);
                  if (postData.imageFile) formData.append('image', postData.imageFile);

                  const res = await fetch(`${apiUrl}/submit_blog.php`, { method: 'POST', body: formData });
                  const result = await res.json();
                  if (result.status === 'success') { alert('Saved!'); fetchData(); } else { alert('Error: ' + result.message); }
                }}
                onDelete={(type, id) => handleDelete(id, 'blog-posts')}
              />
            )
              : activeTab === 'gallery-manager' ? (
                <GalleryManager apiUrl={apiUrl} />
              )
                : activeTab === 'award-winners-manager' ? (
                  <AwardWinnersManager />
                )
                  : activeTab === 'events-manager' ? ( // Added
                    <EventsManager />
                  )
                    : (activeTab === 'awards-sponsor') ? (
                      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-xl border border-slate-200 shadow-sm grow">
                        <Gift className="w-12 h-12 text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-800">Sponsorship Module Offline</h3>
                        <p className="text-slate-500">Manual sponsorship entry is currently offline.</p>
                      </div>
                    )
                      : (<DataTable type={activeTab} data={currentData} onRefresh={fetchData} onAdd={() => { setCurrentEditItem(null); setModalOpen(true); }} onEdit={(item) => { setCurrentEditItem(item); setModalOpen(true); }} onDelete={handleDelete} />)}
        </main>
      </div>
      <FormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} categoryId={activeTab} initialData={currentEditItem} onSaveSuccess={() => { fetchData(); setModalOpen(false); }} onGenericSave={handleGenericSave} isSaving={isSaving} />
    </div>
  );
};

export default DashboardApp;