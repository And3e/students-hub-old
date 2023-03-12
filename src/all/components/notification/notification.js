import React, { useState } from 'react'
import { Text } from '@mantine/core'

const Notification = ({ title, date, content }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        transition: 'background-color 0.3s',
        backgroundColor: isHovered ? '#f0f0f0' : '#f7f8f9',
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
          <Text weight={700} size='sm'>
            {title}
          </Text>
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
