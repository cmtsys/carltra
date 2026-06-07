"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      <nav className="nav">
        <Link href="/" className="logo-link">Carl Traberg</Link>
        <div className={`links ${menuOpen ? "open" : ""}`}>
          <Link href="/" className={pathname === "/" ? "active" : ""}>Work</Link>
          <Link href="/about" className={pathname === "/about" ? "active" : ""}>About</Link>
          <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>Contact</Link>
        </div>
<button
  className={`hamburger ${menuOpen ? "open" : ""}`}
  onClick={() => setMenuOpen(m => !m)}
  aria-label="Menu"
>
  <span/><span/><span/>
</button>
      </nav>
    </header>
  )
}