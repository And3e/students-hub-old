import React, { useState, useEffect } from 'react'
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
  const [heigthSideMenu, setHeigthSideMenu] = useState('100%')
  const [marginTopSideMenu, setMarginTopSideMenu] = useState('0')

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

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 767) {
        setHeigthSideMenu('90%')
        setMarginTopSideMenu('4%')
      } else {
        setHeigthSideMenu('100%')
        setMarginTopSideMenu('0')
      }

      setTimeout(() => {
        if (window.innerWidth < 767) {
          setHeigthSideMenu('90%')
          setMarginTopSideMenu('4%')
        } else {
          setHeigthSideMenu('100%')
          setMarginTopSideMenu('0')
        }
      }, 10)
    }

    handleResize()

    window.addEventListener('load', handleResize)
    window.addEventListener('orientationchange', handleResize)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
    window.addEventListener('DOMContentLoaded', handleResize)

    return () => {
      window.removeEventListener('load', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
      window.removeEventListener('DOMContentLoaded', handleResize)
    }
  }, [])

  const isSBEx = props.isSBExpanded !== '2rem'

  return (
    <div
      className='side-menu-container'
      style={{ height: heigthSideMenu, marginTop: marginTopSideMenu }}>
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
