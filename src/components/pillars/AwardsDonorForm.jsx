import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

const AwardsDonorForm = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [amount, setAmount] = useState(1000);
    const [customAmount, setCustomAmount] = useState('');
    const [donor, setDonor] = useState({ full_name: '', email_id: '', phone_no: '', pan_no: '' });

    const loadRazorpay = () => new Promise(resolve => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        const finalAmount = customAmount || amount;
        const res = await loadRazorpay();

        if (!res) { alert('Razorpay SDK failed.'); setLoading(false); return; }

        const options = {
            key: "rzp_test_RuKdTFadwm3UGT",
            amount: finalAmount * 100, currency: "INR",
            name: "Gatla Awards", description: "Awards Support",
            handler: async function (response) {
                try {
                    const isLocal = window.location.hostname === 'localhost';
                    const apiUrl = isLocal ? 'http://localhost/gatla-foundation/api/process_donation.php' : 'https://gatlafoundation.org/api/process_donation.php';

                    const result = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            payment_id: response.razorpay_payment_id,
                            amount: finalAmount,
                            name: donor.full_name,
                            email: donor.email_id,
                            phone: donor.phone_no,
                            pan: donor.pan_no,
                            club: 'awards'
                        })
                    }).then(res => res.json());

                    if (result.status === 'success') {
                        if (result.message && result.message.includes("Email")) alert(result.message);
                        setSuccess(true);
                        setTimeout(onClose, 3000);
                    } else {
                        alert("Server Error: " + result.message);
                    }
                } catch (error) { alert("Network error: " + error.message); }
                setLoading(false);
            },
            prefill: { name: donor.full_name, email: donor.email_id, contact: donor.phone_no },
            theme: { color: "#EF4444" } // Red
        };
        new window.Razorpay(options).open();
    };

    if (success) return <div className="p-12 text-center text-white"><CheckCircle2 className="w-16 h-16 text-red-500 mx-auto mb-4" /><h3>Donation Successful!</h3></div>;

    return (
        <div className="flex flex-col bg-[#0B1120] text-white h-full">
            <div className="px-8 py-6 border-b border-slate-800"><h2 className="text-2xl font-bold text-red-500">Awards Donor</h2></div>
            <form onSubmit={handlePayment} className="flex-1 overflow-y-auto p-8 space-y-6">

                <div className="grid grid-cols-3 gap-3">
                    {[500, 1000, 2000, 5000].map(amt => (
                        <button key={amt} type="button" onClick={() => { setAmount(amt); setCustomAmount(''); }} className={`py-2 rounded border ${amount === amt && !customAmount ? 'bg-red-600 border-red-600' : 'border-slate-700'}`}>₹{amt}</button>
                    ))}
                    <input type="number" placeholder="Custom" value={customAmount} onChange={e => { setCustomAmount(e.target.value); setAmount(0); }} className="py-2 px-3 rounded border border-slate-700 bg-slate-900/50 text-white col-span-2 md:col-span-1" />
                </div>

                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded text-red-400 text-sm font-bold text-center">
                    ♥ Supporting Gatla Awards
                </div>

                <div className="space-y-4">
                    <input type="text" placeholder="Full Name *" required className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3" onChange={e => setDonor({ ...donor, full_name: e.target.value })} />
                    <input type="email" placeholder="Email *" required className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3" onChange={e => setDonor({ ...donor, email_id: e.target.value })} />
                    <input type="tel" placeholder="Phone *" required className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3" onChange={e => setDonor({ ...donor, phone_no: e.target.value })} />
                    <input type="text" placeholder="PAN Number (Optional)" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 uppercase" maxLength={10} onChange={e => setDonor({ ...donor, pan_no: e.target.value })} />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : `Donate ₹${customAmount || amount}`}
                </button>
            </form>
        </div>
    );
};
export default AwardsDonorForm;
