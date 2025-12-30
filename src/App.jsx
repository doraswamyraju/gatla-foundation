// src/App.jsx - FINAL STRUCTURAL INTEGRATION FOR PUBLIC AND ADMIN MODALS

import React, { useState, useCallback, useMemo } from 'react';
import './App.css'; 
import { X, User, Lock } from 'lucide-react'; 


// --- 1. CORE IMPORTS ---
import Navbar from './components/Navbar.jsx'; 
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';        
import About from './pages/About.jsx';      
import Projects from './pages/Projects.jsx'; 
import Awards from './pages/Awards.jsx'; 
import EducationClub from './pages/EducationClub.jsx'; 
import CricketClub from './pages/CricketClub.jsx';     
import MusicClub from './pages/MusicClub.jsx';         
import BusinessClub from './pages/BusinessClub.jsx';   
import AwardsClub from './pages/AwardsClub.jsx'; 

// CRITICAL: Import the correct Modal Component
import FormModal from './dashboard/components/FormModal.jsx'; 
import AdminDashboard from './pages/AdminDashboard.jsx'; 
import AdminLoginPage from './pages/AdminLoginPage.jsx'; 


// --- 2. MOCK DATA & UTILITIES (Minimized) ---
const FoundationLogo = () => <div className="text-2xl font-serif font-bold text-white tracking-wide">GATLA <span className="text-amber-400">FOUNDATION</span></div>;
const UpcomingEventsSection = () => <div className="p-20 min-h-[60vh] flex items-center justify-center bg-white text-gray-900 text-xl">Events Page Placeholder</div>;
const CatchAllPage = ({ pageName }) => <div className="p-20 min-h-[60vh] flex items-center justify-center text-xl bg-white text-gray-900">Placeholder for: **{pageName}**</div>;

const MOCK_WINGS_DATA = {
    wings: [
        { id: 'education', title: 'Education Club' }, 
        { id: 'cricket', title: 'Cricket Club' }, 
        { id: 'music', title: 'Music Club' }, 
        { id: 'business', title: 'Business Club' }, 
        { id: 'awards', title: 'Awards Club' }
    ]
};


