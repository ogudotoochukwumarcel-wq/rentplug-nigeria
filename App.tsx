
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Search, 
  PlusCircle, 
  User as UserIcon, 
  Heart, 
  Menu, 
  X, 
  Bell, 
  ShieldCheck, 
  LogOut, 
  LayoutDashboard,
  MapPin,
  Filter,
  ArrowRight,
  Info,
  ShieldAlert,
  MessageSquare,
  MessageCircle,
  HelpCircle,
  Mail,
  ShieldX,
  FileText,
  Lock,
  Briefcase,
  Settings
} from 'lucide-react';
import { MOCK_LISTINGS, MOCK_USERS, ADMIN_NUMBERS } from './constants';
import { Listing, User, UserRole, Notification } from './types';

// Pages
import Home from './pages/Home';
import ListingDetail from './pages/ListingDetail';
import PostListing from './pages/PostListing';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Safety from './pages/Safety';
import Favorites from './pages/Favorites';
import VerifiedBadge from './pages/VerifiedBadge';
import About from './pages/About';
import ContactSupport from './pages/ContactSupport';
import ReportScam from './pages/ReportScam';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import PartnerDashboard from './pages/PartnerDashboard';

// Context
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

const DemoModeBanner = () => (
  <div className="bg-yellow-50 border-b border-yellow-100 py-1.5 px-4 text-center">
    <p className="text-[10px] font-bold text-yellow-800 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
      <Info size={12} /> RentPlug MVP - Local Demo Mode Active
    </p>
  </div>
);

