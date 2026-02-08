import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart, styles = {} }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const defaultStyles = {
    card: { 
      textAlign: 'center', 
      marginBottom: '20px', 
      position: 'relative', 
      padding: isMobile ? '5px' : '10px',
      backgroundColor: '#fff'
    },
    imgContainer: {
      position: 'relative', // Bohat zaruri hai tags ke liye
      overflow: 'hidden',
      borderRadius: '4px',
      marginBottom: '10px',
      zIndex: 1 // Base layer
    },
    img: { 
      width: '100%', 
      aspectRatio: '3/4', 
      objectFit: 'cover',
      display: 'block'
    },
    badge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      padding: '4px 10px',
      fontSize: '10px',
      fontWeight: 'bold',
      color: '#fff',
      zIndex: 100, // <--- Isay image ke bilkul upar hona chahiye
      borderRadius: '2px',
      textTransform: 'uppercase',
      pointerEvents: 'none',
      backgroundColor: '#000' // Default Black
    }
  };

  const s = { ...defaultStyles, ...styles };
  const isSoldOut = product.status === 'Sold Out';

  return (
    <div style={s.card}>
      <div style={s.imgContainer}>
        
        {/* --- YEH HAI ASLI FIX: TAG IMAGE SE PEHLE HONA CHAHIYE --- */}
        {product.status && product.status !== 'None' && product.status !== 'Normal' && (
          <div style={{
            ...s.badge,
            backgroundColor: product.status === 'Sale' ? '#e63946' : '#000',
            display: 'block', // Force display
            visibility: 'visible' // Force visibility
          }}>
            {product.status === 'New Arrival' ? 'NEW' : product.status}
          </div>
        )}

        {isSoldOut && (
          <div style={{ 
            position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.4)', 
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 
          }}>
            <span style={{ background: '#000', color: '#fff', padding: '5px 10px', fontSize: '11px', fontWeight:'bold' }}>SOLD OUT</span>
          </div>
        )}

        <Link to={`/product/${product._id || product.id}`}>
          <img src={product.image} style={s.img} alt={product.title} />
        </Link>
      </div>

      <div>
        <h4 style={{ fontSize: isMobile ? '13px' : '16px', margin: '5px 0' }}>{product.title}</h4>
        <p style={{ fontWeight: 'bold', fontSize: isMobile ? '14px' : '16px' }}>Rs. {product.price}</p>
      </div>

      <button 
        onClick={() => addToCart(product, selectedSize)}
        disabled={isSoldOut}
        style={{
          background: isSoldOut ? '#ccc' : '#000',
          color: '#fff',
          border: 'none',
          padding: '10px',
          marginTop: '10px',
          cursor: isSoldOut ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          width: '100%'
        }}
      >
        {isSoldOut ? 'OUT OF STOCK' : 'ADD TO BAG'}
      </button>
    </div>
  );
};

export default ProductCard;