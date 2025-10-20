import React, { useMemo, useState, useCallback } from "react";
import BookCard from "../BookCard";

export default function BookTinderPage({ textSize = "normal" }) {
  const scale = textSize === "large" ? 1.1 : textSize === "xlarge" ? 1.25 : 1.0;

  const books = useMemo(
    () => [
      {
        id: "bk1",
        title: "The Algorithm’s Apprentice",
        author: "J. Rivera",
        year: 2022,
        genre: "Sci-Fi",
        cover:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
        blurb:
          "A junior engineer trains a sentient model, blurring the line between tool and teammate."
      },
      {
        id: "bk2",
        title: "Dust & Data",
        author: "S. Choi",
        year: 2020,
        genre: "Mystery",
        cover:
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop",
        blurb:
          "A data journalist uncovers a cold case hidden in corrupted backups and broken drives."
      },
      {
        id: "bk3",
        title: "The Library at Dawn",
        author: "A. Karim",
        year: 2023,
        genre: "Fantasy",
        cover:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop",
        blurb:
          "At sunrise, a secret wing appears—its books rewrite themselves to match your memories."
      },
      {
        id: "bk4",
        title: "Signals in the Noise",
        author: "N. Patel",
        year: 2019,
        genre: "Non-fiction",
        cover:
          "https://images.unsplash.com/photo-1457694587812-e8bf29a43845?q=80&w=600&auto=format&fit=crop",
        blurb:
          "A hands-on guide to pattern recognition, with stories from music, markets, and medicine."
      },
      {
        id: "bk5",
        title: "Prototype Hearts",
        author: "M. Alvarez",
        year: 2024,
        genre: "Romance",
        cover:
          "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=600&auto=format&fit=crop",
        blurb:
          "Two founders iterate on an app—and their relationship—through sprints, standups, and setbacks."
      }
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [history, setHistory] = useState([]); // stack of {id, action}

  const current = idx < books.length ? books[idx] : null;

  const doAction = useCallback(
    (action) => {
      if (!current) return;
      if (action === "like") {
        setLiked((prev) => [...prev, current]);
      } else if (action === "pass") {
        setPassed((prev) => [...prev, current]);
      }
      setHistory((h) => [...h, { id: current.id, action }]);
      setIdx((i) => i + 1);
    },
    [current]
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    const prevIndex = Math.max(0, idx - 1);
    const prevBook = books[prevIndex];

    // Remove from liked/passed if present
    setLiked((l) => l.filter((b) => b.id !== last.id));
    setPassed((p) => p.filter((b) => b.id !== last.id));

    // Step back in stack
    setIdx(prevIndex);
    setHistory((h) => h.slice(0, -1));

    // Sanity check: ensure the last card is indeed the previous book
    if (prevBook && prevBook.id !== last.id) {
      // If lists got out of sync, force state reset (rare in this simple flow)
      console.warn("Undo mismatch; resetting lists for safety.");
      setLiked([]);
      setPassed([]);
      setIdx(0);
      setHistory([]);
    }
  }, [history, idx, books]);

  // Keyboard controls: ← pass, → like, Backspace undo
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") doAction("pass");
      if (e.key === "ArrowRight") doAction("like");
      if (e.key === "Backspace") undo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doAction, undo]);

  const base = {
    page: {
      minHeight: "calc(100vh - 64px)",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
      justifyContent: "flex-start",
      transform: `scale(${scale})`,
      transformOrigin: "top center"
    },
    header: { width: "100%", maxWidth: 920, display: "flex", justifyContent: "space-between", alignItems: "center" },
    title: { fontSize: 28, fontWeight: 700 },
    count: { opacity: 0.7 },
    stackArea: { width: "100%", maxWidth: 520, display: "grid", placeItems: "center" },
    controls: { display: "flex", gap: 12, marginTop: 8 },
    btn: {
      padding: "10px 16px",
      borderRadius: 12,
      border: "1px solid #e0e0e0",
      background: "#fff",
      cursor: "pointer",
      fontWeight: 600
    },
    results: {
      width: "100%",
      maxWidth: 920,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 16
    },
    pill: {
      fontSize: 12,
      border: "1px solid #e0e0e0",
      borderRadius: 999,
      padding: "4px 10px",
      background: "#fafafa"
    }
  };

  return (
    <div style={base.page}>
      <div style={base.header}>
        <div style={base.title}>BookTinder</div>
        <div style={base.count}>
          {Math.min(idx + 1, books.length)}/{books.length}
        </div>
      </div>

      <div style={base.stackArea}>
        {current ? (
          <>
            <BookCard book={current} />
            <div style={base.controls}>
              <button aria-label="Pass" style={base.btn} onClick={() => doAction("pass")}>
                ← Pass
              </button>
              <button aria-label="Like" style={base.btn} onClick={() => doAction("like")}>
                Like →
              </button>
              <button aria-label="Undo" style={base.btn} onClick={undo} disabled={history.length === 0}>
                ⟲ Undo
              </button>
            </div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>Tip: use ← / → to pass/like, Backspace to undo.</div>
          </>
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <h2>You're all caught up 🎉</h2>
              <p>Review your picks below or refresh to start over.</p>
            </div>
            <button style={base.btn} onClick={() => { setIdx(0); setLiked([]); setPassed([]); setHistory([]); }}>
              Restart
            </button>
          </>
        )}
      </div>

      {/* Results */}
      <div style={{ width: "100%", maxWidth: 920 }}>
        <h3 style={{ margin: "12px 0" }}>Liked ({liked.length})</h3>
        <div style={base.results}>
          {liked.map((b) => (
            <MiniBook key={b.id} book={b} variant="liked" />
          ))}
        </div>

        <h3 style={{ margin: "16px 0 12px" }}>Passed ({passed.length})</h3>
        <div style={base.results}>
          {passed.map((b) => (
            <MiniBook key={b.id} book={b} variant="passed" />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniBook({ book, variant }) {
  const card = {
    border: "1px solid #eaeaea",
    borderRadius: 14,
    padding: 12,
    display: "grid",
    gridTemplateColumns: "64px 1fr",
    gap: 12,
    background: "#fff"
  };
  const badgeColor = variant === "liked" ? "#e6ffed" : "#fff6f6";
  const badgeBorder = variant === "liked" ? "#8de49b" : "#ffb3b3";

  return (
    <div style={card}>
      <img
        src={book.cover}
        alt={`${book.title} cover`}
        style={{ width: 64, height: 96, objectFit: "cover", borderRadius: 8 }}
      />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <strong>{book.title}</strong>
          <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 999, border: `1px solid ${badgeBorder}`, background: badgeColor }}>
            {variant}
          </span>
        </div>
        <div style={{ fontSize: 13, opacity: 0.8 }}>
          {book.author} • {book.year} • {book.genre}
        </div>
      </div>
    </div>
  );
}
