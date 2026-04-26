"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateMusic = async () => {
    setLoading(true);
    setGenerated(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log(data);

      // ⚠️ temporaire (on fera mieux après)
      if (data.urls?.get) {
        setAudioUrl(data.urls.get);
        setGenerated(true);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <main style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logo}>🎵 Aurora Sound</div>
        <a style={styles.proButton}>Passer Pro</a>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <p style={styles.badge}>AI Music Generator</p>
          <h1 style={styles.title}>
            Crée une musique IA prête à publier.
          </h1>
          <p style={styles.subtitle}>
            Génère des sons, beats et chansons en quelques clics avec une interface premium.
          </p>
        </div>

        {/* CARD */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Générateur</h2>

          <textarea
            placeholder="Ex : musique rap sombre avec piano triste et ambiance nocturne"
            style={styles.textarea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div style={styles.grid}>
            <select style={styles.input}>
              <option>Rap</option>
              <option>Pop</option>
              <option>Afrobeat</option>
              <option>Lo-fi</option>
              <option>House</option>
            </select>

            <select style={styles.input}>
              <option>30 sec</option>
              <option>1 min</option>
              <option>2 min</option>
            </select>
          </div>

          <button style={styles.generate} onClick={generateMusic}>
            {loading ? "⏳ Génération..." : "✨ Générer la musique"}
          </button>

          {/* RESULT */}
          {generated && audioUrl && (
            <div style={styles.result}>
              <h3>🎧 Résultat généré</h3>

              <div style={styles.player}>
                ▶ Lecture audio
              </div>

              <audio controls style={{ width: "100%" }}>
                <source src={audioUrl} />
              </audio>

              <div style={styles.actions}>
                <button style={styles.actionButton}>
                  Télécharger
                </button>
                <button style={styles.actionButtonDark}>
                  Regénérer
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LIBRARY */}
      <section style={styles.library}>
        <h2>Mes créations</h2>

        {["Midnight Vision", "Golden Summer", "Velvet Dreams"].map(
          (t) => (
            <div key={t} style={styles.track}>
              <span>▶ {t}</span>
              <span style={{ opacity: 0.6 }}>MP3</span>
            </div>
          )
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #7c3aed55, transparent 30%), radial-gradient(circle at top right, #06b6d455, transparent 25%), #070812",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: 24,
  },
  header: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
  },
  logo: { fontSize: 24, fontWeight: 900 },
  proButton: {
    background: "white",
    color: "black",
    padding: "12px 18px",
    borderRadius: 999,
    fontWeight: 800,
  },
  hero: {
    maxWidth: 1200,
    margin: "60px auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 40,
    alignItems: "center",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.1)",
    color: "#cbd5e1",
  },
  title: {
    fontSize: 64,
    lineHeight: 1,
    margin: "24px 0",
    letterSpacing: -3,
  },
  subtitle: {
    fontSize: 18,
    color: "#cbd5e1",
    lineHeight: 1.7,
  },
  card: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 32,
    padding: 28,
    boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
  },
  cardTitle: { fontSize: 28, marginBottom: 20 },
  textarea: {
    width: "100%",
    minHeight: 130,
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.35)",
    color: "white",
    padding: 18,
    fontSize: 16,
    boxSizing: "border-box",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 14,
  },
  input: {
    padding: 14,
    borderRadius: 16,
    background: "rgba(0,0,0,0.35)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.15)",
  },
  generate: {
    marginTop: 18,
    width: "100%",
    padding: 16,
    borderRadius: 999,
    border: 0,
    background: "white",
    color: "black",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
  result: {
    marginTop: 20,
    background: "rgba(0,0,0,0.35)",
    padding: 18,
    borderRadius: 24,
  },
  player: {
    height: 90,
    borderRadius: 18,
    background: "linear-gradient(90deg,#111827,#312e81,#111827)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    fontWeight: 800,
  },
  actions: { display: "flex", gap: 10, marginTop: 14 },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 999,
    border: 0,
    fontWeight: 800,
  },
  actionButtonDark: {
    flex: 1,
    padding: 12,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white",
    fontWeight: 800,
  },
  library: {
    maxWidth: 1200,
    margin: "0 auto 60px",
  },
  track: {
    marginTop: 12,
    padding: 18,
    borderRadius: 22,
    background: "rgba(255,255,255,0.07)",
    display: "flex",
    justifyContent: "space-between",
  },
};
