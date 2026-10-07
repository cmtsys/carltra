import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/typography.css";
import "./styles/fontimports.css";
import "./styles/header.css";
import "./styles/reset.css";
import "./styles/aboutme.css";
import "./styles/contact.css";
import "./styles/footer.css";
import "./styles/comingsoon.css";


import Header from "./components/Header";
import Footer from "./components/Footer";

// THIS IS THE CONTAINER FOR PAGES
// It displays the page.tsx in same folder automatically

export const metadata: Metadata = {
  title: "Carl Traberg",
  description: "Product and interaction designer who codes",
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