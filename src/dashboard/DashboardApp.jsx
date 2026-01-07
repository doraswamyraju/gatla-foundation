import React, { useState, useEffect } from 'react';
import { 
  Menu, X, FileSpreadsheet, File as FileIcon, Plus, Trash2, Edit, Save, 
  UploadCloud, Loader2, FileText, ChevronDown, LogOut, ImageIcon 
} from 'lucide-react';

// --- EXPORT LIBRARIES ---
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// --- IMPORTS ---
import Sidebar from './components/Sidebar'; 
import GeneralVolunteerForm from '../pages/forms/GeneralVolunteerForm';
import { FORM_SCHEMAS } from './data/FormSchemas';
import EducationStudentForm from '../pages/forms/EducationStudentForm'; // <--- IMPORT THIS
import EducationScriberForm from '../pages/forms/EducationScriberForm';


// --- 1. BLOG MANAGER ---
const BlogManager = ({ posts, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleEdit = (post) => { setCurrentPost(post); setIsEditing(true); };
  const handleNew = () => { setCurrentPost({ title: '', content: '', category: 'General', status: 'Draft' }); setIsEditing(true); };

  const handleSavePost = (e) => {
    e.preventDefault();
    onSave(currentPost);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">{currentPost.id ? 'Edit Post' : 'New Blog Post'}</h2>
          <button onClick={() => setIsEditing(false)} className="text-slate-500 hover:text-slate-700">Cancel</button>
        </div>
        <form onSubmit={handleSavePost} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
            <input type="text" className="w-full border border-slate-300 rounded-lg p-3 outline-none" value={currentPost.title} onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
            <textarea className="w-full border border-slate-300 rounded-lg p-3 h-64 outline-none" value={currentPost.content} onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})} required />
          </div>
          <div className="flex justify-end gap-3">
             <button type="submit" className="px-6 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600">Publish</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800">All Posts</h2>
        <button onClick={handleNew} className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800"><Plus className="w-4 h-4 mr-2" /> New Post</button>
      </div>
      <div className="divide-y divide-slate-100">
        {posts.map(post => (
          <div key={post.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
            <div><h3 className="font-bold text-slate-800">{post.title}</h3></div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(post)} className="p-2 text-slate-400 hover:text-amber-500"><Edit className="w-4 h-4"/></button>
              <button onClick={() => onDelete(post.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 2. FIXED FORM MODAL ---
const FormModal = ({ isOpen, onClose, categoryId, initialData, onSaveSuccess, onGenericSave, isSaving }) => {
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState(null);

  useEffect(() => { 
     if(isOpen) { 
        setFormData(initialData || {}); 
        setFileData(null); 
     } 
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // --- A. Render Specific Modular Forms (Public Website Style) ---
  if (categoryId === 'volunteer-form') {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0">
                    <h3 className="font-bold flex items-center gap-2">
                        {initialData ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} 
                        {initialData ? 'Edit' : 'Add New'} Volunteer
                    </h3>
                    <button onClick={onClose}><X className="w-5 h-5" /></button>
                </div>
                <div className="overflow-y-auto">
                    <GeneralVolunteerForm 
                        onClose={onClose} 
                        initialData={initialData} 
                        onSaveSuccess={onSaveSuccess} 
                    />
                </div>
            </div>
        </div>
    );
  }

  if (categoryId === 'education-student') { // <--- ADD THIS BLOCK
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0">
                    <h3 className="font-bold flex items-center gap-2">
                        {initialData ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} 
                        {initialData ? 'Edit' : 'Add New'} Student
                    </h3>
                    <button onClick={onClose}><X className="w-5 h-5" /></button>
                </div>
                <div className="overflow-y-auto">
                    <EducationStudentForm 
                        onClose={onClose} 
                        initialData={initialData} 
                        onSaveSuccess={onSaveSuccess} 
                    />
                </div>
            </div>
        </div>
    );
  }

  // --- B. Generic Fallback Forms ---
  const schema = FORM_SCHEMAS[categoryId] || FORM_SCHEMAS['volunteer-form']; 
  const title = categoryId.replace(/-/g, ' ').toUpperCase();
  const handleSubmit = (e) => { e.preventDefault(); onGenericSave(formData, fileData); };
  const getFieldKey = (field) => field.name || field.key;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0">
          <h3 className="font-bold flex items-center gap-2">{initialData ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} {title}</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          <form id="dynamic-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schema.map((field) => {
               const fieldName = getFieldKey(field);
               return (
                  <div key={fieldName} className={(field.type === 'textarea' || field.type === 'file') ? 'md:col-span-2' : ''}>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none" rows="3"
                        value={formData[fieldName] || ''} onChange={(e) => setFormData({...formData, [fieldName]: e.target.value})} />
                    ) : field.type === 'file' ? (
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center relative">
                            <UploadCloud className="w-8 h-8 mb-2 text-amber-500" />
                            <span className="text-sm">{fileData ? fileData.name : "Upload File"}</span>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files[0] && setFileData(e.target.files[0])} />
                        </div>
                    ) : (
                      <input type={field.type} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none"
                        value={formData[fieldName] || ''} onChange={(e) => setFormData({...formData, [fieldName]: e.target.value})} />
                    )}
                  </div>
               );
            })}
          </form>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
          <button type="submit" form="dynamic-form" disabled={isSaving} className="px-6 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md flex items-center gap-2">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />} Save Record
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 3. DATA TABLE (Updated with EXPORT Logic) ---
const DataTable = ({ type, data, onAdd, onEdit, onDelete }) => {
  const schema = FORM_SCHEMAS[type] || FORM_SCHEMAS['volunteer-form'];
  const getFieldKey = (field) => field.name || field.key;
  const displayHeaders = schema.slice(0, 5).map(f => ({ key: getFieldKey(f), label: f.label }));

  // --- EXPORT TO EXCEL ---
  const handleExportExcel = () => {
    if (!data || data.length === 0) return alert("No data to export");
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${type}_export_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // --- EXPORT TO PDF ---
  const handleExportPDF = () => {
    if (!data || data.length === 0) return alert("No data to export");

    const doc = new jsPDF();
    
    // Define columns based on headers
    const tableColumn = displayHeaders.map(col => col.label);
    const tableRows = [];

    data.forEach(item => {
      const rowData = displayHeaders.map(col => item[col.key] || '');
      tableRows.push(rowData);
    });

    doc.text(`${type.replace(/-/g, ' ').toUpperCase()} REPORT`, 14, 15);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    
    doc.save(`${type}_export_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 capitalize">{type.replace(/-/g, ' ')}</h2>
          <p className="text-sm text-slate-500">{data.length} records found</p>
        </div>
        
        <div className="flex gap-2">
          {type !== 'donations-list' && (
            <button onClick={onAdd} className="flex items-center px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
              <Plus className="w-4 h-4 mr-2" /> Add New
            </button>
          )}
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          
          <button onClick={handleExportExcel} className="flex items-center px-3 py-2 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 rounded border border-green-200">
            <FileSpreadsheet className="w-4 h-4 mr-1" /> Excel
          </button>
          
          <button onClick={handleExportPDF} className="flex items-center px-3 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200">
            <FileIcon className="w-4 h-4 mr-1" /> PDF
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
            <tr>
              {displayHeaders.map((header) => (
                <th key={header.key} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  {header.label}
                </th>
              ))}
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-amber-50/50 transition-colors group">
                  {displayHeaders.map((header) => (
                    <td key={header.key} className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
                       {(header.key === 'document' || header.key === 'document_path') && row[header.key] ? 
                          <a href={`http://localhost/gatla-foundation/api/uploads/${row[header.key]}`} target="_blank" rel="noreferrer" className="text-blue-500 underline flex items-center gap-1">
                             <FileText className="w-3 h-3"/> View File
                          </a> 
                          : row[header.key] || '---'}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                     <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        row.status === 'Approved' || row.status === 'Active' || row.status === 'Success' ? 'bg-green-100 text-green-700' :
                        row.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {row.status || 'Pending'}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      {type !== 'donations-list' && (
                        <button onClick={() => onEdit(row)} className="p-1 text-slate-400 hover:text-amber-500" title="Edit"><Edit className="w-4 h-4" /></button>
                      )}
                      <button onClick={() => onDelete(row.id)} className="p-1 text-slate-400 hover:text-red-500" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={displayHeaders.length + 2} className="text-center py-12 text-slate-400">
                  <div className="flex flex-col items-center">
                    <FileText className="w-12 h-12 text-slate-200 mb-2" />
                    <p>No records found.</p>
                  </div>
                </td>
              </tr>
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
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold">A</div>
        <span className="hidden md:inline">Admin</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-50">
          <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      )}
    </div>
  );
};

