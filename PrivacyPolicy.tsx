
import React from 'react';
import { Lock, ArrowLeft, ShieldCheck, Database, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
                <Lock size={32} />
            </div>
            <div>
                <h1 className="text-4xl font-black text-gray-900">Privacy Policy</h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Last Updated: January 2026</p>
            </div>
        </div>

        <div className="space-y-12">
            <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                    <Database size={24} className="text-blue-600" /> Data Collection
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    We collect basic account information that you submit to RentPlug. This includes your name, phone number, city, and any property listings you post. This data is essential for connecting renters with landlords in Owerri and Enugu.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                    <ShieldCheck size={24} className="text-blue-600" /> Identity Verification
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    Any IDs uploaded for the "Verified Badge" are strictly optional. These documents are stored securely and used exclusively for internal verification purposes. We do not display these documents to other users.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                    <Lock size={24} className="text-blue-600" /> Data Protection
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    <b>We do not sell user data.</b> Your privacy is paramount. Information is only shared between renters and agents when an inspection is requested or contact is initiated via WhatsApp/Phone.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                    <Trash2 size={24} className="text-red-600" /> Account Deletion
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    You have full control over your data. If you wish to delete your account or any property listings, please contact our support team at <b>support@rentplug.ng</b>, and we will process your request within 24 hours.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
