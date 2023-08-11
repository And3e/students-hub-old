import React from 'react'
import { Tabs } from '@mantine/core'
import { IconSettings, IconUser, IconLock } from '@tabler/icons-react'

import './account-page.css'

import Settings from './tabs/settings.js'
import Account from './tabs/account.js'

function AccountPage({ tema, setTema, logged, setLogged }) {
  return (
    <div className='account-container'>
      <h1>Account</h1>
      <Tabs
        variant='pills'
        radius='md'
        orientation='vertical'
        className='account-main'
        defaultValue='settings'>
        <Tabs.List className='side-account-container'>
          <Tabs.Tab value='settings' icon={<IconSettings size='0.8rem' />}>
            Generali
          </Tabs.Tab>
          <Tabs.Tab value='account' icon={<IconUser size='0.8rem' />}>
            Account
          </Tabs.Tab>
          <Tabs.Tab value='security' icon={<IconLock size='0.8rem' />}>
            Sicurezza
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='settings' pl='xs'>
          <Settings tema={tema} setTema={setTema} />
        </Tabs.Panel>
        <Tabs.Panel value='account' pl='xs'>
          <Account logged={logged} setLogged={setLogged} />
        </Tabs.Panel>
        <Tabs.Panel value='security' pl='xs'>
          Sicurezza
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default AccountPage
