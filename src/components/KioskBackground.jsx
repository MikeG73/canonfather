import React from 'react';
import sos from '../assets/sos.png'; // ✅ Works 100% in Create React App

const style = {
  backgroundImage: `url(${sos})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1
};

export default function KioskBackground() {
  return <div style={style}></div>;
}

