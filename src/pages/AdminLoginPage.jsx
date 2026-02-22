// src/pages/AdminLoginPage.jsx

import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

const AdminLoginPage = ({ onLogin, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('https://gatlafoundation.org/api/admin_login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Success: Call the parent function to change the state
                onLogin();
            } else {
                setError(data.message || 'Invalid email or password.');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
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
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-slate-700">Password</label>
                            <button
                                type="button"
                                onClick={() => onNavigate('ForgotPassword')}
                                className="text-sm border-none text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>

                <div className="p-4 border-t border-slate-100 text-center">
                    <button onClick={() => onNavigate('Home')} className="text-sm border-none text-blue-600 hover:underline">Return to Public Site</button>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;