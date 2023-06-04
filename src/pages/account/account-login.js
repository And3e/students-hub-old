import React, { useState } from 'react'
import { MantineProvider, Tabs, Paper } from '@mantine/core'
import { Helmet } from 'react-helmet'

import Login from './login.js'
import Register from './register.js'

import logo_scritta from './../../img/logos/logo-scritta-tr.png'
import logo_scrittaDark from './../../img/logos/logo-scritta-white-tr.png'

import './account-login.css'

function AccountLogin({ tema, logged, setLogged }) {
  const [titoloAccount, setTitoloAccount] = useState('Accedi')

  return (
    <MantineProvider
      theme={{
        colorScheme: tema,
      }}
      withGlobalStyles
      withNormalizeCSS>
      <div className='account-center'>
        <Helmet>
          <title>Students Hub - {titoloAccount}</title>
        </Helmet>
        <Paper
          shadow='md'
          radius='lg'
          p='lg'
          withBorder
          className='login-container'>
          <a
            href='/dashboard'
            style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={tema === 'dark' ? logo_scrittaDark : logo_scritta}
              height='40'
              className='d-inline-block align-center'
              alt='Students Hub logo long'
              style={{ marginBottom: '10px' }}
            />
          </a>
          <Tabs defaultValue='accedi'>
            <Tabs.List position='center'>
              <Tabs.Tab
                value='accedi'
                onClick={() => setTitoloAccount('Accedi')}>
                Accedi
              </Tabs.Tab>
              <Tabs.Tab
                value='registrati'
                onClick={() => setTitoloAccount('Registrati')}>
                Registrati
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='accedi'>
              <Login logged={logged} setLogged={setLogged} />
            </Tabs.Panel>
            <Tabs.Panel value='registrati'>
              <Register logged={logged} setLogged={setLogged} />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </div>
    </MantineProvider>
  )
}

export default AccountLogin
