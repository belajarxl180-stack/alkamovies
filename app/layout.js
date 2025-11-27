import "./globals.css";

export const metadata = {
  title: "ALKAMOVIES - Portal Video Penampakan & Misteri",
  description: "Agregator video YouTube untuk konten penampakan, misteri, dan urban legend. Koleksi video horror terlengkap dari seluruh Indonesia.",
  keywords: "penampakan, hantu, misteri, urban legend, horror, pocong, kuntilanak, video seram",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=Creepster&family=Eater&family=Nosifer&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
