import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import HomeBanner from '../../components/dashboard/HomeBanner';
import { Card, CardContent } from '../../components/ui/Card'; 
import { Layers, Plus, Compass, Info, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* === LOCAL FEATURE MODAL === */
const FeatureModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 max-w-sm w-full p-6 text-center border border-gray-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500"><Info size={24} /></div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Feature Not Available</h3>
        <p className="text-gray-500 text-sm mb-6">Vovwe did not add the feature.</p>
        <button onClick={onClose} className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors">Got it</button>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

  const HomeHeader = (
    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
      <h1 className="text-2xl font-bold text-gray-800">
        Good evening, <span className="text-pageColors-purple capitalize">{userName}</span>
      </h1>
    </div>
  );

  return (
    <DashboardLayout customHeader={HomeHeader}>
      <div className="max-w-6xl mx-auto">
        <HomeBanner />
        <FeatureModal isOpen={showModal} onClose={() => setShowModal(false)} />

        <Card className="text-center">
          <CardContent className="p-12 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-pageColors-purpleLight rounded-full flex items-center justify-center mb-6">
              <Layers size={32} className="text-pageColors-purple" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Tools Added Yet</h3>
            <p className="text-gray-500 max-w-md mb-8">Start by adding your favorite tools to your library. We'll help you track usage, subscriptions, and optimize your stack.</p>
            <div className="flex gap-4">
               <button onClick={() => setShowModal(true)} className="bg-pageColors-purple text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-violet-600 transition-colors shadow-lg shadow-purple-100">
                 <Plus size={18} /> Add Your First Tool
               </button>
               <button onClick={() => setShowModal(true)} className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
                 <Compass size={18} /> Discover Tools
               </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;