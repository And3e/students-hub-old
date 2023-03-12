import React, { useState, useEffect } from 'react'
import { Button } from '@mantine/core'
import { BellFill } from 'react-bootstrap-icons'
import './notification-side.css'

function NotificationSide() {
  const [backgroundColor, setBackgroundColor] = useState('#0094ed')
  const [shouldDisplay, setShouldDisplay] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 767) {
        setShouldDisplay(true)
      } else {
        setShouldDisplay(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // :hover effect
  const handleMouseOver = () => {
    setBackgroundColor('#1c7ed6')
  }

  const handleMouseOut = () => {
    setBackgroundColor('#0094ed')
  }

  if (!shouldDisplay) {
    return null
  }

  return (
    <a href='/'>
      <Button
        className='rounded-btn-side'
        style={{ backgroundColor }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
        <div className='icon-resizer-side'>
          <BellFill className='bell-icon-side' />
        </div>
      </Button>
    </a>
  )
}

export default NotificationSide
