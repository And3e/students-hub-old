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
  Space,
  Group,
  Card,
} from '@mantine/core'

import { useRef } from 'react'
import Carousel from '../pages/home/carousel'
import Post from '../pages/home/post'


import './navbar.css'

/* imgs */
import logo from './../img/logos/logo-tr.png'
import logo_scritta from './../img/logos/logo-scritta-tr.png'

/* logos */
import { BellFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import SearchHeader from './components/search/searchHeader.js'
import SearchSide from './components/search/searchSide.js'
import SideMenu from './components/menu/side-menu.js'

import NotificationPopUp from './components/notification/notification-popup.js'
import NotificationSide from './components/notification/notification-side.js'


function MainNavbar({ pageID }) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const refHeader = useRef(null)
  const refSideBar = useRef(null)
  const refSBNavbar = useRef(null)

  // Dynamic changes
  const [displayLogoHeader, setDisplayLogoHeader] = useState('initial')
  const [widthLogoHeader, setWidthLogoHeader] = useState('12rem')
  const [widthSideBar, setWidthSideBar] = useState('12rem')
  const [displayHeaderShortLogo, setDisplayHeaderShortLogo] = useState('none')
  const [transformHeaderShortLogo, setTransformHeaderShortLogo] = useState('')
  const [displayHeaderSupportChild, setDisplayHeaderSupportChild] =
    useState('none')
  const [widthHeaderSubContainer, setWidthHeaderSubContainer] = useState('')
  const [marginLeftContent, setMarginLeftContent] = useState('')

  // SidebBar Menu
  const [indexSBC, setIndexSBC] = useState()
  const [isOpenedSBC, setIsOpenedSBC] = useState()

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        setDisplayLogoHeader('initial')
        setWidthLogoHeader('13rem')
        setWidthSideBar('13rem')
        setDisplayHeaderShortLogo('none')
        setDisplayHeaderSupportChild('none')
        setMarginLeftContent('2rem')
      } else if (window.innerWidth >= 767 && window.innerWidth < 1200) {
        setDisplayLogoHeader('initial')
        setWidthLogoHeader('12rem')
        setWidthSideBar('2rem')
        setDisplayHeaderShortLogo('none')
        setDisplayHeaderSupportChild('none')
        setMarginLeftContent('0')
      } else {
        setDisplayLogoHeader('none')
        setWidthSideBar('85%')
        setDisplayHeaderShortLogo('initial')
        setDisplayHeaderSupportChild('initial')
        setMarginLeftContent('0')
        const burgerRoot = document.querySelector('.mantine-Burger-root')
        if (burgerRoot) {
          setTransformHeaderShortLogo(
            'translateX(-' + burgerRoot.offsetWidth / 2 + 'px)'
          )
        }

        refSBNavbar.current.style.overflowY = 'auto'
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
      refSBNavbar.current.addEventListener('transitionstart', () => {
        refSBNavbar.current.style.overflowY = ''
      })
      refSBNavbar.current.addEventListener('transitionend', () => {
        refSBNavbar.current.style.overflowY = 'auto'
      })

      setWidthSideBar('12rem')
    } else if (window.innerWidth < 767) {
      setWidthSideBar('85%')
    }
  }

  const handleSidebarMouseOut = () => {
    if (window.innerWidth >= 767 && window.innerWidth < 1200) {
      setWidthSideBar('2rem')

      if (isOpenedSBC && document.querySelectorAll('.maybe-child')[indexSBC]) {
        document.querySelectorAll('.maybe-child')[indexSBC].click()
      }
    } else if (window.innerWidth < 767) {
      setWidthSideBar('85%')
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        window.innerWidth < 767 &&
        opened &&
        !refHeader.current.contains(event.target) &&
        !refSideBar.current.contains(event.target)
      ) {
        setOpened(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [opened, refHeader, refSideBar])

  const handleChildData = (index, isOpened) => {
    setIndexSBC(index)
    setIsOpenedSBC(isOpened)
  }

  const handlePageTitle = () => {
    switch (pageID) {
      case 0: {
        return '- Bacheca'
      }
      case 1: {
        return '- Risorse'
      }
      case 2: {
        return '- Ripetizioni'
      }
      case 3: {
        return '- Calendario'
      }
      case 4: {
        return '- Crediti'
      }
      case 5: {
        return '- Info'
      }
      case 6: {
        return '- Account'
      }
      default: {
        return ''
      }
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
          onMouseLeave={handleSidebarMouseOut}
          ref={refSideBar}>
          <Navbar
            p='md'
            hiddenBreakpoint='sm'
            hidden={!opened}
            width={{ sm: 60, lg: 200 }}
            className='side-bar'
            style={{ width: widthSideBar }}
            ref={refSBNavbar}>
            <SearchSide />
            <SideMenu
              isSBExpanded={widthSideBar}
              pageID={pageID}
              onChildData={handleChildData}
            />
          </Navbar>
        </div>
      }
      header={
        <Header
          height={{ base: 50, md: 70 }}
          p='md'
          className='navbar-container'
          ref={refHeader}>
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
              <Link to='/dashboard'>
                <img
                  src={logo_scritta}
                  height='35'
                  className='d-inline-block align-center'
                  alt='Students Hub logo long'
                />
              </Link>
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
                <Link to='/dashboard'>
                  <img
                    src={logo}
                    height='40'
                    className='d-inline-block align-center'
                    alt='Students Hub logo'
                  />
                </Link>
              </div>
              <SearchHeader />
              <NotificationPopUp />
              <NotificationSide />
            </div>
          </div>
        </Header>
      }>
      <Helmet>
        <title>Students Hub {handlePageTitle()}</title>
      </Helmet>
      <div className='content' style={{ marginLeft: marginLeftContent }}>
        {/* <Text style={{ marginTop: '500px' }}>*sono la home* aaaaaa</Text> */}
      </div>
      <Carousel />
      <Space h="md" />
      {/* asssssssssssaaaaaaaaaaaaaaaaaaaaaasaaaa */}

      <Card withBorder shadow="sm" radius="md" >
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">

            <Text weight={700}>Bacheca</Text>

          </Group>
        </Card.Section>
        <Card.Section mt="sm" pb="md">

          <div className='post-container'>
            <Post />
          </div>
        </Card.Section>

      </Card>
    </AppShell>
  )
}

export default MainNavbar