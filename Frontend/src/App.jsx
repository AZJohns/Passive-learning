import './App.css'
import LessonCard from './components/LessonCard'
import Login from './pages/LoginPage'
import Home from './pages/Home'
import Register from './pages/RegisterPage'
import HomePublic from './pages/HomePublic'
import { Routes, Route } from 'react-router'

function App() {

// tengo que añadir el protected  y proteger rutas privadas.

  return (
    <div className="App">
      <Routes>
        // ruta para login
        <Route path="/Login" element={<Login />} />

        //ruta para register
        <Route path="register" element={<Register />} />

        // Ruta para la leccion diaria
        <Route path="/lesson" element={<LessonCard />} />

        <Route path="/home" element={<Home />} />

        
        // ruta principal 
        <Route path="/" element={<HomePublic />} />
      </Routes >

    </div>
  )
}


export default App
