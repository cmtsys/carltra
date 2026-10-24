"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const data = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/xzdolezd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      router.push("/thanks");
    } catch {
      setError("Your message could not be sent. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-page">
      <form
        id="contact-form"
        className="contact-form"
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        aria-label="Your email"
      >
          <label htmlFor="message">How can I help?</label>
        <div className="form-field">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            required
            style={{ fontSize: "20px" }}
          />
        </div>

        <div className="form-field">
          <textarea
            id="message"
            name="message"
            placeholder="Type here"
            rows={6}
            required
            style={{ fontSize: "20px" }}
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Sending…" : "Send"}</span>
        </button>
      </form>
    </div>
  );
}