'use client'
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget as HTMLFormElement)
    const response = await fetch('https://formspree.io/f/xzdolezd', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    if (response.ok) {
      router.push('/thanks')
    } else {
      alert('Something went wrong, please try again.')
    }
  }

  return (
    <div className="contact">
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">How can I help?</label>
          <input style={{ fontSize: "20px" }} name="Email" id="email" type="email" placeholder="your@email.com" />
        </div>
        <div className="form-field">
          <textarea style={{ fontSize: "20px" }} name="message" id="message" placeholder="Type here" rows={6}></textarea>
        </div>
        <button type="submit"><span>Send</span></button>
      </form>
    </div>
  )
}