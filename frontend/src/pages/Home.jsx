import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [izbor, setIzbor] = useState({ cilj: '', nivo: '' });
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Stanje za cjenovnik toggle
  const [isYearly, setIsYearly] = useState(false);

  const pokreniRacunanje = (nivoVrijednost) => {
    setIzbor({ ...izbor, nivo: nivoVrijednost });
    setStep(3);
    setIsCalculating(true);
    setTimeout(() => { setIsCalculating(false); }, 2000);
  };

  const resetujKviz = () => {
    setIsOpen(false);
    setStep(1);
    setIzbor({ cilj: '', nivo: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-hidden pb-24">
      
      {/* HERO SEKCIJA */}
      <div className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none mb-6">
            Tvoj put do forme <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              nikad nije izgledao bolje.
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            FitTrack je premium platforma za one koji ne prave kompromise. Prati treninge i ishranu na najmoderniji način.
          </p>
          <button 
            onClick={() => setIsOpen(true)}
            className="group relative bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-105"
          >
            Započni besplatno
          </button>
        </div>
      </div>

      {/* LIVE STATS BANNER */}
      <div className="max-w-6xl mx-auto px-6 mb-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-slate-900/20 border border-slate-800/60 rounded-[2rem] backdrop-blur-md text-center">
          <div>
            <div className="text-3xl md:text-4xl font-black text-white italic">24,500+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Aktivnih Vježbača</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-blue-500 italic">1.2M+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Zapisanih Serija</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-white italic">98.4%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Uspješnih Ciljeva</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-indigo-400 italic">0 KM</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Skrivenih Troškova</div>
          </div>
        </div>
      </div>

      {/* INTERAKTIVNI CJENOVNIK */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/10">Fleksibilni Planovi</span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic mt-4 mb-6">Izaberi svoj intenzitet</h2>
          
          {/* Toggle dugme (Ispravljeno) */}
          <div className="inline-flex items-center gap-3 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button 
              onClick={() => setIsYearly(false)} 
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!isYearly ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Mjesečno
            </button>
            <button 
              onClick={() => setIsYearly(true)} 
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isYearly ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Godišnje (-20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kartica 1: Free */}
          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-[2rem] flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-white uppercase italic mb-2">Početni paket</h4>
              <p className="text-slate-500 text-xs font-light mb-6">Savršeno za rekreativce koji tek kreću.</p>
              <div className="text-4xl font-black text-white mb-6">0 KM <span className="text-xs text-slate-500 font-normal">/ zauvijek</span></div>
              <ul className="space-y-3 text-sm text-slate-400 border-t border-slate-800/60 pt-6">
                <li>• Pristup bazi od 6 osnovnih vježbi</li>
                <li>• Korištenje live tajmera za odmor</li>
                <li>• Osnovna statistika serija</li>
              </ul>
            </div>
            {/* VODI NA REGISTRACIJU */}
            <Link to="/register" className="w-full text-center mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all block">
              Pokreni Free
            </Link>
          </div>

          {/* Kartica 2: PRO */}
          <div className="bg-gradient-to-b from-slate-900 to-blue-950/20 border-2 border-blue-600 p-8 rounded-[2rem] flex flex-col justify-between relative shadow-xl shadow-blue-500/5">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">Najpopularnije</span>
            <div>
              <h4 className="text-xl font-bold text-white uppercase italic mb-2">PRO Šampion</h4>
              <p className="text-blue-400 text-xs font-light mb-6">Za ozbiljne vježbače i transformacije.</p>
              <div className="text-4xl font-black text-white mb-6">{isYearly ? '12 KM' : '15 KM'} <span className="text-xs text-slate-500 font-normal">/ mjesečno</span></div>
              <ul className="space-y-3 text-sm text-slate-300 border-t border-blue-900/20 pt-6">
                <li className="text-blue-400 font-medium">• Sve iz besplatnog paketa</li>
                <li>• AI Glasovni Trener na našem jeziku</li>
                <li>• Neograničen dnevnik i istorija treninga</li>
                <li>• Napredni 1RM kalkulator sa grafikonom</li>
              </ul>
            </div>
            {/* VODI NA REGISTRACIJU */}
            <Link to="/register" className="w-full text-center mt-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all block shadow-lg shadow-blue-600/20">
              Postani PRO
            </Link>
          </div>

          {/* Kartica 3: Beast */}
          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-[2rem] flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-white uppercase italic mb-2">Zvijer Mod</h4>
              <p className="text-slate-500 text-xs font-light mb-6">Za trenere i profesionalne sportiste.</p>
              <div className="text-4xl font-black text-white mb-6">{isYearly ? '24 KM' : '30 KM'} <span className="text-xs text-slate-500 font-normal">/ mjesečno</span></div>
              <ul className="space-y-3 text-sm text-slate-400 border-t border-slate-800/60 pt-6">
                <li>• Sve iz PRO paketa</li>
                <li>• Vođenje do 5 klijenata istovremeno</li>
                <li>• Custom kalkulatori makronutrijenata</li>
                <li>• Prioritetna tehnička podrška 24/7</li>
              </ul>
            </div>
            {/* VODI NA REGISTRACIJU */}
            <Link to="/register" className="w-full text-center mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all block">
              Kupi Zvijer Paket
            </Link>
          </div>

        </div>
      </div>

      {/* MODAL KVIZ */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-left">
            <button onClick={resetujKviz} className="absolute top-6 right-6 text-slate-500 hover:text-white text-xl">✕</button>
            {step === 1 && (
              <div>
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Korak 1 od 2</span>
                <h3 className="text-2xl font-black text-white uppercase italic mb-6">Šta je tvoj glavni cilj?</h3>
                <div className="space-y-4">
                  {[{ id: 'mrsanje', naslov: 'Gubitak kilograma', ikona: '🔥', opis: 'Definicija i topljenje masti' }, { id: 'misici', naslov: 'Izgradnja mišića', ikona: '💪', opis: 'Hipertrofija i povećanje snage' }].map((kat) => (
                    <button key={kat.id} onClick={() => { setIzbor({...izbor, cilj: kat.naslov}); setStep(2); }} className="w-full text-left p-5 bg-slate-950/40 border border-slate-800 hover:border-blue-500 rounded-2xl flex items-center gap-4 group transition-all">
                      <span className="text-3xl p-2 bg-slate-900 rounded-xl group-hover:bg-blue-600 transition-colors">{kat.ikona}</span>
                      <div><h4 className="font-bold text-white text-lg">{kat.naslov}</h4><p className="text-slate-500 text-sm">{kat.opis}</p></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Korak 2 od 2</span>
                <h3 className="text-2xl font-black text-white uppercase italic mb-6">Kakva je tvoja trenutna forma?</h3>
                <div className="space-y-4">
                  {['Početnik', 'Napredni rekreativac', 'Zvijer mod'].map((nivo) => (
                    <button key={nivo} onClick={() => pokreniRacunanje(nivo)} className="w-full text-left p-5 bg-slate-950/40 border border-slate-800 hover:border-blue-500 rounded-2xl transition-all">
                      <h4 className="font-bold text-white text-lg">{nivo}</h4>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="text-center py-8">
                {isCalculating ? (
                  <div>
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
                    <h3 className="text-xl font-bold text-white animate-pulse">Analiza podataka...</h3>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-3xl font-black text-white uppercase italic mb-2">Plan spreman!</h3>
                    <p className="text-slate-400 text-sm mb-6">Cilj: {izbor.cilj} | Nivo: {izbor.nivo}</p>
                    <Link to="/register" onClick={resetujKviz} className="block w-full text-center py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg">Preuzmi besplatni plan &rarr;</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
