import React, { useState } from "react";
import { styles } from "../../styles/styles";
import Popup from "../Popup";

function HomePage({ textSize }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
        <h2>Welcome to UofC Library</h2>
        <p>
          Discover millions of books and resources available at your fingertips.
        </p>
        <button
          onClick={() => setIsPopupOpen(true)}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Open Popup
        </button>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Welcome to Our Library"
      >
        <h3>Get Started Today!</h3>
        <p>Browse our collection of thousands of books.</p>
        <p>Search for your favorite titles or explore new genres.</p>

        <button
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "15px",
          }}
          onClick={() => setIsPopupOpen(false)}
        >
          Got it!
        </button>
      </Popup>
    </div>
  );
}

export default HomePage;
