
import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, Mail, ArrowRight, ShieldCheck, User as UserIcon, Building2, Info, CheckCircle } from 'lucide-react';
import { AppContext } from './App';
import { UserRole } from '../types';

const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext)!;
  const isSignUp = searchParams.get('mode') === 'signup';
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Input, 2: OTP, 3: Role/Profile
  const [role, setRole] = useState<UserRole>(UserRole.RENTER);
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (step === 1) {
        if (phone.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }
        setStep(2);
    }
    else if (step === 2) {
        // For MVP/Demo: Always accept 123456
        if (otp === '123456') {
            if (isSignUp) setStep(3);
            else finalizeAuth();
        } else {
            setError('Invalid code. Use 123456 for demo.');
        }
    } else {
        finalizeAuth();
    }
  };

  const finalizeAuth = () => {
    // Mock user creation for Demo
    setUser({
        id: `u${Date.now()}`,
        name: phone.slice(-4) + ' User',
        phone: phone,
        role: role,
        city: 'Enugu',
        isVerified: role !== UserRole.RENTER ? false : true,
        isBlocked: false,
        createdAt: new Date(),
        profilePhoto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`
    });
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-100/50 border border-gray-100">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-gray-900 mb-4">{isSignUp ? 'Join RentPlug' : 'Welcome Back'}</h1>
            <p className="text-gray-500 font-medium">South-East Nigeria's Verified Rental Platform</p>
        </div>

        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2 animate-in fade-in duration-300">
                <Info size={18}/> {error}
            </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
            {step === 1 && (
                <div className="animate-in slide-in-from-bottom-4 duration-300">
                    <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <span className="text-gray-400 font-bold">+234</span>
                        </div>
                        <input 
                            required
                            type="tel"
                            placeholder="801 234 5678"
                            className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-4 text-xl font-bold focus:ring-2 focus:ring-blue-500 transition-all" 
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-2xl flex items-start gap-3 border border-blue-100">
                        <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-700 leading-relaxed font-medium">
                            <b>Demo Mode:</b> Since this is an MVP preview, real SMS charges are disabled. After clicking 'Get Code', enter <b>123456</b> to continue.
                        </p>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="animate-in slide-in-from-bottom-4 duration-300 text-center">
                    <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">Enter Demo Code</label>
                    <input 
                        required
                        type="text"
                        maxLength={6}
                        placeholder="1 2 3 4 5 6"
                        className="w-full bg-gray-50 border-none rounded-2xl py-5 text-center text-3xl font-black tracking-[0.5em] focus:ring-2 focus:ring-blue-500 mb-6 transition-all" 
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                    />
                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Sent to +234 {phone}</span>
                        <button type="button" onClick={() => setStep(1)} className="text-sm font-bold text-blue-600 hover:underline">Change number</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="animate-in slide-in-from-bottom-4 duration-300">
                    <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-6 text-center">How will you use RentPlug?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            type="button"
                            onClick={() => setRole(UserRole.RENTER)}
                            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${role === UserRole.RENTER ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                        >
                            <div className={`p-4 rounded-2xl ${role === UserRole.RENTER ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}><UserIcon size={32}/></div>
                            <span className="font-black text-lg">I'm a Renter</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => setRole(UserRole.AGENT)}
                            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${role === UserRole.AGENT ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                        >
                            <div className={`p-4 rounded-2xl ${role === UserRole.AGENT ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}><Building2 size={32}/></div>
                            <span className="font-black text-lg">I'm an Agent</span>
                        </button>
                    </div>
                </div>
            )}

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2">
                {step === 1 ? 'Get Demo Code' : step === 2 ? 'Verify Code' : 'Finish Setup'}
                <ArrowRight size={24} />
            </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-50 text-center">
            <p className="text-gray-500 font-medium">
                {isSignUp ? 'Already have an account?' : 'New to RentPlug?'} {' '}
                <button 
                    onClick={() => navigate(isSignUp ? '/auth' : '/auth?mode=signup')}
                    className="text-blue-600 font-bold hover:underline"
                >
                    {isSignUp ? 'Login Now' : 'Create Account'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
