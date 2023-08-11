import React, { useState } from 'react'
import { Text } from '@mantine/core'

const Notification = ({ title, date, content, tema }) => {
  const [isHovered, setIsHovered] = useState(false)

  // TO DO → link notifica (backend)

  return (
    <div
      style={{
        transition: 'background-color 0.3s',
        backgroundColor: isHovered
          ? tema === 'dark'
            ? '#1a344c'
            : '#f7f8f9'
          : tema === 'dark'
          ? '#25262b'
          : '#fff',
        height: 80,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div
        style={{
          borderBottom: '1px solid #ddd',
          paddingBottom: 13,
          paddingTop: 13,
          width: '90%',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <a href='/' className='notification-title-link'>
            <Text weight={700} size='sm'>
              {title}
            </Text>
          </a>
          <Text weight={700} size='sm'>
            {date}
          </Text>
        </div>
        <Text size='sm' style={{ marginTop: 8 }}>
          {content}
        </Text>
      </div>
    </div>
  )
}

export default Notification
