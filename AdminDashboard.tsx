
import React, { useContext, useState } from 'react';
import { 
    Home as HomeIcon, 
    CheckCircle2, 
    XCircle, 
    Search,
    ShieldAlert,
    Clock,
    MoreHorizontal,
    MapPin,
    AlertTriangle,
    User,
    ArrowRight
} from 'lucide-react';
import { AppContext } from './App';
import { ListingStatus, UserRole } from '../types';
import { ADMIN_NUMBERS } from '../constants';

type TabType = 'pending' | 'approved' | 'scams';

interface ScamReport {
    id: string;
    listingTitle: string;
    location: string;
    reporter: string;
    reason: string;
    date: string;
}

const MOCK_SCAM_REPORTS: ScamReport[] = [
    {
        id: 'r1',
        listingTitle: 'Fake 3BR in New Haven',
        location: 'New Haven, Enugu',
        reporter: 'Ada O.',
        reason: 'Asked for 5k commitment fee before inspection.',
        date: '2026-02-14'
    },
    {
        id: 'r2',
        listingTitle: 'Self-contain Ikenegbu',
        location: 'Ikenegbu, Owerri',
        reporter: 'Emeka J.',
        reason: 'Property already rented but agent still taking form fees.',
        date: '2026-02-12'
    }
];

const AdminDashboard: React.FC = () => {
  const { listings, setListings, user } = useContext(AppContext)!;
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Access restricted by phone number list
  const isAdmin = user && ADMIN_NUMBERS.includes(user.phone);

  if (!isAdmin) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
            <ShieldAlert size={64} className="text-red-500 mb-6" />
            <h1 className="text-3xl font-black text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-500 font-medium max-w-sm">Only authorized administrators can access this panel. Access is verified via your registered phone number.</p>
        </div>
      );
  }

  const handleStatusChange = (id: string, status: ListingStatus) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const filteredListings = listings.filter(l => {
      const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeTab === 'pending') return l.status === ListingStatus.PENDING && matchesSearch;
      if (activeTab === 'approved') return l.status === ListingStatus.APPROVED && matchesSearch;
      return false;
  });

  const reports = MOCK_SCAM_REPORTS.filter(r => 
    r.listingTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Platform Control</h1>
          <p className="text-gray-500 font-medium">Moderating Enugu & Owerri listings</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-full md:w-auto overflow-x-auto no-scrollbar">
           <button 
             onClick={() => setActiveTab('pending')} 
             className={`flex-shrink-0 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition whitespace-nowrap ${activeTab === 'pending' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400 hover:bg-gray-50'}`}
           >
             Pending Listings ({listings.filter(l => l.status === ListingStatus.PENDING).length})
           </button>
           <button 
             onClick={() => setActiveTab('approved')} 
             className={`flex-shrink-0 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition whitespace-nowrap ${activeTab === 'approved' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400 hover:bg-gray-50'}`}
           >
             Approved Listings
           </button>
           <button 
             onClick={() => setActiveTab('scams')} 
             className={`flex-shrink-0 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition whitespace-nowrap ${activeTab === 'scams' ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'text-gray-400 hover:bg-gray-50'}`}
           >
             Reported Scams
           </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl text-white ${activeTab === 'scams' ? 'bg-red-500' : 'bg-blue-600'}`}>
                        {activeTab === 'pending' ? <Clock size={20}/> : activeTab === 'approved' ? <CheckCircle2 size={20}/> : <ShieldAlert size={20}/>}
                    </div>
                    <h2 className="text-2xl font-black capitalize">{activeTab.replace('scams', 'scam reports')}</h2>
                </div>
                
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm font-medium border-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Property Information</th>
                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Location Details</th>
                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{activeTab === 'scams' ? 'Report Details' : 'Annual Price'}</th>
                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Current Status</th>
                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Moderation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {activeTab !== 'scams' ? (
                            filteredListings.length > 0 ? (
                                filteredListings.map(l => (
                                    <tr key={l.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <img src={l.images[0]} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="" />
                                                <div>
                                                    <div className="font-black text-gray-900 line-clamp-1 text-sm">{l.title}</div>
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                                                        <User size={10}/> {l.ownerName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                                                <MapPin size={14} className="text-blue-600"/> {l.area}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-0.5">{l.city} State</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-lg font-black text-blue-600">₦{l.price.toLocaleString()}</div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Per {l.paymentPeriod}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                l.status === ListingStatus.APPROVED ? 'bg-green-50 text-green-600 border border-green-100' :
                                                l.status === ListingStatus.PENDING ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                                'bg-red-50 text-red-600 border border-red-100'
                                            }`}>
                                                {l.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {l.status === ListingStatus.PENDING && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleStatusChange(l.id, ListingStatus.APPROVED)} 
                                                            className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition shadow-sm"
                                                            title="Approve Listing"
                                                        >
                                                            <CheckCircle2 size={18}/>
                                                        </button>
                                                        <button 
                                                            onClick={() => handleStatusChange(l.id, ListingStatus.REJECTED)} 
                                                            className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"
                                                            title="Reject Listing"
                                                        >
                                                            <XCircle size={18}/>
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-3 text-gray-400 hover:bg-gray-100 rounded-xl transition">
                                                    <MoreHorizontal size={18}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <Search size={40} className="text-gray-200 mb-4" />
                                            <p className="text-gray-400 font-bold uppercase tracking-widest">No listings found</p>
                                        </div>
                                    </td>
                                </tr>
                            )
                        ) : (
                            reports.length > 0 ? (
                                reports.map(r => (
                                    <tr key={r.id} className="hover:bg-red-50/30 transition">
                                        <td className="px-8 py-6">
                                            <div className="font-black text-gray-900 text-sm">{r.listingTitle}</div>
                                            <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1">Targeted by Report</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                                                <MapPin size={14} className="text-red-400"/> {r.location}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-xs font-bold text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 max-w-xs">
                                                "{r.reason}"
                                            </div>
                                            <div className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">Reporter: {r.reporter}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">
                                                URGENT ACTION
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition shadow-lg">
                                                Review Case
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <ShieldAlert size={40} className="text-gray-200 mb-4" />
                                            <p className="text-gray-400 font-bold uppercase tracking-widest">No scam reports found</p>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0"><AlertTriangle size={20}/></div>
              <div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-1">Verify Owners</h4>
                  <p className="text-xs text-blue-700 font-medium leading-relaxed">Always check if the property documents match the agent's ID before final approval.</p>
              </div>
          </div>
          <div className="bg-green-50 p-6 rounded-3xl border border-green-100 flex gap-4">
              <div className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center shrink-0"><CheckCircle2 size={20}/></div>
              <div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-1">Boost Trust</h4>
                  <p className="text-xs text-green-700 font-medium leading-relaxed">Approved listings gain the 'Verified' status if the partner profile is verified.</p>
              </div>
          </div>
          <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex gap-4">
              <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center shrink-0"><ShieldAlert size={20}/></div>
              <div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-1">Safety First</h4>
                  <p className="text-xs text-red-700 font-medium leading-relaxed">Respond to scam reports within 1 hour to prevent platform fraud.</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
