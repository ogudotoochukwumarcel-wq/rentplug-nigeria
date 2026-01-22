
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';
import ListingCard from '../components/ListingCard';
import { Heart, Search, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Favorites: React.FC = () => {
  const { favorites, listings, user } = useContext(AppContext)!;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const savedListings = listings.filter(l => favorites.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <div className="flex items-center gap-4 mb-10">
        <Link to="/" className="p-2 hover:bg-white rounded-full transition shadow-sm border border-gray-100 bg-white">
          <ArrowLeft size={20}/>
        </Link>
        <h1 className="text-4xl font-black text-gray-900">Saved Listings</h1>
      </div>

      {savedListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-16 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto mt-20">
          <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Heart size={48} fill="currentColor" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">No Favorites Yet</h2>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            Your wishlist is empty. Browse properties and click the heart icon to save listings for later.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition active:scale-[0.98]"
          >
            <Search size={20}/> Start Browsing
          </Link>
        </div>
      )}

      {savedListings.length > 0 && (
        <div className="mt-20 p-8 bg-blue-50 rounded-3xl border border-blue-100 max-w-2xl mx-auto flex items-start gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
            <Heart size={20} fill="currentColor" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Stay Notified</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              We'll notify you if any of your saved listings change price or become unavailable.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
