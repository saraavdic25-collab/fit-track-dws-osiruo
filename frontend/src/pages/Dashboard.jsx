import React, { useState } from 'react';

function Dashboard() {
  // Statistički podaci
  const stats = [
    { id: 1, naslov: 'Odrađeno treninga', broj: '12', promjena: '+2 ove sedmice', boja: 'text-blue-500' },
    { id: 2, naslov: 'Ukupno minuta', broj: '840', promjena: 'Top 5% korisnika', boja: 'text-emerald-500' },
    { id: 3, naslov: 'Podignuto (kg)', broj: '4,200', promjena: 'Novi rekord!', boja: 'text-purple-500' },
  ];

  // Logika za BMI Kalkulator
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">
          Tvoj <span className="text-blue-500">Napredak</span>
        </h1>

        {/* Statističke kartice */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{s.naslov}</p>
              <h2 className={`text-4xl font-black ${s.boja} mb-1`}>{s.broj}</h2>
              <p className="text-slate-400 text-sm">{s.promjena}</p>
            </div>
          ))}
        </div>

        {/* BMI Kalkulator Sekcija */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-[2.5rem] p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-black text-white uppercase mb-4">BMI Kalkulator</h2>
              <p className="text-slate-400 mb-8">Izračunaj svoj indeks tjelesne mase i prati svoje zdravlje u realnom vremenu.</p>
              
              <form onSubmit={calculateBMI} className="space-y-4">
                <div className="flex gap-4">
                  <input 
                    type="number" 
                    placeholder="Težina (kg)" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all"
                  />
                  <input 
                    type="number" 
                    placeholder="Visina (cm)" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all uppercase tracking-widest text-sm">
                  Izračunaj
                </button>
              </form>
            </div>

            <div className="flex flex-col items-center justify-center bg-slate-950/50 rounded-[2rem] p-10 border border-slate-800/50 text-center">
              {bmi ? (
                <>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Tvoj BMI Rezultat</p>
                  <h3 className="text-7xl font-black text-blue-500 mb-4">{bmi}</h3>
                  <p className="text-white font-medium italic">
                    {bmi < 18.5 ? "Povećajte unos kalorija 🍎" : bmi < 25 ? "Odlična forma! 💪" : "Vrijeme je za trening ⚡"}
                  </p>
                </>
              ) : (
                <p className="text-slate-600 italic">Unesi podatke za prikaz rezultata</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;