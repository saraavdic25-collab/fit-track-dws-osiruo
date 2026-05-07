import React from 'react';

// Ovo su podaci koji će se prikazivati u karticama
const vjezbePodaci = [
  { id: 1, naziv: 'Bench Press', kategorija: 'Grudi', tezina: 'Teško', ikona: '💪' },
  { id: 2, naziv: 'Čučanj', kategorija: 'Noge', tezina: 'Ekstremno', ikona: '🦵' },
  { id: 3, naziv: 'Mrtvo dizanje', kategorija: 'Leđa', tezina: 'Ekstremno', ikona: '🔥' },
  { id: 4, naziv: 'Rameni potisak', kategorija: 'Ramena', tezina: 'Srednje', ikona: '🏋️‍♂️' },
  { id: 5, naziv: 'Biceps pregib', kategorija: 'Ruke', tezina: 'Lako', ikona: '🦾' },
  { id: 6, naziv: 'Trbušnjaci', kategorija: 'Core', tezina: 'Srednje', ikona: '🧘' },
];

function Vjezbe() {
  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Naslov sekcije */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">
              Biblioteka <span className="text-blue-500 underline decoration-blue-500/30">Vježbi</span>
            </h1>
            <p className="text-slate-400 mt-4 text-lg font-light">Odaberi svoj fokus za današnji trening.</p>
          </div>
          <button className="bg-slate-900 border border-slate-800 text-white px-6 py-3 rounded-xl hover:bg-blue-600 hover:border-blue-500 transition-all duration-300">
            Filtriraj +
          </button>
        </div>

        {/* Grid sa karticama - ovdje se dešava magija */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vjezbePodaci.map((vjezba) => (
            <div 
              key={vjezba.id} 
              className="group bg-slate-900/30 border border-slate-800/50 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-3 shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="text-4xl bg-slate-800/50 w-20 h-20 flex items-center justify-center rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {vjezba.ikona}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/20">
                  {vjezba.tezina}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {vjezba.naziv}
              </h3>
              <p className="text-slate-500 uppercase text-[10px] tracking-widest font-semibold mb-8">
                {vjezba.kategorija}
              </p>
              
              <button className="w-full py-4 bg-white/5 text-white rounded-2xl font-bold border border-white/5 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                Pogledaj detalje
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Vjezbe;