
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    MapPin, Bed, Bath, Share2, Heart, Flag, 
    Calendar, CheckCircle, ShieldCheck, Phone, 
    MessageCircle, ArrowLeft, Maximize2,
    Check, X, ExternalLink, AlertTriangle, Zap, Droplets, Car, Lock, Shield, LayoutGrid
} from 'lucide-react';
import { AppContext } from '../App';
import { format } from 'date-fns';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Water': <Droplets size={18} />,
  'Light': <Zap size={18} />,
  'Security': <Shield size={18} />,
  'Parking': <Car size={18} />,
  'Generator': <Zap size={18} />,
  'Fence/Gate': <Lock size={18} />,
  'Tiles/Flooring': <LayoutGrid size={18} />,
};

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { listings, user, toggleFavorite, favorites } = useContext(AppContext)!;
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [inspectionDate, setInspectionDate] = useState('');
  const [inspectionTime, setInspectionTime] = useState('');
  
  const [reportReason, setReportReason] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  
  const listing = listings.find(l => l.id === id);
  const isFav = favorites.includes(id || '');

  if (!listing) return <div className="p-20 text-center">Listing not found.</div>;

  const handleShare = () => {
    navigator.share?.({
        title: listing.title,
        text: listing.description,
        url: window.location.href,
    }).catch(console.error);
  };

  const getMapLink = () => {
    const query = encodeURIComponent(`${listing.area}, ${listing.city}, Nigeria`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Helper to format Nigerian numbers for WhatsApp (wa.me requires 234 prefix, no + or 0)
  const formatWhatsAppNumber = (phone: string) => {
    if (!phone) return '2348012345678'; // Sample fallback
    let cleaned = phone.replace(/\D/g, ''); // Remove non-digits
    if (cleaned.startsWith('0')) {
      cleaned = '234' + cleaned.substring(1);
    } else if (cleaned.length === 10) {
      cleaned = '234' + cleaned;
    } else if (!cleaned.startsWith('234')) {
      cleaned = '234' + cleaned;
    }
    return cleaned;
  };

  // Helper for tel: links
  const formatTelLink = (phone: string) => {
    if (!phone) return 'tel:+2348012345678';
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        return `tel:+234${cleaned.substring(1)}`;
    }
    return `tel:+${cleaned}`;
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you. We have received your report regarding "${listing.title}". Our team will investigate immediately.`);
    setShowReportModal(false);
    setReportReason('');
    setReportMessage('');
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Top Bar Navigation */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition"><ArrowLeft size={24}/></Link>
          <div className="flex items-center gap-2">
            <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-full transition"><Share2 size={20}/></button>
            <button onClick={() => toggleFavorite(listing.id)} className={`p-2 hover:bg-gray-100 rounded-full transition ${isFav ? 'text-red-500' : ''}`}><Heart size={20} fill={isFav ? 'currentColor' : 'none'}/></button>
            <button onClick={() => setShowReportModal(true)} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-red-500"><Flag size={20}/></button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-3xl overflow-hidden mb-8 h-[400px]">
          <div className="relative h-full">
            <img src={listing.images[0]} className="w-full h-full object-cover" alt="" />
            <button className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                <Maximize2 size={16}/> View {listing.images.length} photos
            </button>
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4 h-full">
            <img src={listing.images[1] || 'https://picsum.photos/seed/ext1/800/600'} className="w-full h-full object-cover" alt="" />
            <img src={listing.images[2] || 'https://picsum.photos/seed/ext2/800/600'} className="w-full h-full object-cover" alt="" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Info */}
          <div className="flex-[2]">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-black text-gray-900 mb-2">{listing.title}</h1>
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold">{listing.category}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 mb-8">
                <MapPin size={18} className="text-blue-600"/>
                <span className="text-lg">{listing.area}, {listing.city}</span>
                <a 
                    href={getMapLink()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                    View on Map <ExternalLink size={12}/>
                </a>
            </div>

            <div className="flex gap-8 mb-10 pb-8 border-b border-gray-100 overflow-x-auto no-scrollbar">
               <div className="flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                    <Bed size={28}/>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Beds`}</span>
               </div>
               <div className="flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                    <Bath size={28}/>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{listing.bathrooms} Baths</span>
               </div>
               <div className="flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                    <ShieldCheck size={28}/>
                  </div>
                  <span className="text-sm font-bold text-gray-900">Verified</span>
               </div>
            </div>

            <div className="mb-10">
               <h3 className="text-xl font-bold mb-4">Description</h3>
               <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                  {listing.description}
               </p>
            </div>

            {listing.amenities && listing.amenities.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="text-blue-600">{AMENITY_ICONS[amenity] || <CheckCircle size={18}/>}</div>
                      <span className="text-sm font-bold text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-10 bg-gray-50 p-6 rounded-3xl border border-gray-100">
               <h3 className="text-xl font-bold mb-4">House Rules</h3>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listing.houseRules.split('.').filter(r => r.trim()).map((rule, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle size={18} className="text-green-500" /> {rule.trim()}
                    </li>
                  ))}
               </ul>
            </div>

            <div>
               <h3 className="text-xl font-bold mb-6">Listed by</h3>
               <div className="flex items-center gap-4 p-6 border border-gray-100 rounded-3xl">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${listing.ownerId}`} className="w-20 h-20 rounded-2xl bg-gray-100 object-cover" alt="" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold">{listing.ownerName}</h4>
                      {listing.isVerified && <ShieldCheck size={20} className="text-blue-600" />}
                    </div>
                    <p className="text-gray-500 text-sm mb-4">Professional Agent • 14 Listings</p>
                    <div className="flex gap-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition">Follow</button>
                        <button className="border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition">Profile</button>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Sticky Action Panel */}
          <div className="flex-1">
            <div className="sticky top-32 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-100/50">
                <div className="mb-8">
                    <span className="text-gray-400 font-medium text-sm block mb-1 uppercase tracking-widest">Pricing</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-blue-600">₦{listing.price.toLocaleString()}</span>
                        <span className="text-gray-500 font-bold">/ {listing.paymentPeriod}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={() => setShowInspectionModal(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3"
                    >
                        <Calendar size={22}/> Request Inspection
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <a 
                            href={`https://wa.me/${formatWhatsAppNumber(listing.ownerPhone)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-50 hover:bg-green-100 text-green-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition"
                        >
                            <MessageCircle size={20}/> WhatsApp
                        </a>
                        <a 
                            href={formatTelLink(listing.ownerPhone)}
                            className="bg-gray-50 hover:bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition"
                        >
                            <Phone size={20}/> Call
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <ShieldCheck className="text-green-500 shrink-0"/>
                        <p>RentPlug Safety Guaranteed. <b>Never pay any agent before physical inspection.</b></p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inspection Modal */}
      {showInspectionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900">Book Inspection</h3>
                    <button onClick={() => setShowInspectionModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><X/></button>
                </div>
                
                <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                    Pick a date and time to visit <b>{listing.title}</b>. The agent will confirm via WhatsApp or Call.
                </p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Select Date</label>
                        <input 
                            type="date" 
                            className="w-full bg-gray-50 border-none rounded-xl p-4 text-lg font-medium focus:ring-2 focus:ring-blue-500 transition-all" 
                            value={inspectionDate}
                            onChange={(e) => setInspectionDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Select Time</label>
                        <select 
                            className="w-full bg-gray-50 border-none rounded-xl p-4 text-lg font-medium focus:ring-2 focus:ring-blue-500 transition-all"
                            value={inspectionTime}
                            onChange={(e) => setInspectionTime(e.target.value)}
                        >
                            <option value="">Choose a time</option>
                            <option value="09:00 AM">Morning (09:00 AM)</option>
                            <option value="11:00 AM">Morning (11:00 AM)</option>
                            <option value="01:00 PM">Afternoon (01:00 PM)</option>
                            <option value="03:00 PM">Afternoon (03:00 PM)</option>
                            <option value="05:00 PM">Evening (05:00 PM)</option>
                        </select>
                    </div>

                    <button 
                        disabled={!inspectionDate || !inspectionTime}
                        onClick={() => {
                            alert(`Booking requested! The agent (${listing.ownerName}) will be notified.`);
                            setShowInspectionModal(false);
                        }}
                        className="w-full bg-blue-600 disabled:bg-gray-200 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all active:scale-[0.98]"
                    >
                        Send Request
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertTriangle size={24}/>
                        <h3 className="text-2xl font-black">Report Listing</h3>
                    </div>
                    <button onClick={() => setShowReportModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><X/></button>
                </div>
                
                <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                    Help us keep RentPlug safe. Why are you reporting this listing?
                </p>

                <form onSubmit={handleReport} className="space-y-6">
                    <div>
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Reason</label>
                        <select 
                            required
                            className="w-full bg-gray-50 border-none rounded-xl p-4 text-lg font-medium focus:ring-2 focus:ring-blue-500 transition-all"
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                        >
                            <option value="">Select a reason</option>
                            <option value="scam">Potential Scam / Fraud</option>
                            <option value="incorrect">Incorrect Information</option>
                            <option value="fake_photos">Fake / Stock Photos</option>
                            <option value="no_longer_available">Listing Already Taken</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Additional Details</label>
                        <textarea 
                            rows={3}
                            placeholder="Tell us more about the issue..."
                            className="w-full bg-gray-50 border-none rounded-xl p-4 text-lg font-medium focus:ring-2 focus:ring-blue-500 transition-all"
                            value={reportMessage}
                            onChange={(e) => setReportMessage(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-100 transition-all active:scale-[0.98]"
                    >
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;
