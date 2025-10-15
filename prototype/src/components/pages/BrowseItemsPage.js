import React from "react";
import { styles } from "../../styles/styles";

function BrowseItemsPage({ textSize }) {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
        <h2>Browse Items</h2>
        <p>
          Search through our extensive catalog of books, journals, and more.
        </p>
      </div>
    </div>
  );
}

export default BrowseItemsPage;
