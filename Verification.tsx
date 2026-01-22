
import React from 'react';
import { ShieldCheck, CheckCircle, UserCheck, Search, ShieldAlert, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Verification: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-xl shadow-blue-100">
            <ShieldCheck size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Verification Badge</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          The blue shield represents trust and reliability on the RentPlug marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Award className="text-blue-600" /> What it means
            </h2>
            <ul className="space-y-6">
                <li className="flex gap-4">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1"><CheckCircle size={14}/></div>
                    <div>
                        <p className="font-bold text-gray-900">Identity Verified</p>
                        <p className="text-sm text-gray-500">Agent or landlord has submitted a valid Government ID (NIN, License).</p>
                    </div>
                </li>
                <li className="flex gap-4">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1"><CheckCircle size={14}/></div>
                    <div>
                        <p className="font-bold text-gray-900">Physical Presence</p>
                        <p className="text-sm text-gray-500">We have confirmed their physical office or residence in Enugu or Owerri.</p>
                    </div>
                </li>
                <li className="flex gap-4">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1"><CheckCircle size={14}/></div>
                    <div>
                        <p className="font-bold text-gray-900">Transaction History</p>
                        <p className="text-sm text-gray-500">Positive feedback from previous renters and successful rental deals.</p>
                    </div>
                </li>
            </ul>
        </div>

        <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-blue-200 flex flex-col justify-center">
            <UserCheck size={48} className="mb-6 opacity-80" />
            <h2 className="text-3xl font-black mb-4">Are you an Agent?</h2>
            <p className="text-blue-100 mb-10 leading-relaxed text-lg font-medium">
                Get verified today to boost your visibility by 5x and win the trust of thousands of renters in the South East.
            </p>
            <Link to="/post" className="bg-white text-blue-600 py-4 px-8 rounded-2xl font-black text-center shadow-xl hover:scale-[1.02] transition-transform">
                Apply for Verification
            </Link>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-100 rounded-3xl p-8 flex items-start gap-5">
          <ShieldAlert size={32} className="text-yellow-600 shrink-0" />
          <div>
              <h4 className="text-lg font-black text-yellow-800 mb-2">Wait! Verification is not a 100% guarantee.</h4>
              <p className="text-yellow-700 leading-relaxed">
                  Even when dealing with a verified agent, always follow our <Link to="/safety" className="font-bold underline">Safety Tips</Link>. <b>Never pay any amount before seeing the property physically.</b> Fraudsters can occasionally steal accounts or misrepresent properties.
              </p>
          </div>
      </div>
    </div>
  );
};

export default Verification;
