import React from 'react';
import { getStyles } from '../../styles/styles'; 

// Dummy Data
const mockUserData = {
  name: 'Matias Campuzano',
  ucid: '3014436',
  currentFines: 1000, 
};

const mockBookLists = {
  overdue: [
    { id: 1, title: 'Bird', dueDate: 'Oct 15, 2025' },
  ],
  completed: [
    { id: 3, title: 'Mockingbird' },
  ],
  inProgress: [
    { id: 6, title: 'Dune', status: 'ready_for_pickup', location: 'TFDL' },
    { id: 7, title: 'Hyperion', status: 'checked_out', dueDate: 'Nov 10, 2025' },
  ],
  wishlist: [
    { id: 8, title: 'Project' }, 
  ],
};


// Display a list of books under a title
const BookSection = ({ title, books, textSize, fineAmount }) => { 
  const styles = getStyles(textSize);

  const sectionStyle = {
    width: '100%',
    marginBottom: '24px',
  };

  // allow title and fines to be next
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
    color: '#c00', 
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

  // Style for the date/status text on the right
  const dateInfoStyle = {
    fontSize: '0.9rem',
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'right',
    flexShrink: 0, // Prevents shrinking if title is long
  };

  // styles for the "No books in this list"
  const emptyListStyle = {
    fontStyle: 'italic',
    color: '#666',
  };

  // Button Logic
  const showHoldButton = title === 'Completed Books' || title === 'Wishlist'; // true if either section

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
    backgroundColor: '#d9534f', 
    borderColor: '#d43f3a',
    color: 'white',
  };

  // helper function figures out what to display for a single book
  const renderBookItem = (book) => {
    // Declare variable for due date text
    let dueDateText; 
    
    if (book.dueDate) {
      dueDateText = book.dueDate; // Just the date string
    } else {
      dueDateText = '';
    }
    // In Progress
    if (title === 'In Progress') {
      if (book.status === 'ready_for_pickup') {
        return ( // Return title, location, and Cancel button
          <>
            <span style={listTextStyle}>
              {book.title} : Ready for pick up at {book.location}
            </span>
            <button 
              style={cancelButtonStyle}
              onClick={() => alert(`Cancelling hold for: ${book.title}`)}
            >
              Cancel
            </button>
          </>
        );
      }
      // Check if the book's status is checked_out
      if (book.status === 'checked_out') {
        return (
          <>
            <span style={listTextStyle}>
              {book.title}
            </span>
            <span style={dateInfoStyle}>
              Checkout {dueDateText && `(Due: ${dueDateText})`}
            </span>
          </>
        );
      }
    }
    // Check if this is Completed Books or Wishlist
    if (showHoldButton) {
      return (
        <>
          <span style={listTextStyle}>{book.title}</span> 
          <button 
            style={listButtonStyle}
            onClick={() => alert(`Placing hold for: ${book.title}`)} 
          >
            Place on hold
          </button>
        </>
      );
    }

    // Handle Overdue section
    return (
      <>
        <span style={listTextStyle}>
          {book.title}
        </span>
        {dueDateText && (
          <span style={{...dateInfoStyle, color: '#c00', fontWeight: 'bold'}}>
            Due: {dueDateText}
          </span>
        )}
      </>
    );
  };

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
          {books.map(book => (
            <li key={book.id} style={listItemStyle}>
              {renderBookItem(book)}
            </li>
          ))}
        </ul>
      ) : (
        <p style={emptyListStyle}>No books in this list.</p>
      )}
    </div>
  );
};

// ProfilePage Component
function ProfilePage({ textSize }) {
  const styles = getStyles(textSize);

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
        <h2>User Profile</h2>
        <div style={localStyles.profileHeader}>
          <span style={localStyles.profileName}>{mockUserData.name}</span>
          <span style={localStyles.profileUCID}>UCID: {mockUserData.ucid}</span>
        </div>

        <BookSection 
          title="Overdue Books" 
          books={mockBookLists.overdue} 
          textSize={textSize} 
          fineAmount={mockUserData.currentFines} 
        />
        <BookSection 
          title="In Progress" 
          books={mockBookLists.inProgress} 
          textSize={textSize} 
        />
        <BookSection 
          title="Wishlist" 
          books={mockBookLists.wishlist} 
          textSize={textSize} 
        />
        <BookSection 
          title="Completed Books" 
          books={mockBookLists.completed} 
          textSize={textSize} 
        />
      </div>
    </div>
  );
}

export default ProfilePage;