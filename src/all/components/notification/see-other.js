import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Popover, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

import './see-other.css'

function SeeOtherBtn({ tema }) {
  const [isHovered, setIsHovered] = useState(false)
  const [opened, { close, open }] = useDisclosure(false)

  const handleEnter = () => {
    setIsHovered(true)
    open()
  }

  const handleLeave = () => {
    setIsHovered(false)
    close()
  }

  return (
    <Popover width={100} position='top' withArrow shadow='md' opened={opened}>
      <Popover.Target>
        <Link to='/notifications'>
          <div className='other-container'>
            <div
              style={{
                transition: 'background-color 0.3s',
                backgroundColor: isHovered
                  ? tema === 'dark'
                    ? '#1a344c'
                    : '#f7f8f9'
                  : 'transparent',
              }}
              className='dots-container'
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}>
              <span
                className='dot'
                style={{
                  marginTop: isHovered ? '5px' : '0px',
                }}></span>
              <span
                className='dot'
                style={{
                  marginTop: isHovered ? '5px' : '0px',
                }}></span>
              <span
                className='dot'
                style={{
                  marginTop: isHovered ? '5px' : '0px',
                }}></span>
            </div>
          </div>
        </Link>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Text size='sm' className='other-text'>
          Vedi altro!
        </Text>
      </Popover.Dropdown>
    </Popover>
  )
}

export default SeeOtherBtn
