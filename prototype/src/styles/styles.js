export const getStyles = (textSize) => {
  const baseFontSize = textSize === "large" ? 18 : 16;
  const titleFontSize = textSize === "large" ? 28 : 24;
  const buttonFontSize = textSize === "large" ? 16 : 14;

  const primaryColor = "#86212fff"

  return {
    appContainer: {
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
    },

    // ============= NAV BAR =============
    navbar: {
      backgroundColor: primaryColor,
      padding: "0",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    navContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "1200px",
      margin: "0 auto",
      height: textSize === "large" ? "90px" : "70px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    navTitle: {
      flex: 1,
      display: "flex",
      alignItems: "center",
    },
    titleText: {
      color: "#ffd3d3e8",
      margin: 0,
      fontSize: "15px",
    },
    subTitleText: {
      color: "#ffffffff",
      margin: 0,
      fontSize: "15px"
    },
    logo: {
      height: "60px"
    },
    logoButton: {
        background: "none",
        border: "none",
        cursor: "pointer"
    },
    navLinks: {
      flex: 2,
      display: "flex",
      justifyContent: "center",
      gap: "30px",
    },
    navLink: {
      color: "#fff",
      backgroundColor: primaryColor,
      border: "none",
      fontSize: buttonFontSize,
      padding: textSize === "large" ? "12px 20px" : "8px 16px",
      borderRadius: "4px",
      transition: "background-color 0.3s",
      cursor: "pointer"
    },
    navLinkActive: {
      backgroundColor: "#ffffff42",
      fontWeight: "bold",
    },
    navRight: {
      flex: 1,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "15px",
      paddingLeft: "10px"
    },
    iconButton: {
      backgroundColor: primaryColor,
      border: "2px solid #fff",
      color: "#fff",
      padding: textSize === "large" ? "12px 16px" : "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    },
    profileButton: {
      backgroundColor: primaryColor,
      color: "#fff",
      border: "2px solid #fff",
      padding: textSize === "large" ? "12px 20px" : "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: buttonFontSize,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "background-color 0.3s",
    },
    pageContainer: {
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    contentBox: (size) => ({
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      fontSize: size === "large" ? "18px" : "16px",
    }),
    button: (size) => ({
      backgroundColor: "#000",
      color: "#fff",
      padding: size === "large" ? "14px 28px" : "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: size === "large" ? "16px" : "14px",
      fontWeight: "500",
    }),


    // ============= POPUPS =============
    popupBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    popupContent: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      minWidth: (size) => (size === "large" ? "500px" : "400px"),
      maxWidth: (size) => (size === "large" ? "700px" : "600px"),
      maxHeight: "80vh",
      overflow: "auto",
      animation: "fadeIn 0.3s ease-in",
    },
    popupHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: (size) => (size === "large" ? "25px" : "20px"),
      borderBottom: "1px solid #eee",
    },
    popupTitle: {
      margin: 0,
      fontSize: (size) => (size === "large" ? "24px" : "20px"),
      fontWeight: "bold",
      color: "#000",
    },
    popupCloseButton: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      color: "#666",
      padding: (size) => (size === "large" ? "8px" : "4px"),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "color 0.2s",
      fontSize: (size) => (size === "large" ? "24px" : "20px"),
    },
    popupBody: {
      padding: (size) => (size === "large" ? "25px" : "20px"),
      color: "#333",
      fontSize: (size) => (size === "large" ? "18px" : "16px"),
    },
  };
};

export const styles = getStyles("normal");
