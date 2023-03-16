import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import './index.css'

// Navbar
import MainNavbar from './all/navbar.js'

// Components

// <Route path="*" element={<NoMatch />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route
          path='/dashboard'
          element={<MainNavbar pagName='/dashboard' />}
          exact
        />
      </Routes>
    </Router>
  )
}

export default App
