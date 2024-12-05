import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Viewer from './pages/Viewer';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/visor" element={<Viewer />} />
    </Routes>
  </BrowserRouter>
);

export default App;
