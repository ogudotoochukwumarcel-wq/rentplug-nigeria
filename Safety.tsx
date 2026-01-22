
import React from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, HelpCircle, Eye, Handshake, AlertTriangle, UserCheck } from 'lucide-react';

const Safety: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Trust & Safety</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Your safety is our #1 priority. Learn how to protect yourself and identify verified listings on RentPlug.
        </p>
      </div>

      {/* Safety Tips */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
           <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
             <ShieldAlert size={28} />
           </div>
           <h2 className="text-3xl font-black text-gray-900">Safety First</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldAlert size={24}/>
            </div>
            <h3 className="text-xl font-bold mb-4">Never Pay Before Inspection</h3>
            <p className="text-gray-500 leading-relaxed">
              Legitimate agents will never ask for "commitment fees" or "form fees" before you see the house. If they insist on payment before meeting, it is a <b>scam</b>.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Eye size={24}/>
            </div>
            <h3 className="text-xl font-bold mb-4">Meet in Public Places</h3>
            <p className="text-gray-500 leading-relaxed">
              When meeting an agent for the first time, choose a well-lit, public location or bring a friend along for the inspection.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <Handshake size={24}/>
            </div>
            <h3 className="text-xl font-bold mb-4">Verify the Owner</h3>
            <p className="text-gray-500 leading-relaxed">
              Request to speak with the actual landlord or see property documents before making any significant financial commitment.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-6">
              <AlertTriangle size={24}/>
            </div>
            <h3 className="text-xl font-bold mb-4">Report Suspicious Activity</h3>
            <p className="text-gray-500 leading-relaxed">
              If a listing looks too good to be true, it probably is. Use the "Report Listing" button to help us remove bad actors.
            </p>
          </div>
        </div>
      </section>

      {/* Verification Explanation */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative mb-20">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck size={36} className="text-blue-200" />
            <h2 className="text-3xl font-black">Verified Badge</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                The <span className="text-white font-bold">Verified Badge</span> on RentPlug means the agent or landlord has undergone our trust check process.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                   <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-1"><CheckCircle size={14}/></div>
                   <p className="text-blue-50 font-medium">Physical verification of the agent's identity and government ID.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-1"><CheckCircle size={14}/></div>
                   <p className="text-blue-50 font-medium">History of successful, legitimate rental transactions.</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-1"><CheckCircle size={14}/></div>
                   <p className="text-blue-50 font-medium">Active business presence in Enugu or Owerri.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-lg shadow-black/10">
                    <UserCheck size={24}/>
                 </div>
                 <h4 className="text-xl font-bold">Look for the Blue Shield</h4>
              </div>
              <p className="text-blue-50 mb-6 leading-relaxed">
                We prioritize verified listings in search results to ensure you have the safest browsing experience possible.
              </p>
              <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-black/5 hover:scale-[1.02] transition-transform">
                Browse Verified Only
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Mini Section */}
      <section>
        <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
           {[
             { q: "Is RentPlug responsible for scams?", a: "While we do our best to filter every listing, RentPlug is a marketplace. We provide safety tools, but users must follow safety protocols like never paying before inspection." },
             { q: "How do I report a scammer?", a: "Click the 'Flag' icon on any listing page to open the report form. Our moderators review all reports within 24 hours." },
             { q: "Why was my listing rejected?", a: "Common reasons include blurry photos, unrealistic pricing, or failure to provide accurate area information." }
           ].map((faq, idx) => (
             <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100">
               <h4 className="font-bold text-lg mb-2 flex items-center gap-3">
                 <HelpCircle size={20} className="text-blue-600"/> {faq.q}
               </h4>
               <p className="text-gray-500 leading-relaxed pl-8">{faq.a}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Safety;
