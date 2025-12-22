import React, { useState } from 'react';
import { Lock, Gift, CreditCard, Monitor, Star, Check } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const RedeemTab = ({ rewards, userPoints }) => {
  const [filter, setFilter] = useState('all'); 

  const filteredRewards = rewards.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return userPoints >= r.points_required && r.is_active;
    if (filter === 'locked') return userPoints < r.points_required && r.is_active;
    if (filter === 'coming_soon') return !r.is_active;
    return true;
  });

  const counts = {
    all: rewards.length,
    unlocked: rewards.filter(r => userPoints >= r.points_required && r.is_active).length,
    locked: rewards.filter(r => userPoints < r.points_required && r.is_active).length,
    coming_soon: rewards.filter(r => !r.is_active).length
  };

  const FilterTab = ({ id, label }) => (
    <button
      onClick={() => setFilter(id)}
      className={`pb-2 text-sm font-medium transition-all relative flex items-center gap-2 ${
        filter === id ? 'text-flowva-purple' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      {label}
      <span className={`h-5 px-1.5 rounded-md text-[10px] font-bold flex items-center justify-center ${
        filter === id ? 'bg-flowva-purple text-white' : 'bg-gray-100 text-gray-400'
      }`}>
        {counts[id]}
      </span>
      {filter === id && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-flowva-purple rounded-t-full"></span>
      )}
    </button>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <h2 className="text-xl font-bold text-gray-900 mb-6 pl-4 border-l-4 border-flowva-purple">
        Redeem Your Points
      </h2>

      <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
        <FilterTab id="all" label="All Rewards" />
        <FilterTab id="unlocked" label="Unlocked" />
        <FilterTab id="locked" label="Locked" />
        <FilterTab id="coming_soon" label="Coming Soon" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((item) => {
          const isLocked = userPoints < item.points_required;
          const isComingSoon = !item.is_active;

          return (
            <Card key={item.id} className="group hover:ring-2 hover:ring-purple-50 transition-all">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                   isLocked ? 'bg-gray-50' : 'bg-blue-50'
                }`}>
                  {(item.category === 'cash' || item.category === 'card') && <CreditCard className="text-green-500" size={32} />}
                  {item.category === 'gift_card' && <Gift className="text-orange-400" size={32} />}
                  {item.category === 'software' && <Monitor className="text-blue-500" size={32} />}
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2 min-h-[40px]">
                  {item.description || "Redeem instantly."}
                </p>

                <div className="flex items-center gap-1.5 text-sm font-bold mb-6">
                  <Star size={16} className="text-yellow-400" fill="currentColor" /> 
                  <span className="text-[#8b5cf6]">{item.points_required} pts</span>
                </div>

                <div className="mt-auto w-full">
                  {isComingSoon ? (
                    <button disabled className="w-full py-3 rounded-xl font-medium text-sm bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100">
                      Coming Soon
                    </button>
                  ) : (
                    <button
                      disabled={isLocked}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                        isLocked
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-flowva-purple text-white hover:bg-violet-600 shadow-lg shadow-purple-100'
                      }`}
                    >
                      {isLocked ? (
                        <> <Lock size={16} /> Locked </>
                      ) : (
                        <> <Check size={16} /> Redeem Reward </>
                      )}
                    </button>
                  )}
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RedeemTab;