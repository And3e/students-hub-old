import React, { useEffect, useState, useRef } from 'react'
import { Group } from '@mantine/core'

import './calendar.css'

import CalendarItem from './calendar-item.js'
import CalendarUpcoming from './calendar-upcoming.js'
import CalendarDay from './calendar-day.js'

function CalendarPage() {
  const [selected, setSelected] = useState(new Date(new Date().getTime()))
  const [heightDayRight, setHeightDayRight] = useState()

  const handleTitle = () => {
    let day, month

    switch (selected.getDay()) {
      case 1: {
        day = 'Lunedì'
        break
      }
      case 2: {
        day = 'Martedì'
        break
      }
      case 3: {
        day = 'Mercoledì'
        break
      }
      case 4: {
        day = 'Giovedì'
        break
      }
      case 5: {
        day = 'Venerdì'
        break
      }
      case 6: {
        day = 'Sabato'
        break
      }
      case 7: {
        day = 'Domenica'
        break
      }
      default: {
        day = ''
      }
    }

    switch (selected.getMonth()) {
      case 1: {
        month = 'Gennaio'
        break
      }
      case 2: {
        month = 'Febbraio'
        break
      }
      case 3: {
        month = 'Marzo'
        break
      }
      case 4: {
        month = 'Aprile'
        break
      }
      case 5: {
        month = 'Maggio'
        break
      }
      case 6: {
        month = 'Giugno'
        break
      }
      case 7: {
        month = 'Luglio'
        break
      }
      case 8: {
        month = 'Agosto'
        break
      }
      case 9: {
        month = 'Settembre'
        break
      }
      case 10: {
        month = 'Ottobre'
        break
      }
      case 11: {
        month = 'Novembre'
        break
      }
      case 12: {
        month = 'Dicembre'
        break
      }
      default: {
        month = ''
      }
    }

    return (
      day +
      ' ' +
      selected.getDate() +
      ' ' +
      month +
      ' ' +
      selected.getFullYear()
    )
  }

  useEffect(() => {
    function handleResize() {
      const dayLeft = document.querySelector('.day-left')
      // setHeightDayRight(dayLeft.offsetHeight)
    }

    handleResize()

    window.addEventListener('load', handleResize)
    window.addEventListener('orientationchange', handleResize)
    window.addEventListener('resize', handleResize)
    window.addEventListener('DOMContentLoaded', handleResize)

    return () => {
      window.removeEventListener('load', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('DOMContentLoaded', handleResize)
    }
  }, [])

  return (
    <div className='calendar-group'>
      <Group position='left' className='calendar-container'>
        <div className='day-left'>
          <CalendarItem selected={selected} setSelected={setSelected} />
          <CalendarUpcoming />
        </div>
        <CalendarDay
          handleTitle={handleTitle()}
          heightDayRight={heightDayRight}
        />
      </Group>
    </div>
  )
}

export default CalendarPage
