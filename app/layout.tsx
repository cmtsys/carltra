import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

// THIS IS THE CONTAINER FOR PAGES
// It displays the page.tsx in same folder automatically

export const metadata: Metadata = {
  title: "carl traberg",
  description: "designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="page">
        <Header></Header>
        <main className="main">
        {children}
        </main>
        <Footer></Footer>
        </div>
      </body>
      
    </html>
  )
}