import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Box, NavLink } from '@mantine/core'

import './side-menu-test.css'

import menu from './side-menu-data.js'

export default function Demo(props) {
  const [active, setActive] = useState(0)
  const [heigthSideMenu, setHeigthSideMenu] = useState('100%')
  const [marginTopSideMenu, setMarginTopSideMenu] = useState('0')

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 767) {
        setHeigthSideMenu('90%')
        setMarginTopSideMenu('4%')
      } else {
        setHeigthSideMenu('100%')
        setMarginTopSideMenu('')
      }

      setTimeout(() => {
        if (window.innerWidth < 767) {
          setHeigthSideMenu('90%')
          setMarginTopSideMenu('4%')
        } else {
          setHeigthSideMenu('100%')
          setMarginTopSideMenu('')
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

  const items = [
    <div className='menu-up' style={{ width: isSBEx ? '90%' : '41.59px' }}>
      {menu.slice(0, 5).map((item, index) => (
        <div key={item.id}>
          <Link to={item.link}>
            <NavLink
              active={index === active}
              label={isSBEx ? item.label : ''}
              description={item.description}
              rightSection={item.rightSection}
              className='menu-element'
              style={{
                width: isSBEx ? '100%' : '41.59px',
                transition: 'all 0.2s ease-in-out',
              }}
              icon={
                <item.icon
                  size={
                    isSBEx ? item.size.split(';')[0] : item.size.split(';')[1]
                  }
                  stroke={item.stroke}
                  style={{
                    transition: 'all 0.2s ease-in-out',
                    marginRight: isSBEx ? '10px' : '0px',
                  }}
                />
              }
              onClick={() => setActive(index)}
            />
          </Link>
        </div>
      ))}
    </div>,
    <div className='menu-down' style={{ width: isSBEx ? '90%' : '41.59px' }}>
      {menu.slice(5).map((item, index) => (
        <div key={item.id}>
          <Link to={item.link}>
            <NavLink
              active={index + 5 === active}
              label={isSBEx ? item.label : ''}
              description={item.description}
              rightSection={item.rightSection}
              className='menu-element'
              style={{
                width: isSBEx ? '100%' : '41.59px',
                transition: 'all 0.2s ease-in-out',
              }}
              icon={
                <item.icon
                  size={
                    isSBEx ? item.size.split(';')[0] : item.size.split(';')[1]
                  }
                  stroke={item.stroke}
                  style={{
                    transition: 'all 0.2s ease-in-out',
                    marginRight: isSBEx ? '10px' : '0px',
                  }}
                />
              }
              onClick={() => setActive(index + 5)}
            />
          </Link>
        </div>
      ))}
    </div>,
  ]

  return (
    <Box
      w={220}
      h={heigthSideMenu}
      className='side-menu-container'
      style={{ marginTop: marginTopSideMenu }}>
      <div className='menu-container'>{items}</div>
    </Box>
  )
}
