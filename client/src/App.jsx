import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TextQuery from './page/TextQuery';
import ProtectedRoute from './components/ProtectedRoute';

import { logo } from './assets';
import { Home, CreatePost } from './page';

const App = () => (
  <BrowserRouter>
    <header className="w-full bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <h1
          className="text-4xl sm:text-5xl font-extrabold tracking-widest bg-gradient-to-r from-[#646cff] via-[#21d4fd] to-[#b721ff] text-transparent bg-clip-text drop-shadow-lg uppercase"
          style={{ letterSpacing: "0.2em" }}
        >
          GYAANI
        </h1>
      </div>
      <nav className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md w-full sm:w-auto text-center"
        >
          Home
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md w-full sm:w-auto text-center"
        >
          Create Image
        </Link>
        <Link
          to="/text-query"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md w-full sm:w-auto text-center"
        >
          Text Query
        </Link>
      </nav>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      
      <ProtectedRoute>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/text-query" element={<TextQuery />} />
        </Routes>
      </ProtectedRoute>

    </main>
    <footer className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-4 shadow-inner">
      <div className="flex justify-center items-center space-x-4">
        <span>&copy; 2025 - All rights reserved</span>
      </div>
      <div className="mt-2">
        <span className="text-sm hover:underline hover:text-indigo-200 transition duration-300 cursor-pointer">
          Privacy Policy
        </span>
        <span className="mx-2">|</span>
        <span className="text-sm hover:underline hover:text-indigo-200 transition duration-300 cursor-pointer">
          Terms of Service
        </span>
      </div>
    </footer>
  </BrowserRouter>
);

export default App;