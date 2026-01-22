
import React from 'react';
import { ShieldCheck, Target, Heart, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100">
           <Target size={14}/> Our Mission
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
          RentPlug is a verified rental platform focused on Owerri & Enugu.
        </h1>
        <p className="text-2xl font-bold text-blue-600 mb-8">
          Verified listings. No fake agents. Rent with peace of mind.
        </p>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Founded in 2026, we're on a mission to solve the housing transparency problem in South-East Nigeria, one verified listing at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
                <ShieldCheck size={24}/>
            </div>
            <h3 className="text-2xl font-black mb-4">Zero Fake Agents</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              We physically verify every agent and landlord on our platform. Our verification process is rigorous, ensuring only legitimate operators reach our users.
            </p>
         </div>
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-100">
                <Heart size={24}/>
            </div>
            <h3 className="text-2xl font-black mb-4">Renter First</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Our platform is built with the renter's experience in mind. No commitment fees before inspection, no hidden charges, and transparent property details.
            </p>
         </div>
      </div>

      <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center">
            <Award size={48} className="mx-auto mb-8 text-blue-400" />
            <h2 className="text-3xl font-black mb-6">Built for Nigeria's Future</h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                We believe everyone deserves a safe and easy way to find their next home. Join thousands of residents in Enugu and Owerri who trust RentPlug.
            </p>
            <Link to="/" className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-blue-900/50">
                Browse Properties <ArrowRight size={20}/>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
