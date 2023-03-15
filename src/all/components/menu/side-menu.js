import React from 'react'
import IconWithText from './icon-with-text.js'
import {
  CardHeading,
  Folder,
  PersonVideo3,
  CalendarDate,
  Star,
  Question,
  Person,
} from 'react-bootstrap-icons'

import './side-menu.css'

function SideMenu(props) {
  const menuUp = [
    {
      title: 'bacheca',
      icon: CardHeading,
      size: 30,
      link: '/dashboard',
    },
    {
      title: 'risorse',
      icon: Folder,
      size: 30,
      link: '/resources',
    },
    {
      title: 'ripetizioni',
      icon: PersonVideo3,
      size: 30,
      link: '/lessons',
    },
    {
      title: 'calendario',
      icon: CalendarDate,
      size: 30,
      link: '/calendar',
    },
    {
      title: 'crediti',
      icon: Star,
      size: 30,
      link: '/credits',
    },
  ]

  const menuDown = [
    {
      title: 'info',
      icon: Question,
      size: 30,
      link: '/info',
    },
    {
      title: 'account',
      icon: Person,
      size: 30,
      link: '/account',
    },
  ]

  const isSBEx = props.isSBExpanded !== '2rem'

  return (
    <div className='side-menu-container'>
      <div className='menu-container'>
        <div className='menu-up'>
          {menuUp.map((out, index) => (
            <IconWithText
              key={index}
              title={out.title}
              icon={out.icon}
              size={out.size}
              link={out.link}
              isSBExpanded={isSBEx}
              isActive={out.link === props.pagName}
            />
          ))}
        </div>
        <div className='menu-down'>
          {menuDown.map((out, index) => (
            <IconWithText
              key={index}
              title={out.title}
              icon={out.icon}
              size={out.size}
              link={out.link}
              isSBExpanded={isSBEx}
              isActive={out.link === props.pagName}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideMenu
