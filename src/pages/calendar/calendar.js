import React, { useState } from 'react'
import { Calendar } from '@mantine/dates'
import { addDays, format } from 'date-fns'

export default function CalendarPage() {
  const [events, setEvents] = useState([])

  function handleDayClick(date) {
    const title = prompt('Enter the event title:')
    if (title) {
      const start = date
      const end = addDays(date, 1)
      const newEvent = { title, start, end }
      setEvents([...events, newEvent])
    }
  }

  function renderEvent(event) {
    const { title, start } = event
    const formattedDate = format(start, 'yyyy-MM-dd')
    return (
      <div key={title} style={{ marginTop: '200px' }}>
        <span>{title}</span>
        <span>{formattedDate}</span>
      </div>
    )
  }

  return (
    <>
      <Calendar onDayClick={handleDayClick} events={events} />
      {renderEvent}
    </>
  )
}
