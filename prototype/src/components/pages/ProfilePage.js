import React, { useState } from 'react';
import { getStyles } from '../../styles/styles'; 
import { findBookById } from '../../database'; 
import HoldPlacementPopup from '../HoldPlacementButtonPopup'; 
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';

const BookSection = ({ title, books, textSize, fineAmount, setCurrentPage, setSelectedBook, setUserBookLists, activeBookIds }) => { 
  const styles = getStyles(textSize);
  const [isExpanded, setIsExpanded] = useState(false);
  const DISPLAY_LIMIT = 2;

    const sectionStyle = {
    width: '100%',
    marginBottom: '24px',
  };

  // title and fines to be next
  const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottom: '1px solid #ddd',
    paddingBottom: '8px',
    marginBottom: '12px',
  };

  // title style
  const titleStyle = {
    fontSize: '1.2rem', 
    margin: 0, 
  };

  // Style for the "Current fines: $" text
  const fineInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: 'rgba(204, 0, 31, 1)', 
    fontWeight: 'bold',
  };

  // Style for the clickable (i) button
  const infoButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#007bff', 
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: '5px',
    padding: '0 5px',
  };

  // click handler for the (i) button
  const handleFineInfoClick = () => {
    alert("Visit the library to pay for fines");
  };
  // styles for the <ul> (unordered list)
  const listStyle = {
    listStyle: 'none', 
    paddingLeft: '0',  
  };
  // styles for each <li> (list item)
  const listItemStyle = {
    marginBottom: '10px',
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    minHeight: '30px', 
  };

  // styles for the <span>
  const listTextStyle = {
    marginRight: '10px',
  };

  // styles for the "No books in this list"
  const emptyListStyle = {
    fontStyle: 'italic',
    color: '#666',
  };

  // Button Logic
  const showHoldButton = title === 'Returned' || title === 'Wishlist'; // true if either section

  // style for the small buttons in the list
  const listButtonStyle = {
    ...styles.button(textSize), 
    padding: '4px 8px',    
    fontSize: '0.8rem',
    lineHeight: '1.2',
    minWidth: '100px', 
  };

  // style for the "Cancel" button
  const cancelButtonStyle = {
    ...listButtonStyle,
    backgroundColor: '#d94f5dff', 
    border: 0,
    color: 'white',
  };
  
  const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#0056b3',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.9rem',
    fontWeight: '500',
    padding: '4px 0',
    marginTop: '8px',
  };

  // Accept setUserBookLists
  const renderBookItem = (book, setCurrentPage, setSelectedBook, setUserBookLists, activeBookIds) => {
    let dueDateText; 
    
    if (book.dueDate) {
      dueDateText = ` Due: ${book.dueDate}`;
    } else {
      dueDateText = '';
    }
    
    const handleBookClick = () => {
      setSelectedBook(book); 
      setCurrentPage('SelectedItemsPage'); 
    };

    const bookLinkStyle = {
        color: '#0056b3',
        textDecoration: 'none',
        fontWeight: '500',
        background: 'none', 
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        textAlign: 'left', 
    };

    const titleLink = (
        <button 
          onClick={handleBookClick}
          style={bookLinkStyle}
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
        >
            {book.title}
        </button>
    );

    // This function will be called when "Cancel" is clicked
    const handleCancelHold = () => {
      setUserBookLists(prevLists => ({
        ...prevLists, 
        onHold: prevLists.onHold.filter(item => item.bookId !== book.id)
      }));
    };
    
    // On Hold 
    if (title === 'On Hold') {
      if (book.status === 'ready_for_pickup') {
        return ( 
          <>
            <span style={listTextStyle}>
              {titleLink}
                <span style={{ color: "#c31725ff", fontWeight: "bold", marginLeft: "16px"}}>
                  Ready for pick up at {book.location}
                </span>
            </span>
            
            <button 
              style={cancelButtonStyle}
              onClick={handleCancelHold} 
            >
              Cancel
            </button>
            
          </>
        );
      } else if (book.status === 'in_queue') {
        return ( 
          <>
            <span style={listTextStyle}>
              {titleLink}
                <span style={{ color: "#f39c12", fontWeight: "bold", marginLeft: "16px"}}>
                  In Queue
                </span>
            </span>
            
            <button 
              style={cancelButtonStyle}
              onClick={handleCancelHold} 
            >
              Cancel
            </button>
            
          </>
        );
      }
    }
    

    // Checked Out 
    if (title === 'Checked Out') {
      // Check if the book's status is checked_out
      if (book.status === 'checked_out') {
        return (
          <>
          <span style={listTextStyle}>
            {titleLink}
          </span>
          <span style={{ color: '#666' }}>
            {dueDateText}
          </span>
          </>
        );
      }
    }

    // Check if this is Returned Books or Wishlist
    if (showHoldButton) {
      // This function runs when the popup confirms the hold
      const handlePlaceHold = (selectedLocation) => {
        setUserBookLists(prevLists => {
          // 1. Check if it's already on hold
          const isAlreadyOnHold = prevLists.onHold.some(item => item.bookId === book.id);
          if (isAlreadyOnHold) {
            alert(`${book.title} is already on hold.`);
            return prevLists;
          }
          
          // 2. Remove the book from 'Wishlist' or 'Returned'
          const newWishlist = prevLists.wishlist.filter(item => item.bookId !== book.id);
          const newReturned = prevLists.returned.filter(item => item.bookId !== book.id);

          // 3. Add the book to the 'onHold' list
          return {
            ...prevLists,
            wishlist: newWishlist,
            returned: newReturned,
            onHold: [
              ...prevLists.onHold,
              { bookId: book.id, status: 'ready_for_pickup', location: selectedLocation }
            ]
          };
        });
      };
      
      const handlePlaceQueueHold = () => {
        const isAlreadyOnHold = activeBookIds && activeBookIds.has(book.id);
        if (isAlreadyOnHold) {
          alert("You are already in the hold queue for this item.");
          return;
        }
        setUserBookLists(prevLists => ({
          ...prevLists,
          wishlist: prevLists.wishlist.filter(item => item.bookId !== book.id),
          returned: prevLists.returned.filter(item => item.bookId !== book.id),
          onHold: [
            ...prevLists.onHold,
            { bookId: book.id, status: 'in_queue' } 
          ]
        }));
        alert("You have been added to the hold queue.");
      };

      const isBookActive = activeBookIds && activeBookIds.has(book.id);
      const isGenerallyAvailable = book.availability.toLowerCase() === 'available';

      let placeOnHoldComponent;
      if (isBookActive) {
        placeOnHoldComponent = (
          <span style={{fontSize: '0.8rem', color: '#666', minWidth: '100px', textAlign: 'right', padding: '4px 8px'}}>
            On Loan
          </span>
        );
      } else if (isGenerallyAvailable) {
        placeOnHoldComponent = (
          <HoldPlacementPopup
            setCurrentPage={setCurrentPage}
            textSize={textSize}
            onPlaceHoldConfirm={handlePlaceHold}
            style={listButtonStyle}
          />
        );
      } else {
        placeOnHoldComponent = (
          <button
            style={listButtonStyle}
            onClick={handlePlaceQueueHold}
          >
            Place Hold
          </button>
        );
      }


      if (title === 'Wishlist') {
        // This function will be called when the Heart is clicked
        const handleRemoveFromWishlist = () => {
          setUserBookLists(prevLists => ({
            ...prevLists,
            wishlist: prevLists.wishlist.filter(item => item.bookId !== book.id)
          }));
        };

        return (
          <>
            <span style={{ ...listTextStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {titleLink}
              <button 
                onClick={handleRemoveFromWishlist} 
                title="Remove from Wishlist"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: 0, 
                  display: 'flex',
                  color: '#e63946' // Red color for the heart
                }}
              >
                <Heart size={18} fill="currentColor" />
              </button>
            </span>
            
            {placeOnHoldComponent}
          </>
        );
      }

      // This will now only apply to 'Returned' books
      return (
        <>
          <span style={listTextStyle}>{titleLink}</span>
          {placeOnHoldComponent}
        </>
      );
    }

    // Handle Overdue section
    return (
      <>
      <span style={listTextStyle}>
        {titleLink}
      </span>
      <span style={{ color: '#666' }}>
        {dueDateText}
      </span>
      </>
    );
  };
  
  const showToggleButton = books.length > DISPLAY_LIMIT;
  const booksToShow = isExpanded ? books : books.slice(0, DISPLAY_LIMIT);

  return (
    <div style={sectionStyle}>

      <div style={headerContainerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        {/* Conditionally if fine fineAmount > 0 */}
        {fineAmount > 0 && (
          <div style={fineInfoStyle}>
            <span>Current fines: ${fineAmount.toFixed(2)}</span>
            <button 
              style={infoButtonStyle} 
              onClick={handleFineInfoClick}
              title="Fine Information"
            >
              (i)
            </button>
          </div>
        )}
      </div>
      
      {books.length > 0 ? (
        <ul style={listStyle}>
          {booksToShow.map(book => (
            <li key={book.id} style={listItemStyle}>
          
              {renderBookItem(book, setCurrentPage, setSelectedBook, setUserBookLists, activeBookIds)}
            </li>
          ))}
        </ul>
      ) : (
        <p style={emptyListStyle}>No books in this list.</p>
      )}

      {showToggleButton && (
        <button
          style={toggleButtonStyle}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{isExpanded ? 'See less' : `See more (${books.length - DISPLAY_LIMIT})`}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      )}
    </div>
  );
};

