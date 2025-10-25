import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";

export default function BookTinderPage({ textSize = "normal" }) {
  const scale = textSize === "large" ? 1.1 : textSize === "xlarge" ? 1.25 : 1.0;

  const [subjectScore, setSubjectScore] = useState(() => new Map());
  const [authorScore, setAuthorScore] = useState(() => new Map());
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [history, setHistory] = useState([]);
  const current = idx < queue.length ? queue[idx] : null;

  const fetchingRef = useRef(false);
  const firstBatchShuffledRef = useRef(false);

  const queryPagesRef = useRef(new Map());
  const initialPageSeedRef = useRef(1 + Math.floor(Math.random() * 5));

  const RAW_SEED_SUBJECTS = useMemo(
    () => [
      "young_adult_fiction",
      "new_adult_fiction",
      "contemporary_romance",
      "dystopian",
      "urban_fantasy",
      "thrillers",
      "sports_fiction",
    ],
    []
  );
  const seedSubjectsRef = useRef(shuffleArray(RAW_SEED_SUBJECTS));

  const YEAR_MIN = 2008;
  const CURRENT_YEAR = new Date().getFullYear();
  const BATCH_SIZE = 30;
  const TOP_UP_THRESHOLD = 8;

  const coverURL = (cover_i, size = "L") =>
    cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg` : null;

  const isEnglish = (doc) => {
    const langs = doc?.language || doc?.languages;
    if (Array.isArray(langs)) {
      const codes = langs.map((x) => String(x).toLowerCase());
      return codes.includes("eng") || codes.includes("english");
    }
    return true;
  };

  const normalizeDoc = (doc) => {
    const author = Array.isArray(doc.author_name) ? doc.author_name[0] : doc.author_name || "Unknown";
    const subjects = Array.isArray(doc.subject) ? doc.subject.slice(0, 8) : [];
    return {
      id: doc.key || doc.cover_edition_key || `${doc.title}-${author}`,
      title: doc.title,
      author,
      year: doc.first_publish_year || "",
      genre: subjects[0] || "General",
      subjects,
      cover: coverURL(doc.cover_i),
      blurb: doc.subtitle || (subjects.length ? `Subjects: ${subjects.slice(0, 3).join(", ")}` : "An intriguing read."),
    };
  };

  const filterForAgeGroup = (b) => !b.year || b.year >= YEAR_MIN;

  const uniqueMerge = (existing, incoming) => {
    const seen = new Set(existing.map((b) => b.id));
    const merged = [...existing];
    for (const b of incoming) {
      if (!seen.has(b.id) && b.title && b.author) {
        seen.add(b.id);
        merged.push(b);
      }
    }
    return merged;
  };

  const scoreBook = (b) => {
    const subjBoost = (b.subjects || []).reduce((acc, s) => acc + (subjectScore.get(s) || 0), 0);
    const authBoost = (authorScore.get(b.author) || 0) * 2;

    let recency = 0;
    if (b.year && b.year >= YEAR_MIN) {
      const span = Math.max(1, CURRENT_YEAR - YEAR_MIN);
      recency = Math.min(3, ((b.year - YEAR_MIN) / span) * 3);
    }

    const YA_THEMES = new Set([
      "young_adult_fiction",
      "new_adult_fiction",
      "contemporary_romance",
      "dystopian",
      "urban_fantasy",
      "thrillers",
      "sports_fiction",
    ]);
    const themeBoost = (b.subjects || []).some((s) => YA_THEMES.has(String(s).toLowerCase())) ? 2 : 0;

    return subjBoost + authBoost + recency + themeBoost;
  };

  const pickQueries = () => {
    const ss = [...subjectScore.entries()];
    const as = [...authorScore.entries()];

    const subjectCandidates = ss.length
      ? ss.sort((a, b) => b[1] - a[1]).slice(0, 6).map(([s]) => s)
      : seedSubjectsRef.current;

    const authorCandidates = as.length
      ? as.sort((a, b) => b[1] - a[1]).slice(0, 3).map(([a]) => a)
      : [];

    const q = [
      ...subjectCandidates.map((s) => `subject:${encodeURIComponent(s)} language:eng`),
      ...authorCandidates.map((a) => `author:${encodeURIComponent(a)} language:eng`),
    ];

    return shuffleArray(q);
  };

  const fetchBatch = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const queries = pickQueries();
      const perQuery = Math.max(10, Math.ceil(BATCH_SIZE / Math.max(1, queries.length)));

      const urls = queries.map((q) => {
        const currentPage =
          queryPagesRef.current.get(q) ?? initialPageSeedRef.current;
        queryPagesRef.current.set(q, currentPage + 1);

        return `https://openlibrary.org/search.json?${new URLSearchParams({
          q,
          page: String(currentPage),
          fields:
            "key,title,author_name,first_publish_year,cover_i,subject,subtitle,cover_edition_key,language",
          limit: String(perQuery),
        }).toString()}`;
      });

      const results = await Promise.allSettled(urls.map((u) => fetch(u).then((r) => r.json())));
      let docs = results
        .filter((r) => r.status === "fulfilled" && r.value?.docs)
        .flatMap((r) => r.value.docs)
        .filter(isEnglish)
        .map(normalizeDoc)
        .filter(filterForAgeGroup);

      docs.sort((a, b) => scoreBook(b) - scoreBook(a));

      setQueue((prev) => {
        let merged = uniqueMerge(prev, docs);
        if (prev.length === 0 && !firstBatchShuffledRef.current) {
          firstBatchShuffledRef.current = true;
          merged = shuffleArray(merged);
        }
        return merged;
      });
    } catch (e) {
      console.warn("Open Library fetch error:", e);
    } finally {
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    if (queue.length === 0) fetchBatch();
  }, []);

  useEffect(() => {
    if (queue.length - idx <= TOP_UP_THRESHOLD) fetchBatch();
  }, [idx, queue.length]);

  useEffect(() => {
    if (!current) {
      fetchBatch();
    }
  }, [current]);

  useEffect(() => {
    if (queue.length > 0 && idx >= queue.length) {
      setIdx(queue.length - 1);
    }
  }, [queue.length, idx]);

  const updatePrefs = (book, delta) => {
    setSubjectScore((prev) => {
      const next = new Map(prev);
      for (const s of book.subjects || []) next.set(s, (next.get(s) || 0) + delta);
      return next;
    });
    if (book.author) {
      setAuthorScore((prev) => {
        const next = new Map(prev);
        next.set(book.author, (next.get(book.author) || 0) + delta);
        return next;
      });
    }
  };

  const doAction = useCallback(
    (action) => {
      if (!current) return;
      const delta = action === "like" ? +2 : -1;
      updatePrefs(current, delta);
      if (action === "like") setLiked((prev) => [...prev, current]);
      else setPassed((prev) => [...prev, current]);
      setHistory((h) => [...h, { id: current.id, action }]);
      setIdx((i) => i + 1);
    },
    [current]
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    const prevIndex = Math.max(0, idx - 1);
    const prevBook = queue[prevIndex];
    if (prevBook) {
      const delta = last.action === "like" ? -2 : +1;
      updatePrefs(prevBook, delta);
    }
    setLiked((l) => l.filter((b) => b.id !== last.id));
    setPassed((p) => p.filter((b) => b.id !== last.id));
    setIdx(prevIndex);
    setHistory((h) => h.slice(0, -1));
  }, [history, idx, queue]);

  useEffect(() => {
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
      transform: `scale(${scale})`,
      transformOrigin: "top center",
    },
    header: {
      width: "100%",
      maxWidth: 920,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: { fontSize: 28, fontWeight: 700 },
    stackArea: { width: "100%", maxWidth: 520, display: "grid", placeItems: "center" },
    btn: {
      padding: "10px 16px",
      borderRadius: 12,
      border: "1px solid #e0e0e0",
      background: "#fff",
      cursor: "pointer",
      fontWeight: 600,
    },
    results: {
      width: "100%",
      maxWidth: 920,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 16,
    },
  };

  return (
    <div style={base.page}>
      <div style={base.header}>
        <div style={base.title}>BookTinder</div>
        <div>
          {Math.min(idx + 1, Math.max(queue.length, 1))}/{Math.max(queue.length, 1)}
        </div>
      </div>

      <div style={base.stackArea}>
        {current ? (
          <>
            <div
              style={{
                width: "100%",
                maxWidth: 520,
                border: "1px solid #eaeaea",
                borderRadius: 16,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <DefaultBookCard book={current} />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button style={base.btn} onClick={() => doAction("pass")}>
                ← Pass
              </button>
              <button style={base.btn} onClick={() => doAction("like")}>
                Like →
              </button>
              <button style={base.btn} onClick={undo} disabled={history.length === 0}>
                ⟲ Undo
              </button>
            </div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
              Tip: use ← / → to pass/like, Backspace to undo.
            </div>
            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>
              Filter: English • Year ≥ {YEAR_MIN}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>Loading more books…</h2>
          </div>
        )}
      </div>

      <div style={{ width: "100%", maxWidth: 920 }}>
        <h3>Liked ({liked.length})</h3>
        <div style={base.results}>
          {liked.map((b) => (
            <MiniBook key={b.id} book={b} variant="liked" />
          ))}
        </div>

        <h3>Passed ({passed.length})</h3>
        <div style={base.results}>
          {passed.map((b) => (
            <MiniBook key={b.id} book={b} variant="passed" />
          ))}
        </div>
      </div>
    </div>
  );
}

function DefaultBookCard({ book }) {
  return (
    <div style={{ display: "grid", gridTemplateRows: "auto auto", width: "100%" }}>
      <div
        style={{
          width: "100%",
          background: "#f7f7f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 360,
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
              background: "#fff",
            }}
            loading="lazy"
          />
        ) : (
          <div style={{ padding: 40, color: "#777" }}>No cover available</div>
        )}
      </div>
      <div style={{ padding: 16 }}>
        <h2 style={{ margin: 0 }}>{book.title}</h2>
        <div style={{ opacity: 0.8, marginTop: 4 }}>
          {book.author} {book.year ? `• ${book.year}` : ""}
        </div>
        <p style={{ marginTop: 8 }}>{book.blurb}</p>
        {book.subjects?.length ? (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
            {book.subjects.slice(0, 5).map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 12,
                  border: "1px solid #e0e0e0",
                  borderRadius: 999,
                  padding: "3px 8px",
                  background: "#fafafa",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        ) : null}
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
    background: "#fff",
  };
  const badgeColor = variant === "liked" ? "#e6ffed" : "#fff6f6";
  const badgeBorder = variant === "liked" ? "#8de49b" : "#ffb3b3";

  return (
    <div style={card}>
      <div
        style={{
          width: 64,
          height: 96,
          borderRadius: 8,
          overflow: "hidden",
          background: "#f3f3f3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
          <strong>{book.title}</strong>
          <span
            style={{
              fontSize: 12,
              padding: "2px 8px",
              borderRadius: 999,
              border: `1px solid ${badgeBorder}`,
              background: badgeColor,
            }}
          >
            {variant}
          </span>
        </div>
        <div style={{ fontSize: 13, opacity: 0.8 }}>
          {book.author} {book.year ? `• ${book.year}` : ""} {book.genre ? `• ${book.genre}` : ""}
        </div>
      </div>
    </div>
  );
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
