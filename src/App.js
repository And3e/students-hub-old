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
import CalendarPage from './pages/calendar/calendar.js'

//! FARE PAGE 404
// <Route path="*" element={<NoMatch />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route
          path='/dashboard'
          element={<MainNavbar pageID={0} page={<div>Dashboard</div>} />}
          exact
        />
        <Route path='/resources' element={<MainNavbar pageID={1} />} exact />
        <Route path='/lessons' element={<MainNavbar pageID={2} />} exact />
        <Route path='/lessons/give' element={<MainNavbar pageID={2} />} exact />
        <Route
          path='/lessons/receive'
          element={<MainNavbar pageID={2} />}
          exact
        />
        <Route
          path='/calendar'
          element={<MainNavbar pageID={3} page={<CalendarPage />} />}
          exact
        />
        <Route path='/credits' element={<MainNavbar pageID={4} />} exact />

        <Route path='/info' element={<MainNavbar pageID={5} />} exact />
        <Route path='/account' element={<MainNavbar pageID={6} />} exact />

        <Route path='/admin' element={<div>Admin</div>} exact />
      </Routes>
    </Router>
  )
}

export default App