// Accept `currentUser`, `userBookLists` and `setUserBookLists` as props
function ProfilePage({ textSize, setCurrentPage, setSelectedBook, currentUser, userBookLists, setUserBookLists }) {
  const styles = getStyles(textSize);

  //Read from the `userBookLists` prop.
  const overdueBooks = userBookLists.overdue.map(item => ({
    ...findBookById(item.bookId), 
    ...item                       
  }));
  
  const returnedBooks = userBookLists.returned.map(item => ({
    ...findBookById(item.bookId),
    ...item
  }));

  const checkedOutBooks = userBookLists.checkedOut.map(item => ({
    ...findBookById(item.bookId),
    ...item 
  }));

  const onHoldBooks = userBookLists.onHold.map(item => ({
    ...findBookById(item.bookId),
    ...item 
  }));

  const wishlistBooks = userBookLists.wishlist.map(item => ({
    ...findBookById(item.bookId),
    ...item
  }));

  // Create a Set of all active book IDs
  const activeBookIds = new Set([
    ...overdueBooks.map(b => b.id),
    ...checkedOutBooks.map(b => b.id),
    ...onHoldBooks.map(b => b.id)
  ]);


  const localStyles = {
    profileHeader: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    profileName: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      marginRight: '20px',
    },
    profileUCID: {
      fontSize: '1.1rem',
      color: '#555',
      fontFamily: 'monospace',
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
        <h2 style={{ color: '#666', fontWeight: '500' }}>User Profile</h2>
        <div style={localStyles.profileHeader}>
          <span style={localStyles.profileName}>{currentUser.name}</span>
          <span style={localStyles.profileName}>{currentUser.ucid}</span>
        </div>

      
        <BookSection 
          title="Overdue" 
          books={overdueBooks} 
          textSize={textSize} // Pass textSize
          fineAmount={currentUser.currentFines} 
          setCurrentPage={setCurrentPage}
          setSelectedBook={setSelectedBook}
          setUserBookLists={setUserBookLists}
        />
        
        
        <BookSection 
          title="Checked Out" 
          books={checkedOutBooks} 
          textSize={textSize} // Pass textSize
          setCurrentPage={setCurrentPage}
          setSelectedBook={setSelectedBook}
          setUserBookLists={setUserBookLists}
        />
        <BookSection 
          title="On Hold" 
          books={onHoldBooks} 
          textSize={textSize} // Pass textSize
          setCurrentPage={setCurrentPage}
          setSelectedBook={setSelectedBook}
          setUserBookLists={setUserBookLists}
        />
        
        <BookSection 
          title="Wishlist" 
          books={wishlistBooks} 
          textSize={textSize} // Pass textSize
          setCurrentPage={setCurrentPage}
          setSelectedBook={setSelectedBook}
          setUserBookLists={setUserBookLists}
          activeBookIds={activeBookIds} // Pass the active IDs
        />
        <BookSection 
          title="Returned" 
          books={returnedBooks} 
          textSize={textSize} // Pass textSize
          setCurrentPage={setCurrentPage}
          setSelectedBook={setSelectedBook}
          setUserBookLists={setUserBookLists}
          activeBookIds={activeBookIds} // Pass the active IDs
        />
      </div>
    </div>
  );
}

export default ProfilePage;