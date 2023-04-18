import React from 'react'
import { Paper } from '@mantine/core'

import './calendar-day.css'

function CalendarDay({ handleTitle, heightDayRight }) {
  const hours = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ]

  return (
    <Paper
      shadow='md'
      radius='xl'
      p='lg'
      className='today-container'
      style={{ height: heightDayRight }}>
      <h4>{handleTitle}</h4>
      <div className='hour-container'>
        <div className='day-schedule'>
          {hours.map((hour) => (
            <div key={hour} className='hour'>
              {hour}
            </div>
          ))}
        </div>
      </div>
    </Paper>
  )
}

export default CalendarDay
