import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EarnTab from '../../components/rewards/EarnTab';
import RedeemTab from '../../components/rewards/RedeemTab';
import { useRewards } from '../../hooks/useRewards';
import { Loader2 } from 'lucide-react';

const RewardsHub = () => {
  const { profile, rewards, loading, claimDailyPoints, hasClaimedToday } = useRewards();
  const [activeTab, setActiveTab] = useState('earn');

  const RewardsHeader = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Rewards Hub</h1>
      <p className="text-gray-500 text-sm mt-1">Earn points, unlock rewards, and celebrate your progress!</p>
    </div>
  );

  if (loading) {
    return (
      <DashboardLayout customHeader={RewardsHeader}>
        <div className="h-[80vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-pageColors-purple w-10 h-10" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout customHeader={RewardsHeader}>
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8 border-b border-gray-100 mb-8">
          <button onClick={() => setActiveTab('earn')} className={`pb-3 text-sm font-medium transition-all relative ${activeTab === 'earn' ? 'text-pageColors-purple' : 'text-gray-500 hover:text-gray-800'}`}>
            Earn Points
            {activeTab === 'earn' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pageColors-purple rounded-t-full"></span>}
          </button>
          <button onClick={() => setActiveTab('redeem')} className={`pb-3 text-sm font-medium transition-all relative ${activeTab === 'redeem' ? 'text-pageColors-purple' : 'text-gray-500 hover:text-gray-800'}`}>
            Redeem Rewards
            {activeTab === 'redeem' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pageColors-purple rounded-t-full"></span>}
          </button>
        </div>

        <div>
          {activeTab === 'earn' ? (
            <EarnTab profile={profile} onClaim={claimDailyPoints} isClaimedToday={hasClaimedToday} />
          ) : (
            <RedeemTab rewards={rewards} userPoints={profile?.points || 0} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RewardsHub;