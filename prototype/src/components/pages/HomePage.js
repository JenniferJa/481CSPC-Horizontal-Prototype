import React, { useState } from "react";
import { getStyles } from "../../styles/styles";
import Popup from "../Popup";

function HomePage({ textSize }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const styles = getStyles(textSize); // Get styles based on textSize

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
        <h2>Welcome to UofC Library</h2>
        <p>
          Discover millions of books and resources available at your fingertips.
        </p>
        <button
          onClick={() => setIsPopupOpen(true)}
          style={styles.button(textSize)}
        >
          Open Popup
        </button>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Welcome to Our Library"
        textSize={textSize}
      >
        <h3>Get Started Today!</h3>
        <p>Browse our collection of thousands of books.</p>
        <p>Search for your favorite titles or explore new genres.</p>

        <button
          style={styles.button(textSize)}
          onClick={() => setIsPopupOpen(false)}
        >
          Got it!
        </button>
      </Popup>
    </div>
  );
}

export default HomePage;