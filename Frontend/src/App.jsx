import { useState } from 'react'
import './App.css'
import Widget from './components/Widget.jsx'  


function App() {

  return (
  
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Widget" element={<Widget />} />
       
      </Route>
    </Routes>
  )
}

      export default App
