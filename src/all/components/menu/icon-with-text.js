import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './icon-with-text.css'

function IconWithText(props) {
  const Icon = props.icon

  const [displaySideBarText, setDisplaySideBarText] = useState('none')

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 767 && window.innerWidth < 1200) {
        if (props.isSBExpanded) {
          setDisplaySideBarText('initial')
        } else {
          setDisplaySideBarText('none')
        }
      } else {
        setDisplaySideBarText('initial')
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [props.isSBExpanded])

  return (
    <div
      className='icons-container'
      style={{
        backgroundColor: props.isActive ? '#e0e0e0' : '',
      }}>
      <div className='menu-button'>
        <Link to={props.link}>
          <Icon size={props.size} className='mr-3' />
        </Link>
      </div>
      <div className='icon-text' style={{ display: displaySideBarText }}>
        <Link to={props.link}>
          <h5>{props.title}</h5>
        </Link>
      </div>
    </div>
  )
}

export default IconWithText
