import React from "react";
import { getStyles } from "../../styles/styles";
import {
  Search,
  Heart,
  User,
  CheckCircle,
  ArrowRightCircle,
  XCircle,
} from "lucide-react";

function HelpPage({ setCurrentPage, textSize }) {
  const styles = getStyles(textSize);

  const iconSize = textSize === "large" ? 24 : 20;

  return (
    <div style={styles.pageContainer}>
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: textSize === "large" ? 32 : 28,
          marginBottom: "30px",
        }}
      >
        Help & Support
      </h1>

      {/* Search Page */}
      <div style={{ marginBottom: "25px" }}>
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            color: "#2563eb", // blue color like a link
            textDecoration: "underline",
          }}
          onClick={() => setCurrentPage("browse")}
        >
          <Search size={iconSize} />
          Search Page
        </h2>
        <p
          style={{
            fontSize: textSize === "large" ? 18 : 16,
            marginLeft: "34px",
          }}
        >
          Use the <strong>Search</strong> page to find items in the library.
        </p>
      </div>

      {/* Browse Recommendations */}
      <div style={{ marginBottom: "25px" }}>
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            color: "#2563eb", // blue color like a link
            textDecoration: "underline",
          }}
          onClick={() => setCurrentPage("tinder")}
        >
          <ArrowRightCircle size={iconSize} />
          Browse Recommendations
        </h2>
        <p
          style={{
            fontSize: textSize === "large" ? 18 : 16,
            marginLeft: "34px",
          }}
        >
          Explore items similar to the ones you like.
          <br />
          Like items by pressing the like button. Pass items you don’t want to
          see.
          <br />
          This helps the system understand your interests and recommend media
          you may enjoy.
        </p>
      </div>

      {/* Profile Page */}
      <div style={{ marginBottom: "25px" }}>
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            color: "#2563eb", // blue color like a link
            textDecoration: "underline",
          }}
          onClick={() => setCurrentPage("profile")}
        >
          <User size={iconSize} />
          Profile Page
        </h2>
        <p
          style={{
            fontSize: textSize === "large" ? 18 : 16,
            marginLeft: "34px",
          }}
        >
          Manage your account on the <strong>Profile</strong> page. You can see:
        </p>
        <ul
          style={{
            fontSize: textSize === "large" ? 18 : 16,
            marginLeft: "50px",
          }}
        >
          <li>Overdue items</li>
          <li>Fines</li>
          <li>Checked out items</li>
          <li>On hold items</li>
          <li>Wishlist</li>
          <li>Returned items</li>
        </ul>
      </div>

      {/* Wishlist */}
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Heart size={iconSize} />
          Wishlist
        </h2>
        <p
          style={{
            fontSize: textSize === "large" ? 18 : 16,
            marginLeft: "34px",
          }}
        >
          While browsing items, you can add them to your{" "}
          <strong>wishlist</strong> by clicking the heart icon
          <Heart
            size={iconSize}
            style={{ display: "inline", margin: "0 4px" }}
          />{" "}
          <br></br> Click it again to remove the item from your wishlist.
        </p>
      </div>

      {/* Place Hold */}
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <CheckCircle size={iconSize} />
          Place Hold
        </h2>
        <p
          style={{
            fontSize: textSize === "large" ? 18 : 16,
            marginLeft: "34px",
          }}
        >
          To place a hold on an available item:
        </p>
        <ul
          style={{
            fontSize: textSize === "large" ? 18 : 16,
            marginLeft: "50px",
          }}
        >
          <li>Search for the item</li>
          <li>Select the item you are interested in</li>
          <li>
            If availabe, press <strong>Place Hold</strong>
          </li>
          <li>Select the location where you want to pick it up</li>
        </ul>
      </div>

      <button
        style={{
          ...styles.button(textSize),
          marginTop: "30px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onClick={() => setCurrentPage("home")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default HelpPage;
