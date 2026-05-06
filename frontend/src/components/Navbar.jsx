import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center px-10">
      <h1 className="text-2xl font-bold text-blue-600 italic">FitTrack</h1>
      <div className="space-x-6 font-medium text-gray-700">
        <a href="#" className="hover:text-blue-500 transition">Početna</a>
        <a href="#" className="hover:text-blue-500 transition">Vježbe</a>
        <a href="#" className="hover:text-blue-500 transition">Kontakt</a>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Prijavi se
        </button>
      </div>
    </nav>
  );
};

export default Navbar;