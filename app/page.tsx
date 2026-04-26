import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-6">
        Aurora Sound 🚀
      </h1>

      <p className="text-gray-400 mb-8">
        Plateforme musicale nouvelle génération
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-2 bg-white text-black rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="px-6 py-2 border border-white rounded-lg"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
