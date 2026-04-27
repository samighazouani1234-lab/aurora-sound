"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMusic = async () => {
    setLoading(true);
    setError("");
    setAudioUrl("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur de génération");
      }

      setAudioUrl(data.audio);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    }

    setLoading(false);
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>🎵 Aurora Sound</div>
        <a style={styles.proButton}>Passer Pro</a>
      </header>

      <section style={styles.hero}>
        <div>
          <p style={styles.badge}>AI Music Generator</p>
          <h1 style={styles.title}>Crée une musique IA prête à publier.</h1>
          <p style={styles.subtitle}>
            Génère des sons, beats et chansons avec une interface premium.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Générateur</h2>

          <textarea
            placeholder="Ex : musique rap sombre avec piano triste et ambiance nocturne"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={styles.textarea}
          />

          <button
            onClick={generateMusic}
            disabled={loading || !prompt.trim()}
            style={{
              ...styles.generate,
              opacity: loading || !prompt.trim() ? 0.6 : 1,
            }}
          >
            {loading ? "⏳ Génération en cours..." : "✨ Générer la musique"}
          </button>

          {error && <p style={styles.error}>❌ {error}</p>}

          {audioUrl && (
            <div style={styles.result}>
              <h3>🎧 Résultat généré</h3>

              <audio controls style={{ width: "100%", marginTop: 12 }}>
                <source src={audioUrl} />
              </audio>

              <a href={audioUrl} download style={styles.download}>
                ⬇️ Télécharger MP3
              </a>
            </div>
          )}
        </div>
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
    gap: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 900,
  },
  proButton: {
    background: "white",
    color: "black",
    padding: "12px 18px",
    borderRadius: 999,
    fontWeight: 800,
    textDecoration: "none",
  },
  hero: {
    maxWidth: 1200,
    margin: "60px auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
    fontSize: "clamp(38px, 8vw, 64px)",
    lineHeight: 1,
    margin: "24px 0",
    letterSpacing: -2,
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
  cardTitle: {
    fontSize: 28,
    marginBottom: 20,
  },
  textarea: {
    width: "100%",
    minHeight: 140,
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.35)",
    color: "white",
    padding: 18,
    fontSize: 16,
    boxSizing: "border-box",
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
  error: {
    marginTop: 16,
    color: "#fca5a5",
    fontWeight: 700,
  },
  result: {
    marginTop: 24,
    background: "rgba(0,0,0,0.35)",
    padding: 18,
    borderRadius: 24,
  },
  download: {
    display: "block",
    marginTop: 16,
    textAlign: "center",
    background: "white",
    color: "black",
    padding: 14,
    borderRadius: 999,
    fontWeight: 900,
    textDecoration: "none",
  },
};
