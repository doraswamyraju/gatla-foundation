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
import GalleryManager from './components/GalleryManager';

const BlogManager = ({ posts, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (post) => {
    setCurrentPost(post);
    setImageFile(null);
    setIsEditing(true);
  };

  const handleNew = () => {
    setCurrentPost({ title: '', content: '', category: 'General', status: 'Draft' });
    setImageFile(null);
    setIsEditing(true);
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (currentPost.id) formData.append('id', currentPost.id);
    formData.append('title', currentPost.title);
    formData.append('content', currentPost.content);
    formData.append('category', currentPost.category);
    formData.append('status', currentPost.status);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    await onSave(formData);
    setLoading(false);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{currentPost.id ? 'Edit Post' : 'New Post'}</h3>
          <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
        </div>
        <form onSubmit={handleSavePost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" className="w-full p-2 border rounded" value={currentPost.title} onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select className="w-full p-2 border rounded" value={currentPost.category} onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}>
              <option>General</option>
              <option>Education</option>
              <option>Health</option>
              <option>Events</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select className="w-full p-2 border rounded" value={currentPost.status} onChange={e => setCurrentPost({ ...currentPost, status: e.target.value })}>
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Featured Image</label>
            <input type="file" onChange={e => setImageFile(e.target.files[0])} className="w-full p-2 border" accept="image/*" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea className="w-full p-2 border rounded h-32" value={currentPost.content} onChange={e => setCurrentPost({ ...currentPost, content: e.target.value })} required></textarea>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {loading ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">All Posts</h2>
        <button onClick={handleNew} className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
          <Plus className="w-5 h-5" /> <span>New Post</span>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-4 px-6 font-bold text-slate-500">Title</th>
              <th className="text-left py-4 px-6 font-bold text-slate-500">Category</th>
              <th className="text-left py-4 px-6 font-bold text-slate-500">Status</th>
              <th className="text-left py-4 px-6 font-bold text-slate-500">Date</th>
              <th className="text-right py-4 px-6 font-bold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-slate-500">No posts found.</td></tr>
            ) : (
              posts.map(post => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">{post.title}</td>
                  <td className="py-4 px-6 text-slate-600">{post.category}</td>
                  <td className="py-4 px-6"><span className={`px-2 py-1 rounded-full text-xs font-bold ${post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>{post.status}</span></td>
                  <td className="py-4 px-6 text-slate-600">{new Date(post.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end space-x-3">
                      <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-800"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => onDelete(post.id, 'blog-post')} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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
  if (categoryId === 'education-donor') {
    return <ModalWrapper title="Edu Donor"><EducationDonorForm onClose={onClose} initialData={initialData} onSaveSuccess={onSaveSuccess} /></ModalWrapper>;
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
                        <a href={`${apiUrl}/uploads/${row[header.key]}`} target="_blank" rel="noreferrer" className="text-blue-500 underline flex items-center gap-1">
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
const DashboardStats = ({ stats }) => {
  if (!stats) return <div className="p-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" /></div>;

  const { total_amount, total_donors, breakdown } = stats;

  const cards = [
    { title: 'Total Donations', value: `₹${total_amount?.toLocaleString()}`, icon: Gift, color: 'bg-green-500' },
    { title: 'Total Donors', value: total_donors, icon: User, color: 'bg-blue-500' },
  ];

  const clubs = [
    { key: 'general', name: 'General', color: 'text-slate-600', bg: 'bg-slate-100' },
    { key: 'education', name: 'Education', color: 'text-green-600', bg: 'bg-green-100' },
    { key: 'cricket', name: 'Cricket', color: 'text-blue-600', bg: 'bg-blue-100' },
    { key: 'music', name: 'Music', color: 'text-purple-600', bg: 'bg-purple-100' },
    { key: 'business', name: 'Business', color: 'text-red-600', bg: 'bg-red-100' },
    { key: 'awards', name: 'Awards', color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className={`p-4 rounded-full ${card.color} text-white`}>
              <card.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">{card.title}</p>
              <h3 className="text-3xl font-bold text-slate-800">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Club Breakdown */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Donations by Club</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubs.map((club) => {
            const data = breakdown?.[club.key] || { count: 0, amount: 0 };
            return (
              <div key={club.key} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold ${club.color}`}>{club.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${club.bg} ${club.color}`}>{data.count} Donors</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">₹{data.amount.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- 6. MAIN APP --- (Updated)
const DashboardApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => { setIsAuthenticated(false); setActiveTab('dashboard'); };

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
        setAppData(prev => ({ ...prev, 'blog-posts': data }));
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
      } else {
        // Fallback or other tabs
      }
    } catch (err) { console.error("Fetch error:", err); }
  };

  useEffect(() => { if (isAuthenticated) fetchData(); }, [isAuthenticated, activeTab]);

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record? This cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/delete_common.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id,
          type: activeTab
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

  if (!isAuthenticated) return <LoginPage onLogin={handleLogin} />;

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
                posts={appData['blog-posts'] || []}
                onSave={async (formData) => {
                  const res = await fetch(`${apiUrl}/submit_blog.php`, { method: 'POST', body: formData });
                  const result = await res.json();
                  if (result.status === 'success') { alert('Saved!'); fetchData(); } else { alert('Error: ' + result.message); }
                }}
                onDelete={handleDelete}
              />
            )
              : activeTab === 'gallery-manager' ? (
                <GalleryManager />
              )
                : (<DataTable type={activeTab} data={currentData} onRefresh={fetchData} onAdd={() => { setCurrentEditItem(null); setModalOpen(true); }} onEdit={(item) => { setCurrentEditItem(item); setModalOpen(true); }} onDelete={handleDelete} />)}
        </main>
      </div>
      <FormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} categoryId={activeTab} initialData={currentEditItem} onSaveSuccess={() => { fetchData(); setModalOpen(false); }} onGenericSave={handleGenericSave} isSaving={isSaving} />
    </div>
  );
};

export default DashboardApp;