import React, { useState } from "react";
import { Star, MapPin, X, CheckCircle, ChevronLeft } from "lucide-react";
import { getStyles } from "../../styles/styles";
import HoldPlacementPopup from "../HoldPlacementButtonPopup";

function Popup({ isOpen, onClose, title, children, textSize = "normal" }) {
  if (!isOpen) return null;

  const styles = getStyles(textSize);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={styles.popupBackdrop} onClick={handleBackdropClick}>
      <div
        style={{
          ...styles.popupContent,
          minWidth:
            typeof styles.popupContent.minWidth === "function"
              ? styles.popupContent.minWidth(textSize)
              : styles.popupContent.minWidth,
          maxWidth:
            typeof styles.popupContent.maxWidth === "function"
              ? styles.popupContent.maxWidth(textSize)
              : styles.popupContent.maxWidth,
        }}
      >
        <div
          style={{
            ...styles.popupHeader,
            padding:
              typeof styles.popupHeader.padding === "function"
                ? styles.popupHeader.padding(textSize)
                : styles.popupHeader.padding,
          }}
        >
          <h2
            style={{
              ...styles.popupTitle,
              fontSize:
                typeof styles.popupTitle.fontSize === "function"
                  ? styles.popupTitle.fontSize(textSize)
                  : styles.popupTitle.fontSize,
            }}
          >
            {title}
          </h2>
          <button
            style={{
              ...styles.popupCloseButton,
              padding:
                typeof styles.popupCloseButton.padding === "function"
                  ? styles.popupCloseButton.padding(textSize)
                  : styles.popupCloseButton.padding,
            }}
            onClick={onClose}
            title="Close"
          >
            <X size={textSize === "large" ? 28 : 24} />
          </button>
        </div>
        <div
          style={{
            ...styles.popupBody,
            padding:
              typeof styles.popupBody.padding === "function"
                ? styles.popupBody.padding(textSize)
                : styles.popupBody.padding,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SelectedItemsPage({
  setCurrentPage,
  textSize = "normal",
  isLoggedIn,
  userBookLists,
  setUserBookLists,
  id,
  imageUrl = "https://m.media-amazon.com/images/I/41B1HRGxX5L._SY445_SX342_ML2_.jpg",
  title = "The Great Gatsby",
  author = "F. Scott Fitzgerald",
  rating = 4,
  mediaType = "Book",
  description = "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
  availability = "Available",
  location = "TFDL",
  genre = "Classic Fiction",
}) {
  const styles = getStyles(textSize);

  const locationInfo = {
    TFDL: {
      address: "Taylor Family Digital Library, 410 University Ct NW, Calgary",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Taylor+Family+Digital+Library+Calgary",
    },
    "Location 2": {
      address: "123 Example St, Calgary",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=123+Example+St+Calgary",
    },
    "Location 3": {
      address: "456 Another Rd, Calgary",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=456+Another+Rd+Calgary",
    },
  };

  // Rating Popup State
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [ratingScreen, setRatingScreen] = useState("rating");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Wishlist Popup State
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Error Popup State for unavailable books
  const [isUnavailableErrorOpen, setIsUnavailableErrorOpen] = useState(false);

  const customStyles = {
    detailsContainer: {
      display: "flex",
      gap: "40px",
      marginBottom: "30px",
      flexWrap: "wrap",
    },
    imageSection: {
      flex: "0 0 auto",
    },
    bookImage: {
      width: textSize === "large" ? "320px" : "280px",
      height: "auto",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    infoSection: {
      flex: "1 1 400px",
      minWidth: "300px",
    },
    bookTitle: {
      fontSize: textSize === "large" ? "36px" : "32px",
      fontWeight: "bold",
      color: "#000",
      marginBottom: "10px",
      marginTop: 0,
    },
    author: {
      fontSize: textSize === "large" ? "22px" : "20px",
      color: "#666",
      marginBottom: "20px",
    },
    ratingContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    stars: {
      display: "flex",
      gap: "4px",
    },
    ratingText: {
      fontSize: textSize === "large" ? "18px" : "16px",
      color: "#666",
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "15px",
      fontSize: textSize === "large" ? "18px" : "16px",
    },
    label: {
      fontWeight: "bold",
      color: "#000",
      minWidth: "120px",
    },
    value: {
      color: "#333",
    },
    availabilityBadge: (isAvailable) => ({
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "4px",
      fontSize: textSize === "large" ? "16px" : "14px",
      fontWeight: "bold",
      backgroundColor: isAvailable ? "#dcfce7" : "#fee2e2",
      color: isAvailable ? "#16a34a" : "#dc2626",
    }),
    section: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: textSize === "large" ? "24px" : "20px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#000",
    },
    description: {
      fontSize: textSize === "large" ? "18px" : "16px",
      lineHeight: "1.6",
      color: "#333",
    },
    buttonContainer: {
      display: "flex",
      gap: "15px",
      marginTop: "30px",
      flexWrap: "wrap",
    },
    // Popup styles
    starsContainer: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginBottom: "30px",
      marginTop: "20px",
    },
    star: {
      cursor: "pointer",
      transition: "transform 0.2s",
    },
    popupRatingText: {
      textAlign: "center",
      fontSize: textSize === "large" ? "20px" : "18px",
      color: "#666",
      marginBottom: "20px",
    },
    confirmationContainer: {
      textAlign: "center",
    },
    checkIcon: {
      color: "#22c55e",
      marginBottom: "16px",
    },
    confirmationText: {
      fontSize: textSize === "large" ? "18px" : "16px",
      color: "#4b5563",
      lineHeight: "1.6",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    formLabel: {
      display: "block",
      marginBottom: "8px",
      fontSize: textSize === "large" ? "18px" : "16px",
      fontWeight: "500",
      color: "#374151",
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      fontSize: textSize === "large" ? "18px" : "16px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      backgroundColor: "white",
      cursor: "pointer",
    },
    link: {
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: "500",
    },
    linkButton: {
      background: "none",
      border: "none",
      padding: 0,
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: "500",
      cursor: "pointer",
      fontSize: "inherit",
    },
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={textSize === "large" ? 24 : 20}
          fill={i <= rating ? "#fbbf24" : "none"}
          stroke={i <= rating ? "#fbbf24" : "#d1d5db"}
        />
      );
    }
    return stars;
  };

  const renderInteractiveStars = () => {
    const stars = [];
    const displayRating = hoverRating || selectedRating;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div
          key={i}
          style={customStyles.star}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setSelectedRating(i)}
        >
          <Star
            size={textSize === "large" ? 48 : 40}
            fill={i <= displayRating ? "#fbbf24" : "none"}
            stroke={i <= displayRating ? "#fbbf24" : "#d1d5db"}
            strokeWidth={2}
          />
        </div>
      );
    }
    return stars;
  };

  // Rating popup handlers
  const handleSubmitRating = () => {
    if (selectedRating > 0) {
      setRatingScreen("confirmation");
    }
  };

  const handleCloseRating = () => {
    setIsRatingOpen(false);
    setTimeout(() => {
      setRatingScreen("rating");
      setSelectedRating(0);
      setHoverRating(0);
    }, 300);
  };

  // Wishlist popup handlers
  const handleAddToWishlist = () => {
    const isAlreadyOnWishlist = userBookLists.wishlist.some(
      (item) => item.bookId === id
    );

    if (isAlreadyOnWishlist) {
      alert("This item is already in your wishlist.");
      return;
    }

    setUserBookLists((prevLists) => ({
      ...prevLists,
      wishlist: [...prevLists.wishlist, { bookId: id }],
    }));

    setIsWishlistOpen(true);
  };

  const handleCloseWishlist = () => {
    setIsWishlistOpen(false);
  };

  const handleBack = () => {
    setCurrentPage("browse");
  };

  const handlePlaceHoldConfirm = (selectedLocation) => {
    const isAlreadyOnHold = userBookLists.onHold.some(
      (item) => item.bookId === id
    );

    if (isAlreadyOnHold) {
      console.log("Item is already on hold.");
      return;
    }

    setUserBookLists((prevLists) => ({
      ...prevLists,
      onHold: [
        ...prevLists.onHold,
        { bookId: id, status: "ready_for_pickup", location: selectedLocation },
      ],
    }));
  };

  const handlePlaceQueueHold = () => {
    // If book is unavailable, show error popup instead
    if (isUnavailable) {
      setIsUnavailableErrorOpen(true);
      return;
    }

    const isAlreadyOnHold = userBookLists.onHold.some(
      (item) => item.bookId === id
    );
    if (isAlreadyOnHold) {
      alert("You are already in the hold queue for this item.");
      return;
    }
    setUserBookLists((prevLists) => ({
      ...prevLists,
      onHold: [...prevLists.onHold, { bookId: id, status: "in_queue" }],
    }));
    alert(
      "You have been added to the hold queue. You will be notified when it is ready for pickup."
    );
  };

  const handleCloseUnavailableError = () => {
    setIsUnavailableErrorOpen(false);
  };

  let userStatus;
  let isOverdue =
    isLoggedIn && userBookLists.overdue.some((item) => item.bookId === id);
  let isCheckedOut =
    isLoggedIn && userBookLists.checkedOut.some((item) => item.bookId === id);
  let isOnHold =
    isLoggedIn && userBookLists.onHold.some((item) => item.bookId === id);

  if (isOverdue) {
    userStatus = "Overdue";
  } else if (isCheckedOut) {
    userStatus = "Checked Out";
  } else if (isOnHold) {
    userStatus = "On Hold";
  } else {
    if (availability.toLowerCase() === "checked out") {
      userStatus = "Unavailable";
    } else {
      userStatus = "Available";
    }
  }

  const isAvailableForHold = userStatus.toLowerCase() === "available";
  const isUnavailable = userStatus.toLowerCase() === "unavailable";

  const [isCancelHoldOpen, setIsCancelHoldOpen] = useState(false);

  const handleCancelHold = () => {
    setUserBookLists((prevLists) => ({
      ...prevLists,
      onHold: prevLists.onHold.filter((item) => item.bookId !== id),
    }));

    setIsCancelHoldOpen(true);
  };
  const handleCloseCancelHold = () => {
    setIsCancelHoldOpen(false);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
        <button
          onClick={handleBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "system-ui, sans-serif",
            fontSize: textSize === "large" ? "16px" : "14px",
            fontWeight: "500",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            background: "#fff",
            color: "#374151",
            border: "1px solid #d1d5db",
            marginBottom: "20px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          <ChevronLeft size={textSize === "large" ? 20 : 18} />
          Back to Search
        </button>

        <div style={customStyles.detailsContainer}>
          {/* Image Section */}
          <div style={customStyles.imageSection}>
            <img
              src={imageUrl}
              alt={title}
              style={customStyles.bookImage}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x450?text=Book+Cover";
              }}
            />
          </div>

          {/* Info Section */}
          <div style={customStyles.infoSection}>
            <h1 style={customStyles.bookTitle}>{title}</h1>
            <p style={customStyles.author}>by {author}</p>

            {/* Rating */}
            <div style={customStyles.ratingContainer}>
              <div style={customStyles.stars}>{renderStars(rating)}</div>
              {isLoggedIn && (
                <div style={{ fontFamily: "system-ui, sans-serif" }}>
                  <button
                    onClick={() => setIsRatingOpen(true)}
                    style={{
                      ...styles.button(textSize),
                      width: "auto",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    Rate This
                  </button>
                </div>
              )}
            </div>

            {/* Details */}
            <div style={customStyles.detailRow}>
              <span style={customStyles.label}>Type:</span>
              <span style={customStyles.value}>{mediaType}</span>
            </div>

            <div style={customStyles.detailRow}>
              <span style={customStyles.label}>Genre:</span>
              <span style={customStyles.value}>{genre}</span>
            </div>

            <div style={customStyles.detailRow}>
              <span style={customStyles.label}>Location:</span>
              <span style={customStyles.value}>
                <MapPin
                  size={16}
                  style={{ display: "inline", marginRight: "5px" }}
                />

                <button
                  onClick={() =>
                    window.open(locationInfo[location]?.mapUrl, "_blank")
                  }
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    color: "#2563eb",
                    textDecoration: "underline",
                    font: "inherit",
                  }}
                >
                  {location}
                </button>
              </span>
            </div>

            <div style={customStyles.detailRow}>
              <span style={customStyles.label}>Availability:</span>
              <span style={customStyles.availabilityBadge(isAvailableForHold)}>
                {userStatus}
              </span>
            </div>

            {/* Action Buttons */}
            {isLoggedIn ? (
              <div style={customStyles.buttonContainer}>
                {isAvailableForHold && (
                  <HoldPlacementPopup
                    setCurrentPage={setCurrentPage}
                    textSize={textSize}
                    onPlaceHoldConfirm={handlePlaceHoldConfirm}
                  />
                )}

                {isUnavailable && (
                  <button
                    onClick={handlePlaceQueueHold}
                    style={{
                      ...styles.button(textSize),
                      width: "auto",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    Place Hold
                  </button>
                )}

                {/* {!isAvailableForHold && !isUnavailable && (
                  <p
                    style={{
                      ...customStyles.label,
                      color: "#dc2626",
                      fontSize: "15px",
                      fontWeight: "500",
                      alignSelf: "center",
                    }}
                  >
                    {userStatus === "On Hold"
                      ? "Already on hold"
                      : "Not available to place on hold"}
                  </p>
                )} */}
                {userStatus === "On Hold" && (
                  <button
                    onClick={handleCancelHold}
                    style={{
                      ...styles.button(textSize),
                      width: "auto",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      backgroundColor: "#dc2626",
                      borderColor: "#dc2626",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#b91c1c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#dc2626")
                    }
                  >
                    Cancel Hold
                  </button>
                )}

                {!isAvailableForHold &&
                  userStatus !== "On Hold" &&
                  userStatus !== "Unavailable" && (
                    <p
                      style={{
                        ...customStyles.label,
                        color: "#dc2626",
                        fontSize: "15px",
                        fontWeight: "500",
                        alignSelf: "center",
                      }}
                    >
                      Not available to place on hold
                    </p>
                  )}

                <div style={{ fontFamily: "system-ui, sans-serif" }}>
                  <button
                    onClick={handleAddToWishlist}
                    style={{
                      ...styles.button(textSize),
                      width: "auto",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{ ...customStyles.buttonContainer, marginTop: "20px" }}
              >
                <p
                  style={{
                    ...customStyles.label,
                    color: "#555",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Please{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage("login");
                    }}
                    style={customStyles.linkButton}
                  >
                    Login
                  </button>{" "}
                  to rate, hold, or add to wishlist.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div style={customStyles.section}>
          <h2 style={customStyles.sectionTitle}>Description</h2>
          <p style={customStyles.description}>{description}</p>
        </div>
      </div>
      {/* Cancel Hold Popup */}
      <Popup
        isOpen={isCancelHoldOpen}
        onClose={handleCloseCancelHold}
        title="Hold Cancelled"
        textSize={textSize}
      >
        <div style={customStyles.confirmationContainer}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CheckCircle
              size={textSize === "large" ? 72 : 64}
              style={customStyles.checkIcon}
            />
          </div>

          <div style={customStyles.confirmationText}>
            Your hold for <strong>{title}</strong> has been removed!
            <br />
            You can manage remaining holds on{" "}
            <a
              href="/profile"
              style={customStyles.link}
              onClick={(e) => {
                e.preventDefault();
                if (setCurrentPage) {
                  setCurrentPage("profile");
                  handleCloseCancelHold();
                }
              }}
            >
              Profile
            </a>
            .
          </div>

          <button
            style={{
              ...styles.button(textSize),
            }}
            onClick={handleCloseCancelHold}
          >
            OK
          </button>
        </div>
      </Popup>

      {/* Rating Popup */}
      <Popup
        isOpen={isRatingOpen}
        onClose={handleCloseRating}
        title={
          ratingScreen === "rating" ? "Rate This Book" : "Rating Submitted"
        }
        textSize={textSize}
      >
        {ratingScreen === "rating" ? (
          <>
            <div style={customStyles.popupRatingText}>
              How would you rate {title}?
            </div>
            <div style={customStyles.starsContainer}>
              {renderInteractiveStars()}
            </div>
            {selectedRating > 0 && (
              <div style={customStyles.popupRatingText}>
                You selected: {selectedRating} star
                {selectedRating !== 1 ? "s" : ""}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  ...styles.button(textSize),
                  opacity: selectedRating === 0 ? 0.5 : 1,
                  cursor: selectedRating === 0 ? "not-allowed" : "pointer",
                }}
                onClick={handleSubmitRating}
                disabled={selectedRating === 0}
              >
                Submit Rating
              </button>
            </div>
          </>
        ) : (
          <div style={customStyles.confirmationContainer}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CheckCircle
                size={textSize === "large" ? 72 : 64}
                style={customStyles.checkIcon}
              />
            </div>
            <div style={customStyles.confirmationText}>
              Thank you for rating <strong>{title}</strong>!
              <br />
              Your rating of{" "}
              <strong>
                {selectedRating} star{selectedRating !== 1 ? "s" : ""}
              </strong>{" "}
              has been saved.
            </div>
            <button
              style={{
                ...styles.button(textSize),
              }}
              onClick={handleCloseRating}
            >
              OK
            </button>
          </div>
        )}
      </Popup>

      {/* Wishlist Popup */}
      <Popup
        isOpen={isWishlistOpen}
        onClose={handleCloseWishlist}
        title="Added to Wishlist"
        textSize={textSize}
      >
        <div style={customStyles.confirmationContainer}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CheckCircle
              size={textSize === "large" ? 72 : 64}
              style={customStyles.checkIcon}
            />
          </div>
          <div style={customStyles.confirmationText}>
            <strong>{title}</strong> has been added to <strong>wishlist</strong>
            !
            <br />
            See more details on{" "}
            <a
              href="/profile"
              style={customStyles.link}
              onClick={(e) => {
                e.preventDefault();
                if (setCurrentPage) {
                  setCurrentPage("profile");
                  handleCloseWishlist();
                }
              }}
            >
              Profile
            </a>
            .
          </div>
          <button
            style={{
              ...styles.button(textSize),
            }}
            onClick={handleCloseWishlist}
          >
            OK
          </button>
        </div>
      </Popup>

      {/* Unavailable Book Error Popup */}
      <Popup
        isOpen={isUnavailableErrorOpen}
        onClose={handleCloseUnavailableError}
        title="Cannot Place Hold"
        textSize={textSize}
      >
        <div style={customStyles.confirmationContainer}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <X
              size={textSize === "large" ? 72 : 64}
              style={{ color: "#dc2626", marginBottom: "16px" }}
            />
          </div>
          <div style={customStyles.confirmationText}>
            This book is currently <strong>unavailable</strong> and cannot be
            placed on hold at this time.
            <br />
            <br />
            Please try again later or add it to your <strong>
              wishlist
            </strong>{" "}
            to be notified when it becomes available.
          </div>
          <button
            style={{
              ...styles.button(textSize),
            }}
            onClick={handleCloseUnavailableError}
          >
            OK
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default SelectedItemsPage;
