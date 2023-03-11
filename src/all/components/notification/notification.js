import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
  forwardRef,
} from 'react'
import { Popover, Text, Button } from '@mantine/core'

import './notification.css'
import { BellFill } from 'react-bootstrap-icons'

const Notification = forwardRef((props, ref) => {
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
    <Popover ref={ref} width={200} position='bottom' withArrow shadow='md'>
      <Popover.Target>
        <Button className='rounded-btn'>
          <div className='icon-resizer'>
            <BellFill className='bell-icon' />
          </div>
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size='md'>
          This is uncontrolled popover, it is opened when button is clicked
        </Text>
      </Popover.Dropdown>
    </Popover>
  )
})

export default Notification