// --- C. PUBLIC SITE CONTAINER (The Public Site Router) ---
const PublicSiteContainer = ({ appData, currentPage, handleNavigate, handleOpenForm }) => {
    
    const onNavClick = (id) => {
        const lowerId = id.toLowerCase();
        
        if (lowerId === 'home') return handleNavigate('Home');
        if (lowerId === 'dashboard' || lowerId === 'admin login') return handleNavigate('Login'); 
        
        // ALL possible form IDs defined across the application
        const formIds = [
            'volunteer-form', 'supporter-form', 
            // Education Forms
            'education-student', 'education-scriber', 'education-volunteer', 'education-donor', 'education-supporter', 
            // Music Forms
            'music-member', 'music-singer', 'music-judge', 'music-donor', 'music-supporter', 
            // Cricket Forms (To be added later)
            'cricket-player', 'cricket-umpire', 'cricket-club-member', 'cricket-donor', 'cricket-supporter', 'cricket-volunteer',
            // Business/Awards Forms (To be added later)
            'business-member', 'business-entrepreneur', 'business-donor', 
            'awards-nomination', 'awards-sponsor'
        ];

        // 1. Check if the click targets a Form ID
        if (formIds.includes(lowerId)) {
             handleOpenForm(lowerId); // Open the modal with the form ID
             return; // <--- CRITICAL FIX: Stop execution to prevent page navigation
        }

        // 2. Standard Page Navigation (Navbar/Buttons)
        const pageMap = { 
            'about': 'About', 'projects': 'Projects', 'events': 'Events',
            'awards': 'Awards', 'gallery': 'Gallery', 'contact': 'Contact',
            // Special cases from Navbar buttons mapped to form IDs
            'volunteer': 'volunteer-form', 
            'donate': 'supporter-form', 
        };
        const targetId = pageMap[lowerId];

        if (targetId) {
            // Check if Navbar special case should open a form
            if (formIds.includes(targetId)) {
                handleOpenForm(targetId);
                return; // <--- CRITICAL FIX: Stop execution
            }
            return handleNavigate(targetId);
        }
        
        const selectedWing = appData.wings.find(w => w.id === lowerId);
        if (selectedWing) return handleNavigate('Wing', lowerId);

        handleNavigate(id); 
    };

    let content;
    const currentLowerPage = currentPage.toLowerCase();

    // Dedicated Wing Page Logic (Handles all pillar IDs)
    if (currentLowerPage === 'education') {
        content = <EducationClub onNavigate={onNavClick} />;
    } else if (currentLowerPage === 'cricket') {
        content = <CricketClub onNavigate={onNavClick} />;
    } else if (currentLowerPage === 'music') {
        content = <MusicClub onNavigate={onNavClick} />;
    } else if (currentLowerPage === 'business') {
        content = <BusinessClub onNavigate={onNavClick} />;
    } else if (currentLowerPage === 'awards') { 
        content = <AwardsClub onNavigate={onNavClick} />;
    }
    
    // Standard Page Routes
    else {
        switch (currentLowerPage) {
            case 'home':
                content = (
                    <>
                        <Home onNavigate={onNavClick} onSelectWing={(id) => handleNavigate('Wing', id)} />
                        <About onNavigate={onNavClick} />
                        <Projects onSelectWing={(id) => handleNavigate('Wing', id)} />
                        <Awards /> 
                    </>
                );
                break;
            case 'about':
                content = <About onNavigate={onNavClick} />;
                break;
            case 'projects':
                content = <Projects onSelectWing={(id) => handleNavigate('Wing', id)} />;
                break;
            case 'events':
                content = <UpcomingEventsSection />; 
                break;
            case 'contact':
                content = <CatchAllPage pageName={"Contact"} />;
                break;
            default: 
                // If it falls through here, it means 'currentPage' holds an unrecognized ID (like 'education-donor' which wasn't stopped earlier)
                content = <CatchAllPage pageName={currentPage} />;
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#050914]">
            <Navbar onNavigate={onNavClick} />
            <main className="flex-grow">{content}</main>
            <Footer onNavigate={onNavClick} />
        </div>
    );
};


// --- A. CORE APPLICATION & ROUTING (Main App.jsx) ---
const App = () => {
    
    const getInitialPage = () => {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('/login') || path.includes('/dashboard')) {
            return 'Login';
        } else if (path.length > 1) {
            return path.substring(1).charAt(0).toUpperCase() + path.substring(2);
        }
        return 'Home';
    };
    
    // 1. Core State
    const [currentPage, setCurrentPage] = useState(getInitialPage()); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Modal State Management
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [activeFormId, setActiveFormId] = useState('');

    // 2. Core Actions
    const handleNavigate = useCallback((page, wingId = null) => {
        const lowerId = page.toLowerCase();
        
        if (lowerId === 'login' || lowerId === 'dashboard' || lowerId === 'admin login') {
            setCurrentPage('Login');
            window.history.pushState(null, '', '/login'); 
        } else if (lowerId === 'wing' && wingId) {
            setCurrentPage(wingId);
            window.history.pushState(null, '', `/${wingId}`); 
        } else {
            setCurrentPage(page);
            window.history.pushState(null, '', `/${page.toLowerCase()}`); 
        }
        window.scrollTo(0, 0);
    }, []);

    const handleLogin = useCallback(() => {
        setIsAuthenticated(true);
        setCurrentPage('Dashboard');
        window.history.pushState(null, '', '/dashboard'); 
    }, []);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        setCurrentPage('Home');
        window.history.pushState(null, '', '/'); 
    }, []);

    const handleSave = useCallback(() => {}, []);
    const handleDelete = useCallback(() => {}, []);

    // --- HANDLERS FOR MODAL ---
    const handleOpenForm = useCallback((formId) => {
        setActiveFormId(formId);
        setIsFormModalOpen(true);
    }, []);

    const handleCloseForm = useCallback(() => {
        setIsFormModalOpen(false);
        setActiveFormId('');
    }, []);


    // 3. Main Router Logic
    if (isAuthenticated) {
        return (
            <AdminDashboard
                handleLogout={handleLogout}
                handleSave={handleSave}
                handleDelete={handleDelete}
            />
        );
    }

    if (currentPage.toLowerCase() === 'login') {
        return (
            <AdminLoginPage onLogin={handleLogin} onNavigate={handleNavigate} />
        );
    }

    // Default: Public Site
    return (
        <>
            <PublicSiteContainer
                appData={MOCK_WINGS_DATA} 
                currentPage={currentPage}
                handleNavigate={handleNavigate}
                handleOpenForm={handleOpenForm} 
            />
            {/* The Global Form Modal */}
            <FormModal 
                isOpen={isFormModalOpen}
                categoryId={activeFormId} // This links the button ID to the correct component
                onClose={handleCloseForm}
                initialData={null} 
            />
        </>
    );
};

export default App;