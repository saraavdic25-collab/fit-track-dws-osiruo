import Navbar from './components/Navbar';

function App() {
  return (
    
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      
      {/* Hero sekcija sa gradijentom na tekstu */}
      <div className="flex flex-col items-center justify-center mt-32 px-6 text-center max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter mb-8">
          Tvoj put do forme <br /> 
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            nikad nije izgledao bolje.
          </span>
        </h1>
        <p className="mt-4 text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
          FitTrack je premium platforma za one koji ne prave kompromise. Prati treninge i ishranu na najmoderniji način.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-5">
          <button className="bg-blue-600 text-white text-lg font-bold px-12 py-5 rounded-2xl shadow-[0_0_30px_-10px_rgba(37,99,235,0.5)] hover:bg-blue-500 hover:scale-105 transition-all duration-300">
            Započni besplatno
          </button>
          <button className="bg-slate-900 text-slate-300 border border-slate-800 text-lg font-bold px-12 py-5 rounded-2xl hover:bg-slate-800 transition-all">
            Pogledaj demo
          </button>
        </div>
      </div>

      {/* Kartice koje izgledaju kao staklo */}
      <div className="mt-32 px-6 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kartica 1 */}
          <div className="group bg-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-slate-800/50 hover:border-blue-500/50 transition-all duration-500">
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <span className="text-3xl text-blue-500">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Brzi track-ing</h3>
            <p className="text-slate-400 leading-relaxed font-light">
              Zabilježi serije u dva klika. Fokusiraj se na tegove, a mi ćemo na brojke.
            </p>
          </div>

          {/* Kartica 2 */}
          <div className="group bg-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-slate-800/50 hover:border-green-500/50 transition-all duration-500">
            <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <span className="text-3xl text-green-500">🥗</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Ishrana</h3>
            <p className="text-slate-400 leading-relaxed font-light">
              AI asistent koji ti kreira plan obroka na osnovu tvog cilja i budžeta.
            </p>
          </div>

          {/* Kartica 3 */}
          <div className="group bg-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-slate-800/50 hover:border-purple-500/50 transition-all duration-500">
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <span className="text-3xl text-purple-500">📈</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Pro Analitika</h3>
            <p className="text-slate-400 leading-relaxed font-light">
              Gledaj svoj napredak kroz interaktivne grafikone koji motivišu.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;