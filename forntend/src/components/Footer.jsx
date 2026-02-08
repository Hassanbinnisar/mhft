import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  // Aapne pucha tha ke links kaise daloon, ye rahe:
  const socialLinks = {
    facebook: "https://www.facebook.com/people/MHFT-Wear/61583123061772/?mibextid=wwXIfr&rdid=IXTVJXHXYkFN7bt5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AntZ12nTT%2F%3Fmibextid%3DwwXIfr", // Apna asli link yahan dalein
    instagram: "https://www.instagram.com/mhft.wear?igsh=d3BzOWpubGp2ZWRk&utm_source=qr", 
    tiktok: "https://www.tiktok.com/@mhftwear?_r=1&_t=ZS-93PLz30nMrE",
    whatsapp: "https://wa.me/923372491369" // 92 ke saath apna number dalein
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Section */}
        <div style={styles.section}>
          <h2 style={styles.heading}>Join our email list</h2>
          <p style={styles.subtext}>GET EXCLUSIVE DEALS AND EARLY ACCESS TO NEW PRODUCTS.</p>
        </div>

        {/* Right Section */}
        <div style={styles.section}>
          <h3 style={styles.detailHeading}>For details</h3>
          <div style={styles.inputWrapper}>
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              style={styles.input} 
            />
            <span style={styles.arrow}>→</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.legal}>
          <span>© 2026 MHFT WEAR</span>
          <span style={{ marginLeft: '20px', cursor: 'pointer' }}>TERMS AND POLICIES</span>
        </div>
        
        <div style={styles.socials}>
          {/* Har icon ko <a> tag mein wrap kiya hai */}
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer" style={styles.link}>
            <FaFacebookF style={styles.icon} />
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer" style={styles.link}>
            <FaInstagram style={styles.icon} />
          </a>
          <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" style={styles.link}>
            <FaTiktok style={styles.icon} />
          </a>
        </div>
      </div>

      {/* Floating WhatsApp Button (Real Link) */}
      <a 
        href={socialLinks.whatsapp} 
        target="_blank" 
        rel="noreferrer" 
        style={styles.whatsappFloat}
      >
        <FaWhatsapp size={32} />
      </a>
    </footer>
  );
};

export const styles = {
  footer: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '80px 5% 40px 5%',
    fontFamily: '"Inter", sans-serif',
    position: 'relative',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    marginBottom: '80px',
  },
  section: {
    flex: '1',
    minWidth: '280px',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtext: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#aaa',
    maxWidth: '400px',
  },
  detailHeading: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    fontWeight: '600',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '15px 25px',
    borderRadius: '30px',
    border: '1px solid #333',
    backgroundColor: '#111',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
  },
  arrow: {
    position: 'absolute',
    right: '20px',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #222',
    paddingTop: '30px',
    fontSize: '0.8rem',
    color: '#666',
  },
  socials: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  icon: {
    cursor: 'pointer',
    transition: '0.3s',
    fontSize: '1.2rem',
  },
  whatsappFloat: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#25D366',
    color: '#fff',
    width: '65px',
    height: '65px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
    zIndex: '1000',
    transition: '0.3s ease',
    textDecoration: 'none',
  }
};

export default Footer;