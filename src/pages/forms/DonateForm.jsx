import React, { useState } from 'react';
import { Heart, ShieldCheck, Home, QrCode } from 'lucide-react';

const DonateForm = ({ onNavigate, club }) => {
  const [donor, setDonor] = useState({ name: '', email: '', phone: '', pan: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In this offline/QR mode, we just show a thank you message 
    // after they confirm they've scanned and sent the amount.
    setSubmitted(true);
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
            Your contribution makes a world of difference. Once we verify the transaction, you will receive an official receipt at <span className="text-amber-600 font-medium">{donor.email}</span>.
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
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* QR Section */}
        <div className="md:w-1/2 bg-amber-500 p-8 flex flex-col items-center justify-center text-center">
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

          <p className="text-[#0B1120] text-sm leading-relaxed px-4">
            Scan using any UPI App (GPay, PhonePe, Paytm, etc.) to contribute directly to the Gatla Foundation.
          </p>
        </div>

        {/* Info Form */}
        <div className="md:w-1/2 p-8">
          <div className="mb-6 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-800">Donor Information</h3>
            <p className="text-slate-500 text-sm">Please provide your details below to receive a donation receipt.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" placeholder="Full Name" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-amber-500 outline-none" value={donor.name} onChange={e => setDonor({ ...donor, name: e.target.value })} />
            <input required type="email" placeholder="Email Address" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-amber-500 outline-none" value={donor.email} onChange={e => setDonor({ ...donor, email: e.target.value })} />
            <input required type="tel" placeholder="Phone Number" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-amber-500 outline-none" value={donor.phone} onChange={e => setDonor({ ...donor, phone: e.target.value })} />
            <input
              type="text"
              placeholder="PAN Number (Optional)"
              className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-amber-500 outline-none uppercase"
              maxLength={10}
              value={donor.pan}
              onChange={e => setDonor({ ...donor, pan: e.target.value.toUpperCase() })}
            />

            <div className="pt-4">
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg">
                I have completed the payment
              </button>
            </div>

            <div className="text-center flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest pt-4">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Direct Foundation Support
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateForm;