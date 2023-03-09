import { useState } from 'react'
import { useEffect } from 'react'
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ActionIcon } from '@mantine/core'

import './../index.css'

/* imgs */
import logo from './../img/logos/logo-tr.png'
import logo_scritta from './../img/logos/logo-scritta-tr.png'

/* logos */
import { BellFill } from 'react-bootstrap-icons'

export default function AppShellDemo() {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        document.querySelector('.logo-header').style.width = '18.75rem'
      } else if (window.innerWidth < 1200 && window.innerWidth >= 767) {
        document.querySelector('.logo-header').style.width = '12.5rem'
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
        <Navbar
          p='md'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}>
          <Text>Application navbar</Text>
        </Navbar>
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
                alt='Students Hub logo'
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
              <Button>
                <div>
                  <BellFill className='btn-bell' />
                </div>
              </Button>
            </div>
          </div>
        </Header>
      }>
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  )
}
