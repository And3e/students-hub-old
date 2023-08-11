import React from 'react'
import { Paper } from '@mantine/core'

import './no-match.css'

function NoMatch({ tema }) {
  return (
    <div className='error-container'>
      <Paper shadow='lg' radius='lg' p='md' withBorder className='error-paper'>
        <h1>Errore 404</h1>
        <p>Pagina non trovata!</p>
      </Paper>
    </div>
  )
}

export default NoMatch
