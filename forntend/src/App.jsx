import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineTrash, HiPlus, HiMinus } from 'react-icons/hi'; 

// Components & Pages
import Navbar from './components/Navbar'; 
import Admin from './pages/Admin'; 
import CategoryPage from './pages/CategoryPage'; 
import ProductDetail from './components/ProductDetail'; 
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';
import Home from './pages/Home'; 
import Checkout from './pages/Checkout'; 
import CatalogPage from './pages/CatalogPage';
const AppContent = ({ products, cart, setCart, open, setOpen, addToCart, updateQty, total }) => {
  const location = useLocation();
  
  // Is logic se hum check kar rahe hain ke current page Checkout to nahi
  const isCheckoutPage = location.pathname === '/checkout';

  return (
    <>
      {/* 1. Header (Sirf tab dikhayen jab checkout page NA HO) */}
      {!isCheckoutPage && (
        <header style={{ position: 'sticky', top: 0, zIndex: 1100, background: '#fff' }}>
          <AnnouncementBar />
          <Navbar cartCount={cart.length} toggleCart={() => setOpen(!open)} products={products} />
        </header>
      )}

      {/* 2. Side Cart Drawer (Hidden on Checkout) */}
      <AnimatePresence>
        {open && !isCheckoutPage && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.overlay} onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} style={styles.sidebar}>
              <div style={{display:'flex', justifyContent:'space-between', paddingBottom:'20px'}}>
                <h3 style={{margin:0}}>BAG ({cart.length})</h3>
                <HiOutlineX onClick={() => setOpen(false)} style={{cursor:'pointer'}} />
              </div>
              <div style={{flex: 1, overflowY: 'auto'}}>
                {cart.map((item, idx) => (
                  <div key={idx} style={styles.cartItem}>
                    <img src={item.image} width="60" alt="" />
                    <div style={{flex:1, marginLeft:'15px'}}>
                      <p style={{margin:0, fontWeight:'bold'}}>{item.title}</p>
                      <div style={{display:'flex', alignItems:'center', gap:'10px', margin:'10px 0'}}>
                        <HiMinus onClick={() => updateQty(idx, -1)} style={{cursor:'pointer'}} />
                        <span>{item.qty}</span>
                        <HiPlus onClick={() => updateQty(idx, 1)} style={{cursor:'pointer'}} />
                      </div>
                    </div>
                    <HiOutlineTrash onClick={() => setCart(cart.filter((_, i) => i !== idx))} style={{color:'red', cursor:'pointer'}} />
                  </div>
                ))}
              </div>
              <div style={styles.sidebarFooter}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                  <span>Total:</span>
                  <span style={{fontWeight:'bold'}}>Rs. {total}</span>
                </div>
                <Link to="/checkout" onClick={() => setOpen(false)}>
                  <button style={styles.addBtn}>CHECKOUT</button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Routes Section */}
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home products={products} addToCart={addToCart}/>}/>
            <Route path="/catalog" element={<CatalogPage categoryTitle="Tees" addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart}/>}/>
          
          {/* Checkout Page - No Navbar/Footer will be visible here */}
          <Route path="/checkout" element={<Checkout cart={cart} total={total} clearCart={() => setCart([])}/>}/>
          
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/winter-drop" element={<CategoryPage categoryTitle="Winter Drop" addToCart={addToCart} />} />
          <Route path="/pack-of-2" element={<CategoryPage categoryTitle="Pack of 2" addToCart={addToCart} />} />
          {/* <Route path="/catalog" element={<CategoryPage categoryTitle="Tees" addToCart={addToCart} />} /> */}
          <Route path="/signature-hoodie" element={<CategoryPage categoryTitle="Signature Hoodie" addToCart={addToCart} />} />
          <Route path="/polo-wear" element={<CategoryPage categoryTitle="polo wear" addToCart={addToCart} />} />
          {/* <Route path="/catalog" element={<CatalogPage categoryTitle="Tees" addToCart={addToCart} />} /> */}

        </Routes>
      </main>

      {/* 4. Footer (Hidden on Checkout) */}
      {!isCheckoutPage && <Footer />}
    </>
  );
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('https://mhft-production.up.railway.app/api/products').then(res => setProducts(res.data));
  }, []);

  const updateQty = (idx, delta) => {
    const newCart = [...cart];
    newCart[idx].qty = Math.max(1, (newCart[idx].qty || 1) + delta);
    setCart(newCart);
  };

  const addToCart = (p, size = 'M') => {
    const idx = cart.findIndex(item => item._id === p._id && item.size === size);
    if (idx > -1) { updateQty(idx, 1); } 
    else { setCart([...cart, { ...p, size, qty: 1 }]); }
    setOpen(true);
  };

  const total = cart.reduce((s, i) => s + (Number(i.price) * (i.qty || 1)), 0);

  return (
    <Router>
      <AppContent products={products} cart={cart} setCart={setCart} open={open} setOpen={setOpen} addToCart={addToCart} updateQty={updateQty} total={total} />
    </Router>
  );
}

const styles = {
  overlay: {position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1500},
  sidebar: {position: 'fixed', top: 0, right: 0, width: '350px', height: '100%', background: '#fff', padding: '25px', zIndex: 2000, display:'flex', flexDirection:'column'},
  cartItem: {display:'flex', alignItems:'center', marginBottom:'20px', borderBottom:'1px solid #eee', paddingBottom:'10px'},
  sidebarFooter: {borderTop:'2px solid #000', paddingTop:'20px', marginTop:'auto'},
  addBtn: {background: '#000', color: '#fff', padding: '15px', width: '100%', border: 'none', cursor: 'pointer', fontWeight:'bold'},
};