import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Screen size track karne ke liye
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Products load nahi ho sakay", err);
      }
    };
    fetchProducts();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const s = {
    heroBanner: {
      width: '100%',
      marginTop: '60px', // Navbar ki space
      lineHeight: 0,
      overflow: 'hidden'
    },
    heroImg: {
      width: '100%',
      height: 'auto',
      display: 'block',
      objectFit: 'cover'
    },
    container: {
      padding: isMobile ? '40px 15px' : '60px 5%',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    sectionHeading: {
      textAlign: 'center',
      fontSize: isMobile ? '24px' : '32px',
      letterSpacing: '2px',
      marginBottom: '40px',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    productGrid: {
      display: 'grid',
      // Desktop pe 4, Mobile pe 2 columns
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', 
      gap: isMobile ? '15px' : '30px'
    },
    card: {
      textAlign: 'center',
      textDecoration: 'none',
      color: '#000',
      cursor: 'pointer'
    },
    imgWrapper: {
      overflow: 'hidden',
      backgroundColor: '#f5f5f5',
      marginBottom: '10px',
      borderRadius: '4px'
    },
    productImg: {
      width: '100%',
      height: isMobile ? '250px' : '400px',
      objectFit: 'cover',
      transition: 'transform 0.5s ease'
    }
  };

  return (
    <div>
      {/* Naya Graphic Banner Section */}
      <div style={s.heroBanner}>
        <img 
        src="/images/banner.png"
           // Public folder mein banner.jpg rakhein ya naya link dalain
          alt="Premium Dropshoulder T-Shirts" 
          style={s.heroImg} 
        />
      </div>

      <div style={s.container}>
        <h2 style={s.sectionHeading}>NEW ARRIVALS</h2>
        
        <div style={s.productGrid}>
          {products.map(p => (
            <motion.div 
              whileHover={{ y: -5 }} 
              key={p._id} 
              style={s.card}
            >
              <Link to={`/product/${p._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <div style={s.imgWrapper}>
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    style={s.productImg}
                    onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <h3 style={{fontSize: '14px', margin: '10px 0 5px', fontWeight: '600'}}>{p.title}</h3>
                <p style={{fontSize: '14px', color: '#555'}}>Rs. {p.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;