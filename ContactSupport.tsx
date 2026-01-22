
import React from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  HelpCircle, 
  ShieldCheck, 
  ArrowLeft, 
  Clock, 
  MapPin,
  MessageSquare,
  FilePlus,
  UserCheck,
  AlertOctagon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSupport: React.FC = () => {
  const SUPPORT_NUMBER = "+2348166104441";
  const WA_NUMBER = "2348166104441";
  const WA_BASE_URL = `https://wa.me/${WA_NUMBER}`;
  
  const QUICK_HELP = [
    {
      title: "Listing Help",
      icon: <FilePlus className="text-blue-600" size={20} />,
      message: "Hi%20RentPlug%20Support%20👋%20I%20need%20help%20posting%20a%20listing.%20My%20city%20is%20____%20and%20area%20is%20____.%20Please%20guide%20me."
    },
    {
      title: "Verification Help",
      icon: <UserCheck className="text-blue-600" size={20} />,
      message: "Hi%20RentPlug%20Support%20👋%20I%20want%20to%20get%20verified.%20What%20steps%20are%20required?"
    },
    {
      title: "Report Scam",
      icon: <AlertOctagon className="text-red-600" size={20} />,
      message: "Hi%20RentPlug%20Support%20🚨%20I%20want%20to%20report%20a%20scam.%20Details:%20____"
    },
    {
      title: "General Question",
      icon: <MessageSquare className="text-blue-600" size={20} />,
      message: "Hi%20RentPlug%20Support%20👋%20I%20have%20a%20question:%20____"
    }
  ];
  
  const EMAIL_SUPPORT = "mailto:support@rentplug.ng?subject=Support%20Request&body=Hi%20RentPlug%20Support,%20I%20need%20help%20with%20listing%20a%20property.";
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>

      <div className="text-center mb-16">
        <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-blue-100">
            <HelpCircle size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Contact Support</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Need help with your search or a listing? Our team is available 24/7 to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <a 
          href={`${WA_BASE_URL}?text=Hi%20RentPlug%20Support%20👋%20I%E2%80%99m%20Marcel.%20I%20want%20to%20list%20a%20property%20on%20RentPlug.%20Please%20guide%20me%20on%20how%20to%20post%20and%20get%20verified.%20Thank%20you.`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
        >
          <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <MessageCircle size={28} />
          </div>
          <h3 className="text-xl font-black mb-2">WhatsApp</h3>
          <p className="text-gray-500 text-sm font-medium mb-6">Fastest response for urgent queries.</p>
          <span className="text-green-600 font-black text-sm uppercase tracking-widest">Chat Now</span>
        </a>

        <a 
          href={`tel:${SUPPORT_NUMBER}`}
          className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
        >
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Phone size={28} />
          </div>
          <h3 className="text-xl font-black mb-2">Call Us</h3>
          <p className="text-gray-500 text-sm font-medium mb-6">Speak directly with a support agent.</p>
          <span className="text-blue-600 font-black text-sm uppercase tracking-widest">Call {SUPPORT_NUMBER}</span>
        </a>

        <a 
          href={EMAIL_SUPPORT}
          className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
        >
          <div className="w-14 h-14 bg-gray-50 text-gray-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:text-white transition-colors">
            <Mail size={28} />
          </div>
          <h3 className="text-xl font-black mb-2">Email Support</h3>
          <p className="text-gray-500 text-sm font-medium mb-6">For detailed inquiries or documentation.</p>
          <span className="text-gray-900 font-black text-sm uppercase tracking-widest">Send Email</span>
        </a>
      </div>

      {/* Support Inbox Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="text-blue-600" size={20} />
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">Support Inbox</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_HELP.map((help, idx) => (
            <a 
              key={idx}
              href={`${WA_BASE_URL}?text=${help.message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col gap-3 group"
            >
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                {help.icon}
              </div>
              <h4 className="font-bold text-gray-900">{help.title}</h4>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-auto">Open Chat</p>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-blue-600" size={24} />
                <h3 className="text-2xl font-black text-gray-900">Safety Hub</h3>
            </div>
            <p className="text-blue-800 font-medium mb-6 leading-relaxed">
                Before reaching out, check our safety hub for tips on how to identify verified listings and avoid common rental scams in Nigeria.
            </p>
            <Link to="/safety" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
                View Safety Tips
            </Link>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/60 p-6 rounded-3xl">
                <Clock className="text-blue-600 mb-3" size={20} />
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Hours</div>
                <div className="text-sm font-bold">24/7 Available</div>
            </div>
            <div className="bg-white/60 p-6 rounded-3xl">
                <MapPin className="text-blue-600 mb-3" size={20} />
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">HQ</div>
                <div className="text-sm font-bold">Enugu, Nigeria</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
