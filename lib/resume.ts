// resume.ts
export type ExperienceItem = {
  years: string
  company: string
  role: string
  description: string // supports **bold** markers, see note below
}

export const experience: ExperienceItem[] = [
  {
    years: '2024–2026',
    company: 'Huddly',
    role: 'UX designer',
    description: 'Leading the design process on the **MTR touch panel app** and **Crew framing experience** from concept through release.',
  },
  {
    years: '2024–2026',
    company: 'BEKK',
    role: 'UX designer',
    description: 'Summer internship at **OBOS** to develop a concept for **furnishing planning** on new apartments on their **website**. In conjunction with 2 developers.',
  },
  {
    years: '2024–2026',
    company: 'NAV',
    role: 'UX designer',
    description: 'Summer internship at NAV, making a new concept for the *meldekort* with two UU specialists. **User research**, **interviews**, stakeholder interviews and **conceptualization**.',
  },
  {
    years: '2021–2023',
    company: 'Magasinet Kote',
    role: 'Art Director',
    description: 'Designed and produced three editions of an independent Norwegian magazine exploring urbanism and architecture. Handling **layout**, **typography**, and **visual identity** from concept to print.',
  },
]

// ACKNOWLEDGEMENTS

export type AckItem = {
  id: string
  year: string
  title: string
  issuer: string
}

export const awards: AckItem[] = [
  // ...
]