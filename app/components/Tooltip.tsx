import type { ReactNode } from "react";

type TooltipProps = {
  message: string;
  children: ReactNode;
};

export default function Tooltip({
  message,
  children
}: TooltipProps) {

  return (
    <span
      className="tooltip-wrapper"
    >
      <span className="tooltip" role="tooltip">
        {message}
      </span>
      {children}
    </span>
  );
}

// USE LIKE THIS
// <Tooltip message="Your tooltip text"> <p>Text here</p> </Tooltip>