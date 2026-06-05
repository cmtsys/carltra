"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header (){
    return (
<header>
  <nav className="nav">
    <a href="/" className="">Carl Traberg</a>
    <div className="links">
      <a href="/">Work</a>
      <a href="/about.html">About</a>
      <a href="/contact.html">Contact</a>
    </div>
  </nav>
</header>
    )
}

