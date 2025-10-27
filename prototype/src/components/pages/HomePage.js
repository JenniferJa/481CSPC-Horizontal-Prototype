import React, { useState } from "react";
import { getStyles } from "../../styles/styles";
import Popup from "../Popup";

function HomePage({ textSize }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const styles = getStyles(textSize); // Get styles based on textSize

  return (
    <div>
      {/* background image and title */}
      <div style={styles.homeContainer}>
        <div style={styles.pageContainer}>
          <h1 style={styles.homeTitle}>
            Welcome to UofC Libraries and Cultural Resources
          </h1>
          <input type="text"
            placeholder="Search for books, articles, and more..."
            style={styles.homeSearchBar} />
          <button style={styles.homeSearchButton}>Search</button>
        </div>
      </div>
      {/* info / bottom section  */}
      <div style={styles.HomeColContainer}>
        <div style={styles.homeLeftCol}>
          <h1>
            Our Services
          </h1>
        </div>
        <div style={styles.homeRightCol}>
          <p>
            University of Calgary's Libraries and Cultural Resources (LCR) is here to improve your learning experience by focusing on user-centric resources to ensure you get the most out of your education or research.
          </p>
        </div>
      </div>

      <div style={styles.homeImageOverlapContainer}>
        <img src="images/tfdl2.png" style={styles.homeImageContainer} />
      </div>

      <div style={styles.homeInfoContainer}>
          <p style={styles.homeInfoText}>
            More than 7.8 million items are housed at the High Density Storage Facility and seven university libraries: the Taylor Family Digital Library, Doucette Library, Bennett Jones Law Library, Business Library, Gallagher Library, Health Sciences Library and the Military Museums Library & Archives.
          </p>
      </div>

      {/* footer */}

      <div style={styles.homeFooterContainer}>
          <p>
            University of Calgary
          </p>
          <p>
            2500 University Drive NW
          </p>
          <p>
            Calgary Alberta T2N 1N4
          </p>
          <p>
            CANADA
          </p>
          <p style={styles.homeFooterCopyright}>
            Copyright 2025
          </p>
      </div>

    </div>


  );
}

export default HomePage;