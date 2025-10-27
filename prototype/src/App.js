import React, { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/pages/HomePage";
import BrowseItemsPage from "./components/pages/BrowseItemsPage";
import BookTinderPage from "./components/pages/BookTinderPage";
import ProfilePage from "./components/pages/ProfilePage";
import { getStyles } from "./styles/styles";
import SelectedItemsPage from "./components/pages/SelectedItemsPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [textSize, setTextSize] = useState("normal");
  const [selectedBook, setSelectedBook] = useState(null);
  const styles = getStyles(textSize);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage textSize={textSize} />;
      case "browse":
        return (
          <BrowseItemsPage
            textSize={textSize}
            setCurrentPage={setCurrentPage}
            setSelectedBook={setSelectedBook}
          />
        );
      case "tinder":
        return <BookTinderPage textSize={textSize} />;
      case "profile":
        return <ProfilePage textSize={textSize} />;
      case "SelectedItemsPage":
        return (
          <SelectedItemsPage
            textSize={textSize}
            setCurrentPage={setCurrentPage}
            {...selectedBook} // Spread all book properties
          />
        );
      default:
        return <HomePage textSize={textSize} />;
    }
  };

  return (
    <div style={styles.appContainer}>
      <NavigationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        textSize={textSize}
        setTextSize={setTextSize}
      />
      {renderPage()}
    </div>
  );
}

export default App;
