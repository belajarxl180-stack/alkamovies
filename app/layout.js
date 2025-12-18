import "./globals.css";

export const metadata = {
  title: "KARANG JIWO - Portal Video Penampakan & Misteri",
  description: "Agregator video YouTube untuk konten penampakan, misteri, dan urban legend. Koleksi video horror terlengkap dari seluruh Indonesia.",
  keywords: "penampakan, hantu, misteri, urban legend, horror, pocong, kuntilanak, video seram",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Nosifer&display=swap" rel="stylesheet" />
      </head>
      <body style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0, overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
