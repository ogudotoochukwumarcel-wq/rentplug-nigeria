
import React from 'react';
import { ShieldX, MessageCircle, Phone, Mail, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReportScam: React.FC = () => {
  const WA_LINK = "https://wa.me/2348166104441?text=Hi%20RentPlug%20Support%2C%20I%20want%20to%20report%20a%20scam.";
  const CALL_LINK = "tel:+2348166104441";
  const EMAIL_LINK = "mailto:support@rentplug.ng?subject=Scam%20Report&body=Hi%20RentPlug%20Team%2C%20I%20want%20to%20report%20a%20scam.%20Details%3A";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>

      <div className="text-center mb-16">
        <div className="bg-red-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-red-600 shadow-xl shadow-red-100 border border-red-100">
            <ShieldX size={48} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Report a Scam</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Help us keep RentPlug safe. If someone requests money before inspection or uses fake details, report them immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group text-center">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-black mb-2">WhatsApp</h3>
              <p className="text-gray-400 text-sm font-bold mb-6">Fastest Response</p>
              <span className="bg-green-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-green-100">Chat Now</span>
          </a>

          <a href={CALL_LINK} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone size={32} />
              </div>
              <h3 className="text-xl font-black mb-2">Call Support</h3>
              <p className="text-gray-400 text-sm font-bold mb-6">Speak with us</p>
              <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100">Call Now</span>
          </a>

          <a href={EMAIL_LINK} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group text-center">
              <div className="w-16 h-16 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <Mail size={32} />
              </div>
              <h3 className="text-xl font-black mb-2">Email Us</h3>
              <p className="text-gray-400 text-sm font-bold mb-6">Detailed Reports</p>
              <span className="bg-gray-900 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-gray-100">Send Email</span>
          </a>
      </div>

      <div className="bg-red-50 border-2 border-dashed border-red-200 rounded-[3rem] p-12 text-center">
          <AlertTriangle className="mx-auto text-red-600 mb-6" size={48} />
          <h2 className="text-2xl font-black text-gray-900 mb-4">When to report?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              <div className="flex gap-3 text-red-900 font-bold bg-white/50 p-4 rounded-2xl border border-red-100">
                  <span className="text-red-600">01</span>
                  <span>Agent asks for "commitment fee" before inspection.</span>
              </div>
              <div className="flex gap-3 text-red-900 font-bold bg-white/50 p-4 rounded-2xl border border-red-100">
                  <span className="text-red-600">02</span>
                  <span>Property photos are clearly fake or belong to another building.</span>
              </div>
              <div className="flex gap-3 text-red-900 font-bold bg-white/50 p-4 rounded-2xl border border-red-100">
                  <span className="text-red-600">03</span>
                  <span>Agent refuses to meet at the property site.</span>
              </div>
              <div className="flex gap-3 text-red-900 font-bold bg-white/50 p-4 rounded-2xl border border-red-100">
                  <span className="text-red-600">04</span>
                  <span>Suspiciously low price for a high-end area (Owerri/Enugu).</span>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ReportScam;
