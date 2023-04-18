import React, { useState, useEffect } from 'react'
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
import NoMatch from './pages/404/no-match.js'
import CalendarPage from './pages/calendar/calendar.js'
import AccountLogin from './pages/account/account-login.js'
import AccountPage from './pages/account/account-page.js'

function App() {
  const [tema, setTema] = useState('dark')
  const [logged, setLogged] = useState(false)

  console.log(logged)

  useEffect(() => {
    const savedContent = localStorage.getItem('logged')
    if (savedContent) {
      setLogged(savedContent)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('logged', logged)
  }, [logged])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route
          path='*'
          element={<MainNavbar pageID={-1} page={<NoMatch />} tema={tema} />}
        />
        <Route
          path='/dashboard'
          element={<MainNavbar pageID={0} tema={tema} />}
          exact
        />
        <Route
          path='/resources'
          element={<MainNavbar pageID={1} tema={tema} />}
          exact
        />
        <Route
          path='/lessons'
          element={<MainNavbar pageID={2} tema={tema} />}
          exact
        />
        <Route
          path='/lessons/give'
          element={<MainNavbar pageID={2} tema={tema} />}
          exact
        />
        <Route
          path='/lessons/receive'
          element={<MainNavbar pageID={2} tema={tema} />}
          exact
        />
        <Route
          path='/calendar'
          element={
            <MainNavbar pageID={3} page={<CalendarPage />} tema={tema} />
          }
          exact
        />
        <Route
          path='/credits'
          element={<MainNavbar pageID={4} tema={tema} />}
          exact
        />

        <Route
          path='/info'
          element={<MainNavbar pageID={5} tema={tema} />}
          exact
        />
        <Route
          path='/account'
          element={
            <MainNavbar
              pageID={6}
              tema={tema}
              page={
                <AccountPage
                  tema={tema}
                  setTema={setTema}
                  logged={logged}
                  setLogged={setLogged}
                />
              }
            />
          }
          exact
        />
        <Route
          path='/login'
          element={
            <AccountLogin tema={tema} logged={logged} setLogged={setLogged} />
          }
          exact
        />
      </Routes>
    </Router>
  )
}

export default App
