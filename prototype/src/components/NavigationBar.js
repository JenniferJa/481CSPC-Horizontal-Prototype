import React from 'react';
import { ALargeSmall, User } from 'lucide-react';
import { getStyles } from '../styles/styles';

function NavigationBar({ currentPage, setCurrentPage, textSize, setTextSize }) {
  const styles = getStyles(textSize);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Left: Title */}
        <div style={styles.navTitle}>
          <h1 style={styles.titleText}>UofC Library System</h1>
        </div>

        {/* Center: Links */}
        <div style={styles.navLinks}>
          <button
            style={{
              ...styles.navLink,
              ...(currentPage === 'home' && styles.navLinkActive),
            }}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button
            style={{
              ...styles.navLink,
              ...(currentPage === 'browse' && styles.navLinkActive),
            }}
            onClick={() => setCurrentPage('browse')}
          >
            Browse Items
          </button>
          <button
            style={{
              ...styles.navLink,
              ...(currentPage === 'tinder' && styles.navLinkActive),
            }}
            onClick={() => setCurrentPage('tinder')}
          >
            Book Tinder
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