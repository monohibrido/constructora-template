import { waLink } from '../config.js'
import { registrarEvento } from '../analytics.js'

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink('Hola, vi su sitio web y me gustaría cotizar una obra.')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registrarEvento('click_whatsapp', { origen: 'boton_flotante' })}
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#1f8f4e] px-4 py-3 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-[#17713d]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.45 15.07L2 22l5.07-1.55A9.9 9.9 0 1 0 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.12.07-1.8-.11-.42-.12-.96-.3-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.37-.15-.2-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.3.58-.37.78-.37h.56c.18 0 .42-.07.65.5l.9 2.2c.07.15.1.3.02.48-.1.2-.15.32-.3.5l-.45.52c-.15.15-.3.3-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.3 2.37 1.45.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15l2.1 1c.28.15.47.22.54.35.07.12.07.7-.17 1.38Z" />
      </svg>
      <span className="hidden sm:inline">Escríbenos</span>
    </a>
  )
}
