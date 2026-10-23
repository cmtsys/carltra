"use client";

// CSS LIVES IN ABOUT.ME

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
  const [animationKey, setAnimationKey] = useState(0);

  function handleClick() {
    nextMessage();
    setAnimationKey((key) => key + 1);
  }

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
      <span key={animationKey} className="tooltip" role="tooltip">
        {message}
      </span>

      <button type="button" onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}