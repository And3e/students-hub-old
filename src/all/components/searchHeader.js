import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Search } from 'react-bootstrap-icons'

import './search-header.css'

function SearchHeader(inHeader) {
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)

  function onFocus() {
    setIsExpanded(true)
    inputRef.current.focus()
    document.querySelector('.input-container').style.width = '95%'
    document.querySelector('.shortcut-box').style.opacity = '0'
    document.querySelector('.shortcut-box').style.display = 'none'
  }

  function handleClick() {
    onFocus()
  }

  function handleBlur() {
    const windowWidth = window.innerWidth
    if (windowWidth > 767 && windowWidth <= 1200) {
      if (inputRef.current.value.trim() === '') {
        setIsExpanded(false)
      }
      document.querySelector('.shortcut-box').style.opacity = '0'
      document.querySelector('.shortcut-box').style.display = 'none'
    } else {
      document.querySelector('.shortcut-box').style.opacity = '1'
      document.querySelector('.shortcut-box').style.display = 'flex'
    }
    document.querySelector('.input-container').style.width = '75%'
  }

  function handleKeyPress(event) {
    const windowWidth = window.innerWidth
    if (event.key === 'Enter') {
      // Submit search request here
      console.log('Submitting search request for:', inputRef.current.value)
    }
    if (event.key === 'Escape') {
      if (windowWidth > 767 && windowWidth <= 1200) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
        inputRef.current.blur()
        document.querySelector('.input-container').style.width = '75%'
        document.querySelector('.shortcut-box').style.opacity = '1'
        document.querySelector('.shortcut-box').style.display = 'flex'
      }
    }
  }

  const handleShortcut = useCallback((event) => {
    if (event.altKey && event.key === 's') {
      onFocus()
    }
  }, [])

  const handleShortcutOver = () => {
    document.querySelector('.shortcut-box').style.opacity = '0'
    document.querySelector('.shortcut-box').style.display = 'none'
  }

  const handleShortcutLeave = () => {
    document.querySelector('.shortcut-box').style.opacity = '1'
    document.querySelector('.shortcut-box').style.display = 'flex'
  }

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth
      if (windowWidth < 767 || windowWidth >= 1200) {
        setIsExpanded(true)
      } else {
        setIsExpanded(false)
      }

      if (windowWidth < 1200) {
        document.querySelector('.shortcut-box').style.display = 'none'
      } else {
        document.querySelector('.shortcut-box').style.display = 'flex'
      }

      if (inHeader && windowWidth < 767) {
        document.querySelector('.search-container').style.display = 'none'
      } else {
        document.querySelector('.search-container').style.display = 'initial'
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [inHeader])

  useEffect(() => {
    window.addEventListener('keydown', handleShortcut)
    return () => {
      window.removeEventListener('keydown', handleShortcut)
    }
  }, [handleShortcut])

  return (
    <div className='search-container'>
      <div
        className={`search-box ${isExpanded ? 'expanded' : ''}`}
        onClick={handleClick}>
        <Search className='search-icon' />
        <div
          className='shortcut-box'
          onMouseOver={handleShortcutOver}
          onMouseLeave={handleShortcutLeave}>
          Alt + S
        </div>
        <div className='input-container'>
          <input
            type='search'
            placeholder='Cerca qualcosa...'
            aria-label='Cerca qualcosa...'
            onFocus={() => setIsExpanded(true)}
            onBlur={handleBlur}
            className='search-input'
            ref={inputRef}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchHeader
