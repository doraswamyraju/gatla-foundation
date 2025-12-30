import React, { useState, useMemo, useEffect } from 'react'; 
import { LayoutDashboard, User, LogOut, Search } from 'lucide-react';

import Sidebar from '../dashboard/components/Sidebar.jsx';
import DataTable from '../dashboard/components/DataTable.jsx';
import BlogManager from '../dashboard/components/BlogManager.jsx';
import FormModal from '../dashboard/components/FormModal.jsx';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [appData, setAppData] = useState({});
  const [loading, setLoading] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);

  // --- ROBUST DATA FETCHING LOGIC ---
  const fetchCategoryData = async (categoryId) => {
    // Skip fetching for static tabs
    if (categoryId === 'overview' || categoryId === 'blog-manager') return;

    setLoading(true);
    
    // MAP: React Tab ID -> PHP File Name
    const endpointMap = {
      'education-student': 'get_education_students.php',
      'education-scriber': 'get_education_scribers.php',
      'education-volunteer': 'get_education_volunteers.php',
      'education-donor': 'get_education_donors.php',
      // Add other clubs here
      'cricket-player': 'get_cricket_players.php',
    };

    const endpoint = endpointMap[categoryId];
    
    if (!endpoint) {
        console.warn(`No endpoint mapped for category: ${categoryId}`);
        setLoading(false);
        return;
    }

    try {
      // FIX: Matches your XAMPP folder name "gatla-foundation - Copy"
      const API_BASE = 'http://localhost/gatla-foundation - Copy/api/';
      
      const response = await fetch(`${API_BASE}${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 1. Get Raw Text first to debug HTML errors
      const text = await response.text();

      // 2. Try to parse it as JSON
      let result;
      try {
        result = JSON.parse(text);
      } catch (jsonError) {
        console.error("CRITICAL PHP ERROR:", text); 
        throw new Error("Server returned HTML instead of JSON. Check Console.");
      }

      // 3. Handle data wrapper if present
      const cleanData = result.data || result || [];
      
      setAppData(prev => ({ ...prev, [categoryId]: cleanData }));

    } catch (error) {
      console.error(`Fetch Error for ${categoryId}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData(activeTab);
  }, [activeTab]);

  const currentData = useMemo(() => appData[activeTab] || [], [appData, activeTab]);

  // --- Handlers ---
  const handleAdd = () => {
    setCurrentEditItem(null); 
    setModalOpen(true);       
  };

  const handleEdit = (item) => {
    setCurrentEditItem(item); 
    setModalOpen(true);       
  };

  const handleSaveWrapper = () => {
    setModalOpen(false);
    fetchCategoryData(activeTab); // Refresh data after save
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans antialiased">
      
      {/* SIDEBAR */}
      <aside className="w-72 h-full flex-shrink-0 z-30 shadow-2xl">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>
      
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0 z-20">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight">
              {activeTab === 'overview' ? 'System Overview' : activeTab.replace('-', ' ')}
            </h1>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs focus:ring-2 focus:ring-green-500 w-64 transition-all" />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-none">Super Admin</p>
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-[0.2em]">Live Session</span>
              </div>
              <button onClick={() => window.location.href = '/'} className="p-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all shadow-sm">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {activeTab === 'overview' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Student Apps', val: appData['education-student']?.length || 0, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Scribe Requests', val: appData['education-scriber']?.length || 0, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Volunteers', val: appData['education-volunteer']?.length || 0, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Donors List', val: appData['education-donor']?.length || 0, color: 'text-amber-600', bg: 'bg-amber-50' }
                ].map((s, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                    <div className={`w-12 h-12 ${s.bg} rounded-2xl mb-6 flex items-center justify-center`}>
                      <LayoutDashboard className={`w-6 h-6 ${s.color}`} />
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{s.label}</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'blog-manager' ? (
            <BlogManager posts={[]} />
          ) : (
            <DataTable 
              type={activeTab} 
              data={currentData} 
              onRefresh={() => fetchCategoryData(activeTab)} 
              onAdd={handleAdd} 
              onEdit={handleEdit}
            />
          )}
        </main>
      </div>

      <FormModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        categoryId={activeTab} 
        initialData={currentEditItem}
        onSave={handleSaveWrapper}
      />
    </div>
  );
};

export default AdminDashboard;