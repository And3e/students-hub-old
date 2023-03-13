import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Popover, Text } from '@mantine/core'

import './see-other.css'

function SeeOtherBtn() {
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
        <a href='/'>
          <div className='other-container'>
            <div
              style={{
                transition: 'background-color 0.3s',
                backgroundColor: isHovered ? '#f0f0f0' : 'transparent',
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
        </a>
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
