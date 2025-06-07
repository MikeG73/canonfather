// KioskBackground.jsx — Public Background Shrine Image
import React from 'react';

export default function KioskBackground() {
  const style = {
    backgroundImage: `url("${process.env.PUBLIC_URL}/sos.png")`,
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

  return <div style={style}></div>;
}
