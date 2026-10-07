"use client";

import { useRef, useState, type ReactNode } from "react";

type TooltipProps = {
  messages: string[];
  children: ReactNode;
};

export default function Tooltip({
  messages,
  children,
}: TooltipProps) {
  const [message, setMessage] = useState(messages[0]);
  const messageIndex = useRef(-1);

  function handleMouseEnter() {
    messageIndex.current =
      (messageIndex.current + 1) % messages.length;

    setMessage(messages[messageIndex.current]);
  }

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
    >
      <span className="tooltip" role="tooltip">
        {message}
      </span>

      {children}
    </div>
  );
}