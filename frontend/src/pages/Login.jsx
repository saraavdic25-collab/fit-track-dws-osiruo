import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Dodali smo useNavigate

function Login() {
  const navigate = useNavigate(); // Inicijalizacija navigacije

  const handleLogin = (e) => {
    e.preventDefault(); // Sprečava da se stranica osvježi
    
    // Ovdje ćemo kasnije dodati provjeru sa bazom
    // Za sada: samo nas "poguraj" na Dashboard
    console.log("Prijava uspješna!");
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6">
      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Dobrodošli <span className="text-blue-500 italic">Nazad</span></h2>
          <p className="text-slate-400">Unesi bilo šta za testnu prijavu.</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}> {/* Dodali smo onSubmit */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Email adresa</label>
            <input 
              required
              type="email" 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              placeholder="ime@primjer.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Lozinka</label>
            <input 
              required
              type="password" 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;