const Navbar = () => {
  const { user, setUser, notifications, setNotifications } = useContext(AppContext)!;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const navigate = useNavigate();

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleLogout = () => {
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleProtectedLink = (to: string) => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate(to);
    }
    setIsMenuOpen(false);
  };

  // Restrict Admin Dashboard to specific phone numbers only
  const isAdmin = user && ADMIN_NUMBERS.includes(user.phone);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <DemoModeBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <HomeIcon size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">RentPlug</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Browse</Link>
            <Link to="/post" className="text-gray-600 hover:text-blue-600 font-medium transition">Post Property</Link>
            <Link to="/safety" className="text-gray-600 hover:text-blue-600 font-medium transition">Safety</Link>
            
            {user && (user.role === UserRole.AGENT || user.role === UserRole.LANDLORD) && (
              <Link to="/partner-dashboard" className="text-blue-600 hover:text-blue-700 font-bold transition flex items-center gap-1">
                <LayoutDashboard size={18} /> Partner Dashboard
              </Link>
            )}

            <Link to="/support" className="text-gray-600 hover:text-blue-600 font-medium transition flex items-center gap-1">
              <HelpCircle size={18} /> Support
            </Link>
            <button 
              onClick={() => handleProtectedLink('/favorites')}
              className="text-gray-600 hover:text-blue-600 font-medium transition flex items-center gap-1.5"
            >
              <Heart size={18} /> Favorites
            </button>
            
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={markNotificationsRead}
                  className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                  )}
                </button>
                <div className="h-8 w-px bg-gray-200"></div>
                <Link to="/profile" className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition">
                  <img src={user.profilePhoto} className="w-8 h-8 rounded-full object-cover border border-white" alt="" />
                  <span className="text-sm font-semibold">My Account</span>
                </Link>
                {isAdmin && (
                   <Link to="/admin" className="p-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition shadow-sm border border-blue-100">
                      <Settings size={20} />
                   </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/auth" className="text-gray-700 font-medium hover:text-blue-600 transition">Sign In</Link>
                <Link to="/auth?mode=signup" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Create Account</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-600">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200 h-[calc(100vh-64px)] overflow-y-auto">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold flex items-center gap-3 py-3 border-b border-gray-50"><Search size={20}/> Browse Properties</Link>
          <Link to="/post" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold flex items-center gap-3 py-3 border-b border-gray-50"><PlusCircle size={20}/> Post Property</Link>
          
          {user && (user.role === UserRole.AGENT || user.role === UserRole.LANDLORD) && (
            <Link to="/partner-dashboard" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold flex items-center gap-3 py-3 border-b border-gray-50 text-blue-600"><LayoutDashboard size={20}/> Partner Dashboard</Link>
          )}

          <button onClick={() => handleProtectedLink('/favorites')} className="text-lg font-bold flex items-center gap-3 py-3 border-b border-gray-50 text-left w-full"><Heart size={20}/> My Favorites</button>
          
          <div className="mt-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Safety & Trust</h4>
            <Link to="/safety" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium flex items-center gap-3 py-2"><ShieldAlert size={20}/> Safety Hub</Link>
            <Link to="/verification" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium flex items-center gap-3 py-2"><ShieldCheck size={20}/> Verified Badge</Link>
            <Link to="/report-scam" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium flex items-center gap-3 py-2 text-red-600"><ShieldX size={20}/> Report a Scam</Link>
          </div>

          <div className="mt-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Support & Legal</h4>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium flex items-center gap-3 py-2"><Info size={20}/> About Us</Link>
            <Link to="/support" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium flex items-center gap-3 py-2"><HelpCircle size={20}/> Contact Support</Link>
            
            {/* Strict Admin Check for Dashboard Link in Menu by Phone Number */}
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold flex items-center gap-3 py-2 text-blue-600"><LayoutDashboard size={20}/> Admin Dashboard</Link>
            )}

            <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium flex items-center gap-3 py-2"><Lock size={20}/> Privacy Policy</Link>
            <Link to="/terms" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium flex items-center gap-3 py-2"><FileText size={20}/> Terms of Service</Link>
          </div>
          
          <div className="h-px bg-gray-100 my-4"></div>
          
          {user ? (
            <>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold flex items-center gap-3 py-2"><UserIcon size={20}/> My Account</Link>
              <button handleLogout={() => handleLogout()} className="text-lg font-bold flex items-center gap-3 py-4 text-red-500 w-full text-left transition hover:bg-red-50 px-2 rounded-xl"><LogOut size={20}/> Logout</button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white p-5 rounded-2xl text-center font-black text-lg shadow-xl shadow-blue-100 mb-8">Sign In / Create Account</Link>
          )}

          {/* Mobile Drawer Footer Text */}
          <div className="mt-auto pt-8 pb-12 text-center border-t border-gray-50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed px-4">
              RentPlug Nigeria — Verified Rentals for Owerri & Enugu. <br />
              © 2026 RentPlug Nigeria.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16 mt-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div>
        <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
           <div className="bg-blue-600 p-1 rounded text-white"><HomeIcon size={18} /></div> RentPlug
        </h3>
        <p className="text-sm leading-relaxed text-gray-400 mb-6">Nigeria's most trusted rental marketplace focusing on Owerri and Enugu. Connecting renters with verified landlords directly.</p>
        <div className="flex gap-4">
            <a href="https://wa.me/2348166104441" className="p-2 bg-gray-800 rounded-lg hover:bg-green-600 transition text-white"><MessageCircle size={18}/></a>
            <a href="mailto:support@rentplug.ng" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition text-white"><Mail size={18}/></a>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Platform</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li><Link to="/" className="hover:text-white transition">Browse Listings</Link></li>
          <li><Link to="/post" className="hover:text-white transition">Post a Property</Link></li>
          <li><Link to="/verification" className="hover:text-white transition">Verified Badge</Link></li>
          <li><Link to="/report-scam" className="hover:text-red-500 transition">Report a Scam</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Company</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
          <li><Link to="/support" className="hover:text-white transition">Contact Support</Link></li>
          <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Contact</h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className="flex items-start gap-3">
            <MapPin size={16} className="text-blue-600 shrink-0 mt-1"/>
            <span>Owerri & Enugu, Nigeria</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={16} className="text-blue-600 shrink-0"/>
            <a href="mailto:support@rentplug.ng" className="hover:text-white transition">support@rentplug.ng</a>
          </li>
          <li className="flex items-center gap-3">
             <MessageCircle size={16} className="text-green-500 shrink-0"/>
             <a href="https://wa.me/2348166104441" className="hover:text-white transition">WhatsApp Support</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
      <span>© 2026 RentPlug Nigeria. Built by RentPlug Team.</span>
      <div className="flex gap-6">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/safety">Safety</Link>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null); 
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, listings, setListings, favorites, toggleFavorite, notifications, setNotifications, isDarkMode, setIsDarkMode 
    }}>
      <Router>
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/post" element={<PostListing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/verification" element={<VerifiedBadge />} />
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<ContactSupport />} />
              <Route path="/report-scam" element={<ReportScam />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/partner-dashboard" element={<PartnerDashboard />} />
              <Route path="/search" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}
