import React from 'react'
import { Paper } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import 'dayjs/locale/it'
import './calendar-item.css'

import events from './events-data'

function CalendarItem({ selected, setSelected }) {
  return (
    <Paper shadow='md' radius='xl' p='lg' style={{ width: 'fit-content' }}>
      <DatePicker
        value={selected}
        onChange={setSelected}
        minDate={new Date()}
        defaultValue={new Date()}
        size='md'
        locale='it'
        renderDay={(date) => {
          const disabledArray = !events.some(
            (event) =>
              event.date.getDate() === date.getDate() &&
              event.date.getMonth() === date.getMonth() &&
              event.date.getFullYear() === date.getFullYear() &&
              event.date.getTime() >= new Date().getTime()
          )

          const fontWeight = disabledArray ? 'normal' : '900'

          return (
            <div className={disabledArray ? '' : 'calendar-day-container'}>
              <section>
                <div
                  className={disabledArray ? '' : 'calendar-day'}
                  style={{ fontWeight }}>
                  {date.getDate()}
                </div>
              </section>
            </div>
          )
        }}
      />
    </Paper>
  )
}

export default CalendarItem
