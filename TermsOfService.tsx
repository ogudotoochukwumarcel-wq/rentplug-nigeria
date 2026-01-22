
import React from 'react';
import { FileText, ArrowLeft, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Scale size={32} />
            </div>
            <div>
                <h1 className="text-4xl font-black text-gray-900">Terms of Service</h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Platform Rules & User Agreement</p>
            </div>
        </div>

        <div className="space-y-12">
            <section className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                <h2 className="text-2xl font-black text-blue-900 mb-4 flex items-center gap-3">
                    <ShieldCheck size={24} /> Platform Role
                </h2>
                <p className="text-lg text-blue-800 leading-relaxed font-bold">
                    RentPlug is a listing platform, not a payment processor. We facilitate connections between renters and owners but do not handle rent payments or agency fees.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                    <AlertTriangle size={24} className="text-red-600" /> The Golden Rule
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    <b>Never pay before inspection.</b> By using this platform, you agree that RentPlug is not liable for any financial loss resulting from payments made to agents without a physical verification of the property.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                    <FileText size={24} className="text-blue-600" /> Content Accuracy
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    Users must post accurate and truthful listings. RentPlug reserves the right to remove any listing that is found to be suspicious, outdated, or misleading without prior notice.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                    <ShieldCheck size={24} className="text-blue-600" /> Account Conduct
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    Fraudulent behavior, harassment of users, or posting illegal content will result in an immediate and permanent ban from the platform. By using RentPlug, you agree to these terms in full.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
