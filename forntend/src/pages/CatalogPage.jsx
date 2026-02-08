import React from 'react';

const BlogPage = () => {
  const blogImg = "https://www.mhftwear.com/cdn/shop/articles/edit_boy_2.webp?v=1769207179&width=1600";

  return (
    <div style={styles.blogContainer}>
      {/* Header Section */}
      <header style={styles.header}>
        <span style={styles.date}>FEBRUARY 8, 2026</span>
        <h1 style={styles.mainTitle}>MHFT WEAR: Redefining Streetwear Fashion in Pakistan</h1>
      </header>

      {/* Featured Image */}
      <div style={styles.imageSection}>
        <img src={blogImg} alt="Streetwear Style" style={styles.featuredImg} />
      </div>

      {/* New Content Section - Pics ke neeche wala part */}
      <article style={styles.contentSection}>
        <h2 style={styles.subHeading}>MHFT WEAR — Redefining Streetwear with Style and Story</h2>
        <p style={styles.text}>
          Every brand begins with an idea, but <strong>MHFT WEAR</strong> began with a vision — 
          a vision to blend comfort, confidence, and class into every outfit. Born from a passion 
          for streetwear culture, MHFT WEAR represents the voice of modern youth — bold, free, 
          and unapologetically stylish. Our mission is simple: to craft apparel that doesn’t 
          just follow trends but sets them.
        </p>

        <blockquote style={styles.quote}>
          "Your confidence is your best outfit. We just provide the gear."
        </blockquote>

        <h3 style={styles.sectionTitle}>The MHFT Identity</h3>
        <p style={styles.text}>
          At MHFT WEAR, each piece tells a story of individuality. From our signature hoodies 
          to our classic tees, every design is crafted with premium fabrics and precision detailing. 
          We believe fashion is more than just clothing — it’s a reflection of attitude. 
          Our deep tones, minimalist graphics, and clean silhouettes make MHFT not just a brand 
          but a lifestyle for those who stand out effortlessly.
        </p>

        <h3 style={styles.sectionTitle}>Your Everyday Styling Guide</h3>
        <p style={styles.text}>
          Style is all about expression, and MHFT makes it simple to look sharp with ease. 
          Pair our oversized hoodies with tapered jeans or joggers for a sleek urban vibe. 
          Add our caps or watches for a refined finish. Whether you’re hitting the streets, 
          heading to a casual meetup, or capturing content for your socials, MHFT pieces 
          elevate every moment with a premium touch.
        </p>

        <div style={styles.movementBox}>
          <h3 style={{...styles.sectionTitle, color: '#000'}}>Join the Movement</h3>
          <p style={{color: '#333'}}>
            MHFT WEAR isn’t just fashion — it’s movement, energy, and attitude. When you wear 
            MHFT, you wear more than a brand — you wear confidence. Step into the world of 
            refined streetwear, where every piece defines <strong>“Modern. Hard. Fearless. Timeless.”</strong>
          </p>
          <p style={{fontWeight: 'bold', marginTop: '10px', color: '#000'}}>
            #MHFTWEAR — Wear Your Confidence. Own Your Style.
          </p>
        </div>
      </article>

      {/* Footer / Newsletter */}
      
      
    </div>
  );
};

const styles = {
  blogContainer: {
    backgroundColor: '#000',
    color: '#fff',
    minHeight: '100vh',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    paddingBottom: '80px'
  },
  header: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  date: {
    fontSize: '14px',
    letterSpacing: '2px',
    color: '#888'
  },
  mainTitle: {
    fontSize: 'clamp(28px, 6vw, 48px)',
    fontWeight: '900',
    marginTop: '20px',
    textTransform: 'uppercase',
    maxWidth: '900px',
    marginInline: 'auto',
    lineHeight: '1.2'
  },
  imageSection: {
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px'
  },
  featuredImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    display: 'block',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
  },
  contentSection: {
    maxWidth: '750px',
    margin: '60px auto',
    padding: '0 25px',
    lineHeight: '1.8',
    fontSize: '18px'
  },
  subHeading: {
    fontSize: '32px',
    marginBottom: '30px',
    fontWeight: '700',
    lineHeight: '1.3'
  },
  sectionTitle: {
    fontSize: '24px',
    marginTop: '40px',
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  text: {
    color: '#bbb',
    marginBottom: '25px',
    fontWeight: '300'
  },
  quote: {
    fontStyle: 'italic',
    fontSize: '24px',
    textAlign: 'center',
    margin: '50px 0',
    color: '#fff',
    borderTop: '1px solid #333',
    borderBottom: '1px solid #333',
    padding: '30px 0'
  },
  movementBox: {
    backgroundColor: '#fff',
    padding: '30px',
    marginTop: '50px',
    borderRadius: '4px',
    textAlign: 'center'
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px'
  },
  button: {
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    padding: '15px 40px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    textTransform: 'uppercase',
    transition: '0.3s'
  }
};

export default BlogPage;