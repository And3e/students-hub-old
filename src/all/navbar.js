import { useState } from 'react'
import { useEffect } from 'react'
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import './navbar.css'

/* imgs */
import logo from './../img/logos/logo-tr.png'
import logo_scritta from './../img/logos/logo-scritta-tr.png'

/* logos */
import { BellFill } from 'react-bootstrap-icons'

export default function MainNavbar() {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        document.querySelector('.logo-header').style.width = '18.75rem'
        document.querySelector('.side-bar').style.width = '18rem'
      } else if (window.innerWidth >= 767 && window.innerWidth < 1200) {
        document.querySelector('.logo-header').style.width = '12.5rem'
        document.querySelector('.side-bar').style.width = '3rem'
      } else {
        document.querySelector('.side-bar').style.width = '80%'
      }
      document.querySelector('.header-sub-container').style.width =
        document.querySelector('.header-container').offsetWidth -
        document.querySelector('.logo-header').offsetWidth +
        'px'
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const handleSidebarMouseOver = () => {
    if (window.innerWidth >= 767 && window.innerWidth < 1200) {
      document.querySelector('.side-bar').style.width = '13rem'
      document.querySelector('.content').style.marginLeft = '8rem'
    } else if (window.innerWidth < 767) {
      document.querySelector('.side-bar').style.width = '80%'
    }
  }

  const handleSidebarMouseOut = () => {
    if (window.innerWidth >= 767 && window.innerWidth < 1200) {
      document.querySelector('.side-bar').style.width = '3rem'
      document.querySelector('.content').style.marginLeft = ''
    } else if (window.innerWidth < 767) {
      document.querySelector('.side-bar').style.width = '80%'
    }
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <div
          onMouseEnter={handleSidebarMouseOver}
          onMouseLeave={handleSidebarMouseOut}>
          <Navbar
            p='md'
            hiddenBreakpoint='sm'
            hidden={!opened}
            width={{ sm: 80, lg: 300 }}
            className='side-bar'>
            <Text>Bella</Text>
          </Navbar>
        </div>
      }
      header={
        <Header
          height={{ base: 50, md: 70 }}
          p='md'
          className='navbar-container'>
          <div className='header-container'>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>

            <div className='logo-header'>
              <img
                src={logo_scritta}
                height='30'
                className='d-inline-block align-center'
                alt='Students Hub logo long'
              />
            </div>
            <div className='header-sub-container'>
              <Form className='d-flex'>
                <Form.Control
                  type='search'
                  placeholder='Cerca qualcosa...'
                  className='me-2'
                  aria-label='Cerca qualcosa...'
                />
                <Button variant='outline-primary'>Cerca</Button>
              </Form>
              <div className='header-short-logo'>
                <img
                  src={logo}
                  height='30'
                  className='d-inline-block align-center'
                  alt='Students Hub logo'
                />
              </div>
              <Button>
                <div>
                  <BellFill className='btn-bell' />
                </div>
              </Button>
            </div>
          </div>
        </Header>
      }>
      <div className='content'>
        <Text>Resize app to see responsive navbar in action</Text>
      </div>
    </AppShell>
  )
}
