import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Vjezbe from './pages/Vjezbe';
import VjezbaDetalji from './pages/VjezbaDetalji'; // 1. DODANO OVO
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Kontakt from './pages/Kontakt'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vjezbe" element={<Vjezbe />} />
            {/* 2. DODANA NOVA RUTA ISPOD */}
            <Route path="/vjezbe/:id" element={<VjezbaDetalji />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kontakt" element={<Kontakt />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
