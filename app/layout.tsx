import "./globals.css";

export const metadata = {
  title: "Aurora Sound",
  description: "Générateur de musique IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
