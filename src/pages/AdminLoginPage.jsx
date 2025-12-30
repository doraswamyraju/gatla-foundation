// src/pages/AdminLoginPage.jsx

import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

const FoundationLogo = () => <div className="text-2xl font-serif font-bold text-amber-500 tracking-wide">GATLA <span className="text-white">FOUNDATION</span></div>;

const AdminLoginPage = ({ onLogin, onNavigate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // --- AUTHENTICATION LOGIC (Placeholder for API call) ---
        // In a real application, you would send username/password to a PHP endpoint (api/login.php).
        
        if (username === 'admin' && password === 'password') {
            // Success: Call the parent function to change the state
            onLogin(); 
        } else {
            setError('Invalid credentials. Use "admin" / "password" (for mock login).');
        }
    };

    return (
        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
                <div className="bg-slate-900 p-8 text-center border-b border-slate-800">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center font-bold text-[#0B1120] text-3xl mx-auto mb-4">GF</div>
                    <h2 className="text-2xl font-bold text-white">Admin Login</h2>
                    <p className="text-slate-400 text-sm">Gatla Foundation Management System</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="text" 
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition" 
                                placeholder="admin" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="password" 
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition shadow-lg transform hover:scale-[1.02]"
                    >
                        Access Dashboard
                    </button>
                </form>
                
                <div className="p-4 border-t border-slate-100 text-center">
                    <button onClick={() => onNavigate('Home')} className="text-sm text-blue-600 hover:underline">Return to Public Site</button>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;