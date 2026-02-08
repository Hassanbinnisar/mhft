import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineTrash, HiOutlineCheckCircle, HiOutlineCube, HiOutlineShoppingBag, HiPlus, HiTag } from 'react-icons/hi';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  
  // Form States
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('CATALOG');
  const [status, setStatus] = useState('New Arrival'); // Default Tag

  useEffect(() => {
    const pass = prompt("Hassan Bhai, Admin Password Likhein:");
    if (pass === "1") { 
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Wrong Password!");
      window.location.href = "/";
    }
  }, []);

  const fetchData = async () => {
    try {
      const ord = await axios.get('http://localhost:5000/api/orders');
      const prd = await axios.get('http://localhost:5000/api/products');
      setOrders(ord.data.reverse()); 
      setProducts(prd.data);
    } catch (err) { console.log("Data fetch error!"); }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Hassan bhai, image select karein!");

    const fd = new FormData();
    fd.append('title', title);
    fd.append('price', price);
    fd.append('description', description); 
    fd.append('category', category);
    fd.append('status', status); // Tag bhej rahe hain (Sale/Sold Out etc)

    Array.from(files).forEach(file => {
      fd.append('images', file);
    });

    try {
      await axios.post('http://localhost:5000/api/products', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Product added successfully with " + status + " tag! 🔥");
      setFiles([]); setTitle(''); setPrice(''); setDescription('');
      fetchData();
      setActiveTab('products');
    } catch (error) { 
      alert("Upload failed! Backend check karein."); 
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Hassan bhai, delete kar doon?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchData();
    }
  };

  const completeOrder = async (id) => {
    if (window.confirm("Order complete ho gaya? List se hata doon?")) {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      fetchData();
    }
  };

  if (!isAuthenticated) return <div style={s.loader}>Authenticating Hassan...</div>;

  return (
    <div style={s.container}>
      {/* HEADER SECTION */}
      <header style={s.header}>
        <div>
          <h2 style={{margin:0}}>MHFT <span style={{fontWeight:300}}>ADMIN</span></h2>
          <p style={{fontSize:'12px', color:'#666'}}>Dashboard / {activeTab.toUpperCase()}</p>
        </div>
        <div style={s.statsRow}>
          <div style={s.statBadge}><HiOutlineCube/> {products.length}</div>
          <div style={s.statBadge}><HiOutlineShoppingBag/> {orders.length}</div>
        </div>
      </header>

      {/* TABS SECTION (Sticky on Mobile) */}
      <div style={s.tabs}>
        <button style={activeTab === 'orders' ? s.activeTab : s.tab} onClick={() => setActiveTab('orders')}>ORDERS</button>
        <button style={activeTab === 'products' ? s.activeTab : s.tab} onClick={() => setActiveTab('products')}>ITEMS</button>
        <button style={activeTab === 'add' ? s.activeTab : s.tab} onClick={() => setActiveTab('add')}>+ ADD</button>
      </div>

      <div style={s.content}>
        {/* 1. ORDERS LIST (Mobile Friendly Cards) */}
        {activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? <p style={s.empty}>No new orders yet.</p> : 
              orders.map(o => (
                <div key={o._id} style={s.orderCard}>
                  <div style={s.orderHeader}>
                    <h4 style={{margin:0}}>{o.customerName}</h4>
                    <span style={s.priceTag}>Rs {o.totalAmount}</span>
                  </div>
                  <p style={s.orderDetail}>📞 {o.phone} <br/> 📍 {o.address}</p>
                  
                  <div style={s.orderItems}>
                    {o.items?.map((item, idx) => (
                      <div key={idx} style={s.miniItem}>
                        <img src={item.image} alt="" style={s.miniImg} />
                        <div>
                          <div style={{fontSize:'13px', fontWeight:'bold'}}>{item.title}</div>
                          <small>{item.size} | Qty: {item.qty || 1}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => completeOrder(o._id)} style={s.doneBtn}>
                    <HiOutlineCheckCircle/> Complete & Clear
                  </button>
                </div>
              ))
            }
          </div>
        )}

        {/* 2. INVENTORY LIST (With Tags) */}
        {activeTab === 'products' && (
          <div style={s.productGrid}>
            {products.map(p => (
              <div key={p._id} style={s.pCard}>
                <div style={{position:'relative'}}>
                  <img src={p.image} style={s.pImg} alt="" />
                  <span style={{...s.tagBadge, background: p.status === 'Sold Out' ? '#ff4d4d' : '#000'}}>
                    {p.status || 'New Arrival'}
                  </span>
                </div>
                <div style={s.pInfo}>
                  <div style={s.pTitle}>{p.title}</div>
                  <div style={s.pPrice}>Rs {p.price}</div>
                  <button onClick={() => deleteProduct(p._id)} style={s.pDel}><HiOutlineTrash/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. ADD PRODUCT FORM (With All Categories & Tags) */}
        {activeTab === 'add' && (
          <form onSubmit={handleUpload} style={s.form}>
            <h3 style={{marginTop:0}}>Add New Product</h3>
            <input style={s.input} placeholder="Product Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <input style={s.input} type="number" placeholder="Price (PKR)" value={price} onChange={e => setPrice(e.target.value)} required />
            <textarea style={{...s.input, height:80}} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            
            <div style={s.selectGroup}>
              <div style={{flex:1}}>
                <label style={s.label}>Category</label>
                <select style={s.input} value={category} onChange={e => setCategory(e.target.value)}>
              
                  <option value="Winter Drop">Winter Drop</option>
                  <option value="Pack of 2">Pack of 2</option>
                  <option value="Polo Wear">Polo Wear</option>
                  <option value="Signature Hoodie">Signature Hoodie</option>
                </select>
              </div>
              <div style={{flex:1}}>
                <label style={s.label}>Status Tag</label>
                <select style={s.input} value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="New arrival">✨ New Arrival</option>
                  <option value="Sale">🔥 Sale</option>
                  <option value="Sold Out">🚫 Sold Out</option>
                  <option value="Limited">👑 Limited</option>
                </select>
              </div>
            </div>

            <div style={s.uploadBox}>
               <input type="file" multiple onChange={e => setFiles(e.target.files)} />
               <small style={{display:'block', marginTop:5}}>{files.length} images selected</small>
            </div>

            <button type="submit" style={s.submitBtn}>PUBLISH TO STORE</button>
          </form>
        )}
      </div>
    </div>
  );
};

// --- STYLES (MOBILE FRIENDLY & MODERN) ---
const s = {
  container: { padding: '20px 15px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', background: '#fcfcfc', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  statsRow: { display: 'flex', gap: '8px' },
  statBadge: { background: '#fff', padding: '6px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 5 },
  tabs: { display: 'flex', background: '#fff', borderRadius: '12px', padding: '5px', marginBottom: '25px', border: '1px solid #eee', position: 'sticky', top: '10px', zIndex: 100 },
  tab: { flex: 1, padding: '12px', border: 'none', background: 'none', borderRadius: '8px', fontSize: '13px', color: '#888', fontWeight: 'bold', cursor:'pointer' },
  activeTab: { flex: 1, padding: '12px', border: 'none', background: '#000', color: '#fff', borderRadius: '8px', fontWeight: 'bold', cursor:'pointer' },
  
  // Orders
  orderCard: { background: '#fff', borderRadius: '16px', padding: '15px', marginBottom: '15px', border: '1px solid #eee' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  priceTag: { fontWeight: 'bold', fontSize: '16px' },
  orderDetail: { fontSize: '12px', color: '#666', lineHeight: '1.5' },
  orderItems: { margin: '15px 0', borderTop: '1px solid #f5f5f5', paddingTop: '10px' },
  miniItem: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  miniImg: { width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px', background:'#eee' },
  doneBtn: { width: '100%', padding: '12px', background: '#000', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, cursor:'pointer' },

  // Inventory
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' },
  pCard: { background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' },
  pImg: { width: '100%', height: '160px', objectFit: 'cover' },
  tagBadge: { position: 'absolute', top: 8, left: 8, color: '#fff', fontSize: '10px', padding: '3px 7px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' },
  pInfo: { padding: '10px', position: 'relative' },
  pTitle: { fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  pPrice: { fontSize: '13px', color: '#666' },
  pDel: { position: 'absolute', bottom: '8px', right: '8px', color: '#ff4d4d', border: 'none', background: 'none', fontSize: '18px', cursor:'pointer' },

  // Form
  form: { background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #eee' },
  input: { width: '100%', padding: '12px', marginBottom: '12px', border: '1px solid #eee', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' },
  selectGroup: { display: 'flex', gap: '10px', marginBottom: '5px' },
  label: { fontSize: '11px', fontWeight: 'bold', marginBottom: '5px', display: 'block', color: '#555' },
  uploadBox: { padding: '15px', border: '2px dashed #eee', borderRadius: '10px', textAlign: 'center', marginBottom: '15px' },
  submitBtn: { width: '100%', padding: '15px', background: '#000', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor:'pointer' },
  
  empty: { textAlign: 'center', padding: '40px', color: '#888' },
  loader: { textAlign: 'center', padding: '100px', fontWeight: 'bold' }
};

export default Admin;