import React, { useState, useEffect } from 'react'

import { Space, Group, Card, Text } from '@mantine/core'
import Carousel from './pages/home/carousel'
import Post from './pages/home/post'

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
  const [tema, setTema] = useState(() => {
    const storedCount = localStorage.getItem('tema')
    return storedCount === 'dark' ? 'dark' : 'light'
  })

  const [logged, setLogged] = useState(() => {
    const storedLogged = localStorage.getItem('utente')
    return storedLogged === true ? true : false
  })

  useEffect(() => {
    localStorage.setItem('utente', logged)
  }, [logged])

  useEffect(() => {
    localStorage.setItem('tema', tema)
  }, [tema])

  console.log('logged ' + logged)
  console.log('tema ' + tema)

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
          element={
            <MainNavbar
              pageID={0}
              tema={tema}
              page={
                <>
                  <Carousel />

                  <Space h='md' />
                  <Card withBorder shadow='sm' radius='md'>
                    <Card.Section withBorder inheritPadding py='xs'>
                      <Group position='apart'>
                        <Text weight={700}>Bacheca</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section mt='md' pb='md' inheritPadding>
                      <Post />
                    </Card.Section>
                  </Card>
                </>
              }
            />
          }
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
