
import React, { useContext } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Clock, 
  PlusCircle, 
  HelpCircle, 
  UserCheck, 
  Home as HomeIcon,
  ChevronRight,
  ArrowLeft,
  MapPin,
  TrendingUp,
  Award
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import { UserRole } from './types';

const PartnerDashboard: React.FC = () => {
  const { user, listings } = useContext(AppContext)!;
  const navigate = useNavigate();

  if (!user || (user.role !== UserRole.AGENT && user.role !== UserRole.LANDLORD)) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <LayoutDashboard size={48} className="mx-auto text-blue-600 mb-4" />
        <h1 className="text-3xl font-black mb-4">Partner Access Only</h1>
        <p className="text-gray-600 mb-8">This page is reserved for verified agents and landlords on RentPlug.</p>
        <Link to="/post" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition hover:bg-blue-700">Register as Partner</Link>
      </div>
    );
  }

  const myListingCount = listings.filter(l => l.ownerId === user.id).length;
  const recentListings = listings.filter(l => l.ownerId === user.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Partner Dashboard</h1>
          <p className="text-gray-500 font-medium">Welcome back, {user.name}.</p>
        </div>
        <Link to="/post" className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl shadow-blue-100 hover:scale-[1.02] transition-transform">
           <PlusCircle size={20}/> Post New Property
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Stats */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-blue-50 rounded-full opacity-50"></div>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Profile Status</h3>
            
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${user.isVerified ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {user.isVerified ? <ShieldCheck size={32}/> : <Clock size={32}/>}
                </div>
                <div>
                    <div className="text-xl font-black text-gray-900">{user.isVerified ? 'Verified Partner' : 'Verification Pending'}</div>
                    <p className="text-sm text-gray-500">{user.role}</p>
                </div>
            </div>

            {!user.isVerified && (
              <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 mb-6">
                <p className="text-xs text-yellow-800 font-medium leading-relaxed">
                   We are currently reviewing your documents. This usually takes 24-48 hours. Verified badges boost trust by 5x!
                </p>
              </div>
            )}

            <Link to="/verification" className="w-full py-4 border border-gray-100 rounded-2xl text-center text-sm font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 transition block">
                How Verification Works
            </Link>
          </div>

          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-gray-200">
             <TrendingUp className="text-blue-400 mb-6" size={32} />
             <h3 className="text-2xl font-black mb-2">Platform Activity</h3>
             <p className="text-gray-400 text-sm mb-8 leading-relaxed">Your listings are being seen. Keep them updated to stay on top of results in {user.city}.</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="text-2xl font-black">{myListingCount}</div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Listings</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="text-2xl font-black">128</div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Views</div>
                </div>
             </div>
          </div>
        </div>

        {/* Middle Column: My Listings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-xl text-blue-600"><HomeIcon size={20}/></div> My Recent Listings
                </h3>
                <Link to="/profile" className="text-blue-600 text-sm font-bold hover:underline">View All</Link>
             </div>

             {recentListings.length > 0 ? (
               <div className="space-y-4">
                  {recentListings.map(listing => (
                    <Link key={listing.id} to={`/listing/${listing.id}`} className="flex items-center gap-4 p-4 rounded-3xl border border-gray-50 hover:bg-gray-50 transition group">
                        <img src={listing.images[0]} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition">{listing.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                <MapPin size={12}/> {listing.area} • ₦{listing.price.toLocaleString()}
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${listing.isVerified ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                           {listing.isVerified ? 'Verified' : 'Reviewing'}
                        </div>
                        <ChevronRight className="text-gray-300" size={20}/>
                    </Link>
                  ))}
               </div>
             ) : (
               <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <HomeIcon size={32}/>
                  </div>
                  <p className="text-gray-500 font-bold mb-6">You haven't posted any listings yet.</p>
                  <Link to="/post" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition hover:bg-blue-700">Start Listing</Link>
               </div>
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/support" className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <HelpCircle size={24}/>
                </div>
                <h4 className="text-xl font-black mb-2">Listing Help</h4>
                <p className="text-sm text-gray-400 font-medium mb-4">Having trouble posting? Our support team is ready to help 24/7.</p>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest">Contact Support</span>
            </Link>

            <Link to="/verification" className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Award size={24}/>
                </div>
                <h4 className="text-xl font-black mb-2">Trust Guide</h4>
                <p className="text-sm text-gray-400 font-medium mb-4">Learn how to make your profile stand out and get the verified badge.</p>
                <span className="text-purple-600 font-black text-xs uppercase tracking-widest">Read Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
