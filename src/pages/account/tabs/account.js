import React, { useEffect } from 'react'

import { Avatar, Box, TextInput, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

function Account({ logged, setLogged }) {
  const navigate = useNavigate()

  function handleEscClick() {
    setLogged(false)
  }

  useEffect(() => {
    if (!logged) {
      // navigate('/login')
    }
  }, [logged, navigate])

  useEffect(() => {
    localStorage.setItem('logged', logged)
  }, [logged])

  return (
    <div className='colonna-account'>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[2],
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
        })}>
        <div className='account-header'>
          <div style={{ display: 'flex' }}>
            <Avatar color='cyan' radius='xl'>
              AL
            </Avatar>
            <h4>André Lorenzo</h4>
          </div>
          <div>
            <Button
              onClick={handleEscClick()}
              variant='outline'
              color='orange'
              radius='md'>
              Esci
            </Button>
          </div>
        </div>
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            marginTop: '20px',
          })}>
          <TextInput
            placeholder='And3e&Lollo2510'
            label='Nome utente'
            disabled
            style={{ cursor: 'default' }}
          />
          <TextInput
            className='account-space-up'
            placeholder='developers@students-hub.it'
            label='E-mail'
            disabled
            style={{ cursor: 'default' }}
          />
          <TextInput
            className='account-space-up'
            placeholder='17/18'
            label='Età'
            disabled
            style={{ cursor: 'default' }}
          />
        </Box>
      </Box>
    </div>
  )
}

export default Account
