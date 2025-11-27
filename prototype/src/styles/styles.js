export const getStyles = (textSize) => {
  const baseFontSize = textSize === "large" ? 18 : 16;
  const titleFontSize = textSize === "large" ? 28 : 24;
  const buttonFontSize = textSize === "large" ? 16 : 14;
  const headerFontSize = textSize === "large" ? 40 : 36;
  const textFontSize = textSize === "large" ? 16 : 14;

  const outerPadding = "20px";
  const widMax = "1200px";

  const primaryColor = "#86212fff";
  const secondaryColor = "#297373";

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
    iconButtonActive: {
      backgroundColor: "#fff",
      border: "2px solid #fff",
      color: primaryColor,
      padding: textSize === "large" ? "12px 16px" : "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    },
    iconSize: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
    iconSizeSvg: {
      width: textSize === "large" ? "24px" : "20px",
      height: textSize === "large" ? "24px" : "20px",
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


    // ============= GENERAL =============
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


    // ============= HOME PAGE =============
    homeContainer: {
      width: "100%",
      height: "70vh",
      backgroundImage: `linear-gradient(#000000E0 0%, #00000053 30%, #0000003e 100%), url('images/tfdl1.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#FFF"
    },
    homeTitle: {
      paddingTop: "25vh",
      paddingBottom: "20px",
      fontSize: headerFontSize
    },
    homeSearchBar: {
      width: "60%",
      height: baseFontSize * 2.5,
      border: "0px",
      fontSize: baseFontSize,
      paddingLeft: "20px"
    },
    homeSearchButton: {
      width: "120px",
      height: baseFontSize * 2.5,
      border: "0px",
      fontSize: baseFontSize,
      color: "#FFF",
      backgroundColor: secondaryColor
    },
    HomeColContainer: {
      display: "flex",
      justifyContent: "center",
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "60px 20px",

    },
    homeLeftCol: {
      flex: "1",
      textAlign: "right",
      padding: "5px 20px",
      color: primaryColor,
      fontSize: baseFontSize
    },
    homeRightCol: {
      flex: "2",
      textAlign: "left",
      padding: "10px 20px",
      borderLeft: `2px solid ${primaryColor}`,
      fontSize: textFontSize
    },
    homeImageOverlapContainer: {
      display: "flex",
      justifyContent: "center",
    },
    homeImageContainer: {
      width: "40%",
      height: "auto",
      marginBottom: "-180px",
      objectFit: "cover",
    },
    homeInfoContainer: {
      backgroundColor: "#cfa4a488",
      padding: "230px 60px 60px 60px",
      fontSize: textFontSize,
      textAlign: "center",
      justifyContent: "center",
      display: "flex"
    },
    homeInfoText: {
      maxWidth: "1000px",
    },
    homeFooterContainer: {
      textAlign: "center",
      backgroundColor: primaryColor,
      color: "#FFF",
      padding: "60px 0 20px 0",
      fontSize: textFontSize
    },
    homeFooterCopyright: {
      padding: "20px",
      color: "#ffffff8d"
    },

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
        // ============= BOOK TINDER =============
    bookTinder: {
      page: {
        minHeight: "calc(100vh - 64px)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      },
      header: {
        width: "100%",
        maxWidth: 920,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      },
      currentCounter: {
        position: "absolute",
        right: 0,
      },
      stackArea: {
        width: "100%",
        maxWidth: 520,
        display: "grid",
        placeItems: "center",
      },
      cardContainer: {
        width: "100%",
        maxWidth: 520,
        border: "1px solid #eaeaea",
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      },
      actionButton: {
        padding: "10px 16px",
        borderRadius: 12,
        border: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        cursor: "pointer",
        fontWeight: 600,
        margin: "0 0 10px 0",
      },
      resultsGrid: {
        width: "100%",
        maxWidth: 920,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
        padding: "10px 0",
      },
      miniCard: {
        border: "1px solid #eaeaea",
        borderRadius: 14,
        padding: 12,
        display: "grid",
        gridTemplateColumns: "64px 1fr",
        gap: 12,
        backgroundColor: "#fff",
      },
      coverWrapper: {
        width: 64,
        height: 96,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#f3f3f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      detailTag: {
        fontSize: 12,
        border: "1px solid #e0e0e0",
        borderRadius: 999,
        padding: "3px 8px",
        backgroundColor: "#fafafa",
      },
      heartButton: (disabled) => ({
        position: "absolute",
        top: 12,
        right: 12,
        width: 40,
        height: 40,
        borderRadius: "999px",
        border: "none",
        backgroundColor: "#ffffffdd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
      }),
    },
  };
};

export const styles = getStyles("normal");
