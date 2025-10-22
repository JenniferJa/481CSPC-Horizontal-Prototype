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
            style={styles.homeSearchBar}/>
            <button style={styles.homeSearchButton}>Search</button>
        </div>
      </div>

      {/* info / bottom section  */}
      <div style={styles.pageContainer}>
        <h1>
          Our Services
        </h1>
        <p>
          University of Calgary's Libraries and Cultural Resources (LCR) is here to improve your learning experience by focusing on user-centric resources to ensure you get the most out of your education or research.
        </p>
        <p>
          More than 7.8 million items are housed at the High Density Storage Facility and seven university libraries: the Taylor Family Digital Library, Doucette Library, Bennett Jones Law Library, Business Library, Gallagher Library, Health Sciences Library and the Military Museums Library & Archives.
        </p>
        <div style={styles.homeScrollContainer}>
          <div style={styles.homeImageContainer}>
            <img src="images/tfdl2.png" style={styles.homeImage}/>
          </div>
                    <div style={styles.homeImageContainer}>
            <img src="images/tfdl2.png" style={styles.homeImage}/>
          </div>
                    <div style={styles.homeImageContainer}>
            <img src="images/tfdl2.png" style={styles.homeImage}/>
          </div>
                    <div style={styles.homeImageContainer}>
            <img src="images/tfdl2.png" style={styles.homeImage}/>
          </div>
        </div>
      </div>
    </div>


  );
}

export default HomePage;