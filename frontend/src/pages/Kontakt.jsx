import React from 'react';

function Kontakt() {
  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">
            Kontaktirajte <span className="text-blue-500">Nas</span>
          </h1>
          <p className="text-slate-400 mt-4 text-lg">Tu smo za sva vaša pitanja i podršku.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Forma za kontakt */}
          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Ime</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all" placeholder="Vaše ime" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Email</label>
                  <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all" placeholder="email@primjer.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Poruka</label>
                <textarea rows="5" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all" placeholder="Kako vam možemo pomoći?"></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all duration-300 uppercase tracking-widest text-sm">
                Pošalji poruku
              </button>
            </form>
          </div>

          {/* Google Maps Dio */}
          <div className="h-full min-h-[400px] rounded-[2.5rem] overflow-hidden border border-slate-800">
            <iframe 
              title="FitTrack Lokacija"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.108924614131!2d18.4093953!3d43.8535287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c919d690a6f3%3A0x6335123d6a4c2b9a!2sSarajevo!5e0!3m2!1shr!2sba!4v1700000000000" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kontakt;