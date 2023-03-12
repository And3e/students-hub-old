import React, { useState } from 'react'
import SwipeToDelete from 'react-swipe-to-delete-ios'
import Notification from './notification'

const NotificationList = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Titolo notifica',
      date: '23:13',
      content: 'Questo è un esempio di notifica',
    },
    {
      id: 2,
      title: 'Notifica 2',
      date: '22:47',
      content: "Questa è un'altra notifica",
    },
    {
      id: 3,
      title: 'Notifica 3',
      date: '10/03, 00:06',
      content: 'Questa è la meno recente',
    },
  ])

  const handleDelete = (id) => {
    const newNotifications = notifications.filter(
      (notification) => notification.id !== id
    )
    setNotifications(newNotifications)
  }

  return (
    <div>
      {notifications.map((notification) => (
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
    </div>
  )
}

export default NotificationList
