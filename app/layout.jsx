import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata = { title: "TrackPulse", description: "Crypto & Stock Tracker" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}