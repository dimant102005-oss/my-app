import bottomNav from "./components/bottomNav";

export const metadata = {
  title: "СКИТ.СП",
  description: "Мобильное приложение для сотрудников",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#3b82f6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "СКИТ.СП",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="apple-touch-icon" href="/1.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body style={{
        margin: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        background: "#f5f5f5",
        color: "#333",
        paddingBottom: "70px"
      }}>
        {children}
        <bottomNav />
      </body>
    </html>
  );
}