import React from 'react';

const AnnouncementBar = () => {
  return (
    <div style={styles.bar}>
      <marquee behavior="scroll" direction="left" scrollamount="5">
        FREE SHIPPING ON ORDERS OVER 5000/- PKR | USE CODE "MHFT20" TO GET DISCOUNT | NEW ARRIVALS OUT NOW!
      </marquee>
    </div>
  );
};

const styles = {
  bar: {
    background: '#000',
    color: '#fff',
    padding: '8px 0',
    fontSize: '12px',
    fontWeight: 'bold',
    zIndex: 9999, // <--- Yeh add karein
    position: 'relative' // <--- Yeh add karein
  }
};

export default AnnouncementBar;