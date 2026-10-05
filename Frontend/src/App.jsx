import './App.css'

// CAMBIO: eliminado useAuth de App.
// La comprobación de sesión queda a cargo de ProtectedRoute.

import LessonCard from './components/LessonCard'
import Login from './pages/LoginPage'
import Home from './pages/Home'
import Register from './pages/RegisterPage'
import HomePublic from './pages/HomePublic'
import { Routes, Route } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  // Passive Learning no necesita cargar branding ni moneda para estas rutas.

  return (
    // CAMBIO: eliminado SiteConfigProvider y su referencia a currency.
    <div className="App">
      {/* CAMBIO: todas las declaraciones Route están dentro de Routes. */}
      <Routes>
        {/* CAMBIO: comentarios escritos con la sintaxis correcta de JSX. */}

        {/* Página pública principal. */}
        <Route path="/" element={<HomePublic />} />

        {/* CAMBIO: normalizada la URL de /Login a /login. */}
        <Route path="/login" element={<Login />} />

        {/* CAMBIO: añadida la barra inicial para mantener URLs consistentes. */}
        <Route path="/register" element={<Register />} />

        {/* CAMBIO: sustituida /users por /home.
            ProtectedRoute recibe Home como contenido, no otro Route. */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* CAMBIO: la página de la lección también requiere sesión. */}
        <Route
          path="/lesson"
          element={
            <ProtectedRoute>
              <LessonCard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App