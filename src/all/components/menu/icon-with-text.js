import React, { useEffect, useState } from 'react'

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
        <a href={props.link}>
          <Icon size={props.size} className='mr-3' />
        </a>
      </div>
      <div className='icon-text' style={{ display: displaySideBarText }}>
        <a href={props.link}>
          <h5>{props.title}</h5>
        </a>
      </div>
    </div>
  )
}

export default IconWithText