// --- 5. LOGIN PAGE ---
const LoginPage = ({ onLogin }) => (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
          <button onClick={onLogin} className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg">Access Dashboard</button>
      </div>
    </div>
);

// --- 6. MAIN APP ---
const DashboardApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [appData, setAppData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const currentData = appData[activeTab] || [];
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost/gatla-foundation/api';

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => { setIsAuthenticated(false); setActiveTab('dashboard'); };

  const fetchData = async () => {
      try {
        if (activeTab === 'volunteer-form') {
            const res = await fetch(`${apiUrl}/get_general_volunteers.php`);
            const data = await res.json();
            setAppData(prev => ({ ...prev, 'volunteer-form': data }));
        } else if (activeTab === 'donations-list') {
            const res = await fetch(`${apiUrl}/get_donations.php`);
            const data = await res.json();
            setAppData(prev => ({ ...prev, 'donations-list': data }));
        } else if (activeTab === 'education-student') { // <--- ADD THIS
            const res = await fetch(`${apiUrl}/get_education_students.php`);
            const data = await res.json();
            setAppData(prev => ({ ...prev, 'education-student': data }));
        }else if (activeTab === 'education-scriber') {
    const res = await fetch(`${apiUrl}/get_education_scribers.php`);
    const data = await res.json();
    setAppData(prev => ({ ...prev, 'education-scriber': data }));

        } else {
            const res = await fetch(`${apiUrl}/get_dashboard_data.php`);
            const text = await res.text(); 
            try {
                const data = JSON.parse(text);
                if (data.status !== 'error') setAppData(data);
            } catch (e) { console.error("JSON Error", text); }
        }
      } catch (err) { console.error("Fetch error:", err); }
  };

  useEffect(() => { if (isAuthenticated) fetchData(); }, [isAuthenticated, activeTab]);

  const handleGenericSave = async (data, fileData) => {
    setIsSaving(true);
    const payload = new FormData();
    payload.append('formType', activeTab);
    Object.keys(data).forEach(key => payload.append(key, data[key]));
    if (fileData) payload.append('document', fileData);

    try {
        const response = await fetch(`${apiUrl}/submit_common.php`, { method: 'POST', body: payload });
        const result = await response.json();
        if (result.status === 'success') {
            alert("Saved successfully!");
            setModalOpen(false);
            fetchData(); 
        } else { alert("Error: " + result.message); }
    } catch (error) { alert("Network Error"); } 
    finally { setIsSaving(false); }
  };

  if (!isAuthenticated) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
        onLogout={handleLogout} 
      />
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4"><button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2"><Menu className="w-6 h-6" /></button><h2 className="text-xl font-bold text-slate-800 hidden sm:block capitalize">{activeTab.replace(/-/g, ' ')}</h2></div>
          <ProfileSection onLogout={handleLogout} />
        </header>
        <main className="flex-1 p-6 overflow-hidden flex flex-col">
          {activeTab === 'dashboard' ? (
             <div className="p-10 text-center text-slate-500"><h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Admin</h1></div>
          ) : activeTab === 'blog-manager' ? (
             <BlogManager 
                posts={appData['blog-posts'] || []} 
                onSave={(post) => console.log(post)} 
                onDelete={() => {}} 
             />
          ) : (
             <DataTable type={activeTab} data={currentData} onAdd={() => { setCurrentEditItem(null); setModalOpen(true); }} onEdit={(item) => { setCurrentEditItem(item); setModalOpen(true); }} onDelete={() => {}} />
          )}
        </main>
      </div>
      
      <FormModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        categoryId={activeTab} 
        initialData={currentEditItem}
        onSaveSuccess={() => { fetchData(); setModalOpen(false); }} 
        onGenericSave={handleGenericSave} 
        isSaving={isSaving}
      />
    </div>
  );
};

export default DashboardApp;