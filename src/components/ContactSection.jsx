import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
    return (
        <section className="bg-[#0B1120] py-20 relative border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Info Side */}
                    <div>
                        <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3">Get in Touch</h4>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">We'd Love to Hear From You</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-800/50 rounded-lg text-amber-500">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div>
                                        <h5 className="text-white font-bold text-lg mb-1">Our Location</h5>
                                        <p className="text-slate-400">#22-10-192, Near NGM Swimming Pool,<br />Koramenugunta, Tirupati (Urban),<br />Andhra Pradesh, India-517501</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-800/50 rounded-lg text-amber-500">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold text-lg mb-1">Phone Number</h5>
                                    <p className="text-slate-400 font-mono">+91 70131 38080</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-800/50 rounded-lg text-amber-500">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold text-lg mb-1">Email Address</h5>
                                    <p className="text-slate-400 font-mono">gatlafoundation@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Side */}
                    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 grayscale hover:grayscale-0 transition-all duration-500">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.100984856086!2d79.4239853148286!3d13.633512990423013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b0f8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sTirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Gatla Foundation Location"
                        ></iframe>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;
