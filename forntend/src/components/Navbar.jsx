import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';


const Navbar = ({ products }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search logic
  const searchResults = products?.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 4);

  return (
    <>
      <nav className={`nav-wrapper ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          
          {/* Left: Mobile Hamburger (Desktop pe auto-hide hoga) */}
          <div className="hamburger" onClick={() => setIsOpen(true)}>☰</div>

          {/* Left: Desktop Links */}
          <div className="nav-links">
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/winter-drop" className="nav-link">WINTER DROP</Link>
            <Link to="/pack-of-2" className="nav-link">PACK OF 2</Link>
            {/* <Link to="/catalog" className="nav-link">CATALOG</Link> */}
            <Link to="/polo-wear" className="nav-link">POLO WEAR</Link>
            <Link to="/Signature-Hoodie" className="nav-link">SIGNATURE HOODIE</Link>
              <Link to="/catalog" className="nav-link">CATALOG</Link>
              
          </div>

          {/* Center: Logo */}
          <div className="logo-div">
            <Link to="/">
              <img src="images/logo.png" alt="MHFT LOGO" className="logo-img" />
            </Link>
          </div>

          {/* Right: Icons (Properly Spaced) */}
          <div className="nav-right-icons">
            <HiOutlineSearch className="nav-icon" onClick={() => setIsSearchOpen(true)} />
            <Link to="/admin" className="nav-icon">👤</Link>
            <Link to="/cart" className="nav-icon">🛒</Link>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                className="sidebar-backdrop" 
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div 
                className="mobile-sidebar"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
              >
                <div className="sidebar-close" onClick={() => setIsOpen(false)}><HiOutlineX /></div>
                <div className="sidebar-links">
                  <Link to="/" onClick={() => setIsOpen(false)}>HOME</Link>
                  <Link to="/winter-drop" onClick={() => setIsOpen(false)}>WINTER DROP</Link>
                  <Link to="/pack-of-2" onClick={() => setIsOpen(false)}>PACK OF 2</Link>
                  <Link to="/catalog" onClick={() => setIsOpen(false)}>CATALOG</Link>
                  <Link to="/polo-wear" onClick={() => setIsOpen(false)}>POLO WEAR</Link>
                  <Link to="/Signature-Hoodie" onClick={() => setIsOpen(false)}>SIGNATURE HOODIE</Link>
                   
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div className="search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="search-box-card" initial={{ y: -20 }} animate={{ y: 0 }}>
              <div className="search-header">
                <div className="search-input-group">
                  <HiOutlineSearch className="m-search-icon" />
                  <input 
                    type="text" 
                    placeholder="SEARCH" 
                    autoFocus 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="search-actions">
                  {searchTerm && <span className="clear-btn" onClick={() => setSearchTerm("")}>CLEAR</span>}
                  <HiOutlineX className="close-x" onClick={() => setIsSearchOpen(false)} />
                </div>
              </div>

              <div className="search-tags">
                <span className="search-tag" onClick={() => setSearchTerm("WASH")}>WASH</span>
                <span className="search-tag" onClick={() => setSearchTerm("ACID WASH")}>ACID WASH</span>
              </div>

              <div className="search-results">
                <p className="res-label">Products</p>
                <div className="res-grid">
                  {searchResults?.map(p => (
                    <Link key={p._id} to={`/product/${p._id}`} className="res-item" onClick={() => setIsSearchOpen(false)}>
                      <img src={p.image} alt="" />
                      <p className="res-title">{p.title}</p>
                      <p className="res-price">Rs. {p.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;