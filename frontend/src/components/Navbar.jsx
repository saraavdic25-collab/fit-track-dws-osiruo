import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-900 p-6 flex justify-between items-center px-12">
      {/* Logo sekcija */}
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="w-8 h-8 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform"></div>
        <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
          Fit<span className="text-blue-500">Track</span>
        </h1>
      </Link>
      
      {/* Navigacijski linkovi - Sredina */}
      <div className="hidden md:flex space-x-10 font-medium text-slate-400 uppercase text-xs tracking-widest">
        <Link to="/" className="hover:text-white transition">Početna</Link>
        <Link to="/vjezbe" className="hover:text-white transition">Vježbe</Link>
        <Link to="/kontakt" className="hover:text-white transition">Kontakt</Link>
      </div>

      {/* Dugme za Login */}
      <Link 
        to="/login" 
        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-white/5 inline-block text-center"
      >
        PRIDRUŽI SE
      </Link>
    </nav>
  );
};

export default Navbar;