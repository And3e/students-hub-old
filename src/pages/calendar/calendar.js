import { useState } from 'react'
import { Group, Indicator } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import 'dayjs/locale/it'

function CalendarPage() {
  const [value, setValue] = useState(new Date().getTime() + 24 * 60 * 60 * 1000)

  return (
    <Group position='center'>
      <DatePicker
        allowDeselect
        value={value}
        onChange={setValue}
        minDate={new Date()}
        defaultValue={new Date()}
        size='md'
        locale='it'
        renderDay={(date) => {
          const day = date.getDate()
          return (
            <Indicator size={6} color='red' offset={-5} disabled={day !== 16}>
              <div>{day}</div>
            </Indicator>
          )
        }}
        getDayProps={(date) => {
          if (
            date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() === new Date().getMonth() &&
            date.getDate() === new Date().getDate()
          ) {
            return {
              sx: (theme) => ({
                backgroundColor: theme.colors.green[theme.fn.primaryShade()],
                color: theme.white + ' !important',
                ...theme.fn.hover({ backgroundColor: theme.colors.green[7] }),
              }),
            }
          }
          return {}
        }}
        getMonthControlProps={(date) => {
          if (
            date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() === new Date().getMonth()
          ) {
            return {
              sx: (theme) => ({
                backgroundColor: theme.colors.green[theme.fn.primaryShade()],
                color: theme.white,
                ...theme.fn.hover({ backgroundColor: theme.colors.green[7] }),
              }),
            }
          }
          return {}
        }}
        getYearControlProps={(date) => {
          if (date.getFullYear() === new Date().getFullYear()) {
            return {
              sx: (theme) => ({
                backgroundColor: theme.colors.green[theme.fn.primaryShade()],
                color: theme.white,
                ...theme.fn.hover({ backgroundColor: theme.colors.green[7] }),
              }),
            }
          }
          return {}
        }}
      />
    </Group>
  )
}

export default CalendarPage
