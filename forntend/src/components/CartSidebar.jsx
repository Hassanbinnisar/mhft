import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div style={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item._id} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <img src={item.image} width="50" alt="" />
          <div>
            <p>{item.title}</p>
            <p>{item.qty} x Rs. {item.price}</p>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        </div>
      ))}
      <button style={styles.checkoutBtn}>Proceed to Checkout</button>
    </div>
  );
};