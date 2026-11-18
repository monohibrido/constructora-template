import { Link } from 'react-router-dom'
import { PageHero } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <PageHero eyebrow="Error 404" title="Esta página *no existe*" text="Puede que la dirección haya cambiado o que el enlace esté incompleto. Vuelve al inicio o revisa nuestros proyectos.">
      <Link to="/" className="btn-primary">
        Volver al inicio
      </Link>
      <Link to="/proyectos" className="btn-outline">
        Ver proyectos
      </Link>
    </PageHero>
  )
}
