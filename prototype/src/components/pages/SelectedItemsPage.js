import React, { useState } from "react";
import { Star, MapPin, X, CheckCircle } from "lucide-react";
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

  // Rating Popup State
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [ratingScreen, setRatingScreen] = useState("rating");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Wishlist Popup State
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistScreen, setWishlistScreen] = useState("form");
  const [selectedList, setSelectedList] = useState("My Wishlist");

  const wishlists = ["My Wishlist", "To Read", "Favorites", "Gift Ideas"];

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
    setWishlistScreen("confirmation");
  };

  const handleCloseWishlist = () => {
    setIsWishlistOpen(false);
    setTimeout(() => {
      setWishlistScreen("form");
    }, 300);
  };

  const isAvailable = availability.toLowerCase() === "available";

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
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
                {location}
              </span>
            </div>

            <div style={customStyles.detailRow}>
              <span style={customStyles.label}>Availability:</span>
              <span style={customStyles.availabilityBadge(isAvailable)}>
                {availability}
              </span>
            </div>

            {/* Action Buttons */}
            <div style={customStyles.buttonContainer}>
              <HoldPlacementPopup
                setCurrentPage={setCurrentPage}
                textSize={textSize}
              />
              <div style={{ fontFamily: "system-ui, sans-serif" }}>
                <button
                  onClick={() => setIsWishlistOpen(true)}
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
          </div>
        </div>

        {/* Description Section */}
        <div style={customStyles.section}>
          <h2 style={customStyles.sectionTitle}>Description</h2>
          <p style={customStyles.description}>{description}</p>
        </div>
      </div>

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
        title={
          wishlistScreen === "form" ? "Add to Wishlist" : "Added to Wishlist"
        }
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
    </div>
  );
}

export default SelectedItemsPage;
