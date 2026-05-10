import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Importujemo Footer
import Home from './pages/Home';
import Vjezbe from './pages/Vjezbe';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Kontakt from './pages/Kontakt'; // Ovo ćemo napraviti u sljedećem koraku

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
        {/* Navigacija na vrhu */}
        <Navbar />

        {/* Glavni sadržaj koji se širi da gurne footer na dno */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vjezbe" element={<Vjezbe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kontakt" element={<Kontakt />} />
          </Routes>
        </main>

        {/* Footer na dnu svake stranice */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;