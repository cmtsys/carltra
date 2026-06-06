"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header (){
    return (
<header>
  <nav className="nav">
    <Link href="/" className="logo-link">Carl Traberg</Link>
    <div className="links">
      <Link href="/">Work</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </div>
  </nav>
</header>
    )
}



    //   <button class="hamburger" id="hamburger" aria-label="Menu">
    //   <span></span>
    //   <span></span>
    //   <span></span>
    // </button>