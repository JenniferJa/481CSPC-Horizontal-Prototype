import React from "react";
import { styles } from "../../styles/styles";

function BrowseItemsPage({ textSize, setCurrentPage, setSelectedBook }) {
  // Example book data
  const exampleBook = {
    imageUrl:
      "https://m.media-amazon.com/images/I/61NAx5pd6XL._AC_UF1000,1000_QL80_.jpg",
    title: "1984",
    author: "George Orwell",
    rating: 5,
    mediaType: "Book",
    description:
      "A dystopian social science fiction novel and cautionary tale, written by George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
    availability: "Available",
    location: "TFDL",
    genre: "Dystopian Fiction",
  };

  const handleViewBook = () => {
    setSelectedBook(exampleBook);
    setCurrentPage("SelectedItemsPage");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
        <h2>Browse Items</h2>
        <p>
          Search through our extensive catalog of books, journals, and more.
        </p>

        <button style={styles.button(textSize)} onClick={handleViewBook}>
          View Book Details
        </button>
      </div>
    </div>
  );
}

export default BrowseItemsPage;
