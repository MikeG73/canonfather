import Header from './components/Header';
import React from 'react';
import MirrorGatewayAlpha from './components/MirrorGatewayAlpha';
import DigumTitle from './components/DigumTitle';
import KioskBackground from './components/KioskBackground';

function App() {
  return (
    <div className="App">
      <KioskBackground />
      <Header />
      <DigumTitle />
      <MirrorGatewayAlpha />
    </div>
  );
}

export default App;