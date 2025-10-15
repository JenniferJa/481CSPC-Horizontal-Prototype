import React from "react";
import { styles } from "../../styles/styles";

function BookTinderPage({ textSize }) {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
        <h2>Book Tinder</h2>
        <p>
          Discover your next favorite book through our interactive
          recommendation engine.
        </p>
      </div>
    </div>
  );
}

export default BookTinderPage;
