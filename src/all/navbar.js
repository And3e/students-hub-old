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
import SideMenu from './components/menu/side-menu.js'
import NotificationPopUp from './components/notification/notification-popup.js'
import NotificationSide from './components/notification/notification-side.js'

import './navbar.css'

/* imgs */
import logo from './../img/logos/logo-tr.png'
import logo_scritta from './../img/logos/logo-scritta-tr.png'

function MainNavbar() {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  /* Dynamic changes*/
  const [displayLogoHeader, setDisplayLogoHeader] = useState('initial')
  const [widthLogoHeader, setWidthLogoHeader] = useState('18.75rem')
  const [widthSideBar, setWidthSideBar] = useState('18rem')
  const [displayHeaderShortLogo, setDisplayHeaderShortLogo] = useState('none')
  const [transformHeaderShortLogo, setTransformHeaderShortLogo] = useState('')
  const [displayHeaderSupportChild, setDisplayHeaderSupportChild] =
    useState('none')
  const [widthHeaderSubContainer, setWidthHeaderSubContainer] = useState('')

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        setDisplayLogoHeader('initial')
        setWidthLogoHeader('18.75rem')
        setWidthSideBar('18rem')
        setDisplayHeaderShortLogo('none')
        setDisplayHeaderSupportChild('none')
      } else if (window.innerWidth >= 767 && window.innerWidth < 1200) {
        setDisplayLogoHeader('initial')
        setWidthLogoHeader('12.5rem')
        setWidthSideBar('3rem')
        setDisplayHeaderShortLogo('none')
        setDisplayHeaderSupportChild('none')
      } else {
        setDisplayLogoHeader('none')
        setWidthSideBar('85%')
        setDisplayHeaderShortLogo('initial')
        setDisplayHeaderSupportChild('initial')
        setTransformHeaderShortLogo(
          'translateX(-' +
            document.querySelector('.mantine-Burger-root').offsetWidth / 2 +
            'px)'
        )
      }
      setTimeout(() => {
        setWidthHeaderSubContainer(
          document.querySelector('.header-container').offsetWidth -
            document.querySelector('.logo-header').offsetWidth +
            'px'
        )
      }, 1)
    }

    handleResize()

    window.addEventListener('load', handleResize)
    window.addEventListener('orientationchange', handleResize)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
    window.addEventListener('DOMContentLoaded', handleResize)

    return () => {
      window.removeEventListener('load', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
      window.removeEventListener('DOMContentLoaded', handleResize)
    }
  }, [])

  const handleSidebarMouseOver = () => {
    if (window.innerWidth >= 767 && window.innerWidth < 1200) {
      setWidthSideBar('13rem')
    } else if (window.innerWidth < 767) {
      setWidthSideBar('85%')
    }
  }

  const handleSidebarMouseOut = () => {
    if (window.innerWidth >= 767 && window.innerWidth < 1200) {
      setWidthSideBar('3rem')
    } else if (window.innerWidth < 767) {
      setWidthSideBar('85%')
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
            className='side-bar'
            style={{ width: widthSideBar }}>
            <div className='d-inline-flex p-2'>
              <SearchSide />
            </div>
            <SideMenu />
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

            <div
              className='logo-header'
              style={{ display: displayLogoHeader, width: widthLogoHeader }}>
              <a href='/'>
                <img
                  src={logo_scritta}
                  height='30'
                  className='d-inline-block align-center'
                  alt='Students Hub logo long'
                />
              </a>
            </div>
            <div
              className='header-sub-container'
              style={{ width: widthHeaderSubContainer }}>
              <div style={{ display: displayHeaderSupportChild }} />
              <div
                style={{
                  display: displayHeaderShortLogo,
                  transform: transformHeaderShortLogo,
                }}>
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
              <NotificationPopUp />
              <NotificationSide />
            </div>
          </div>
        </Header>
      }>
      <div className='content'>
        <Text style={{ marginTop: '500px' }}>*sono la home* aaaaaa</Text>
      </div>
    </AppShell>
  )
}

export default MainNavbar
