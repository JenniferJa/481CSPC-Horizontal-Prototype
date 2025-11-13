import React, { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/pages/HomePage";
import BrowseItemsPage from "./components/pages/BrowseItemsPage";
import BookTinderPage from "./components/pages/BookTinderPage";
import ProfilePage from "./components/pages/ProfilePage";
import LoginPage from "./components/pages/LoginPage";
import { getStyles } from "./styles/styles";
import SelectedItemsPage from "./components/pages/SelectedItemsPage";

const initialBookLists = {
  overdue: [
    { bookId: 1, dueDate: 'Oct 15, 2025' },
  ],
  returned: [
    { bookId: 5 },
  ],
  checkedOut: [
    { bookId: 9, status: 'checked_out', dueDate: 'Nov 10, 2025' },
  ],
  onHold: [
    { bookId: 4, status: 'ready_for_pickup', location: 'TFDL' },
  ],
  wishlist: [
    { bookId: 31 },
  ],
};

const mockUserData = {
  name: 'Matias Campuzano',
  ucid: '3014436',
  currentFines: 1000,
};

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [textSize, setTextSize] = useState("normal");
  const [selectedBook, setSelectedBook] = useState(null);
  const styles = getStyles(textSize);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userBookLists, setUserBookLists] = useState(initialBookLists);

  const [globalSearchTerm, setGlobalSearchTerm] = useState("");

  const handleLogin = (email, password) => {
    if (email === 'matias@test.com' && password === '123') {
      setIsLoggedIn(true);
      setCurrentUser(mockUserData);
      setUserBookLists(initialBookLists);
      setCurrentPage('home');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserBookLists({
      overdue: [],
      returned: [],
      checkedOut: [],
      onHold: [],
      wishlist: [],
    });
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage textSize={textSize} 
        globalSearchTerm={globalSearchTerm} 
        setGlobalSearchTerm={setGlobalSearchTerm}
        setCurrentPage={setCurrentPage}/>;
      case "browse":
        return (
          <BrowseItemsPage
            textSize={textSize}
            setCurrentPage={setCurrentPage}
            setSelectedBook={setSelectedBook}
            globalSearchTerm={globalSearchTerm} 
            setGlobalSearchTerm={setGlobalSearchTerm}
          />
        );
      case "login":
        return <LoginPage onLogin={handleLogin} textSize={textSize} />;

    case "tinder":
      if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} textSize={textSize} />;
      }
      return (
        <BookTinderPage
          textSize={textSize}
          isLoggedIn={isLoggedIn}
          userBookLists={userBookLists}
          setUserBookLists={setUserBookLists}
        />
      );

      case "profile":
        if (!isLoggedIn) {
          return <LoginPage onLogin={handleLogin} textSize={textSize} />;
        }
        return (
          <ProfilePage
            textSize={textSize}
            currentUser={currentUser}
            userBookLists={userBookLists}
            setUserBookLists={setUserBookLists}
            setCurrentPage={setCurrentPage}
            setSelectedBook={setSelectedBook}
          />
        );
      case "SelectedItemsPage":
        return (
          <SelectedItemsPage
            textSize={textSize}
            isLoggedIn={isLoggedIn}
            setCurrentPage={setCurrentPage}
            {...selectedBook}
            userBookLists={userBookLists}
            setUserBookLists={setUserBookLists}
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
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}

export default App;