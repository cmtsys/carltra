"use client";

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
  const hash = process.env.NEXT_PUBLIC_COMMIT_HASH;
  const commitDate = process.env.NEXT_PUBLIC_COMMIT_DATE;
  const [updated, setUpdated] = useState("…");

  useEffect(() => {
    if (!commitDate) return;

    const update = () => setUpdated(timeAgo(commitDate));
    const timeout = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 60_000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [commitDate]);

  if (!hash || !commitDate) return null;

  return (
    <a
      className="underline-link footer-commit"
      href={`https://github.com/cmtsys/carltra/commit/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>updated {updated}</span>
      <span aria-hidden="true"> · </span>
      <span>{hash}</span>
    </a>
  );
}
