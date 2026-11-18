import { Reveal } from './ui.jsx'

// Acordeón con <details>: accesible, sin JavaScript y con todo el texto en el HTML.
export default function Faq({ items }) {
  return (
    <div className="divide-y divide-ink/15 border-y border-ink/15">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={i * 40}>
          <details className="group py-6">
            <summary className="flex cursor-pointer items-start justify-between gap-6 text-left">
              <h3 className="font-serif text-xl font-medium leading-snug sm:text-2xl">{f.q}</h3>
              <span
                aria-hidden="true"
                className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-ink/30 text-lg leading-none transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/70">{f.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  )
}
