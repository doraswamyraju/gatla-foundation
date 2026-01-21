import React, { useState, useEffect } from 'react';
import { Heart, CreditCard, ShieldCheck, CheckCircle, Home } from 'lucide-react';

const DonateForm = ({ onNavigate, club }) => {
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [donor, setDonor] = useState({ name: '', email: '', phone: '', pan: '' });
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // New State for Success Screen

  // Auto-redirect effect
  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        if (onNavigate) {
          onNavigate('home');
        } else {
          window.location.href = '/'; // Fallback if prop is missing
        }
      }, 5000); // Redirect after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [paymentSuccess, onNavigate]);

  // Load Razorpay Script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalAmount = customAmount || amount;

    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load.');
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_RuKdTFadwm3UGT", // Replace with Live Key
      amount: finalAmount * 100,
      currency: "INR",
      name: "Gatla Foundation",
      description: "Donation",
      image: process.env.PUBLIC_URL + "/assets/images/1.jpg",
      handler: async function (response) {
        try {
          // Send to Backend
          const apiRes = await fetch(`${process.env.REACT_APP_API_URL}/process_donation.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              payment_id: response.razorpay_payment_id,
              amount: finalAmount,
              name: donor.name,
              email: donor.email,
              phone: donor.phone,
              pan: donor.pan,
              club: club || 'general' // Send Club
            })
          });

          const result = await apiRes.json();
          if (result.status === 'success') {
            // SHOW SUCCESS SCREEN INSTEAD OF ALERT
            setPaymentSuccess(true);
          } else {
            alert("Payment success, but server error: " + result.message);
          }
        } catch (error) {
          console.error(error);
          alert("Error connecting to server.");
        }
        setLoading(false);
      },
      prefill: {
        name: donor.name,
        email: donor.email,
        contact: donor.phone
      },
      theme: { color: "#F59E0B" }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    // Don't set loading false here, wait for handler
  };

  // --- SUCCESS SCREEN VIEW ---
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#0B1120] py-20 px-4 flex justify-center items-center animate-in fade-in duration-500">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">Donation Successful!</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Thank you, <strong>{donor.name}</strong>.<br />
            Your receipt has been sent to <span className="text-amber-600 font-medium">{donor.email}</span>.
          </p>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6 text-sm text-slate-500">
            <p>Redirecting you to Home in 5 seconds...</p>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return to Home Now
          </button>
        </div>
      </div>
    );
  }

  // --- FORM VIEW ---
  return (
    <div className="min-h-screen bg-[#0B1120] py-24 px-4 flex justify-center items-center">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-amber-500 p-6 text-center">
          <Heart className="w-12 h-12 text-[#0B1120] mx-auto mb-2 fill-current" />
          <h2 className="text-2xl font-bold text-[#0B1120]">Make a Donation</h2>
          <p className="text-amber-900 font-medium">Support the visually impaired</p>
        </div>

        <form onSubmit={handlePayment} className="p-8 space-y-6">
          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Select Amount</label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[500, 1000, 2000, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setAmount(amt); setCustomAmount(''); }}
                  className={`py-2 px-4 rounded-lg font-bold border transition-colors ${amount === amt && !customAmount
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'border-slate-300 text-slate-600 hover:border-amber-500'
                    }`}
                >
                  ₹{amt}
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                className={`py-2 px-4 rounded-lg font-bold border outline-none ${customAmount ? 'border-amber-500 ring-1 ring-amber-500' : 'border-slate-300'
                  }`}
              />
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <input required type="text" placeholder="Full Name" className="w-full border rounded-lg p-3" value={donor.name} onChange={e => setDonor({ ...donor, name: e.target.value })} />

            <div className="grid grid-cols-2 gap-4">
              <input required type="email" placeholder="Email Address" className="w-full border rounded-lg p-3" value={donor.email} onChange={e => setDonor({ ...donor, email: e.target.value })} />
              <input required type="tel" placeholder="Phone Number" className="w-full border rounded-lg p-3" value={donor.phone} onChange={e => setDonor({ ...donor, phone: e.target.value })} />
            </div>

            {/* Added PAN Input */}
            <input
              required
              type="text"
              placeholder="PAN Card Number"
              className="w-full border rounded-lg p-3 uppercase"
              maxLength={10}
              value={donor.pan}
              onChange={e => setDonor({ ...donor, pan: e.target.value.toUpperCase() })}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all">
            {loading ? 'Processing...' : `Donate ₹${customAmount || amount}`}
          </button>

          <div className="text-center flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Secured by Razorpay
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;