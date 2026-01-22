
import React, { useContext, useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, ArrowRight, TrendingUp, Shield, Zap, Home as HomeIcon, MessageCircle } from 'lucide-react';
import { AppContext } from '../App';
import { CATEGORIES, CITIES } from '../constants';
import ListingCard from '../components/ListingCard';

const Home: React.FC = () => {
  const { listings } = useContext(AppContext)!;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Enugu');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredListings = listings.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = l.city === selectedCity;
    const matchesCategory = selectedCategory ? l.category === selectedCategory : true;
    return matchesSearch && matchesCity && matchesCategory;
  });

  return (
    <div className="relative pb-20">
      {/* Floating Support Button */}
      <a 
        href="https://wa.me/2348166104441?text=Hi%20RentPlug%20Support%20👋%20I%E2%80%99m%20Marcel.%20I%20want%20to%20list%20a%20property%20on%20RentPlug.%20Please%20guide%20me%20on%20how%20to%20post%20and%20get%20verified.%20Thank%20you."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
        aria-label="WhatsApp Support"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Support is Online
        </span>
      </a>

      {/* Hero Section */}
      <section className="relative bg-blue-600 py-16 md:py-24 text-white overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-3xl">
            <span className="bg-blue-700/50 text-blue-100 text-sm font-bold px-3 py-1 rounded-full border border-blue-400/30 mb-6 inline-block">
              #1 Rental App in South East Nigeria
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Rent Smart in Owerri & Enugu
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
              Verified apartments, houses, and commercial spaces at your fingertips. No more fake agents. Just verified listings.
            </p>
            
            {/* Search Box */}
            <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-4xl">
              <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100 py-2">
                <Search className="text-blue-600" size={20} />
                <input 
                  type="text" 
                  placeholder="Area (e.g. New Haven, Ikenegbu...)" 
                  className="w-full border-none focus:ring-0 text-gray-800 font-medium placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center px-4 gap-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                <MapPin className="text-blue-600" size={20} />
                <select 
                  className="w-full border-none focus:ring-0 text-gray-800 font-medium bg-transparent"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="Enugu">Enugu State</option>
                  <option value="Owerri">Imo State (Owerri)</option>
                </select>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-blue-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas Tags */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6 flex flex-wrap items-center gap-4">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2">Hot Areas:</span>
          {CITIES[selectedCity as keyof typeof CITIES].slice(0, 5).map(area => (
            <button 
              key={area}
              onClick={() => setSearchTerm(area)}
              className="px-4 py-1.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-full text-sm font-medium transition"
            >
              {area}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Scroller */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`flex-shrink-0 px-6 py-4 rounded-2xl border transition-all flex flex-col items-center gap-2 min-w-[120px] ${selectedCategory === cat ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-700 hover:border-blue-300'}`}
            >
              <div className={`p-3 rounded-full ${selectedCategory === cat ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
                <HomeIcon size={24} />
              </div>
              <span className="text-sm font-bold">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest in {selectedCity}</h2>
            <p className="text-gray-500 text-sm">Newly added properties in your area</p>
          </div>
          <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            See All <ArrowRight size={18} />
          </button>
        </div>
        
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map(l => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-3xl p-12 text-center">
             <Search size={48} className="mx-auto text-gray-300 mb-4" />
             <h3 className="text-xl font-bold text-gray-900 mb-2">No matching properties</h3>
             <p className="text-gray-500">Try adjusting your filters or searching a different area.</p>
             <button onClick={() => {setSearchTerm(''); setSelectedCategory(null);}} className="mt-4 text-blue-600 font-bold underline">Clear filters</button>
          </div>
        )}
      </section>

      {/* Safety Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
         <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        <Shield size={24} />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Rent with Peace of Mind</h2>
                    <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                        RentPlug verifies every landlord and agent on our platform to ensure your safety. Never pay before inspection.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3">
                            <Zap className="text-yellow-400" size={20} />
                            <span className="font-semibold text-sm">Verified Listings</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Zap className="text-yellow-400" size={20} />
                            <span className="font-semibold text-sm">Secure Communication</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Zap className="text-yellow-400" size={20} />
                            <span className="font-semibold text-sm">Direct Owner Access</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 hidden md:block">
                    <img 
                      src="https://picsum.photos/seed/safety/600/400" 
                      className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500" 
                      alt="Safety first" 
                    />
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
