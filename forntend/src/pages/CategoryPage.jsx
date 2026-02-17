import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const CategoryPage = ({ categoryTitle, addToCart }) => { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://mhft-production.up.railway.app/api/products');
        
        // HASSAN BHAI: Yeh flexible filter hai jo spelling aur case (S/s) handle karega
        const filtered = res.data.filter(p => 
          p.category && p.category.toLowerCase().trim() === categoryTitle.toLowerCase().trim()
        );
        
        setProducts(filtered);
      } catch (err) {
        console.error("Hassan, Product fetch error:", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categoryTitle]); // Jab category change hogi, yeh filter dobara chalega

  if (loading) return <div style={styles.loader}>Loading {categoryTitle}...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{categoryTitle}</h1>
        <p style={styles.count}>{products.length} Items Found</p>
      </div>

      <div style={styles.grid}>
        {products.length > 0 ? (
          products.map(p => (
            <ProductCard 
              key={p._id} 
              product={p} 
              addToCart={addToCart} 
              styles={styles} 
            />
          ))
        ) : (
          <div style={styles.empty}>
            <h3>No products in {categoryTitle} yet!</h3>
            <p>Admin panel se check karein ke product ki category <b>"{categoryTitle}"</b> hi hai?</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 5%', minHeight: '80vh' },
  header: { marginBottom: '40px', textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px' },
  title: { fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' },
  count: { fontSize: '12px', color: '#888', marginTop: '5px' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '30px' 
  },
  loader: { textAlign: 'center', padding: '100px', fontWeight: 'bold' },
  empty: { gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#666' },
  card: { textAlign: 'center' },
  img: { width: '100%', height: '350px', objectFit: 'cover' },
  sizeRow: { display: 'flex', justifyContent: 'center', gap: '5px', margin: '15px 0' },
  sizeBtn: { width: '35px', height: '35px', border: '1px solid #000', cursor: 'pointer' },
  addBtn: { background: '#000', color: '#fff', padding: '12px', width: '100%', border: 'none', cursor: 'pointer', fontWeight: 'bold' }
};

export default CategoryPage;