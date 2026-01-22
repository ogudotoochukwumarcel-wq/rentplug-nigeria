
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, List, DollarSign, Bed, Bath, Plus, Info, CheckCircle, Loader2, Sparkles, UserPlus, Briefcase, Phone, MessageSquare, ShieldCheck, FileText, Upload, Check, Zap, Droplets, Car, Lock, Shield, LayoutGrid, Trash2 } from 'lucide-react';
import { AppContext } from '../App';
import { CITIES, CATEGORIES } from '../constants';
import { ListingCategory, ListingStatus, UserRole } from '../types';
import { analyzeListingDescription } from '../geminiService';

const AMENITIES_OPTIONS = [
  { name: 'Water', icon: <Droplets size={16} /> },
  { name: 'Light', icon: <Zap size={16} /> },
  { name: 'Security', icon: <Shield size={16} /> },
  { name: 'Parking', icon: <Car size={16} /> },
  { name: 'Generator', icon: <Zap size={16} className="text-yellow-500" /> },
  { name: 'Fence/Gate', icon: <Lock size={16} /> },
  { name: 'Tiles/Flooring', icon: <LayoutGrid size={16} /> },
];

const PostListing: React.FC = () => {
  const { user, setUser, setListings } = useContext(AppContext)!;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [geminiAnalysis, setGeminiAnalysis] = useState<any>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // Registration state
  const [regData, setRegData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || 'Enugu' as 'Enugu' | 'Owerri',
    area: '',
    role: UserRole.AGENT,
    businessName: '',
    whatsapp: '',
    idUploaded: false
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    paymentPeriod: 'year' as 'year' | 'month',
    city: user?.city || 'Enugu' as 'Enugu' | 'Owerri',
    area: '',
    category: ListingCategory.SELF_CONTAIN,
    bedrooms: '1',
    bathrooms: '1',
    amenities: [] as string[],
    images: [] as string[],
    houseRules: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
    setUser({
      ...user,
      name: regData.fullName,
      phone: regData.phone,
      role: regData.role,
      city: regData.city,
      isVerified: false, 
    });
    
    setLoading(false);
    setRegSuccess(true);
  };

  const toggleAmenity = (name: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(name) 
        ? prev.amenities.filter(a => a !== name) 
        : [...prev.amenities, name]
    }));
  };

  const proceedAfterReg = () => {
    setRegSuccess(false);
    setIsRegistering(false);
    setStep(1); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        navigate('/auth');
        return;
    }
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const bedroomsNum = formData.bedrooms === 'Studio' ? 0 : (formData.bedrooms === '4+' ? 4 : parseInt(formData.bedrooms));
    const bathroomsNum = formData.bathrooms === '3+' ? 3 : parseInt(formData.bathrooms);

    const newListing = {
        id: `l${Date.now()}`,
        ...formData,
        price: parseInt(formData.price),
        bedrooms: bedroomsNum,
        bathrooms: bathroomsNum,
        state: formData.city === 'Enugu' ? 'Enugu' : 'Imo' as any,
        ownerId: user.id,
        ownerName: user.name,
        ownerPhone: user.phone,
        status: ListingStatus.PENDING, 
        isFeatured: false,
        isVerified: user.isVerified,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        images: formData.images.length ? formData.images : [`https://picsum.photos/seed/${Date.now()}/800/600`],
        houseRules: formData.houseRules || 'Please keep the premises clean.'
    };

    setListings(prev => [newListing as any, ...prev]);
    setLoading(false);
    setStep(3); 
  };

  const checkDescription = async () => {
      if (formData.description.length < 30) return;
      setLoading(true);
      const analysis = await analyzeListingDescription(formData.description);
      setGeminiAnalysis(analysis);
      setLoading(false);
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
          <Info size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-black mb-4">Please Login</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to post or register as an agent.</p>
          <button onClick={() => navigate('/auth')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition hover:bg-blue-700">Login Now</button>
      </div>
    );
  }

  if (regSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-in zoom-in-95 duration-300">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600 shadow-xl shadow-green-50">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">Registration Sent!</h1>
        <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-md mx-auto">
          Your application for {regData.role === UserRole.AGENT ? 'Agent' : 'Landlord'} status is being reviewed. You can now start creating your first listing!
        </p>
        <button 
          onClick={proceedAfterReg} 
          className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition"
        >
          Proceed to Listing
        </button>
      </div>
    );
  }

  if ((user.role === UserRole.RENTER && step !== 3) || isRegistering) {
      return (
          <div className="max-w-2xl mx-auto px-4 py-12">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <UserPlus size={32} />
                    </div>
                    <div>
                      <h1 className="text-3xl font-black text-gray-900">Partner with RentPlug</h1>
                      <p className="text-gray-500 font-medium">Register to start listing in Owerri or Enugu.</p>
                    </div>
                  </div>
                  
                  <form className="space-y-6" onSubmit={handleRegister}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                              <input 
                                  required
                                  className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-500"
                                  value={regData.fullName}
                                  onChange={e => setRegData({...regData, fullName: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                              <input 
                                  required
                                  className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-500"
                                  value={regData.phone}
                                  onChange={e => setRegData({...regData, phone: e.target.value})}
                              />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Agent Type</label>
                            <select 
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-500"
                                value={regData.role}
                                onChange={e => setRegData({...regData, role: e.target.value as UserRole})}
                            >
                                <option value={UserRole.AGENT}>Professional Agent</option>
                                <option value={UserRole.LANDLORD}>Direct Landlord</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Base City</label>
                            <select 
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-500"
                                value={regData.city}
                                onChange={e => setRegData({...regData, city: e.target.value as any})}
                            >
                                <option value="Enugu">Enugu</option>
                                <option value="Owerri">Owerri</option>
                            </select>
                        </div>
                      </div>

                      <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Primary Area of Operation</label>
                          <select 
                              required
                              className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-500"
                              value={regData.area}
                              onChange={e => setRegData({...regData, area: e.target.value})}
                          >
                              <option value="">Select Area</option>
                              {CITIES[regData.city as 'Enugu' | 'Owerri']?.map(a => <option key={a} value={a}>{a}</option>)}
                          </select>
                      </div>

                      <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Business Name (Optional)</label>
                          <input 
                              placeholder="e.g. Owerri Prime Realty"
                              className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-500"
                              value={regData.businessName}
                              onChange={e => setRegData({...regData, businessName: e.target.value})}
                          />
                      </div>

                      <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">WhatsApp Number</label>
                          <input 
                              required
                              placeholder="e.g. 08012345678"
                              className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-500"
                              value={regData.whatsapp}
                              onChange={e => setRegData({...regData, whatsapp: e.target.value})}
                          />
                      </div>

                      <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">ID Verification (Optional)</label>
                          <div 
                              onClick={() => setRegData({...regData, idUploaded: true})}
                              className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${regData.idUploaded ? 'bg-green-50 border-green-200 text-green-600' : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'}`}
                          >
                              {regData.idUploaded ? (
                                  <>
                                      <CheckCircle size={32} />
                                      <span className="font-bold text-center text-green-700">ID Document Attached</span>
                                  </>
                              ) : (
                                  <>
                                      <Upload size={32} />
                                      <span className="font-bold text-center">Upload any ID (Optional)</span>
                                      <span className="text-[10px] font-bold text-center opacity-70 px-4">Recommended for Verified Badge. You can skip now and upload later.</span>
                                  </>
                              )}
                          </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3 border border-blue-100">
                          <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                          <p className="text-xs text-blue-700 leading-relaxed font-medium">
                              RentPlug is <b>100% free to list</b>. We manually verify partners to ensure a scam-free experience for Enugu & Owerri residents.
                          </p>
                      </div>

                      <div className="flex gap-4 pt-4">
                          <button type="button" onClick={() => navigate('/')} className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-black text-lg hover:bg-gray-200 transition">Cancel</button>
                          <button 
                              type="submit" 
                              className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition flex items-center justify-center gap-3 disabled:bg-gray-400"
                              disabled={loading}
                          >
                              {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={20}/>}
                              Join RentPlug
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-12">
        <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 animate-in slide-in-from-right-4 duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileText size={20}/>
            </div>
            <h1 className="text-3xl font-black text-gray-900">Property Details</h1>
          </div>
          <p className="text-gray-500 mb-10 font-medium">Basic info about your rental property in Owerri or Enugu.</p>
          
          <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">Listing Title</label>
                <input 
                  required
                  placeholder="e.g. 2 Bedroom Flat in Trans Ekulu" 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-lg font-bold focus:ring-2 focus:ring-blue-500" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">Category</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-lg font-bold focus:ring-2 focus:ring-blue-500"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Rent Type & Price</label>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <div className="flex bg-gray-100 p-1 rounded-2xl mb-3">
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, paymentPeriod: 'year'})}
                                className={`flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition ${formData.paymentPeriod === 'year' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                            >
                                Yearly
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, paymentPeriod: 'month'})}
                                className={`flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition ${formData.paymentPeriod === 'month' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                            >
                                Monthly
                            </button>
                        </div>
                    </div>
                    <div className="flex-[2] relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl">₦</span>
                        <input 
                          required
                          type="number"
                          placeholder="0.00" 
                          className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 text-xl font-black focus:ring-2 focus:ring-blue-500" 
                          value={formData.price}
                          onChange={e => setFormData({...formData, price: e.target.value})}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-100">
                           {formData.paymentPeriod === 'year' ? 'per year' : 'per month'}
                        </div>
                    </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">Bedrooms</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-lg font-bold focus:ring-2 focus:ring-blue-500"
                  value={formData.bedrooms}
                  onChange={e => setFormData({...formData, bedrooms: e.target.value})}
                >
                  <option value="Studio">Studio</option>
                  <option value="1">1BR</option>
                  <option value="2">2BR</option>
                  <option value="3">3BR</option>
                  <option value="4+">4BR+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">Bathrooms</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-lg font-bold focus:ring-2 focus:ring-blue-500"
                  value={formData.bathrooms}
                  onChange={e => setFormData({...formData, bathrooms: e.target.value})}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3+">3+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">City</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value as any})}
                >
                  <option value="Enugu">Enugu</option>
                  <option value="Owerri">Owerri</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">Area</label>
                <select 
                  required
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold"
                  value={formData.area}
                  onChange={e => setFormData({...formData, area: e.target.value})}
                >
                    <option value="">Select Area</option>
                    {CITIES[formData.city as 'Enugu' | 'Owerri'].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Amenities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {AMENITIES_OPTIONS.map((amenity) => (
                  <button
                    key={amenity.name}
                    type="button"
                    onClick={() => toggleAmenity(amenity.name)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-bold transition-all ${
                      formData.amenities.includes(amenity.name)
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
                        : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200'
                    }`}
                  >
                    <div className={`p-1 rounded ${formData.amenities.includes(amenity.name) ? 'bg-white/20' : 'bg-gray-50'}`}>
                      {amenity.icon}
                    </div>
                    <span className="truncate">{amenity.name}</span>
                    {formData.amenities.includes(amenity.name) && <Check size={14} className="ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
               <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-black text-gray-500 uppercase tracking-widest">Detailed Description</label>
                  <button 
                    type="button"
                    onClick={checkDescription}
                    disabled={formData.description.length < 30 || loading}
                    className="flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-700 disabled:text-gray-300 transition uppercase tracking-wider"
                  >
                    {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} Smart AI Check
                  </button>
               </div>
               <textarea 
                  required
                  rows={5}
                  placeholder="Describe the property in detail. Mention amenities, water supply, security etc." 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-lg font-medium focus:ring-2 focus:ring-blue-500" 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
               />
               {geminiAnalysis && (
                   <div className={`mt-3 p-4 rounded-xl text-xs flex items-start gap-3 border ${geminiAnalysis.isProfessional ? 'bg-green-50 border-green-100 text-green-700' : 'bg-yellow-50 border-yellow-100 text-yellow-700'}`}>
                      <Info size={16} className="shrink-0" />
                      <div>
                        <b className="uppercase tracking-widest">Smart Analysis:</b> {geminiAnalysis.summary} {geminiAnalysis.suggestions}
                      </div>
                   </div>
               )}
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98]">
                Next: Upload Media
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 animate-in slide-in-from-right-4 duration-300">
           <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Camera size={20}/>
            </div>
            <h1 className="text-3xl font-black text-gray-900">Upload Media</h1>
          </div>
           <p className="text-gray-500 mb-8 font-medium">Max 6 photos. Max 2MB per file (Free-tier limit).</p>
           
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition">
                 <Camera size={32} className="text-gray-300" />
                 <span className="text-xs font-bold text-gray-400">Add Photo</span>
              </div>
              <div className="aspect-square bg-blue-50 rounded-3xl overflow-hidden relative group">
                 <img src="https://picsum.photos/seed/p1/400" className="w-full h-full object-cover" alt="" />
                 <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow-sm hover:bg-white transition"><Trash2 className="text-red-500" size={16}/></button>
              </div>
           </div>

           <div>
                <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">House Rules</label>
                <textarea 
                  rows={3}
                  placeholder="e.g. No pets. Max 4 occupants. Pay-as-you-go electricity." 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-lg font-medium focus:ring-2 focus:ring-blue-500 mb-10" 
                  value={formData.houseRules}
                  onChange={e => setFormData({...formData, houseRules: e.target.value})}
                />
           </div>

           <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 py-5 rounded-2xl font-black text-xl hover:bg-gray-200 transition">Back</button>
              <button 
                onClick={handleSubmit} 
                className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-200 transition flex items-center justify-center gap-3 disabled:bg-gray-300 active:scale-[0.98]"
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin" />}
                Post Listing
              </button>
           </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 text-center animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={48} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">Submission Received!</h1>
            <p className="text-xl text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed font-medium">
                Your listing is being reviewed by our moderators. You'll get a notification once it's live (usually within 2 hours).
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition hover:bg-blue-700">Go to Dashboard</button>
                <button onClick={() => { setFormData({
                    title: '',
                    description: '',
                    price: '',
                    paymentPeriod: 'year',
                    city: user?.city as any || 'Enugu',
                    area: '',
                    category: ListingCategory.SELF_CONTAIN,
                    bedrooms: '1',
                    bathrooms: '1',
                    amenities: [],
                    images: [],
                    houseRules: ''
                }); setStep(1); }} className="bg-gray-100 text-gray-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-200 transition">Post Another</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default PostListing;
