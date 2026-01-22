
import React from 'react';
import { ShieldCheck, CheckCircle, UserCheck, ShieldAlert, Award, ArrowLeft, Upload, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerifiedBadge: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>

      <div className="text-center mb-16">
        <div className="bg-blue-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-xl shadow-blue-100 border border-blue-100">
            <ShieldCheck size={48} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Verified Badge</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Verified listings reduce scams. Our goal is a transparent rental market in Owerri and Enugu.
        </p>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <Award className="text-blue-600" size={28} /> The Verification Process
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Partners can upload any valid government ID (optional) to request verification. 
            We may also confirm property ownership/authorization and schedule an on-site inspection before marking a listing or profile as <b>Verified</b>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-4 shadow-sm"><Upload size={20}/></div>
                  <h4 className="font-black mb-2 text-sm uppercase tracking-wider">ID Check</h4>
                  <p className="text-sm text-gray-500">Manual review of NIN, Driver's License or PVC.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-4 shadow-sm"><MapPin size={20}/></div>
                  <h4 className="font-black mb-2 text-sm uppercase tracking-wider">Site Visit</h4>
                  <p className="text-sm text-gray-500">We confirm the property exists in Owerri or Enugu.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-4 shadow-sm"><UserCheck size={20}/></div>
                  <h4 className="font-black mb-2 text-sm uppercase tracking-wider">Trust Score</h4>
                  <p className="text-sm text-gray-500">Performance tracking based on user feedback.</p>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-200">
              <h2 className="text-2xl font-black mb-6">Are you a Landlord?</h2>
              <p className="text-blue-100 mb-8 leading-relaxed font-medium">
                  Boost your listing's visibility and build instant trust with potential renters by getting verified.
              </p>
              <Link to="/post" className="bg-white text-blue-600 py-4 px-8 rounded-2xl font-black text-center shadow-xl hover:scale-[1.02] transition-all inline-block w-full">
                  Request Verification
              </Link>
          </div>

          <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-gray-200">
              <h2 className="text-2xl font-black mb-6">Renter Guidelines</h2>
              <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-300 font-medium">
                      <CheckCircle size={18} className="text-blue-500 shrink-0" /> No payment before inspection
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 font-medium">
                      <CheckCircle size={18} className="text-blue-500 shrink-0" /> Meet in public or at property
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 font-medium">
                      <CheckCircle size={18} className="text-blue-500 shrink-0" /> Report suspicious agents
                  </li>
              </ul>
          </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-100 rounded-[2rem] p-8 flex items-start gap-5">
          <ShieldAlert size={32} className="text-yellow-600 shrink-0" />
          <div>
              <h4 className="text-lg font-black text-yellow-800 mb-2">Important Disclaimer</h4>
              <p className="text-yellow-700 leading-relaxed font-medium">
                  Verification increases trust but is not a 100% guarantee. Fraudsters can be sophisticated. Always follow our <Link to="/safety" className="font-black underline decoration-2 underline-offset-4 hover:text-yellow-900 transition">Safety Protocol</Link> and never send money to anyone you haven't met at the property.
              </p>
          </div>
      </div>
    </div>
  );
};

export default VerifiedBadge;
