import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { getStyles } from "../styles/styles";

const customStyles = {
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    backgroundColor: "white",
    cursor: "pointer",
  },
  confirmationContainer: {
    textAlign: "center",
  },
  checkIcon: {
    color: "#22c55e",
    marginBottom: "16px",
  },
  confirmationText: {
    fontSize: "15px",
    color: "#4b5563",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
  },
};

// Reusable Popup wrapper (same as other popups)
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

// -----------------------------
// Renew Popup (controlled externally)
// -----------------------------
export default function RenewPopup({
  isOpen,
  onClose,
  textSize = "normal",
  onRenewConfirm,
  setCurrentPage,
  book,
  userBookLists,
  setUserBookLists,
}) {
  const [screen, setScreen] = useState("form");
  //   const [selectedDuration, setSelectedDuration] = useState("2 weeks");
  const [weeks, setWeeks] = useState(1); // default 1 week
  const styles = getStyles(textSize);
  const durations = ["1 week", "2 weeks", "3 weeks"];

  //   const handleRenew = () => {
  //     if (onRenewConfirm) onRenewConfirm(weeks);
  //     setScreen("confirmation");
  //   };

  const handleClose = () => {
    setScreen("form");
    onClose();
  };

  const handleRenew = () => {
    // Parse the current due date or set to today if missing
    const currentDue = new Date(book.dueDate || Date.now());
    currentDue.setDate(currentDue.getDate() + weeks * 7); // Add weeks in days

    // Format new date like "Nov 10, 2025"
    const newDueDate = currentDue.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Update the user's book lists immutably
    const updatedCheckedOut = userBookLists.checkedOut.map((b) =>
      b.bookId === book.bookId ? { ...b, dueDate: newDueDate } : b
    );

    setUserBookLists({
      ...userBookLists,
      checkedOut: updatedCheckedOut,
    });

    onClose();
  };

  const getTitle = () =>
    screen === "form" ? "Renew Item" : "Renewal Successful";

  const getNewDueDate = () => {
    const date = new Date();
    const weeks = parseInt(weeks);
    date.setDate(date.getDate() + weeks * 7);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleClose}
      title={getTitle()}
      textSize={textSize}
    >
      {screen === "form" ? (
        <>
          <div style={customStyles.formGroup}>
            <label style={customStyles.label} htmlFor="renew-duration">
              Choose how many weeks to extend:
            </label>
            {/* <select
              id="renew-duration"
              style={customStyles.select}
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select> */}

            <select
              id="renew-duration"
              style={customStyles.select}
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
            >
              <option value={1}>1 week</option>
              <option value={2}>2 weeks</option>
              <option value={3}>3 weeks</option>
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{ ...styles.button(textSize), width: "auto" }}
              onClick={handleRenew}
            >
              Confirm Renewal
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
            This item has been renewed for <strong>{weeks} week(s)</strong>.
            <br />
            Your new due date is <strong>{getNewDueDate()}</strong>.
            <br />
            See more details on{" "}
            <a
              href="/profile"
              style={customStyles.link}
              onClick={(e) => {
                e.preventDefault();
                if (setCurrentPage) {
                  setCurrentPage("profile");
                  handleClose();
                }
              }}
            >
              Profile
            </a>
            .
          </div>
          <button style={styles.button(textSize)} onClick={handleClose}>
            OK
          </button>
        </div>
      )}
    </Popup>
  );
}
