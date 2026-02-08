import React, { useState, useEffect } from 'react'; // 1. useEffect add kiya
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = ({ cart, total, clearCart }) => {
  const [user, setUser] = useState({ 
    email: '', 
    fname: '', 
    lname: '', 
    address: '', 
    city: '', 
    phone: '', 
    postal: '' 
  });
  
  const navigate = useNavigate();

  // --- LOGIC: EMPTY CART REDIRECT ---
  useEffect(() => {
    // Agar cart mein koi item nahi hai (length 0), to wapas home page "/" par bhej do
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  // Agar cart khali ho to niche wala UI render hi nahi hoga (Safety check)
  if (cart.length === 0) return null;

  const shipping = 250;
  const grandTotal = total + shipping;

  const handleOrder = async (e) => {
    e.preventDefault();
    
    if (!user.email || !user.address || !user.phone || !user.lname || !user.city) {
      return alert("Hassan, please fill all required details!");
    }

    const orderData = {
      customerName: `${user.fname} ${user.lname}`.trim(),
      email: user.email,
      address: user.address,
      city: user.city,
      postalCode: user.postal,
      phone: user.phone,
      items: cart,
      totalAmount: grandTotal
    };

    try {
      const res = await axios.post('http://localhost:5000/api/orders', orderData);
      
      if (res.status === 201) {
        alert('Order Placed Successfully! ✅');
        clearCart();
        navigate('/');
      }
    } catch (err) { 
      console.error("Order Error:", err.response?.data || err.message);
      alert("Order Failed! Check if your server is running."); 
    }
  };

  return (
    <div style={s.pageWrapper}>
      <div style={s.mainContainer}>
        
        {/* LEFT SIDE: FORMS */}
        <div style={s.leftCol}>
          <form onSubmit={handleOrder}>
            <section style={s.section}>
              <h3 style={s.sectionTitle}>Contact</h3>
              <input 
                type="text" 
                placeholder="Email or mobile phone number" 
                style={s.fullInput} 
                value={user.email}
                onChange={e => setUser({...user, email: e.target.value})} 
                required 
              />
            </section>

            <section style={s.section}>
              <h3 style={s.sectionTitle}>Delivery</h3>
              <select style={s.fullInput} defaultValue="Pakistan"><option>Pakistan</option></select>
              
              <div style={s.row}>
                <input 
                  type="text" 
                  placeholder="First name (optional)" 
                  style={s.halfInput} 
                  value={user.fname}
                  onChange={e => setUser({...user, fname: e.target.value})} 
                />
                <input 
                  type="text" 
                  placeholder="Last name" 
                  style={s.halfInput} 
                  value={user.lname}
                  onChange={e => setUser({...user, lname: e.target.value})} 
                  required 
                />
              </div>

              <input 
                type="text" 
                placeholder="Address" 
                style={s.fullInput} 
                value={user.address}
                onChange={e => setUser({...user, address: e.target.value})} 
                required 
              />
              
              <div style={s.row}>
                <input 
                  type="text" 
                  placeholder="City" 
                  style={s.halfInput} 
                  value={user.city}
                  onChange={e => setUser({...user, city: e.target.value})} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Postal code (optional)" 
                  style={s.halfInput} 
                  value={user.postal}
                  onChange={e => setUser({...user, postal: e.target.value})} 
                />
              </div>

              <input 
                type="text" 
                placeholder="Phone Number" 
                style={{...s.fullInput, marginTop: '10px'}} 
                value={user.phone}
                onChange={e => setUser({...user, phone: e.target.value})} 
                required 
              />
            </section>

            <section style={s.section}>
              <h3 style={s.sectionTitle}>Shipping method</h3>
              <div style={s.shippingBox}>
                <span>Standard</span>
                <span style={{fontWeight:'bold'}}>Rs {shipping}.00</span>
              </div>
            </section>

            <button type="submit" style={s.payBtn}>Complete Order</button>
          </form>
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <div style={s.rightCol}>
          <div style={s.summaryContent}>
            {cart.map((item, idx) => (
              <div key={idx} style={s.itemRow}>
                <div style={s.imgBox}>
                  <img src={item.image} alt="" style={s.itemImg} />
                  <span style={s.badge}>{item.qty}</span>
                </div>
                <div style={{flex:1, marginLeft:'15px'}}>
                  <p style={s.itemName}>{item.title}</p>
                  <p style={s.itemSize}>{item.size}</p>
                </div>
                <p style={s.itemPrice}>Rs {item.price * item.qty}</p>
              </div>
            ))}
            <div style={s.divider} />
            <div style={s.summaryLine}><span>Subtotal</span><span>Rs {total}.00</span></div>
            <div style={s.summaryLine}><span>Shipping</span><span>Rs {shipping}.00</span></div>
            <div style={{...s.summaryLine, marginTop:'20px'}}>
              <span style={{fontSize:'18px', fontWeight:'bold'}}>Total</span>
              <span style={{fontSize:'20px', fontWeight:'bold'}}>Rs {grandTotal}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles same as provided...
const s = {
  pageWrapper: { background: '#fff', minHeight: '100vh', padding: '40px 5%' },
  mainContainer: { display: 'flex', flexWrap: 'wrap-reverse', maxWidth: '1100px', margin: '0 auto', gap: '40px' },
  leftCol: { flex: '1.2', minWidth: '320px' },
  rightCol: { flex: '0.8', minWidth: '320px', background: '#fafafa', padding: '30px', borderRadius: '8px', border: '1px solid #eee', alignSelf: 'flex-start' },
  section: { marginBottom: '30px' },
  sectionTitle: { fontSize: '18px', marginBottom: '15px', fontWeight: '600' },
  fullInput: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #d9d9d9', fontSize: '14px' },
  row: { display: 'flex', gap: '10px' },
  halfInput: { width: '50%', padding: '12px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #d9d9d9', fontSize: '14px' },
  shippingBox: { padding: '15px', border: '1px solid #000', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', background: '#f0f7ff' },
  payBtn: { width: '100%', padding: '20px', background: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '20px' },
  itemRow: { display: 'flex', alignItems: 'center', marginBottom: '15px' },
  imgBox: { position: 'relative', width: '64px', height: '64px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' },
  itemImg: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' },
  badge: { position: 'absolute', top: '-10px', right: '-10px', background: '#666', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', fontSize: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  itemName: { margin: 0, fontSize: '14px', fontWeight: '500' },
  itemSize: { margin: 0, fontSize: '12px', color: '#777' },
  itemPrice: { fontWeight: '500', fontSize: '14px' },
  divider: { height: '1px', background: '#eee', margin: '20px 0' },
  summaryLine: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#555', fontSize: '14px' }
};

export default Checkout;