import React, { useState, useEffect } from 'react';
import { ALargeSmall, User } from 'lucide-react';
import { getStyles } from '../styles/styles';

function NavigationBar({ currentPage, setCurrentPage, textSize, setTextSize }) {
  const styles = getStyles(textSize);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 850);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Left: Title */}
        <div style={styles.navTitle}>
          <button 
            style={styles.logoButton}
            onClick={() => setCurrentPage('home')}>
            <img src="/uofc_onlylogo.png" alt="logo" style={styles.logo}/>
          </button>
          <div style={{margin: "10px"}}>
            <h1 style={styles.titleText}>University of Calgary</h1>
            {!isSmallScreen && (
            <h1 style={styles.subTitleText}>Libraries and Cultural Resources</h1>  )}
          </div> 
        </div>

        {/* Center: Links */}
        <div style={styles.navLinks}>
          <button
            style={{
              ...styles.navLink,
              ...(currentPage === 'browse' && styles.navLinkActive),
            }}
            onClick={() => setCurrentPage('browse')}
          >
            Search
          </button>
          <button
            style={{
              ...styles.navLink,
              ...(currentPage === 'tinder' && styles.navLinkActive),
            }}
            onClick={() => setCurrentPage('tinder')}
          >
            Browse Recommendations
          </button>
        </div>

        {/* Right: Text Size & Profile */}
        <div style={styles.navRight}>
          <button
            style={styles.iconButton}
            onClick={() => setTextSize(textSize === 'normal' ? 'large' : 'normal')}
            title="Enlarge Text"
          >
            <ALargeSmall size={20} />
          </button>
          <button
            style={styles.profileButton}
            onClick={() => setCurrentPage('profile')}
          >
            <User size={20} />
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;