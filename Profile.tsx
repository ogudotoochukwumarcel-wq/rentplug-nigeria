
import React, { useContext } from 'react';
import { AppContext } from './App';
import { UserRole } from './types';
import { Settings, Edit3, ShieldCheck, Phone, Mail, LogOut, ChevronRight, Heart, Home as HomeIcon, UserPlus, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ListingCard from "./components/ListingCard";
const Profile: React.FC = () => {
  const { user, setUser, listings, favorites } = useContext(AppContext)!;
  const navigate = useNavigate();
  
  if (!user) return <div className="p-20 text-center">Please login to view profile.</div>;

  const myListings = listings.filter(l => l.ownerId === user.id);
  const myFavorites = listings.filter(l => favorites.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <img src={user.profilePhoto} className="w-full h-full rounded-3xl object-cover" alt="" />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-lg shadow-lg border-2 border-white">
                <Edit3 size={14} />
              </button>
            </div>
            <h2 className="text-2xl font-black mb-1 line-clamp-1 px-2">{user.name}</h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
               {user.role} {user.isVerified && <ShieldCheck size={14}/>}
            </div>

            <div className="space-y-4 text-left border-t border-gray-50 pt-8">
              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400"><Phone size={16} /></div>
                <span className="text-sm font-medium">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400"><Mail size={16} /></div>
                <span className="text-sm font-medium truncate">{user.email || 'No email provided'}</span>
              </div>
            </div>

            <button 
              onClick={() => { setUser(null); navigate('/'); }}
              className="mt-10 w-full flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 py-3 rounded-xl transition"
            >
              <LogOut size={18}/> Logout
            </button>
          </div>

          <div className="mt-6 bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
             <button className="w-full p-6 text-left hover:bg-gray-50 flex items-center justify-between transition border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center"><Settings size={20}/></div>
                  <span className="font-bold">Settings</span>
                </div>
                <ChevronRight size={18} className="text-gray-300"/>
             </button>
             <Link to="/favorites" className="w-full p-6 text-left hover:bg-gray-50 flex items-center justify-between transition border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 text-red-400 rounded-xl flex items-center justify-center"><Heart size={20}/></div>
                  <span className="font-bold">Wishlist</span>
                </div>
                <ChevronRight size={18} className="text-gray-300"/>
             </Link>
             <Link to="/safety" className="w-full p-6 text-left hover:bg-gray-50 flex items-center justify-between transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 text-green-400 rounded-xl flex items-center justify-center"><ShieldCheck size={20}/></div>
                  <span className="font-bold">Safety Hub</span>
                </div>
                <ChevronRight size={18} className="text-gray-300"/>
             </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {user.role === UserRole.RENTER && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-200 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                            <Briefcase size={24} />
                        </div>
                        <h2 className="text-3xl font-black mb-4">Start Earning as an Agent</h2>
                        <p className="text-blue-100 text-lg mb-8 leading-relaxed font-medium">
                            Have properties in Owerri or Enugu? Upgrade your account to list them and reach thousands of verified renters.
                        </p>
                        <Link 
                            to="/post" 
                            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-transform"
                        >
                            <UserPlus size={20}/> Register as Agent/Landlord
                        </Link>
                    </div>
                    <div className="hidden md:block w-48 shrink-0">
                        <img src="https://api.dicebear.com/7.x/shapes/svg?seed=agent" className="w-full opacity-50" alt="" />
                    </div>
                </div>
              </div>
          )}

          {user.role !== UserRole.RENTER ? (
            <div className="mb-12">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-xl text-white"><HomeIcon size={20}/></div> My Listings
                  </h3>
                  <Link to="/post" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100">+ New Listing</Link>
               </div>
               
               {myListings.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myListings.map(l => <ListingCard key={l.id} listing={l} />)}
                 </div>
               ) : (
                 <div className="bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <HomeIcon size={32}/>
                    </div>
                    <p className="text-gray-400 font-bold mb-6">You haven't posted any properties yet.</p>
                    <Link to="/post" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-lg shadow-xl shadow-blue-100 transition hover:bg-blue-700">Post First Property</Link>
                 </div>
               )}
            </div>
          ) : null}

          <div>
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <div className="bg-red-500 p-2 rounded-xl text-white"><Heart size={20}/></div> Saved Properties
                </h3>
             </div>
             
             {myFavorites.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myFavorites.map(l => <ListingCard key={l.id} listing={l} />)}
               </div>
             ) : (
               <div className="bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] p-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <Heart size={32}/>
                  </div>
                  <p className="text-gray-400 font-bold mb-6">No saved properties found.</p>
                  <Link to="/" className="text-blue-600 font-black">Explore listings</Link>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
