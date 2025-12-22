import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl p-8 text-white mb-8 shadow-xl shadow-purple-200 relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-2">Welcome to Vovwe Test!</h2>
        <p className="opacity-90 max-w-lg mb-6">
          Track your tools, manage subscriptions, and earn rewards for optimizing your digital life.
        </p>
        <div className="flex gap-3">
          <button className="bg-white text-violet-600 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors">
            <Link to="/app/rewards">Rewards</Link>
            
          </button>
          <button className="bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-white/30 transition-colors">
            Invite Team
          </button>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
    </div>
  );
};

export default HomeBanner;