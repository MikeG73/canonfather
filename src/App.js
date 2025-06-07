import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MirrorGatewayAlpha from './components/MirrorGatewayAlpha';

import './App.css';
import './components/CanonPortal.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MirrorGatewayAlpha />} />
      </Routes>
    </Router>
  );
}
