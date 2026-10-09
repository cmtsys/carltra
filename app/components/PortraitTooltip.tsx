"use client";

import { useRef, useState, type ReactNode } from "react";

type PortraitTooltipProps = {
  messages: string[];
  children: ReactNode;
};

export default function PortraitTooltip({
  messages,
  children,
}: PortraitTooltipProps) {
  const [message, setMessage] = useState(messages[0]);
  const messageIndex = useRef(-1);

  function nextMessage() {
    messageIndex.current =
      (messageIndex.current + 1) % messages.length;

    setMessage(messages[messageIndex.current]);
  }

  return (
    <div
      className="tooltip-wrapper portrait-tooltip-wrapper"
      onMouseEnter={nextMessage}
    >
      <span className="tooltip" role="tooltip">
        {message}
      </span>

      <button type="button" onClick={nextMessage}>
      {children}
      </button>
    </div>
  );
}