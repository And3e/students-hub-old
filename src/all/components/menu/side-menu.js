import React, { useState, useEffect } from 'react'

import { Box, NavLink } from '@mantine/core'

import './side-menu.css'

import menu from './side-menu-data.js'

function SideMenu(props) {
  const [active, setActive] = useState(props.pageID)
  const [activeCaller, setActiveCaller] = useState(-1)
  const [childOpen, setChildOpen] = useState(-1)

  const [heigthSideMenu, setHeigthSideMenu] = useState('100%')
  const [widthMenuContainer, setWidthMenuContainer] = useState('')
  const [marginTopSideMenu, setMarginTopSideMenu] = useState('0')
  const [justifyContentSideMenuContainer, setJustifyContentSideMenuContainer] =
    useState('left')
  const [marginLeftMenuUpDown, setMarginLeftMenuUpDown] = useState('8.8735px')
  const [widthMenuUpDown, setWidthMenuUpDown] = useState('8.8735px')

  const isSBEx = props.isSBExpanded !== '2rem'

  useEffect(() => {
    props.onChildData(active, childOpen !== -1)

    if (!isSBEx && childOpen !== -1) {
      setChildOpen(-1)
      setActive(activeCaller)
    }
  }, [props, active, childOpen, isSBEx, activeCaller])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 767) {
        setHeigthSideMenu('calc(100% - 40px - 10.5vw)')
        setMarginTopSideMenu('3.5vw')
        setWidthMenuContainer('90%')
        setJustifyContentSideMenuContainer('center')
        setMarginLeftMenuUpDown('')
      } else {
        setHeigthSideMenu('100%')
        setMarginTopSideMenu('')
        setWidthMenuContainer('100%')
        setJustifyContentSideMenuContainer('left')
        setMarginLeftMenuUpDown('8.8735px')
      }

      if (isSBEx) {
        if (window.innerWidth < 767) {
          setWidthMenuUpDown('100%')
        } else {
          setWidthMenuUpDown('90%')
        }
      } else {
        setWidthMenuUpDown('41.59px')
      }

      setTimeout(() => {
        if (window.innerWidth < 767) {
          setHeigthSideMenu('calc(100% - 40px - 10.5vw)')
          setMarginTopSideMenu('3.5vw')
          setWidthMenuContainer('90%')
          setJustifyContentSideMenuContainer('center')
          setMarginLeftMenuUpDown('')
        } else {
          setHeigthSideMenu('100%')
          setMarginTopSideMenu('')
          setWidthMenuContainer('100%')
          setJustifyContentSideMenuContainer('left')
          setMarginLeftMenuUpDown('8.8735px')
        }

        if (isSBEx) {
          if (window.innerWidth < 767) {
            setWidthMenuUpDown('100%')
          } else {
            setWidthMenuUpDown('90%')
          }
        } else {
          setWidthMenuUpDown('41.59px')
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
  }, [isSBEx])

  const items = menu.map((item, index) => {
    const hasChildren = item.children && item.children.length > 0

    const handleActive = (index) => {
      if (activeCaller === -1) {
        setActiveCaller(active)
      }

      setActive(index)

      if (hasChildren) {
        if (childOpen === -1) {
          setChildOpen(index)
        } else if (index === childOpen) {
          setChildOpen(-1)
          setActive(activeCaller)
        }
      }
    }

    const renderChildLinks = (children) => {
      return children.map((child, childIndex) => {
        const childIsActive =
          `${item.link}${child.link}` === window.location.pathname

        return (
          <NavLink
            key={`${item.id}-${childIndex}`}
            active={childIsActive}
            label={isSBEx ? child.label : ''}
            description={child.description}
            rightSection={child.rightSection}
            className='menu-element'
            icon={
              <child.icon
                size={child.size}
                stroke={child.stroke}
                style={{
                  transition: 'all 0.2s ease-in-out',
                  marginRight: isSBEx ? '10px' : '0px',
                }}
              />
            }
            onClick={() => {
              setActive(index)
              window.location.pathname = `${item.link}${child.link}`
            }}
          />
        )
      })
    }

    return (
      <div key={item.id}>
        <NavLink
          active={index === active}
          label={isSBEx ? item.label : ''}
          description={item.description}
          rightSection={item.rightSection}
          className='menu-element maybe-child'
          style={{
            width: isSBEx ? '100%' : '41.59px',
            transition: 'all 0.2s ease-in-out',
          }}
          icon={
            <item.icon
              size={item.size}
              stroke={item.stroke}
              style={{
                transition: 'all 0.2s ease-in-out',
                marginRight: isSBEx ? '10px' : '0px',
              }}
            />
          }
          onClick={() => {
            if (hasChildren && isSBEx) {
              handleActive(index)
            } else {
              window.location.pathname = item.link
            }
          }}>
          {hasChildren && isSBEx && (
            <div className='submenu'>{renderChildLinks(item.children)}</div>
          )}
        </NavLink>
      </div>
    )
  })

  return (
    <Box
      h={heigthSideMenu}
      className='side-menu-container'
      style={{
        marginTop: marginTopSideMenu,
        justifyContent: justifyContentSideMenuContainer,
      }}>
      <div className='menu-container' style={{ width: widthMenuContainer }}>
        <div
          className='menu-up'
          style={{
            width: widthMenuUpDown,
            marginLeft: marginLeftMenuUpDown,
          }}>
          {items.slice(0, 5)}
        </div>
        <div
          className='menu-down'
          style={{
            width: widthMenuUpDown,
            marginLeft: marginLeftMenuUpDown,
          }}>
          {items.slice(5)}
        </div>
      </div>
    </Box>
  )
}

export default SideMenu
