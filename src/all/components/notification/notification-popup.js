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
import Notification from './notification.js'

const NotificationPopUp = forwardRef((props, ref) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

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

  return (
    <Popover ref={ref} width={350} position='bottom' withArrow shadow='md'>
      <Popover.Target>
        <Button className='rounded-btn'>
          <div className='icon-resizer'>
            <BellFill className='bell-icon' />
          </div>
        </Button>
      </Popover.Target>
      <Popover.Dropdown className='notification-container'>
        <Notification
          title='Titolo notifica'
          date='23:13'
          content='Questo è un esempio di notifica'
          isFirst={true}
        />
        <Notification
          title='Notifica 2'
          date='22:47'
          content="Questa è un'altra notifica"
          isFirst={false}
        />
        <Notification
          title='Notifica 3'
          date='10/03, 00:06'
          content='Questa è la meno recente delle 3'
          isFirst={false}
        />
      </Popover.Dropdown>
    </Popover>
  )
})

export default NotificationPopUp
