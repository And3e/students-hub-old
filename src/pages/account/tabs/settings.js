import React from 'react'

import { Switch, Box, useMantineTheme } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'

//!!!!! FARE DANGER ZONE !!!!!!!!!!!!!!!!!

function Settings({ tema, setTema }) {
  const theme = useMantineTheme()

  return (
    <div className='colonna-account'>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[2],
          textAlign: 'center',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[3],
          },
        })}>
        <Switch
          checked={tema === 'dark' ? true : false}
          onChange={(event) =>
            setTema(event.currentTarget.checked ? 'dark' : 'light')
          }
          size='md'
          color={tema === 'dark' ? 'gray' : 'dark'}
          onLabel={
            <IconSun size='1rem' stroke={2.5} color={theme.colors.yellow[4]} />
          }
          offLabel={
            <IconMoonStars
              size='1rem'
              stroke={2.5}
              color={theme.colors.blue[7]}
            />
          }
          labelPosition='left'
          label='Tema Dark'
        />
      </Box>
    </div>
  )
}

export default Settings
