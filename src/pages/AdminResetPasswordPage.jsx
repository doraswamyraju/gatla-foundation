// src/pages/AdminResetPasswordPage.jsx

import React, { useState, useEffect } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';

const AdminResetPasswordPage = ({ onNavigate }) => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Extract token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            setStatus({ type: 'error', message: 'No reset token found in URL.' });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        if (!token) {
            setStatus({ type: 'error', message: 'Missing reset token.' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatus({ type: 'error', message: 'Passwords do not match.' });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://gatlafoundation.org/api/admin_reset_password.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, new_password: newPassword }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus({ type: 'success', message: 'Password reset successful!' });
                setTimeout(() => {
                    onNavigate('Login');
                }, 2000);
            } else {
                setStatus({
                    type: 'error',
                    message: data.message || 'Failed to reset password.',
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Network error. Please try again later.',
            });
            console.error('Reset Password error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
                <div className="bg-slate-900 p-8 text-center border-b border-slate-800 relative">
                    <button
                        onClick={() => onNavigate('Login')}
                        className="absolute border-none top-4 left-4 text-slate-400 hover:text-white transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center font-bold text-[#0B1120] text-3xl mx-auto mb-4">GF</div>
                    <h2 className="text-2xl font-bold text-white">Set New Password</h2>
                    <p className="text-slate-400 text-sm mt-2">Enter your new secure password</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {status.message && (
                        <div className={`px-4 py-3 rounded relative text-sm border ${status.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
                            {status.message}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !token}
                        className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Updating...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminResetPasswordPage;
