import React, { useState } from 'react';

function Kontakt() {
  const [kategorija, setKategorija] = useState('pitanje');
  const [ime, setIme] = useState('');
  const [poruka, setPoruka] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ime && poruka) {
      setIsLoading(true);
      
      // Simuliramo slanje podataka (1.5 sekundi loadinga)
      setTimeout(() => {
        setIsLoading(false);
        setIsSent(true);
      }, 1500);
    }
  };

  const resetForme = () => {
    setIsSent(false);
    setIme('');
    setPoruka('');
    setKategorija('pitanje');
  };

  return (
    <div className="min-h-[90vh] bg-slate-950 py-20 px-6 relative flex items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-12 items-center z-10">
        
        {/* LIJEVA STRANA: Brzi info */}
        <div className="lg:col-span-2 space-y-6">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/10">Podrška 24/7</span>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight leading-none">
            Imaš pitanje? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Javi nam se.</span>
          </h1>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Želiš saradnju, partnerski ugovor ili ti samo treba pomoć oko tvog plana vježbanja? Naš tim odgovara brže nego što radiš seriju čučnjeva.
          </p>
          <div className="pt-4 border-t border-slate-900 space-y-2 text-xs text-slate-500 font-mono">
            <div>📍 SARAJEVO, BIH</div>
            <div>📧 SUPPORT@FITTRACK.BA</div>
          </div>
        </div>

        {/* DESNA STRANA: FORMA */}
        <div className="lg:col-span-3 bg-slate-900/40 border border-slate-800/80 p-8 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden shadow-2xl">
          
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Selektor Kategorije */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Razlog Javljanja</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'pitanje', oznaka: 'Pitanje ❓' },
                    { id: 'saradnja', oznaka: 'Saradnja 🤝' },
                    { id: 'pohvala', oznaka: 'Pohvala ❤️' }
                  ].map((kat) => (
                    <button
                      key={kat.id}
                      type="button"
                      onClick={() => setKategorija(kat.id)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                        kategorija === kat.id 
                          ? 'bg-blue-600/10 border-blue-500 text-blue-400' 
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {kat.oznaka}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Ime */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Tvoje Ime / Username</label>
                <input 
                  type="text" required placeholder="npr. Adin" value={ime}
                  onChange={(e) => setIme(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Input Poruka */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Tvoja Poruka</label>
                <textarea 
                  rows="4" required value={poruka}
                  onChange={(e) => setPoruka(e.target.value)}
                  placeholder="Piši ovdje..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit gumb sa loaderom */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Pošalji Poruku &rarr;'
                )}
              </button>

            </form>
          ) : (
            /* STATE USPJEHA */
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-2">Poruka je poslata!</h3>
              <p className="text-slate-400 font-light text-sm max-w-sm mx-auto mb-8">
                Hvala ti, <span className="text-blue-400 font-bold">{ime}</span>. Naš tim je primio poruku za kategoriju <span className="text-indigo-400 font-bold font-mono">{kategorija}</span> i javiće ti se uskoro.
              </p>
              <button 
                onClick={resetForme}
                className="px-6 py-2.5 bg-slate-950 text-slate-400 hover:text-white border border-slate-800 rounded-xl text-xs font-bold uppercase transition-all"
              >
                Pošalji novu poruku
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Kontakt;
