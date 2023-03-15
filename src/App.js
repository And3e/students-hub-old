import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainNavbar from './all/navbar.js'
import './index.css'
import Bacheca from './pages/bacheca.js'

function App() {
  return (
    <Router>
      <MainNavbar />
      <Routes>
        <Route path='/dashboard' component={<Bacheca />} exact />
      </Routes>
    </Router>
  )
}

export default App
