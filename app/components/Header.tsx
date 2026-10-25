"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";

function IconSwap({
  iconA,
  iconB,
  state,
}: {
  iconA: ReactNode;
  iconB: ReactNode;
  state: "a" | "b";
}) {
  return (
    <span className="t-icon-swap" data-state={state}>
      <span className="t-icon" data-icon="a">{iconA}</span>
      <span className="t-icon" data-icon="b">{iconB}</span>
    </span>
  );
}

export default function Header() {

  const pathname = usePathname();
  const workActive = pathname === "/" || pathname.startsWith("/projects/");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
  document.body.classList.toggle("menu-open", menuOpen);

  return () => {
    document.body.classList.remove("menu-open");
  };
}, [menuOpen]);

  return (
    <header>
      <nav className="nav">
        <Link href="/" className="underline-link site-logo" onClick={closeMenu}>
          Carl Traberg
        </Link>

        <div id="site-links" className={`links ${menuOpen ? "open" : ""}`}>
          <Link
            href="/"
            className={`nav-link ${workActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Work
          </Link>

          <Link
            href="/fun-stuff"
            className={`nav-link ${pathname === "/fun-stuff" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Fun stuff
          </Link>

          <Link
            href="/contact"
            className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="hamburger"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-links"
        >
          <IconSwap
            state={menuOpen ? "b" : "a"}
            iconA={<Menu size={32} strokeWidth={2} aria-hidden="true" />}
            iconB={<X size={32} strokeWidth={2} aria-hidden="true" />}
          />
        </button>
      </nav>
    </header>
  );
}