
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Heart, ShieldCheck } from 'lucide-react';
import { Listing } from '../types';
import { AppContext } from '../App';

interface Props {
  listing: Listing;
}

const ListingCard: React.FC<Props> = ({ listing }) => {
  const { favorites, toggleFavorite } = useContext(AppContext)!;
  const isFav = favorites.includes(listing.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/listing/${listing.id}`}>
          <img 
            src={listing.images[0]} 
            alt={listing.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <button 
          onClick={() => toggleFavorite(listing.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${isFav ? 'bg-red-50 text-red-500' : 'bg-white/70 text-gray-700 hover:bg-white'}`}
        >
          <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
        </button>
        {listing.isFeatured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Featured
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm">
                {listing.category}
            </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 leading-tight">{listing.title}</h3>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin size={14} className="text-blue-600" />
          <span className="line-clamp-1">{listing.area}, {listing.city}</span>
        </div>
        
        <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <Bed size={16} /> <span>{listing.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} /> <span>{listing.bathrooms}</span>
          </div>
          {listing.isVerified && (
            <div className="flex items-center gap-1 text-green-600 font-medium ml-auto">
              <ShieldCheck size={16} />
              <span className="text-[10px] uppercase tracking-wide">Verified</span>
            </div>
          )}
        </div>
        
        <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-blue-600">
                ₦{listing.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 font-medium">per {listing.paymentPeriod}</span>
          </div>
          <Link 
            to={`/listing/${listing.id}`}
            className="text-sm font-bold text-gray-900 flex items-center gap-1 hover:text-blue-600 transition"
          >
            Details 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
