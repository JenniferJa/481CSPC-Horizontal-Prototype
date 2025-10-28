import React, { useState, useEffect } from "react";
import { Mic, ChevronLeft, ChevronRight } from "lucide-react";
import { styles } from "../../styles/styles";

function BrowseItemsPage({ setCurrentPage, setSelectedBook }) {
  

  // Dataset i made
  const books = [
    { id: 1, imageUrl: "https://covers.openlibrary.org/b/isbn/0451524934-L.jpg", title: "1984", author: "George Orwell", rating: 4, mediaType: "Book", availability: "Available", location: "TFDL", language: "English", addedDate: "1949-06-08" },
    { id: 2, imageUrl: "https://covers.openlibrary.org/b/isbn/0060850523-L.jpg", title: "Brave New World", author: "Aldous Huxley", rating: 1, mediaType: "Ebook", availability: "Checked Out", location: "Location 1", language: "English", addedDate: "1932-08-18" },
    { id: 3, imageUrl: "https://covers.openlibrary.org/b/isbn/9780451419439-L.jpg", title: "Les Misérables", author: "Victor Hugo", rating: 3, mediaType: "Audiobook", availability: "Available", location: "Location 2", language: "French", addedDate: "1862-04-03" },
    { id: 4, imageUrl: "https://covers.openlibrary.org/b/isbn/0743273567-L.jpg", title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 5, mediaType: "Book", availability: "Available", location: "TFDL", language: "English", addedDate: "1925-04-10" },
    { id: 5, imageUrl: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg", title: "To Kill a Mockingbird", author: "Harper Lee", rating: 4, mediaType: "Ebook", availability: "Checked Out", location: "Location 1", language: "English", addedDate: "1960-07-11" },
    { id: 6, imageUrl: "https://covers.openlibrary.org/b/isbn/9780156027328-L.jpg", title: "Life of Pi", author: "Yann Martel", rating: 3, mediaType: "Book", availability: "Available", location: "Location 2", language: "English", addedDate: "2001-09-11" },
    { id: 7, imageUrl: "https://covers.openlibrary.org/b/isbn/0316769487-L.jpg", title: "The Catcher in the Rye", author: "J.D. Salinger", rating: 2, mediaType: "Audiobook", availability: "Available", location: "TFDL", language: "English", addedDate: "1951-07-16" },
    { id: 8, imageUrl: "https://covers.openlibrary.org/b/isbn/9780399501487-L.jpg", title: "Lord of the Flies", author: "William Golding", rating: 3, mediaType: "Ebook", availability: "Available", location: "Location 2", language: "English", addedDate: "1954-09-17" },
    { id: 9, imageUrl: "https://covers.openlibrary.org/b/isbn/0451526341-L.jpg", title: "Animal Farm", author: "George Orwell", rating: 5, mediaType: "Book", availability: "Checked Out", location: "TFDL", language: "English", addedDate: "1945-08-17" },
    { id: 10, imageUrl: "https://covers.openlibrary.org/b/isbn/9780486284736-L.jpg", title: "Pride and Prejudice", author: "Jane Austen", rating: 5, mediaType: "Ebook", availability: "Available", location: "Location 1", language: "English", addedDate: "1813-01-28" },
    { id: 11, imageUrl: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg", title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", rating: 4, mediaType: "Book", availability: "Available", location: "TFDL", language: "French", addedDate: "1943-04-06" },
    { id: 12, imageUrl: "https://covers.openlibrary.org/b/isbn/9780747532743-L.jpg", title: "Harry Potter and the Philosopher’s Stone", author: "J.K. Rowling", rating: 5, mediaType: "Audiobook", availability: "Available", location: "Location 2", language: "English", addedDate: "1997-06-26" },
    { id: 13, imageUrl: "https://covers.openlibrary.org/b/isbn/9780486278070-L.jpg", title: "The Picture of Dorian Gray", author: "Oscar Wilde", rating: 5, mediaType: "Book", availability: "Checked Out", location: "TFDL", language: "English", addedDate: "1890-07-01" },
    { id: 14, imageUrl: "https://covers.openlibrary.org/b/isbn/9780679732761-L.jpg", title: "The Alchemist", author: "Paulo Coelho", rating: 3, mediaType: "Ebook", availability: "Available", location: "Location 1", language: "English", addedDate: "1988-04-01" },
    { id: 15, imageUrl: "https://covers.openlibrary.org/b/isbn/9782253006329-L.jpg", title: "Vingt Mille Lieues Sous La Mer", author: "Jules Verne", rating: 2, mediaType: "Audiobook", availability: "Checked Out", location: "Location 2", language: "French", addedDate: "1869-11-17" },
    { id: 16, imageUrl: "https://covers.openlibrary.org/b/isbn/9780385490818-L.jpg", title: "The Handmaid’s Shadow", author: "Margaret Dunn", rating: 5, mediaType: "Book", availability: "Available", location: "TFDL", language: "English", addedDate: "2001-05-15" },
    { id: 17, imageUrl: "https://covers.openlibrary.org/b/isbn/9780062316110-L.jpg", title: "Ready Player One", author: "Ernest Cline", rating: 4, mediaType: "Ebook", availability: "Available", location: "Location 1", language: "English", addedDate: "2011-08-16" },
    { id: 18, imageUrl: "https://covers.openlibrary.org/b/isbn/9780140447422-L.jpg", title: "Germinal", author: "Émile Zola", rating: 5, mediaType: "Book", availability: "Available", location: "Location 2", language: "French", addedDate: "1885-03-25" },
    { id: 19, imageUrl: "https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg", title: "The Hunger Games", author: "Suzanne Collins", rating: 4, mediaType: "Audiobook", availability: "Checked Out", location: "TFDL", language: "English", addedDate: "2008-09-14" },
    { id: 20, imageUrl: "https://covers.openlibrary.org/b/isbn/9780141187761-L.jpg", title: "A Farewell to Arms", author: "Ernest Hemingway", rating: 3, mediaType: "Book", availability: "Available", location: "Location 1", language: "English", addedDate: "1929-09-27" },
    { id: 21, imageUrl: "https://covers.openlibrary.org/b/isbn/9780307387899-L.jpg", title: "The Road", author: "Cormac McCarthy", rating: 4, mediaType: "Ebook", availability: "Available", location: "Location 2", language: "English", addedDate: "2006-09-26" },
    { id: 22, imageUrl: "https://covers.openlibrary.org/b/isbn/9780140449266-L.jpg", title: "The Count of Monte Cristo", author: "Alexandre Dumas", rating: 5, mediaType: "Book", availability: "Available", location: "TFDL", language: "English", addedDate: "1846-06-20" },
    { id: 23, imageUrl: "https://covers.openlibrary.org/b/isbn/9780140283334-L.jpg", title: "Lord of the Flies", author: "William Golding", rating: 2, mediaType: "Ebook", availability: "Checked Out", location: "Location 1", language: "English", addedDate: "1954-09-17" },
    { id: 24, imageUrl: "https://covers.openlibrary.org/b/isbn/9780486266893-L.jpg", title: "Candide", author: "Voltaire", rating: 5, mediaType: "Book", availability: "Available", location: "Location 2", language: "French", addedDate: "1759-01-01" },
    { id: 25, imageUrl: "https://covers.openlibrary.org/b/isbn/9780385504201-L.jpg", title: "The Da Vinci Code", author: "Dan Brown", rating: 4, mediaType: "Ebook", availability: "Available", location: "TFDL", language: "English", addedDate: "2003-03-18" },
    { id: 26, imageUrl: "https://covers.openlibrary.org/b/isbn/9780439139595-L.jpg", title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling", rating: 5, mediaType: "Book", availability: "Checked Out", location: "Location 1", language: "English", addedDate: "2000-07-08" },
    { id: 28, imageUrl: "https://covers.openlibrary.org/b/isbn/9782070360024-L.jpg", title: "L'étranger", author: "Albert Camus", rating: 4, mediaType: "Ebook", availability: "Available", location: "TFDL", language: "French", addedDate: "1942-04-16" },
    { id: 29, imageUrl: "https://covers.openlibrary.org/b/isbn/9780060883287-L.jpg", title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", rating: 5, mediaType: "Book", availability: "Checked Out", location: "Location 1", language: "English", addedDate: "1967-05-30" },
    { id: 30, imageUrl: "https://covers.openlibrary.org/b/isbn/9780143039433-L.jpg", title: "The Grapes of Wrath", author: "John Stejnbeck", rating: 3, mediaType: "Ebook", availability: "Available", location: "Location 2", language: "English", addedDate: "2007-05-03" },
    { id: 31, imageUrl: "https://covers.openlibrary.org/b/isbn/9781594480003-L.jpg", title: "The Kite Runner", author: "Khaled Hosseini", rating: 5, mediaType: "Book", availability: "Available", location: "TFDL", language: "English", addedDate: "2003-06-01" },
    { id: 32, imageUrl: "https://covers.openlibrary.org/b/isbn/9780141187761-L.jpg", title: "For Whom the Bell Tolls", author: "Ernest Hemingway", rating: 4, mediaType: "Ebook", availability: "Checked Out", location: "Location 1", language: "English", addedDate: "1940-10-21" },
    { id: 33, imageUrl: "https://covers.openlibrary.org/b/isbn/9780679735779-L.jpg", title: "American Psycho", author: "Bret Easton Ellis", rating: 2, mediaType: "Audiobook", availability: "Available", location: "Location 2", language: "English", addedDate: "1991-04-29" },
    { id: 34, imageUrl: "https://covers.openlibrary.org/b/isbn/9782070413119-L.jpg", title: "Madame Bovary", author: "Gustave Flaubert", rating: 5, mediaType: "Book", availability: "Available", location: "TFDL", language: "French", addedDate: "1856-04-15" },
    { id: 35, imageUrl: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg", title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", rating: 3, mediaType: "Ebook", availability: "Available", location: "Location 1", language: "English", addedDate: "2011-09-04" },
  ];

  // State / Variables decarlation
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter states 
  const [mediaType, setMediaType] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [language, setLanguage] = useState("all");
  const [location, setLocation] = useState("all");
  
  // Sort state
  const [sortBy, setSortBy] = useState("title");
  
  // Rating filters
  const [minRating, setMinRating] = useState(0);
  
  // Date range filter
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  
  // Book page states
  const [page, setPage] = useState(1);
  const booksPerPage = 15; // Number of books to display per page

  //Filteed books based off the filters
  const filteredBooks = books
    .filter((book) => {
      // Search filter 
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());

      // Availability filter it shows all if all of them are currently selected  
      const matchesAvailability =
        availability === "all" ||
        book.availability.toLowerCase() === availability.toLowerCase();

      // Language filter 
      const matchesLanguage =
        language === "all" ||
        book.language.toLowerCase() === language.toLowerCase();

      // Location filter 
      const matchesLocation =
        location === "all" ||
        book.location.toLowerCase() === location.toLowerCase();

      // Media type filter
      const matchesMediaType =
        mediaType === "all" ||
        book.mediaType.toLowerCase() === mediaType.toLowerCase();

      // Rating filter
      const matchesRating = book.rating >= minRating;

      // Date range filter 
      const bookYear = new Date(book.addedDate).getFullYear();
      const fromYear = yearFrom ? parseInt(yearFrom) : null;
      const toYear = yearTo ? parseInt(yearTo) : null;
      const matchesYear =
        (!fromYear || bookYear >= fromYear) && (!toYear || bookYear <= toYear);

      // Return true if all the filteres end up matching
      return (
        matchesSearch &&
        matchesMediaType &&
        matchesAvailability &&
        matchesLanguage &&
        matchesLocation &&
        matchesRating &&
        matchesYear
      );
    })
    
    // Sort the filtered books based on user's selection

    .sort((a, b) => {
      // Sort by title ascending 
      if (sortBy === "title") return a.title.localeCompare(b.title);
      // Sort by title descending 
      if (sortBy === "titleDes") return b.title.localeCompare(a.title);
      // Sort by author ascending 
      if (sortBy === "author") return a.author.localeCompare(b.author);
      // Sort by author descending 
      if (sortBy === "authorDes") return b.author.localeCompare(a.author);
      // Sort by rating descending
      if (sortBy === "rating") return b.rating - a.rating;
      // Sort by rating ascending 
      if (sortBy === "ratingAsc") return a.rating - b.rating;
      return 0;
    });

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setCurrentPage("SelectedItemsPage");
  };

  
  // Logic for the indexs of pages and amount of books on each page
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  
  const startIndex = (page - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

 // Sets logic for moving between apges
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Reset to page 1 when any of the filters change

  useEffect(() => {
    setPage(1);
  }, [searchTerm, mediaType, availability, language, location, sortBy, minRating, yearFrom, yearTo]);

  //UI start

  return (
    <div style={styles.pageContainer}>
      {/* Search bar code below */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {/* Dropdown filters for the tpye of book */}
        <select 
          style={{ padding: "10px", fontSize: "14px" }} 
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="book">Books</option>
          <option value="ebook">Ebooks</option>
          <option value="audiobook">Audiobooks</option>
        </select>

        {/* Search input field */}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        {/* quick sort dropdown like title author rating  */}
        <select
          style={{ padding: "10px", fontSize: "14px" }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Sort by: Title</option>
          <option value="author">Sort by: Author</option>
          <option value="rating">Sort by: Rating</option>
        </select>

        {/*voice serach button design, no functionality included */}
        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#297373",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Mic size={20} />
        </button>
      </div>




      <div style={{ display: "flex", gap: "20px" }}>
        {/* This is the code for the sidebar for the filters*/}

        <div
          style={{
            width: "320px",
            background: "#f9f9f9",
            padding: "15px",
            borderRadius: "8px",
            height: "fit-content",
            border: "1px solid #ddd",
          }}
        >
          <h4 style={{ marginBottom: "15px" }}>Filter</h4>

          {/* Sorting options */}
          <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ minWidth: "80px" }}>Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ flex: 1, padding: "6px" }}
            >
              <option value="title">Title (A–Z)</option>
              <option value="titleDes">Title (Z–A)</option>
              <option value="author">Author (A–Z)</option>
              <option value="authorDes">Author (Z–A)</option>
              <option value="rating">Rating (High–Low)</option>
              <option value="ratingAsc">Rating (Low–High)</option>
            </select>
          </div>

          {/* Availability  */}

          <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ minWidth: "80px" }}>Availability:</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              style={{ flex: 1, padding: "6px" }}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="checked out">Checked Out</option>
            </select>
          </div>

          {/* Year of published filtering */}
          <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ minWidth: "80px" }}>Date Added:</label>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
         
              {(() => {
                const currentYear = new Date().getFullYear();
                const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
                return (
                  <>
                    <select
                      value={yearFrom}
                      onChange={(e) => setYearFrom(e.target.value)}
                      style={{ flex: 1, padding: "6px" }}
                    >
                      <option value="">Any</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <span>to</span>
                    <select
                      value={yearTo}
                      onChange={(e) => setYearTo(e.target.value)}
                      style={{ flex: 1, padding: "6px" }}
                    >
                      <option value="">Any</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </>
                );
              })()}
            </div>
          </div>





          {/* Location */}
          <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ minWidth: "80px" }}>Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ flex: 1, padding: "6px" }}
            >
              <option value="all">All</option>
              <option value="tfdl">TFDL</option>
              <option value="location 1">Location 1</option>
              <option value="location 2">Location 2</option>
            </select>
          </div>

          {/* Language  only for french and english */}
          <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ minWidth: "80px" }}>Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ flex: 1, padding: "6px" }}
            >
              <option value="all">All</option>
              <option value="english">English</option>
              <option value="french">French</option>
            </select>
          </div>

          {/* Rating filters, between 1 and 5 */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ minWidth: "80px" }}>Ratings:</label>
            <div style={{ flex: 1, display: "flex", gap: "4px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setMinRating(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= minRating ? "#ffb400" : "#ccc",
                    fontSize: "20px",
                  }}
                >
                  ★
                </span>
              ))}
              {minRating > 0 && (
                <button
                  onClick={() => setMinRating(0)}
                  style={{
                    marginLeft: "10px",
                    background: "none",
                    border: "none",
                    color: "#297373",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>



        {/* Displaying the results of the books, 3 per row 15 max per page*/}
        <div style={{ flex: 1 }}>
          {/* Sets the grid for the books */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "20px",
            marginBottom: "15px"
          }}>
            {/*Mpas through the possible books and renders them */}
            {paginatedBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => handleViewBook(book)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "none")
                }
              >
                {/* Centers the image */}
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  style={{
                    width: "120px",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginBottom: "10px",
                  }}
                />
                
                {/* Displays each one */}
                <div style={{ textAlign: "center", marginBottom: "5px" }}>
                  <h3 style={{ margin: "0 0 3px 0", fontSize: "14px" }}>{book.title}</h3>
                  <p style={{ margin: 0, color: "#555", fontSize: "12px" }}>
                    {book.mediaType.toLowerCase()} {book.availability.toLowerCase() === "available" ? "✓" : "✗"}
                  </p>
                </div>

                {/* Author  */}
                <p style={{ margin: "5px 0", color: "#666", fontSize: "12px", textAlign: "center" }}>
                  {book.author}
                </p>

                {/* Rating */}
                <p style={{ margin: "0", fontSize: "14px" }}>
                  {"⭐".repeat(book.rating)}
                </p>
              </div>
            ))}
          </div>

          {/* Logic for if there are books on the next page or not */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: "20px",
            marginTop: "20px" 
          }}>
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                color: page === 1 ? "#ccc" : "#000",
                border: "none",
                cursor: page === 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronLeft size={24} />
            </button>




            <p style={{ color: "#555", margin: 0 }}>
              Results {startIndex + 1}–{Math.min(endIndex, filteredBooks.length)} of {filteredBooks.length}
            </p>

            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                color: page === totalPages ? "#ccc" : "#000",
                border: "none",
                cursor: page === totalPages ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseItemsPage;
