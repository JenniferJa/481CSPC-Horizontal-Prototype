import React, { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/pages/HomePage";
import BrowseItems from "./components/pages/BrowseItemsPage";
import BookTinder from "./components/pages/BookTinderPage";
import ProfilePage from "./components/pages/ProfilePage";
import { styles } from "./styles/styles";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [textSize, setTextSize] = useState("normal");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage textSize={textSize} />;
      case "browse":
        return <BrowseItems textSize={textSize} />;
      case "tinder":
        return <BookTinder textSize={textSize} />;
      case "profile":
        return <ProfilePage textSize={textSize} />;
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
