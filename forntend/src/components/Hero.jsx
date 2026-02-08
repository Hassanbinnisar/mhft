import React from 'react';

const Hero = () => {
  return (
    <div style={heroStyles.banner}>
      <div style={heroStyles.overlay}>
        <p style={{ letterSpacing: '2px', fontSize: '14px' }}>GRAND OPENING!</p>
        <h1 style={{ fontSize: '3.5rem', margin: '10px 0', fontWeight: '800' }}>WINTER COLLECTION</h1>
        <button style={heroStyles.btn}>SHOP NOW</button>
      </div>
    </div>
  );
};

const heroStyles = {
  banner: { 
    height: '75vh', 
    backgroundColor: '#111', // Black background like video
    backgroundImage: 'url("")', // Hoodie related pic
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: { textAlign: 'center', color: '#fff' },
  btn: { padding: '12px 35px', background: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px', letterSpacing: '1px' }
};

export default Hero;