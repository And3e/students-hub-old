import React, { useState } from 'react'
import SwipeToDelete from 'react-swipe-to-delete-ios'

// components
import Notification from './notification.js'
import SeeOtherBtn from './see-other.js'

// data
import notificationsData from './notification-data.js'

const NotificationList = () => {
  const [notifications, setNotifications] = useState(notificationsData)

  const handleDelete = (id) => {
    const newNotifications = notifications.filter(
      (notification) => notification.id !== id
    )
    setNotifications(newNotifications)
  }

  const showButton = notifications.length > 3
  const firstThreeNotifications = notifications.slice(0, 3)

  return (
    <div>
      {firstThreeNotifications.map((notification) => (
        <SwipeToDelete
          key={notification.id}
          height={80}
          deleteText='Elimina'
          onDelete={() => handleDelete(notification.id)}>
          <div style={{ userSelect: 'none' }}>
            <Notification
              title={notification.title}
              date={notification.date}
              content={notification.content}
              isFirst={notification.isFirst}
            />
          </div>
        </SwipeToDelete>
      ))}
      {showButton && <SeeOtherBtn />}
    </div>
  )
}

export default NotificationList
