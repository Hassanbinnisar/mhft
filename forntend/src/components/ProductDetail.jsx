import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    axios.get(`https://mhft-production.up.railway.app/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedImage(res.data.image);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    return () => window.removeEventListener('resize', handleResize);
  }, [id]);

  const s = {
    wrapper: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '20px' : '60px',
      padding: isMobile ? '20px 15px' : '120px 10%',
      maxWidth: '1300px',
      margin: '0 auto',
      alignItems: 'flex-start',
    },
    imageGroup: {
      display: 'flex',
      flexDirection: isMobile ? 'column-reverse' : 'row',
      gap: '15px',
      width: isMobile ? '100%' : '60%',
      flexShrink: 0
    },
    thumbSection: {
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      gap: '10px',
      overflowX: isMobile ? 'auto' : 'hidden',
      flexShrink: 0,
      minWidth: isMobile ? '100%' : '80px'
    },
    thumbImg: {
      width: isMobile ? '70px' : '80px',
      height: isMobile ? '90px' : '100px',
      objectFit: 'cover',
      cursor: 'pointer',
      borderRadius: '4px',
      border: '2px solid transparent',
      transition: '0.3s'
    },
    mainImageSection: {
      width: '100%',
      flexGrow: 1
    },
    mainImg: {
      width: '100%',
      height: 'auto',
      maxHeight: isMobile ? '500px' : '750px',
      borderRadius: '4px',
      objectFit: 'cover',
      display: 'block',
      backgroundColor: '#fcfcfc'
    },
    infoSection: {
      width: '100%',
      flex: 1,
      textAlign: 'left',
      position: isMobile ? 'static' : 'sticky',
      top: '100px',
      // Automatic wrapping for the whole section
      wordBreak: 'break-word',
      overflowWrap: 'break-word'
    },
    title: { 
      fontSize: isMobile ? '24px' : '32px', 
      fontWeight: '700', 
      margin: '0 0 10px 0',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    price: { 
      fontSize: '20px', 
      fontWeight: '600', 
      marginBottom: '20px',
      borderBottom: '1px solid #eee',
      paddingBottom: '15px'
    },
    description: {
      fontSize: '14px',
      lineHeight: '1.8',
      color: '#444',
      marginTop: '10px',
      // --- Ye lines auto-break aur enter-break handle karengi ---
      whiteSpace: 'pre-line', 
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      textAlign: 'left',
      maxWidth: '100%'
    },
    addBtn: {
      background: '#000', 
      color: '#fff', 
      padding: '18px', 
      width: '100%',
      border: 'none', 
      fontWeight: 'bold', 
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '30px',
      letterSpacing: '2px',
      transition: '0.3s'
    }
  };

  if (loading) return <div style={{textAlign:'center', padding:'150px', letterSpacing:'2px'}}>LOADING...</div>;
  if (!product) return <div style={{textAlign:'center', padding:'150px'}}>Product not found!</div>;

  const allImages = [product.image, ...(product.images || [])];

  return (
    <div style={s.wrapper}>
      {/* LEFT: IMAGES */}
      <div style={s.imageGroup}>
        <div style={s.thumbSection}>
          {allImages.map((img, i) => (
            <img 
              key={i} 
              src={img} 
              style={{...s.thumbImg, borderColor: selectedImage === img ? '#000' : 'transparent'}} 
              onClick={() => setSelectedImage(img)} 
              alt="thumbnail" 
            />
          ))}
        </div>

        <div style={s.mainImageSection}>
          <img src={selectedImage} style={s.mainImg} alt={product.title} />
        </div>
      </div>

      {/* RIGHT: DETAILS */}
      <div style={s.infoSection}>
        <p style={{color:'#888', fontSize:'11px', letterSpacing:'2px', marginBottom:'5px'}}>MHFT WEAR</p>
        <h1 style={s.title}>{product.title}</h1>
        <div style={s.price}>Rs. {product.price}</div>
        
        <div style={{marginTop:'20px'}}>
          <p style={{fontWeight:'bold', fontSize:'12px', textTransform:'uppercase', letterSpacing:'1px'}}>Product Details</p>
          <div style={s.description}>
            {product.description || "Premium quality fabric and signature MHFT stitching."}
          </div>
        </div>

        <button 
          style={s.addBtn} 
          onClick={() => addToCart(product, 'M')}
          onMouseOver={(e) => e.target.style.opacity = '0.8'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;