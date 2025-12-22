import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Library, Layers, CreditCard, Gift, Settings, Bell, LogOut, Menu, User, Info, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const FeatureModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 max-w-sm w-full p-6 text-center border border-gray-100">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
           <Info size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Feature Not Available</h3>
        <p className="text-gray-500 text-sm mb-6">Vovwe did not add the feature.</p>
        <button onClick={onClose} className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors">Got it</button>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children, customHeader }) => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  const userEmail = user?.email || "";

  const navItems = [
    { label: 'Home', icon: Home, path: '/dashboard/home', isImplemented: true },
    { label: 'Discover', icon: Compass, path: '#', isImplemented: false },
    { label: 'Library', icon: Library, path: '#', isImplemented: false },
    { label: 'Tech Stack', icon: Layers, path: '#', isImplemented: false },
    { label: 'Subscriptions', icon: CreditCard, path: '#', isImplemented: false },
    { label: 'Rewards Hub', icon: Gift, path: '/dashboard/rewards', isImplemented: true },
    { label: 'Settings', icon: Settings, path: '#', isImplemented: false },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-slate-900 selection:bg-purple-100">
      <FeatureModal isOpen={showFeatureModal} onClose={() => setShowFeatureModal(false)} />
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={`w-72 bg-white fixed h-full z-50 border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-10 pl-2">
             <div className="w-9 h-9 bg-[#8b5cf6] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-200">F</div>
             <span className="text-2xl font-bold text-gray-900 tracking-tight">Flowva</span>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;

              if (item.isImplemented) {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#f3e8ff] text-[#8b5cf6]'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    {item.label}
                  </Link>
                );
              } else {
                return (
                  <button
                    key={item.label}
                    onClick={() => setShowFeatureModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 transition-all text-left"
                  >
                    <Icon size={20} strokeWidth={2} />
                    {item.label}
                  </button>
                );
              }
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-100">
           <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold border border-gray-200 group-hover:border-purple-200 group-hover:bg-purple-50 group-hover:text-purple-600 transition-all shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm text-gray-900 truncate capitalize">{userName}</p>
                <p className="text-xs text-gray-400 truncate w-full">{userEmail}</p>
              </div>
              <button onClick={signOut} className="text-gray-300 hover:text-red-500 transition-colors p-2" title="Sign Out">
                <LogOut size={18} />
              </button>
           </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-72 flex flex-col min-h-screen relative">
        <header className="sticky top-0 z-30 bg-[#fafafa]/95 backdrop-blur-md border-b border-transparent">
          <div className="flex items-center justify-between px-6 md:px-10 py-5">
            <div className="flex-1 flex items-center">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden mr-4 text-gray-500 p-2 hover:bg-gray-100 rounded-lg">
                <Menu size={24} />
              </button>
              <div className="w-full">
                {customHeader}
              </div>
            </div>
            {/* Notification */}
            <div className="relative ml-4">
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all relative group">
                <Bell size={20} className="text-gray-400 group-hover:text-[#8b5cf6] transition-colors" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              {isNotifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                  <div className="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-sm">Notifications</h3>
                    <div className="flex gap-3"><button className="text-[10px] font-medium hover:underline opacity-90">Mark read</button><button className="text-[10px] font-medium hover:underline opacity-90">Delete All</button></div>
                  </div>
                  <div className="p-4 border-b border-gray-50 bg-blue-50/30 flex gap-3"><div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0 mt-1"><span className="text-xs">🔥</span></div><div><p className="text-sm font-bold text-gray-900">Daily Streak Reminder</p><p className="text-xs text-gray-500 mt-1">Don't forget to claim your streak today!</p></div></div>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="px-6 md:px-10 pb-12 flex-1 max-w-7xl w-full">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;