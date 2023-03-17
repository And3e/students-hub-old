import {
  CardHeading,
  Folder,
  PersonVideo3,
  CalendarDate,
  Star,
  Question,
  Person,
} from 'react-bootstrap-icons'

const stroke = '1.5'
const sizeOpen = '1.1rem'
const sizeClosed = '1.1rem'

const menu = [
  {
    icon: CardHeading,
    label: 'bacheca',
    size: sizeOpen + ';' + sizeClosed,
    link: '/dashboard',
    stroke: stroke,
    id: 0,
  },
  {
    icon: Folder,
    label: 'risorse',
    size: sizeOpen + ';' + sizeClosed,
    link: '/resources',
    stroke: stroke,
    id: 1,
  },
  {
    icon: PersonVideo3,
    label: 'ripetizioni',
    size: sizeOpen + ';' + sizeClosed,
    link: '/lessons',
    stroke: stroke,
    id: 2,
    children: [
      { label: 'First child link', link: '/dashboard/first-child' },
      { label: 'Second child link', link: '/dashboard/second-child' },
    ],
  },
  {
    icon: CalendarDate,
    label: 'calendario',
    size: sizeOpen + ';' + sizeClosed,
    link: '/calendar',
    stroke: stroke,
    id: 3,
  },
  {
    icon: Star,
    label: 'crediti',
    size: sizeOpen + ';' + sizeClosed,
    link: '/credits',
    stroke: stroke,
    id: 4,
  },
  {
    icon: Question,
    label: 'info',
    size: sizeOpen + ';' + sizeClosed,
    link: '/info',
    stroke: stroke,
    id: 5,
  },
  {
    icon: Person,
    label: 'account',
    size: sizeOpen + ';' + sizeClosed,
    link: '/account',
    stroke: stroke,
    id: 6,
  },
]

export default menu
