import React from "react";
import { styles } from "../../styles/styles";

function HomePage({ textSize }) {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
        <h2>Welcome to UofC Library</h2>
        <p>
          Discover millions of books and resources available at your fingertips.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
