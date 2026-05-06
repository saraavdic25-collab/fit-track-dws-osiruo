import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Tvoj put do savršene forme <br /> 
          <span className="text-blue-600">počinje ovdje.</span>
        </h2>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          FitTrack vam pomaže da pratite svoje vježbe, planirate ishranu i ostvarite svoje fitness ciljeve na jednostavan način.
        </p>
        <button className="mt-10 bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all">
          Započni besplatno
        </button>
      </div>
    </div>
  );
}

export default App;
