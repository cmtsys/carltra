"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header (){
    return (
    <header>
        <nav className="nav">
            <Link className="logo-link" href="/">
            
            </Link>

        </nav>

    </header>
    )
}

