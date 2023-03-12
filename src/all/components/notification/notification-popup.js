import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
  forwardRef,
} from 'react'
import { Popover, Button } from '@mantine/core'

import './notification-popup.css'
import { BellFill } from 'react-bootstrap-icons'
import NotificationList from './notification-list.js'

const NotificationPopUp = forwardRef((props, ref) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('#0094ed')
  const [shouldDisplay, setShouldDisplay] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 767) {
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

  const handleShortcut = useCallback(
    (event) => {
      if (event.altKey && event.key === 'n') {
        simulateClick()
        setIsNotificationOpen(true)
      }
      if (event.key === 'Escape' && isNotificationOpen) {
        simulateClick()
        setIsNotificationOpen(false)
      }
    },
    [isNotificationOpen]
  )

  const handleShortcutRef = useRef(handleShortcut)
  useEffect(() => {
    handleShortcutRef.current = handleShortcut
  }, [handleShortcut])

  useEffect(() => {
    function handleKeyDown(event) {
      handleShortcutRef.current(event)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function simulateClick() {
    const button = document.querySelector('.rounded-btn')
    if (button) {
      button.click()
    }
  }

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
    <Popover ref={ref} width={350} position='bottom' withArrow shadow='md'>
      <Popover.Target>
        <Button
          className='rounded-btn'
          style={{ backgroundColor }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
          <div className='icon-resizer'>
            <BellFill className='bell-icon' />
          </div>
        </Button>
      </Popover.Target>
      <Popover.Dropdown className='notification-container'>
        <NotificationList />
      </Popover.Dropdown>
    </Popover>
  )
})

export default NotificationPopUp
