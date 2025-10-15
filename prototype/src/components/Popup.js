import React from 'react';
import { X } from 'lucide-react';
import { styles } from '../styles/styles';

function Popup({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={styles.popupBackdrop} onClick={handleBackdropClick}>
      <div style={styles.popupContent}>
        {/* Header with title and close button */}
        <div style={styles.popupHeader}>
          <h2 style={styles.popupTitle}>{title}</h2>
          <button
            style={styles.popupCloseButton}
            onClick={onClose}
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body content */}
        <div style={styles.popupBody}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;