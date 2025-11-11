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
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "6px",
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

function HoldPlacementPopup({
  setCurrentPage,
  textSize = "normal",
  onPlaceHoldConfirm,
  style,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState("form");
  const [selectedLocation, setSelectedLocation] = useState("TFDL");

  const styles = getStyles(textSize);

  const locations = ["TFDL", "Location 2", "Location 3"];
  const locationInfo = {
    TFDL: {
      address: "Taylor Family Digital Library, 410 University Ct NW, Calgary",
      mapUrl:
        "https://www.google.com/maps/place/Taylor+Family+Digital+Library,+410+University+Ct+NW,+Calgary,+AB+T2N+1N4/@51.0774396,-114.1297798,17z/data=!3m1!4b1!4m6!3m5!1s0x53716f091a059567:0x7677e66c5926e4a2!8m2!3d51.0774396!4d-114.1297798!16s%2Fg%2F11b8vdr8w_?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D",
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

  const getPickupDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handlePlaceHold = () => {
    if (onPlaceHoldConfirm) {
      onPlaceHoldConfirm(selectedLocation);
    }
    setScreen("confirmation");
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setScreen("form");
    }, 300);
  };

  const getTitle = () => {
    return screen === "form" ? "Place Hold" : "Hold was Placed";
  };

  const defaultStyle = {
    ...styles.button(textSize),
    width: "auto",
    paddingLeft: "24px",
    paddingRight: "24px",
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <button
        onClick={() => setIsOpen(true)}
        style={style ? style : defaultStyle}
      >
        Place Hold
      </button>

      <Popup
        isOpen={isOpen}
        onClose={handleClose}
        title={getTitle()}
        textSize={textSize}
      >
        {screen === "form" ? (
          <>
            <div style={customStyles.formGroup}>
              <label style={customStyles.label} htmlFor="location">
                Location
              </label>
              <select
                id="location"
                style={customStyles.select}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <div style={{ marginTop: "10px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  {locationInfo[selectedLocation].address}
                </div>
                <button
                  onClick={() =>
                    window.open(locationInfo[selectedLocation].mapUrl, "_blank")
                  }
                  style={{
                    fontSize: "14px",
                    color: "#2563eb",
                    textDecoration: "underline",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  View on Map
                </button>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{ ...styles.button(textSize), width: "auto" }}
                onClick={handlePlaceHold}
              >
                Place Hold
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
              Pickup at <strong>{selectedLocation}</strong> on{" "}
              <strong>{getPickupDate()}</strong>
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
    </div>
  );
}

export default HoldPlacementPopup;
