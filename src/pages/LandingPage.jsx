import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Compass, Library, Gift, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pageColors-purple rounded-lg flex items-center justify-center text-white font-bold">F</div>
              <span className="text-xl font-bold text-gray-900">Vovwe Test</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center gap-1 text-gray-600 hover:text-pageColors-purple cursor-pointer">
                <span>Hub</span> <ChevronDown size={16} />
              </div>
              <a href="#" className="text-gray-600 hover:text-pageColors-purple">Company</a>
              <a href="#" className="text-gray-600 hover:text-pageColors-purple">Support</a>
              <a href="#" className="text-gray-600 hover:text-pageColors-purple">Community</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-gray-900 font-medium hover:text-pageColors-purple">Login</Link>
              <Link to="/signup" className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Sign up
              </Link>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 px-4 py-6 shadow-lg flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
            <a href="#" className="text-lg font-medium text-gray-600 hover:text-pageColors-purple">Hub</a>
            <a href="#" className="text-lg font-medium text-gray-600 hover:text-pageColors-purple">Company</a>
            <a href="#" className="text-lg font-medium text-gray-600 hover:text-pageColors-purple">Support</a>
            <a href="#" className="text-lg font-medium text-gray-600 hover:text-pageColors-purple">Community</a>
            <div className="h-px bg-gray-100 my-2"></div>
            <Link to="/login" className="text-lg font-medium text-gray-900 hover:text-pageColors-purple">Login</Link>
            <Link to="/signup" className="bg-black text-white px-5 py-3 rounded-full font-medium text-center hover:bg-gray-800 transition-colors">
              Sign up
            </Link>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="inline-flex bg-gray-100 rounded-full p-1 pr-4 mb-8 items-center gap-3">
          <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">For users</span>
          <span className="text-sm font-medium text-gray-600">For brands</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-6 max-w-5xl mx-auto leading-tight">
          YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SMART</span> SPACE TO MANAGE YOUR DIGITAL LIFE AND BE REWARDED
        </h1>

        <div className="mt-10">
          <Link to="/signup" className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-xl shadow-purple-200">
            Start Earning Today
          </Link>
        </div>
      </section>

      <div className="w-full overflow-hidden bg-white py-12 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div 
          className="flex gap-16 items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {[...Array(2)].map((_, i) => (
             <React.Fragment key={i}>
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">Vs</div>
                <div className="w-16 h-16 rounded-full border-4 border-purple-100 flex items-center justify-center shadow-lg">
                   <div className="text-center leading-none">
                     <span className="block text-xl font-bold text-purple-600">50</span>
                     <span className="text-[8px] text-gray-500">FlowCoins</span>
                   </div>
                </div>
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">Fi</div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">Ca</div>
                <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-2xl shadow-lg">G</div>
             </React.Fragment>
          ))}
        </motion.div>
      </div>


      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="group relative h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-purple-50 to-white border border-purple-100 p-8 flex flex-col items-center justify-center hover:shadow-2xl hover:shadow-purple-100 transition-all cursor-pointer">
             <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <Compass size={48} className="text-blue-600" />
             </div>
             <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Discover</h3>
          </div>

          <div className="group relative h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-orange-50 to-white border border-orange-100 p-8 flex flex-col items-center justify-center hover:shadow-2xl hover:shadow-orange-100 transition-all cursor-pointer">
             <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <Library size={48} className="text-orange-600" />
             </div>
             <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Library</h3>
          </div>

          <div className="group relative h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-pink-50 to-white border border-pink-100 p-8 flex flex-col items-center justify-center hover:shadow-2xl hover:shadow-pink-100 transition-all cursor-pointer">
             <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <Gift size={48} className="text-pink-600" />
             </div>
             <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Reward</h3>
          </div>

        </div>
      </section>

      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-2xl font-bold mb-6">VFlowva</h4>
            <p className="text-gray-400 text-sm">The smart way to manage your digital life and get rewarded.</p>
            <p className="text-gray-500 text-xs mt-4">© 2025 VFlowva</p>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Hub</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Discover</a></li>
              <li><a href="#" className="hover:text-white">Library</a></li>
              <li><a href="#" className="hover:text-white">Rewards</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4">Company</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4">Legal</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;