import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Proyectos from './pages/Proyectos.jsx'
import ProyectoDetalle from './pages/ProyectoDetalle.jsx'
import Servicios from './pages/Servicios.jsx'
import ServicioDetalle from './pages/ServicioDetalle.jsx'
import Proceso from './pages/Proceso.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import NotFound from './pages/NotFound.jsx'

// URLs descriptivas (importante para Google):
//   /proyectos/centro-de-distribucion-logistico-quilicura
//   /servicios/construccion-de-obras-industriales-y-bodegas
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicios/:slug" element={<ServicioDetalle />} />
        <Route path="/proceso-de-construccion" element={<Proceso />} />
        <Route path="/quienes-somos" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
