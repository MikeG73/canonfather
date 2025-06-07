import React from 'react';

const style = {
  backgroundImage: "url('/sos.png')",
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
