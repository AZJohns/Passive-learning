import './App.css'
import LessonCard from './components/LessonCard'
import Login from './pages/LoginPage'
// import Register from './pages/RegisterPage'
import { Routes, Route } from 'react-router'

function App() {

  return (
    <div className="App">
      <Routes>
        // ruta para login
        <Route path="/Login" element={<Login />} />

        //ruta para register
        {/* <Route path="register" element={<Register />} /> */}

        // ruta principal 
        <Route path="/" element={<LessonCard />} />
      </Routes >

    </div>
  )
}


export default App
