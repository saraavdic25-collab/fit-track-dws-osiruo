import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ime: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!formData.ime || !formData.email || !formData.password) {
      setError('Molimo popunite sva polja.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Lozinka mora imati najmanje 6 karaktera.');
      return;
    }

    setError('');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = users.find(
  (user) => user.email === 'admin@gmail.com'
);

if (!adminExists) {
  users.push({
    ime: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin',
  });
}

const userExists = users.find(
  (user) => user.email === formData.email
);

if (userExists) {
  setError('Korisnik sa ovim emailom već postoji.');
  return;
}

const newUser = {
  ...formData,
  role: 'guest',
};

users.push(newUser);

localStorage.setItem('users', JSON.stringify(users));

navigate('/login');
    console.log('Registracija uspješna!', formData);

    navigate('/login');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6">
      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">
            Kreiraj <span className="text-blue-500 italic">Račun</span>
          </h2>
          <p className="text-slate-400">
            Registruj se i započni svoje fitness putovanje.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
              Ime
            </label>
            <input
              type="text"
              name="ime"
              value={formData.ime}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              placeholder="Vaše ime"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
              Email adresa
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              placeholder="ime@primjer.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
              Lozinka
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Registruj se
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Već imaš račun?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Prijavi se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;