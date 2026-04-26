"use client";

import { useState } from "react";
import { Wand2, Play } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-6">

      {/* HEADER */}
      <h1 className="text-5xl font-bold mb-4">
        Aurora Sound 🚀
      </h1>

      <p className="text-gray-400 mb-10 text-center max-w-xl">
        Crée de la musique IA en quelques secondes. Style Musicful, simple, rapide, puissant.
      </p>

      {/* INPUT */}
      <div className="w-full max-w-xl flex flex-col gap-4">

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: musique rap sombre piano triste ambiance nuit"
          className="p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none"
        />

        {/* OPTIONS */}
        <div className="flex gap-3">
          <select className="flex-1 p-3 rounded-lg bg-gray-800">
            <option>Rap</option>
            <option>Pop</option>
            <option>Électro</option>
            <option>Classique</option>
          </select>

          <select className="flex-1 p-3 rounded-lg bg-gray-800">
            <option>30 sec</option>
            <option>1 min</option>
            <option>2 min</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => setGenerated(true)}
          className="bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition"
        >
          <Wand2 size={18} />
          Générer la musique
        </button>
      </div>

      {/* RESULT */}
      {generated && (
        <div className="mt-10 w-full max-w-xl bg-gray-800 p-6 rounded-xl">

          <h2 className="mb-4 text-lg font-semibold">
            🎧 Résultat
          </h2>

          <div className="h-40 bg-black rounded-lg flex items-center justify-center">
            <Play size={40} />
          </div>

          <div className="flex gap-3 mt-4">
            <button className="bg-white text-black px-4 py-2 rounded-lg">
              Télécharger
            </button>
            <button className="border border-white px-4 py-2 rounded-lg">
              Regénérer
            </button>
          </div>

        </div>
      )}

    </main>
  );
}
