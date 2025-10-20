import React from "react";

export default function BookCard({ book }) {
  const wrap = {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    boxShadow:
      "0 1px 2px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)",
    overflow: "hidden",
    background: "#fff",
    border: "1px solid #eee"
  };
  const img = { width: "100%", height: 320, objectFit: "cover" };
  const body = { padding: 16, display: "grid", gap: 8 };
  const meta = { fontSize: 14, opacity: 0.8 };
  const chips = { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 };

  return (
    <article style={wrap} aria-label={`${book.title} by ${book.author}`}>
      <img src={book.cover} alt={`${book.title} cover`} style={img} />
      <div style={body}>
        <h2 style={{ fontSize: 22, lineHeight: 1.2 }}>{book.title}</h2>
        <div style={meta}>
          {book.author} • {book.year}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.45 }}>{book.blurb}</p>
        <div style={chips}>
          <span
            style={{
              border: "1px solid #e0e0e0",
              padding: "4px 10px",
              borderRadius: 999,
              background: "#fafafa",
              fontSize: 12
            }}
          >
            {book.genre}
          </span>
        </div>
      </div>
    </article>
  );
}
