import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-slate-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-900 p-6 flex justify-between items-center px-12">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <h1 className="text-2xl font-black text-white tracking-tighter">FIT<span className="text-blue-500">TRACK</span></h1>
      </div>
      <div className="hidden md:flex space-x-10 font-medium text-slate-400 uppercase text-xs tracking-widest">
        <a href="#" className="hover:text-white transition">Programi</a>
        <a href="#" className="hover:text-white transition">Oprema</a>
        <a href="#" className="hover:text-white transition">Zajednica</a>
      </div>
      <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        PRIDRUŽI SE
      </button>
    </nav>
  );
};

export default Navbar;