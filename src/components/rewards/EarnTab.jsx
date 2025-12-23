import React, { useState } from 'react';
import { Zap, Star, Share2, Copy, X, CheckCircle, Facebook, Linkedin, MessageCircle, Calendar, LayoutGrid, Flame, Trophy, Twitter } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';

/* MODAL COMPONENT */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-3xl shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300 max-w-md w-full overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const EarnTab = ({ profile, onClaim, isClaimedToday }) => {
  const [modals, setModals] = useState({ streak: false, stack: false, reclaim: false });

  const handleClaimClick = async () => {
    if (isClaimedToday) return;
    const success = await onClaim();
    if (success) setModals({ ...modals, streak: true });
  };

  // Streak Setup
  const streak = profile?.streak_count || 0;
  let filledDays = streak % 7;
  if (filledDays === 0 && isClaimedToday && streak > 0) filledDays = 7; 

  // Get today
  const jsDay = new Date().getDay(); 
  const currentDayIndex = jsDay === 0 ? 6 : jsDay - 1; 

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* MODALS */}
      <Modal isOpen={modals.streak} onClose={() => setModals({ ...modals, streak: false })}>
        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-pageColors-purple mb-2">Level Up!</h3>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">+5 Points</p>
          <p className="text-gray-500 text-sm mb-6">You've claimed your daily points! Come back tomorrow for more!</p>
        </div>
      </Modal>

      <Modal isOpen={modals.stack} onClose={() => setModals({ ...modals, stack: false })}>
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pageColors-purple"><Share2 size={32} /></div>
          <h3 className="text-xl font-bold mb-2">Share Your Stack</h3>
          <p className="text-gray-500 text-sm mb-6">Showcase your tools to the community and earn points.</p>
          <button onClick={() => setModals({ ...modals, stack: false })} className="w-full py-3 bg-pageColors-purple text-white rounded-xl font-bold hover:bg-violet-600 transition-colors">Go to Tech Stack</button>
        </div>
      </Modal>

      <Modal isOpen={modals.reclaim} onClose={() => setModals({ ...modals, reclaim: false })}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">R</div>
             <div><h3 className="text-lg font-bold">Claim Your 50 Points</h3><p className="text-xs text-gray-500">Reclaim.ai</p></div>
          </div>
          <div className="space-y-4">
            <div><label className="text-xs font-bold text-gray-700 mb-1 block">Email used on Reclaim</label><input type="email" placeholder="user@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pageColors-purple focus:ring-2 focus:ring-purple-50 transition-all" /></div>
            <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-8 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-50 hover:border-gray-400 transition-all group"><div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white transition-colors"><Zap size={18} /></div><span className="text-sm font-medium">Upload Screenshot of Dashboard</span></button>
          </div>
          <div className="flex gap-3 mt-8"><button onClick={() => setModals({ ...modals, reclaim: false })} className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors">Cancel</button><button className="flex-1 py-3 bg-pageColors-purple text-white font-bold rounded-xl hover:bg-violet-600 shadow-lg shadow-purple-200 transition-all">Submit Claim</button></div>
        </div>
      </Modal>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 pl-4 border-l-4 border-pageColors-purple">Your Rewards Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* POINTS BALANCE */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center gap-2 text-pageColors-purple font-bold"><Trophy size={18} /><span>Points Balance</span></div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="text-5xl font-bold text-pageColors-purple">{profile?.points || 0}</span>
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-md"><Star size={20} fill="white" /></div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between text-xs text-gray-500 font-medium mb-2"><span>Progress to $5 Gift Card</span><span>{profile?.points || 0}/5000</span></div>
                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-pageColors-purple h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(((profile?.points || 0) / 5000) * 100, 100)}%` }}></div></div>
                <p className="text-xs text-gray-400 mt-3 flex items-center gap-1"><Zap size={12} className="text-yellow-500" fill="currentColor" /> Just getting started — keep earning points!</p>
              </div>
            </CardContent>
          </Card>

          {/* DAILY STREAK */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-500 font-bold"><Flame size={18} /><span>Daily Streak</span></div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
               <div className="mb-4 text-center">
                  <h3 className="text-4xl font-bold text-pageColors-purple mb-6 text-left">{streak} day</h3>
                  <div className="flex justify-between gap-1">
                    {['M','T','W','T','F','S','S'].map((day, i) => {
                      const isFilled = i < filledDays;
                      const isCurrentDay = i === currentDayIndex;
                      
                      return (
                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                          isFilled 
                            ? 'bg-pageColors-purple text-white border-pageColors-purple'
                            : isCurrentDay
                              ? 'bg-white text-pageColors-purple border-pageColors-purple' // Current Day Outline
                              : 'bg-gray-100 text-gray-400 border-transparent' // Empty
                        }`}>
                          {day}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-400 mt-4">Check in daily to to earn +5 points</p>
               </div>
               <button 
                  onClick={handleClaimClick} 
                  disabled={isClaimedToday}
                  className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm ${
                    isClaimedToday 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-pageColors-purple hover:bg-[#7c3aed] text-white shadow-lg shadow-purple-100'
                  }`}
               >
                  <Zap size={16} fill="currentColor" />
                  {isClaimedToday ? 'Claimed Today' : 'Claim Today'}
               </button>
            </CardContent>
          </Card>

          {/* FEATURED TOOL */}
            <Card className="flex flex-col h-full overflow-hidden border-0 shadow-xl">
                <div className="bg-gradient-to-r from-pageColors-purple to-[#ec4899] p-6 text-white relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">Featured</span>
                            <p className="text-[1.5rem] font-medium opacity-90 mt-4">Top Tool Spotlight</p>
                            <h2 className="text-[.9rem] font-bold mt-3">Reclaim</h2>
                        </div>
                        <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                            <LayoutGrid size={20} className="text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 flex flex-col h-full justify-between">
                    <div className="flex gap-4 mb-6">
                        <div className="w-5 h-10 shrink-0">
                            <Calendar className="text-pageColors-purple" size={24} />
                        </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">Automate and Optimize Your Schedule</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn VFlowva Points when you sign up!</p>
                    </div>
                </div>
                <div className="flex gap-3 mt-auto">
                   <button className="bg-pageColors-purple text-white px-2 py-2.5 rounded-full text-sm font-bold hover:bg-[#7c3aed] transition-colors flex-1">Sign up</button>
                   <button onClick={() => setModals({ ...modals, reclaim: true })} className="bg-gradient-to-r from-[#d946ef] to-[#ec4899] text-white px-2 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity flex-1">Claim 50 pts</button>
                </div>
             </div>
            </Card>
        </div>
      </div>

      {/* EARN MORE POINTS */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 pl-4 border-l-4 border-pageColors-purple">Earn More Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="h-full flex flex-col overflow-hidden group hover:ring-2 hover:ring-pageColors-purple hover:border-transparent transition-all duration-300">
              <div className="bg-white p-6 border-b border-gray-50">
                    <div className="flex items-center gap-3 text-pageColors-purple font-bold text-lg">
                        <div className="p-1 bg-purple-50 rounded-lg">
                            <Star size={18} />
                        </div>
                        <span>Refer and win 10,000 points!</span>
                    </div>
                </div>
                <div className="bg-[#f8fafc] p-6 flex-1">
                    <p className="text-sm text-gray-600 leading-relaxed">Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of <span className="text-pageColors-purple font-bold">10,000 points</span>. Friends must complete onboarding to qualify.</p>
                </div>
           </Card>
           <Card className="h-full flex flex-col overflow-hidden">
                <div className="bg-white p-6 border-b border-gray-50 flex gap-4">
                    <div className="text-pageColors-purple mt-1">
                        <Share2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-pageColors-purple">Share Your Stack</h3>
                        <p className="text-xs text-gray-400 font-semibold">Earn +25 pts</p>
                    </div>
                </div>
                <div className="bg-[#f8fafc] p-6 flex-1 flex items-center justify-between">
                    <p className="text-sm text-gray-600 font-medium">Share your tool stack</p>
                    <button onClick={() => setModals({ ...modals, stack: true })} className="bg-pageColors-purpleLight text-pageColors-purple px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#ebd5fe] transition-colors"><Share2 size={16} /> Share</button>
                </div>
           </Card>
        </div>
      </div>

      {/* REFER & EARN  */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 pl-4 border-l-4 border-pageColors-purple">Refer & Earn</h2>
        <Card className="overflow-hidden bg-gray-50/50 border-none shadow-none">
           <div className="bg-white rounded-3xl border border-pageColors-border overflow-hidden">
              <div className="p-8 pb-0">
                 <div className="flex items-center gap-3 text-pageColors-purple mb-1">
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <Share2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Share Your Link</h3>
                        <p className="text-gray-500 text-sm">Invite friends and earn 25 points when they join!</p>
                    </div>
                 </div>
              </div>
                <div className="p-8 pt-10">
                    <div className="flex justify-around mb-10">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-pageColors-purple mb-1">0</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Referrals</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-pageColors-purple mb-1">0</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Points Earned</p>
                        </div>
                    </div>
                    <div className="mb-8">
                        <p className="text-xs text-gray-500 font-semibold mb-2 ml-1">Your personal referral link:</p>
                        <div className="bg-white p-2 rounded-2xl border border-gray-200 flex items-center shadow-sm hover:border-pageColors-purple transition-colors">
                            <input readOnly value={`${profile?.referral_code || 'Not Available'}`} className="flex-1 bg-transparent px-4 text-sm text-gray-600 outline-none font-medium text-ellipsis" />
                            <button className="p-2 hover:bg-gray-50 rounded-xl text-pageColors-purple transition-all"><Copy size={20} /></button>
                        </div>
                    </div>
                    <div className="flex justify-center gap-3">
                        <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                            <Facebook size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform">
                            <Twitter size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                            <Linkedin size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform">
                            <MessageCircle size={18} />
                        </button>
                    </div>
                </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default EarnTab;