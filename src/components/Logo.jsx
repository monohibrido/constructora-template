import { SITE } from '../config.js'

// Logo provisorio (marca + nombre). Reemplázalo por el logo real del cliente
// cuando lo tengas (por ejemplo un <img src="/images/logo/logo-constructora.webp">).
export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M2 22 L12 12 L18 18 L30 6" fill="none" stroke="#b5622b" strokeWidth="3" strokeLinejoin="miter" />
      </svg>
      <span className="font-serif text-lg font-semibold uppercase leading-none tracking-[0.18em]">
        {SITE.nombreCorto}
        <span className="mt-1 block font-sans text-[0.55rem] font-medium tracking-[0.34em] opacity-70">CONSTRUCTORA</span>
      </span>
    </span>
  )
}
