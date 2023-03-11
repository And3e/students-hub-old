import { useState, useEffect } from 'react'

import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core'

import SearchHeader from './components/search/searchHeader.js'
import SearchSide from './components/search/searchSide.js'
import Notification from './components/notification/notification.js'

import './navbar.css'

/* imgs */
import logo from './../img/logos/logo-tr.png'
import logo_scritta from './../img/logos/logo-scritta-tr.png'

export default function MainNavbar() {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        document.querySelector('.logo-header').style.width = '18.75rem'
        document.querySelector('.side-bar').style.width = '18rem'
        document.querySelector('.header-short-logo').style.display = 'none'
        document.querySelector('.logo-header').style.display = 'initial'
        document.querySelector('.header-support-child').style.display = 'none'
      } else if (window.innerWidth >= 767 && window.innerWidth < 1200) {
        document.querySelector('.logo-header').style.width = '12.5rem'
        document.querySelector('.side-bar').style.width = '3rem'
        document.querySelector('.header-short-logo').style.display = 'none'
        document.querySelector('.logo-header').style.display = 'initial'
        document.querySelector('.header-support-child').style.display = 'none'
      } else {
        document.querySelector('.side-bar').style.width = '85%'
        document.querySelector('.header-short-logo').style.display = 'initial'
        document.querySelector('.logo-header').style.display = 'none'
        document.querySelector('.header-support-child').style.display =
          'initial'
        document.querySelector('.header-short-logo').style.transform =
          'translateX(-' +
          document.querySelector('.mantine-Burger-root').offsetWidth / 2 +
          'px)'
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
      document.querySelector('.side-bar').style.width = '85%'
    }
  }

  const handleSidebarMouseOut = () => {
    if (window.innerWidth >= 767 && window.innerWidth < 1200) {
      document.querySelector('.side-bar').style.width = '3rem'
      document.querySelector('.content').style.marginLeft = ''
    } else if (window.innerWidth < 767) {
      document.querySelector('.side-bar').style.width = '85%'
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
            <div className='d-inline-flex p-2'>
              <SearchSide />
            </div>
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
              <a href='/'>
                <img
                  src={logo_scritta}
                  height='30'
                  className='d-inline-block align-center'
                  alt='Students Hub logo long'
                />
              </a>
            </div>
            <div className='header-sub-container'>
              <div className='header-support-child' />
              <div className='header-short-logo'>
                <a href='/'>
                  <img
                    src={logo}
                    height='40'
                    className='d-inline-block align-center'
                    alt='Students Hub logo'
                  />
                </a>
              </div>
              <SearchHeader />
              <Notification />
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
