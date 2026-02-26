import React, { useState } from 'react';
import { Heart, ShieldCheck, Home, QrCode } from 'lucide-react';

const DonateForm = ({ onNavigate, club }) => {
  const [donor, setDonor] = useState({ name: '', email: '', phone: '', pan: '', amount: '', payment_id: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/process_donation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...donor, club: club || 'general' })
      });

      const result = await response.json();
      if (result.status === 'success') {
        setSubmitted(true);
      } else {
        setError(result.message || 'Failed to record donation. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B1120] py-20 px-4 flex justify-center items-center animate-in fade-in duration-500">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-green-600 fill-current" />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">Thank You for Your Support!</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Your generous contribution of <span className="text-green-600 font-bold">Rs. {donor.amount}</span> makes a world of difference.
            An official receipt has been sent to <span className="text-amber-600 font-medium">{donor.email}</span>.
          </p>

          <button
            onClick={() => onNavigate ? onNavigate('home') : window.location.href = '/'}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] py-24 px-4 flex justify-center items-center">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* QR Section */}
        <div className="md:w-5/12 bg-amber-500 p-8 flex flex-col items-center justify-center text-center">
          <QrCode className="w-12 h-12 text-[#0B1120] mb-4" />
          <h2 className="text-2xl font-bold text-[#0B1120] mb-2">Scan to Donate</h2>
          <p className="text-[#0B1120] font-medium mb-1 uppercase tracking-wider text-[10px]">Secure UPI Payment</p>
          {club && club !== 'general' && (
            <p className="bg-[#0B1120] text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mt-2 mb-4">
              Supporting {club.charAt(0).toUpperCase() + club.slice(1)} Club
            </p>
          )}

          <div className="bg-white p-4 rounded-xl shadow-inner mb-6 w-full max-w-[240px]">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/donate_qr.jpg"}
              alt="Donation QR Code"
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none'; // Hide broken image
                const parent = e.target.parentElement;
                if (parent && !parent.querySelector('.qr-placeholder')) {
                  const div = document.createElement('div');
                  div.className = 'qr-placeholder p-8 bg-slate-100 rounded-lg text-slate-400 text-xs flex flex-col items-center';
                  div.innerHTML = '<svg class="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg><span>Please save QR code as:</span><span class="font-mono mt-1 text-slate-600">public/assets/images/donate_qr.jpg</span>';
                  parent.appendChild(div);
                }
              }}
            />
          </div>

          <p className="text-[#0B1120] text-xs leading-relaxed px-4 opacity-80">
            Scan using any UPI App (GPay, PhonePe, Paytm, etc.) to contribute directly to the Gatla Foundation.
          </p>
        </div>

        {/* Info Form */}
        <div className="md:w-7/12 p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800">Donor & Payment Details</h3>
            <p className="text-slate-500 text-xs">Please provide your details and the transaction ID after scanning the QR code.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-amber-500 outline-none" value={donor.name} onChange={e => setDonor({ ...donor, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-amber-500 outline-none" value={donor.email} onChange={e => setDonor({ ...donor, email: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Phone Number</label>
                <input required type="tel" placeholder="9876543210" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-amber-500 outline-none" value={donor.phone} onChange={e => setDonor({ ...donor, phone: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">PAN Number (Optional)</label>
                <input type="text" placeholder="ABCDE1234F" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-amber-500 outline-none uppercase" maxLength={10} value={donor.pan} onChange={e => setDonor({ ...donor, pan: e.target.value.toUpperCase() })} />
              </div>
            </div>

            <div className="h-px bg-slate-100 my-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-amber-600 uppercase ml-1">Amount Contributed (Rs.)</label>
                <input required type="number" placeholder="500" className="w-full border-2 border-amber-200 rounded-lg p-3 text-sm font-bold focus:border-amber-500 outline-none" value={donor.amount} onChange={e => setDonor({ ...donor, amount: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-amber-600 uppercase ml-1">UPI Transaction / Ref No</label>
                <input required type="text" placeholder="TXN12345678" className="w-full border-2 border-amber-200 rounded-lg p-3 text-sm font-bold focus:border-amber-500 outline-none" value={donor.payment_id} onChange={e => setDonor({ ...donor, payment_id: e.target.value })} />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs bg-red-50 p-2 rounded border border-red-100">{error}</p>}

            <div className="pt-2">
              <button disabled={loading} type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50">
                {loading ? 'Recording Donation...' : 'Submit Donation Details'}
              </button>
            </div>

            <div className="text-center flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest pt-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Secure Donation Recording
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateForm;