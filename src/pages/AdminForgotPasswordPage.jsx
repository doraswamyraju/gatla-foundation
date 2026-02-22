// src/pages/AdminForgotPasswordPage.jsx

import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

const AdminForgotPasswordPage = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });
        setIsLoading(true);

        try {
            const response = await fetch('https://gatlafoundation.org/api/admin_forgot_password.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus({
                    type: 'success',
                    message: data.message || 'If the email exists, a reset link has been sent.',
                });
            } else {
                setStatus({
                    type: 'error',
                    message: data.message || 'An error occurred. Please try again.',
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Network error. Please try again later.',
            });
            console.error('Forgot Password error:', error);
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
                        className="absolute top-4 border-none left-4 text-slate-400 hover:text-white transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center font-bold text-[#0B1120] text-3xl mx-auto mb-4">GF</div>
                    <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                    <p className="text-slate-400 text-sm mt-2">Enter your admin email to receive a reset link</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {status.message && (
                        <div className={`px-4 py-3 rounded relative text-sm border ${status.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
                            {status.message}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="email" 
                                required
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition" 
                                placeholder="name@domain.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Sending Request...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminForgotPasswordPage;
