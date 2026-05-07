import React from 'react';

function Home() {
  return (
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
      <div className="mt-12">
        <button className="bg-blue-600 text-white text-lg font-bold px-12 py-5 rounded-2xl shadow-[0_0_30px_-10px_rgba(37,99,235,0.5)] hover:bg-blue-500 hover:scale-105 transition-all duration-300">
          Započni besplatno
        </button>
      </div>
    </div>
  );
}

export default Home;