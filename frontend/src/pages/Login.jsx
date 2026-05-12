import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password
    );

    if (!foundUser) {
      setError('Pogrešan email ili lozinka.');
      return;
    }

    localStorage.setItem(
      'currentUser',
      JSON.stringify(foundUser)
    );

    setError('');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6">
      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">
            Dobrodošli <span className="text-blue-500 italic">Nazad</span>
          </h2>
          <p className="text-slate-400">
            Prijavite se na svoj račun.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
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
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Prijavi se
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Nemaš račun?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Registruj se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;