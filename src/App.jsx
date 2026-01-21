// src/App.jsx - FINAL STRUCTURAL INTEGRATION
import React, { useState, useCallback } from 'react';
import './App.css';

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
import VolunteerForm from './pages/forms/VolunteerForm.jsx';

// NEW: Import the Donation Form
import DonateForm from './pages/forms/DonateForm.jsx';
import CricketPlayerForm from './components/pillars/CricketPlayerForm.jsx';
import CricketMemberForm from './components/pillars/CricketMemberForm.jsx';

// CRITICAL: Import the correct Modal Component
import FormModal from './dashboard/components/FormModal.jsx';
import AdminDashboard from './dashboard/DashboardApp.jsx'; // Pointing to your DashboardApp
import AdminLoginPage from './pages/AdminLoginPage.jsx';

// --- 2. MOCK DATA ---
const MOCK_WINGS_DATA = {
    wings: [
        { id: 'education', title: 'Education Club' },
        { id: 'cricket', title: 'Cricket Club' },
        { id: 'music', title: 'Music Club' },
        { id: 'business', title: 'Business Club' },
        { id: 'awards', title: 'Awards Club' }
    ]
};

const UpcomingEventsSection = () => <div className="p-20 min-h-[60vh] flex items-center justify-center bg-white text-gray-900 text-xl">Events Page Placeholder</div>;
const CatchAllPage = ({ pageName }) => <div className="p-20 min-h-[60vh] flex items-center justify-center text-xl bg-white text-gray-900">Placeholder for: **{pageName}**</div>;

// --- C. PUBLIC SITE CONTAINER ---
const PublicSiteContainer = ({ appData, currentPage, handleNavigate, handleOpenForm }) => {

    const onNavClick = (id) => {
        const lowerId = id.toLowerCase();

        if (lowerId === 'home') return handleNavigate('Home');
        if (lowerId === 'dashboard' || lowerId === 'admin login') return handleNavigate('Login');

        // Specific check for Donate Page
        if (lowerId === 'donate') {
            return handleNavigate('Donate');
        }

        // Check for specific form IDs (open modal)
        const formIds = [
            'volunteer-form', 'supporter-form',
            'education-student', 'education-scriber', 'education-volunteer',
            'music-member', 'music-singer', 'music-judge',
            'cricket-player', 'cricket-umpire', 'cricket-club-member',
            'business-member', 'business-entrepreneur',
            'awards-nomination', 'awards-sponsor'
        ];

        if (formIds.includes(lowerId)) {
            handleOpenForm(lowerId);
            return;
        }

        // Standard Page Navigation
        const pageMap = {
            'about': 'About', 'projects': 'Projects', 'events': 'Events',
            'awards': 'Awards', 'gallery': 'Gallery', 'contact': 'Contact',
            'volunteer': 'volunteer-form' // Volunteer opens a modal form
        };
        const targetId = pageMap[lowerId];

        if (targetId) {
            if (formIds.includes(targetId)) {
                handleOpenForm(targetId);
                return;
            }
            return handleNavigate(targetId);
        }

        const selectedWing = appData.wings.find(w => w.id === lowerId);
        if (selectedWing) return handleNavigate('Wing', lowerId);

        handleNavigate(id);
    };

    let content;
    const currentLowerPage = currentPage.toLowerCase();

    // 1. DEDICATED PAGES
    if (currentLowerPage === 'donate') {
        // CHANGE THIS LINE: Pass onNavigate prop
        content = <DonateForm onNavigate={handleNavigate} />;
    }
    // 2. WING PAGES
    else if (currentLowerPage === 'education') {
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
    // 3. STANDARD PAGES
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

// --- A. MAIN APP ---
const App = () => {

    const getInitialPage = () => {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('/login') || path.includes('/dashboard')) return 'Login';
        if (path.includes('/donate')) return 'Donate';
        if (path.length > 1) return path.substring(1).charAt(0).toUpperCase() + path.substring(2);
        return 'Home';
    };

    const [currentPage, setCurrentPage] = useState(getInitialPage());
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [activeFormId, setActiveFormId] = useState('');

    const handleNavigate = useCallback((page, wingId = null) => {
        const lowerId = page.toLowerCase();
        let path = `/${lowerId}`;

        if (lowerId === 'login' || lowerId === 'dashboard') {
            setCurrentPage('Login');
            path = '/login';
        } else if (lowerId === 'wing' && wingId) {
            setCurrentPage(wingId);
            path = `/${wingId}`;
        } else if (lowerId === 'home') {
            setCurrentPage('Home');
            path = '/';
        } else {
            setCurrentPage(page);
        }
        window.history.pushState(null, '', path);
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

    const handleOpenForm = useCallback((formId) => {
        setActiveFormId(formId);
        setIsFormModalOpen(true);
    }, []);

    const handleCloseForm = useCallback(() => {
        setIsFormModalOpen(false);
        setActiveFormId('');
    }, []);

    if (isAuthenticated) {
        return <AdminDashboard onLogout={handleLogout} />;
    }

    if (currentPage.toLowerCase() === 'login') {
        return <AdminLoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
    }

    return (
        <>
            <PublicSiteContainer
                appData={MOCK_WINGS_DATA}
                currentPage={currentPage}
                handleNavigate={handleNavigate}
                handleOpenForm={handleOpenForm}
            />
            <FormModal
                isOpen={isFormModalOpen}
                categoryId={activeFormId}
                onClose={handleCloseForm}
            />
            {isFormModalOpen && activeFormId === 'volunteer-form' && (
                <VolunteerForm onClose={handleCloseForm} />
            )}

            {/* PUBLIC CRICKET FORMS */}
            {isFormModalOpen && activeFormId === 'cricket-player' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                    <div className="bg-[#0B1120] w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] relative">
                        <button onClick={handleCloseForm} className="absolute top-4 right-4 text-white hover:text-red-500 z-10"><i className="lucide-x w-6 h-6"></i> Close</button>
                        <CricketPlayerForm onClose={handleCloseForm} />
                    </div>
                </div>
            )}
            {isFormModalOpen && activeFormId === 'cricket-club-member' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                    <div className="bg-[#0B1120] w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] relative">
                        <button onClick={handleCloseForm} className="absolute top-4 right-4 text-white hover:text-red-500 z-10"><i className="lucide-x w-6 h-6"></i> Close</button>
                        <CricketMemberForm onClose={handleCloseForm} />
                    </div>
                </div>
            )}

            {/* GENERIC FORM MODAL (Fallback for other forms) */}
            <FormModal
                isOpen={isFormModalOpen && activeFormId !== 'volunteer-form' && activeFormId !== 'cricket-player' && activeFormId !== 'cricket-club-member'}
                categoryId={activeFormId}
                onClose={handleCloseForm}
                initialData={null}
            />
        </>
    );
};

export default App;