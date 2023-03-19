import {
  CardHeading,
  Folder,
  PersonVideo3,
  CalendarDate,
  Star,
  Question,
  Person,
  Megaphone,
  Ear,
} from 'react-bootstrap-icons'

const stroke = '1.5'
const size = '1.1rem'

const menu = [
  {
    icon: CardHeading,
    label: 'bacheca',
    size: size,
    link: '/dashboard',
    stroke: stroke,
    id: 0,
  },
  {
    icon: Folder,
    label: 'risorse',
    size: size,
    link: '/resources',
    stroke: stroke,
    id: 1,
  },
  {
    icon: PersonVideo3,
    label: 'ripetizioni',
    size: size,
    link: '/lessons',
    stroke: stroke,
    id: 2,
    children: [
      {
        icon: Megaphone,
        label: 'Insegnante',
        size: size,
        link: '/give',
        stroke: stroke,
      },
      {
        icon: Ear,
        label: 'Alunno',
        size: size,
        link: '/receive',
        stroke: stroke,
      },
    ],
  },
  {
    icon: CalendarDate,
    label: 'calendario',
    size: size,
    link: '/calendar',
    stroke: stroke,
    id: 3,
  },
  {
    icon: Star,
    label: 'crediti',
    size: size,
    link: '/credits',
    stroke: stroke,
    id: 4,
  },
  {
    icon: Question,
    label: 'info',
    size: size,
    link: '/info',
    stroke: stroke,
    id: 5,
  },
  {
    icon: Person,
    label: 'account',
    size: size,
    link: '/account',
    stroke: stroke,
    id: 6,
  },
]

export default menu
