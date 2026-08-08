"use client";


const repoUrl = "https://github.com/cmtsys/carltra";
const hash = process.env.NEXT_PUBLIC_COMMIT_HASH;
// const date = process.env.NEXT_PUBLIC_COMMIT_DATE

const commitUrl = `${repoUrl}/commit/${hash}`;


import { useEffect, useState } from "react";

function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    return `${Math.floor(months / 12)}y ago`;
}

export default function Commit() {
    const [updated, setUpdated] = useState("");

    const version = process.env.NEXT_PUBLIC_SITE_VERSION;
    const hash = process.env.NEXT_PUBLIC_COMMIT_HASH;
    const commitDate = process.env.NEXT_PUBLIC_COMMIT_DATE;

    useEffect(() => {
        if (commitDate) {
            setUpdated(timeAgo(commitDate));
        }
    }, [commitDate]);

    if (!hash || !commitDate) return null;

    return (
        <a className="underline-link"
            href={commitUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            <span>updated {updated || "…"}</span>
            <span aria-hidden="true"> · </span>
            <span>{hash}</span>
        </a>
    );
}

// export default function Commit() {
//     return (
//         <a className="underline-link"
//             href={commitUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//         >
//             {hash}
//             {/* {date} */}
//         </a>
//     )
// }