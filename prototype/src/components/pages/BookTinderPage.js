import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Heart } from "lucide-react";
import { books as dbBooks } from "../../database";
import { getStyles } from "../../styles/styles";


function normalizeDbBook(dbBook) {
  const year = dbBook.addedDate ? new Date(dbBook.addedDate).getFullYear() : "";
  const subjects = [];

  if (dbBook.genre) subjects.push(dbBook.genre);
  if (dbBook.language) subjects.push(dbBook.language);
  if (dbBook.location) subjects.push(dbBook.location);

  return {
    id: dbBook.id,
    title: dbBook.title,
    author: dbBook.author,
    year,
    genre: dbBook.genre,
    subjects,
    cover: dbBook.imageUrl,
    blurb: dbBook.description,
  };
}


function computeBookScore(book, subjectScore, authorScore) {
  let score = 0;

  if (book.subjects && book.subjects.length) {
    for (const s of book.subjects) {
      if (!s) continue;
      score += subjectScore[s] || 0;
    }
  }

  if (book.author) {
    score += (authorScore[book.author] || 0) * 2;
  }

  return score;
}

export default function BookTinderPage({
  textSize = "normal",
  isLoggedIn,
  userBookLists,
  setUserBookLists,
}) {
  const styles = getStyles(textSize);
  const bt = styles.bookTinder;

  
  const allBooks = useMemo(
    () => dbBooks.map(normalizeDbBook),
    []
  );

  
  const bookMap = useMemo(
    () => new Map(allBooks.map((b) => [b.id, b])),
    [allBooks]
  );

  
  const [subjectScore, setSubjectScore] = useState({});
  const [authorScore, setAuthorScore] = useState({});

  
  const [likedIds, setLikedIds] = useState([]);
  const [passedIds, setPassedIds] = useState([]);

  
  const [history, setHistory] = useState([]);

  
  const candidateBooks = useMemo(() => {
    const likedSet = new Set(likedIds);
    const passedSet = new Set(passedIds);

    const remaining = allBooks.filter(
      (b) => !likedSet.has(b.id) && !passedSet.has(b.id)
    );

    
    return [...remaining].sort((a, b) => {
      const scoreA = computeBookScore(a, subjectScore, authorScore);
      const scoreB = computeBookScore(b, subjectScore, authorScore);
      if (scoreA === scoreB) {
        
        return a.id - b.id;
      }
      return scoreB - scoreA;
    });
  }, [allBooks, likedIds, passedIds, subjectScore, authorScore]);

  
  const current = candidateBooks.length > 0 ? candidateBooks[0] : null;

  const totalCount = allBooks.length;
  const seenCount = likedIds.length + passedIds.length;
  const currentIndexDisplay = Math.min(seenCount + (current ? 1 : 0), totalCount);

  
  const isOnWishlist = useCallback(
    (bookId) =>
      !!(
        userBookLists &&
        Array.isArray(userBookLists.wishlist) &&
        userBookLists.wishlist.some((item) => item.bookId === bookId)
      ),
    [userBookLists]
  );

  
  const handleAddToWishlist = useCallback(
    (book) => {
      if (!book) return;

      if (!userBookLists || !setUserBookLists) {
        console.error(
          "BookTinderPage: userBookLists / setUserBookLists not passed in."
        );
        alert("Wishlist isn't wired up to this page yet.");
        return;
      }

      if (isOnWishlist(book.id)) {
        alert("This item is already in your wishlist.");
        return;
      }

      setUserBookLists((prevLists) => ({
        ...prevLists,
        wishlist: [...prevLists.wishlist, { bookId: book.id }],
      }));

      alert(`"${book.title}" has been added to your wishlist.`);
    },
    [userBookLists, setUserBookLists, isOnWishlist]
  );

  
  const applyPreferenceDelta = useCallback((book, action) => {
    if (!book) return { deltaSubject: {}, deltaAuthor: {} };

    
    const tagDelta = action === "like" ? 2 : -1;
    const authorDelta = action === "like" ? 3 : -1;

    const deltaSubject = {};
    const deltaAuthor = {};

    if (book.subjects && book.subjects.length) {
      for (const s of book.subjects) {
        if (!s) continue;
        deltaSubject[s] = (deltaSubject[s] || 0) + tagDelta;
      }
    }

    if (book.author) {
      deltaAuthor[book.author] = (deltaAuthor[book.author] || 0) + authorDelta;
    }

    setSubjectScore((prev) => {
      const next = { ...prev };
      for (const [key, d] of Object.entries(deltaSubject)) {
        next[key] = (next[key] || 0) + d;
      }
      return next;
    });

    setAuthorScore((prev) => {
      const next = { ...prev };
      for (const [key, d] of Object.entries(deltaAuthor)) {
        next[key] = (next[key] || 0) + d;
      }
      return next;
    });

    return { deltaSubject, deltaAuthor };
  }, []);

  
  const revertPreferenceDelta = useCallback(({ deltaSubject, deltaAuthor }) => {
    if (!deltaSubject && !deltaAuthor) return;

    setSubjectScore((prev) => {
      const next = { ...prev };
      for (const [key, d] of Object.entries(deltaSubject || {})) {
        next[key] = (next[key] || 0) - d;
      }
      return next;
    });

    setAuthorScore((prev) => {
      const next = { ...prev };
      for (const [key, d] of Object.entries(deltaAuthor || {})) {
        next[key] = (next[key] || 0) - d;
      }
      return next;
    });
  }, []);

  const handleAction = useCallback(
    (action) => {
      if (!current) return;
      if (action !== "like" && action !== "pass") return;

      const { deltaSubject, deltaAuthor } = applyPreferenceDelta(
        current,
        action
      );

      if (action === "like") {
        setLikedIds((prev) => [...prev, current.id]);
      } else {
        setPassedIds((prev) => [...prev, current.id]);
      }

      setHistory((prev) => [
        ...prev,
        {
          bookId: current.id,
          action,
          deltaSubject,
          deltaAuthor,
        },
      ]);
    },
    [current, applyPreferenceDelta]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    const last = history[history.length - 1];
    const { bookId, action } = last;

    
    if (action === "like") {
      setLikedIds((prev) => prev.filter((id) => id !== bookId));
    } else if (action === "pass") {
      setPassedIds((prev) => prev.filter((id) => id !== bookId));
    }

    
    revertPreferenceDelta(last);

    
    setHistory((prev) => prev.slice(0, -1));
  }, [history, revertPreferenceDelta]);

  
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") handleAction("pass");
      if (e.key === "ArrowRight") handleAction("like");
      if (e.key === "Backspace") handleUndo();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleAction, handleUndo]);

  const currentIsWish = current ? isOnWishlist(current.id) : false;

  const likedBooks = useMemo(
    () => likedIds.map((id) => bookMap.get(id)).filter(Boolean),
    [likedIds, bookMap]
  );

  const passedBooks = useMemo(
    () => passedIds.map((id) => bookMap.get(id)).filter(Boolean),
    [passedIds, bookMap]
  );

  return (
    <div style={bt.page}>
      <div style={bt.header}>
        <div style={bt.currentCounter}>
          Page {currentIndexDisplay}/{totalCount}
        </div>
      </div>

      <div style={bt.stackArea}>
        {current ? (
          <>
            <div style={bt.cardContainer}>
              <BigBookCard
                book={current}
                isWish={currentIsWish}
                onWishlist={() => handleAddToWishlist(current)}
                bt={bt}
              />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button
                style={bt.actionButton}
                onClick={() => handleAction("pass")}
              >
                ← Pass
              </button>
              <button
                style={bt.actionButton}
                onClick={() => handleAction("like")}
              >
                Like →
              </button>
              <button
                style={bt.actionButton}
                onClick={handleUndo}
                disabled={history.length === 0}
              >
                ⟲ Undo
              </button>
            </div>
            <div style={{ fontSize: 14, opacity: 0.7, marginTop: 6 }}>
              Tip: use ← / → to pass/like, Backspace to undo.
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>You're all caught up!</h2>
            <p style={{ opacity: 0.7 }}>
              There are no more books in the BookTinder queue.
            </p>
          </div>
        )}
      </div>

      <div style={{ width: "100%", maxWidth: 920 }}>
        <h3>Liked ({likedBooks.length})</h3>
        <div style={bt.resultsGrid}>
          {likedBooks.map((b) => (
            <MiniBookCard
              key={b.id}
              book={b}
              isWish={isOnWishlist(b.id)}
              onWishlist={() => handleAddToWishlist(b)}
              bt={bt}
            />
          ))}
        </div>

        <h3>Passed ({passedBooks.length})</h3>
        <div style={bt.resultsGrid}>
          {passedBooks.map((b) => (
            <MiniBookCard
              key={b.id}
              book={b}
              isWish={isOnWishlist(b.id)}
              onWishlist={() => handleAddToWishlist(b)}
              bt={bt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BigBookCard({ book, isWish, onWishlist, bt }) {
  const heartDisabled = isWish;

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto auto", width: "100%" }}>
      <div
        style={{
          width: "100%",
          backgroundColor: "#f7f7f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 360,
          position: "relative",
        }}
      >
        {book.cover ? (
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 480,
              objectFit: "contain",
              display: "block",
              backgroundColor: "#fff",
            }}
            loading="lazy"
          />
        ) : (
          <div style={{ padding: 40, color: "#777" }}>No cover available</div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!heartDisabled && onWishlist) onWishlist();
          }}
          disabled={heartDisabled}
          title={isWish ? "Already in wishlist" : "Add to wishlist"}
          style={bt.heartButton(heartDisabled)}
        >
          <Heart
            size={22}
            fill={isWish ? "#e63946" : "none"}
            stroke="#e63946"
          />
        </button>
      </div>
      <div style={{ padding: 16 }}>
        <h2 style={{ margin: 0 }}>{book.title}</h2>
        <div style={{ opacity: 0.8, marginTop: 4 }}>
          {book.author} {book.year ? `• ${book.year}` : ""}
        </div>
        <p style={{ marginTop: 8 }}>{book.blurb}</p>
        {book.subjects?.length ? (
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {book.subjects.slice(0, 5).map((s) => (
              <span key={s} style={bt.detailTag}>
                {s}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MiniBookCard({ book, isWish, onWishlist, bt }) {
  const heartDisabled = isWish;

  return (
    <div style={bt.miniCard}>
      <div style={bt.coverWrapper}>
        {book.cover ? (
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
            loading="lazy"
          />
        ) : null}
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
            flexWrap: "wrap",
          }}
        >
          <strong>{book.title}</strong>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!heartDisabled && onWishlist) onWishlist();
            }}
            disabled={heartDisabled}
            title={isWish ? "Already in wishlist" : "Add to wishlist"}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              cursor: heartDisabled ? "default" : "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              color: "#e63946",
            }}
          >
            <Heart
              size={16}
              fill={isWish ? "#e63946" : "none"}
              stroke="#e63946"
            />
          </button>
        </div>
        <div style={{ fontSize: 13, opacity: 0.8 }}>
          {book.author} {book.year ? `• ${book.year}` : ""}{" "}
          {book.genre ? `• ${book.genre}` : ""}
        </div>
      </div>
    </div>
  );
}
