import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function VjezbaDetalji() {
  const { id } = useParams(); 
  const [vjezba, setVjezba] = useState(null);
  
  // Stanja za interaktivni trening mod
  const [trenutnaSerija, setTrenutnaSerija] = useState(1);
  const [sekundeOdmora, setSekundeOdmora] = useState(45);
  const [tajmerPokrenut, setTajmerPokrenut] = useState(false);

  // Stanja za 1RM Kalkulator
  const [calcTezina, setCalcTezina] = useState('');
  const [calcPonavljanja, setCalcPonavljanja] = useState('');
  const [oneRepMax, setOneRepMax] = useState(null);

  // NOVO: Stanja za Live Dnevnik Serija
  const [danasnjiLogovi, setDanasnjiLogovi] = useState([]);
  const [logTezina, setLogTezina] = useState('');
  const [logReps, setLogReps] = useState('');

  useEffect(() => {
    const sveVjezbe = [
      { 
        id: 1, naziv: "Bench Press", misicnaGrupa: "Grudi", tezina: "Teško", ikona: "💪", primarni: 90, sekundarni: 40,
        opis: "Osnovna vježba za razvoj mišića grudi, ramena i tricepsa. Lezite na klupu, uhvatite šipku malo šire od širine ramena i kontrolisano je spuštajte do grudi.",
        savjet: "Uvijek drži lopatice spojene i stopala čvrsto na podu radi maksimalne stabilnosti i snage.",
        pravilno: ["Šipka dodiruje donji dio grudi", "Stopala su fiksirana za pod", "Laktovi pod uglom od oko 45 stepeni"],
        pogresno: ["Odvajanje zadnjice od klupe", "Odbijanje šipke od grudi (varanje)", "Širenje laktova previše visoko prema vratu"]
      },
      { 
        id: 2, naziv: "Čučanj", misicnaGrupa: "Noge", tezina: "Ekstremno", ikona: "🦵", primarni: 95, sekundarni: 60,
        opis: "Kralj svih vježbi. Aktivira cijeli donji dio tijela, uključujući kvadricepse, zadnju ložu i gluteus. Pazite na prava leđa!",
        savjet: "Gurnite kukove nazad kao da sjedate na stolicu i ne dozvolite da vam koljena propadaju unutra.",
        pravilno: ["Dubina čučnja (kukovi ispod koljena)", "Težina je na petama", "Pravilan ugao kičme"],
        pogresno: ["Podizanje peta sa poda", "Propadanje koljena prema unutra", "Savijanje donjeg dijela leđa u 'mačja leđa'"]
      },
      { 
        id: 3, naziv: "Mrtvo dizanje", misicnaGrupa: "Leđa", tezina: "Ekstremno", ikona: "🔥", primarni: 100, sekundarni: 70,
        opis: "Odlična vježba za cijeli zadnji lanac mišića. Stanite blizu šipke, savijte koljena, uhvatite šipku i podignite se ispravljajući leđa i noge istovremeno.",
        savjet: "Šipka mora kliziti tik uz vaše potkoljenice i natkoljenice tokom cijelog pokreta. Ne savijajte leđa!",
        pravilno: ["Ravna leđa tokom cijelog lifta", "Šipka putuje tik uz noge", "Zaključavanje kukova na vrhu"],
        pogresno: ["Krivljenje kičme pod teretom", "Trzanje šipke s poda umjesto tečnog dizanja", "Preveliko naginjanje unazad na vrhu"]
      },
      { 
        id: 4, naziv: "Rameni potisak", misicnaGrupa: "Ramena", tezina: "Srednje", ikona: "🏋️‍♂️", primarni: 85, sekundarni: 35,
        opis: "Vježba koja gradi masivna i snažna ramena. Može se raditi dvoručnim utegom ili bučicama, stojeći ili sjedeći na klupi.",
        savjet: "Stisnite trbušnjake i gluteus tokom potiska kako biste zaštitili donji dio leđa od povreda.",
        pravilno: ["Potpuno opružanje ruku na vrhu", "Čvrst core i gluteus", "Kontrolisano spuštanje do brade"],
        pogresno: ["Preveliko krivljenje donjeg dijela leđa", "Korištenje nogu za izbačaj (tada je to Push Press)", "Nepotpuni opseg pokreta"]
      },
      { 
        id: 5, naziv: "Biceps pregib", misicnaGrupa: "Ruke", tezina: "Lako", ikona: "🦾", primarni: 80, sekundarni: 15,
        opis: "Izolacijska vježba za vrhunsku definiciju i masu bicepsa. Fokusirajte se na potpunu kontrakciju na vrhu pokreta.",
        savjet: "Fiksirajte laktove uz tijelo i izbjegavajte ljuljanje tijelom kako ne biste varali tokom podizanja.",
        pravilno: ["Laktovi zalijepljeni uz rebra", "Maksimalna kontrakcija na vrhu", "Potpuno opružanje u donjoj poziciji"],
        pogresno: ["Ljuljanje tijelom (korištenje inercije)", "Odicanje laktova previše naprijed", "Ispuštanje težine bez kontrole"]
      },
      { 
        id: 6, naziv: "Trbušnjaci", misicnaGrupa: "Core", tezina: "Srednje", ikona: "🧘", primarni: 75, sekundarni: 20,
        opis: "Klasična vježba za jačanje trbušnog zida i stabilizaciju čitavog trupa. Kontrolišite i podizanje i spuštanje.",
        savjet: "Nemojte vući rukama vrat prema naprijed. Sva snaga mora dolaziti isključivo iz stomaka.",
        pravilno: ["Kontrakcija stomaka, a ne vrata", "Polagan i kontrolisan tempo", "Izdah prilikom podizanja"],
        pogresno: ["Vučenje glave rukama i pritisak na vrat", "Prebrzo rađenje i 'skakanje'", "Odvajanje donjeg dijela leđa na pogrešan način"]
      }
    ];
    
    const pronadjenaVjezba = sveVjezbe.find(v => v.id === parseInt(id));
    setVjezba(pronadjenaVjezba);
  }, [id]);

  // Logika za glasovni tajmer
  useEffect(() => {
    let interval = null;
    if (tajmerPokrenut && sekundeOdmora > 0) {
      interval = setInterval(() => {
        setSekundeOdmora((prev) => prev - 1);
      }, 1000);
    } else if (sekundeOdmora === 0) {
      setTajmerPokrenut(false);
      setSekundeOdmora(45);
      
      if ('speechSynthesis' in window) {
        const recenica = new SpeechSynthesisUtterance("Rest is over. Time to dominate the next set!");
        recenica.lang = 'en-US';
        window.speechSynthesis.speak(recenica);
      }
    }
    return () => clearInterval(interval);
  }, [tajmerPokrenut, sekundeOdmora]);

  // 1RM računanje
  const izracunajMax = (e) => {
    e.preventDefault();
    if (calcTezina > 0 && calcPonavljanja > 0) {
      setOneRepMax(Math.round(parseFloat(calcTezina) * (1 + parseInt(calcPonavljanja) / 30)));
    }
  };

  // NOVO: Dodavanje serije u live dnevnik
  const dodajLog = (e) => {
    e.preventDefault();
    if (logTezina > 0 && logReps > 0) {
      const noviLog = {
        id: Date.now(),
        serija: danasnjiLogovi.length + 1,
        tezina: logTezina,
        reps: logReps,
        vrijeme: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setDanasnjiLogovi([...danasnjiLogovi, noviLog]);
      setLogTezina('');
      setLogReps('');
    }
  };

  if (!vjezba) {
    return (
      <div className="text-center mt-20 text-white">
        <h2 className="text-2xl mb-4">Učitavanje podataka...</h2>
        <Link to="/vjezbe" className="text-blue-500 hover:underline">&larr; Nazad na sve vježbe</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-6 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <Link to="/vjezbe" className="text-blue-500 hover:text-blue-400 mb-8 inline-block font-bold text-sm tracking-wider">
          &larr; NAZAD U BIBLIOTEKU
        </Link>
        
        {/* ZAGLAVLJE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-slate-900/30 border border-slate-800/60 p-8 rounded-[2rem] backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="text-5xl bg-gradient-to-br from-blue-600 to-indigo-600 w-24 h-24 flex items-center justify-center rounded-3xl text-white shadow-xl shadow-blue-500/20">
              {vjezba.ikona}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight">{vjezba.naziv}</h1>
              <div className="flex gap-3 mt-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/20">
                  {vjezba.misicnaGrupa}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700">
                  {vjezba.tezina}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GLAVNA REŠETKA - LIJEVO VELIKE PROZORE, DESNO MINI ALATI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LIJEVA STRANA (Sadržaj i Form Guard) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Opis */}
            <div className="bg-slate-900/20 border border-slate-800/40 p-8 rounded-[2rem]">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">Kako se pravilno izvodi?</h3>
              <p className="text-slate-400 font-light text-lg leading-relaxed">{vjezba.opis}</p>
            </div>

            {/* NOVO: FORM GUARD (PRAVILNO VS POGREŠNO) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Zelena strana */}
              <div className="bg-emerald-950/10 border border-emerald-500/20 p-6 rounded-3xl">
                <h4 className="text-emerald-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2 mb-4">
                  ✅ Pravilno Izvođenje
                </h4>
                <ul className="space-y-3 text-slate-300 text-sm font-light">
                  {vjezba.pravilno?.map((stavka, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span> {stavka}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Crvena strana */}
              <div className="bg-rose-950/10 border border-rose-500/20 p-6 rounded-3xl">
                <h4 className="text-rose-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2 mb-4">
                  ❌ Najčešće Greške
                </h4>
                <ul className="space-y-3 text-slate-300 text-sm font-light">
                  {vjezba.pogresno?.map((stavka, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span> {stavka}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mišići i Progres Barovi */}
            <div className="bg-slate-900/20 border border-slate-800/40 p-8 rounded-[2rem] space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Aktivacija Mišićnih Grupa</h3>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">Primarni mišić ({vjezba.misicnaGrupa})</span>
                  <span className="text-blue-400 font-bold">{vjezba.primarni}%</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full" style={{ width: `${vjezba.primarni}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Pomoćni mišići (Sinergisti)</span>
                  <span className="text-slate-400 font-bold">{vjezba.sekundarni}%</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-slate-700 h-full" style={{ width: `${vjezba.sekundarni}%` }}></div>
                </div>
              </div>
            </div>

            {/* NOVO: LIVE DNEVNIK SERIJA UŽIVO */}
            <div className="bg-slate-900/10 border border-slate-800 p-8 rounded-[2rem]">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6">📝 Današnji Dnevnik Serija</h3>
              
              <form onSubmit={dodajLog} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input 
                  type="number" placeholder="Težina (kg)" value={logTezina}
                  onChange={(e) => setLogTezina(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none"
                />
                <input 
                  type="number" placeholder="Ponavljanja" value={logReps}
                  onChange={(e) => setLogReps(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wider transition-colors">
                  Zapiši Seriju
                </button>
              </form>

              {danasnjiLogovi.length === 0 ? (
                <p className="text-sm text-slate-500 font-light italic text-center py-4">Još niste zapisali nijednu seriju za danas.</p>
              ) : (
                <div className="overflow-hidden border border-slate-800/80 rounded-xl bg-slate-950/40">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
                      <tr>
                        <th className="p-4">Serija</th>
                        <th className="p-4">Težina</th>
                        <th className="p-4">Ponavljanja</th>
                        <th className="p-4 text-right">Vrijeme</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {danasnjiLogovi.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-900/30 transition-colors animate-fadeIn">
                          <td className="p-4 font-bold text-blue-400"># {log.serija}</td>
                          <td className="p-4 font-medium text-white">{log.tezina} kg</td>
                          <td className="p-4">{log.reps} puta</td>
                          <td className="p-4 text-right text-xs text-slate-500">{log.vrijeme}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* DESNA STRANA (Sidebar alati) */}
          <div className="space-y-8">
            
            {/* Live Mod i Tajmer */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-[2.5rem] shadow-2xl">
              <div className="text-center mb-4">
                <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest border border-blue-500/20">
                  Live Trening Mod (AI Audio)
                </span>
              </div>
              <div className="text-center py-4 bg-slate-950/50 rounded-2xl border border-slate-900 mb-4">
                <div className="text-[11px] text-slate-500 uppercase tracking-widest">Serija</div>
                <div className="text-4xl font-black text-white italic">{trenutnaSerija} <span className="text-lg text-slate-600 font-light">/ 4</span></div>
                <button onClick={() => setTrenutnaSerija(p => p < 4 ? p + 1 : 1)} className="mt-2 text-[11px] font-bold text-blue-400 uppercase tracking-wider">Sledeća serija +</button>
              </div>
              <div className="text-center py-4 bg-slate-950/50 rounded-2xl border border-slate-900">
                <div className="text-[11px] text-slate-500 uppercase tracking-widest mb-1">Odmor</div>
                <div className={`text-5xl font-mono font-black ${tajmerPokrenut ? 'text-green-400' : 'text-white'}`}>
                  00:{sekundeOdmora < 10 ? `0${sekundeOdmora}` : sekundeOdmora}
                </div>
                <div className="flex gap-2 justify-center mt-3 px-2">
                  <button onClick={() => setTajmerPokrenut(!tajmerPokrenut)} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase ${tajmerPokrenut ? 'bg-amber-600' : 'bg-green-600 text-white'}`}>
                    {tajmerPokrenut ? 'Pauza' : 'Kreni odmor'}
                  </button>
                  <button onClick={() => { setTajmerPokrenut(false); setSekundeOdmora(45); }} className="px-3 bg-slate-800 text-slate-400 text-xs font-bold rounded-lg">Reset</button>
                </div>
              </div>
            </div>

            {/* 1RM Kalkulator */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-[2.5rem]">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest text-center mb-4 text-blue-400">🏋️‍♂️ 1RM Kalkulator</h3>
              <form onSubmit={izracunajMax} className="space-y-3">
                <input 
                  type="number" placeholder="Težina (kg)" value={calcTezina} onChange={(e) => setCalcTezina(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-sm focus:border-blue-500 outline-none"
                />
                <input 
                  type="number" placeholder="Ponavljanja" value={calcPonavljanja} onChange={(e) => setCalcPonavljanja(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-sm focus:border-blue-500 outline-none"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors">
                  Izračunaj Maksimum
                </button>
              </form>
              {oneRepMax && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 text-center animate-scaleUp">
                  <div className="text-[11px] text-slate-500 uppercase">Tvoj 1RM:</div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mt-1">{oneRepMax} kg</div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default VjezbaDetalji;
