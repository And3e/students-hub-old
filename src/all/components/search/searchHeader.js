import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Search } from 'react-bootstrap-icons'
import './search-header.css'

function SearchHeader() {
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)
  const [displaySearchHeaderContainer, setDisplaySearchHeaderContainer] =
    useState('initial')
  const [displaySearchHeader, setDisplaySearchHeader] = useState('flex')
  const [opacitySearchHeader, setOpacitySearchHeader] = useState('1')
  const [widthSearchHeader, setWidthSearchHeader] = useState('95%')

  const onFocus = () => {
    setIsExpanded(true)
    inputRef.current.focus()
    setWidthSearchHeader('95%')
    setOpacitySearchHeader('0')
    setDisplaySearchHeader('none')
  }

  const handleClick = () => {
    onFocus()

    // for mobile (keyboard problems)
    // ms delay supported = 8*50 → 400 ms
    for (let i = 1; i <= 8; i++) {
      setTimeout(() => {
        onFocus()
      }, i * 50)
    }
  }

  const handleBlur = () => {
    const windowWidth = window.innerWidth
    if (windowWidth > 767 && windowWidth <= 1200) {
      if (inputRef.current.value.trim() === '') {
        setIsExpanded(false)
      }
      setOpacitySearchHeader('0')
      setDisplaySearchHeader('none')
      setWidthSearchHeader('95%')
    } else {
      setOpacitySearchHeader('1')
      setDisplaySearchHeader('flex')
      setWidthSearchHeader('74%')
    }
  }

  const handleKeyPress = (event) => {
    const windowWidth = window.innerWidth
    if (event.key === 'Enter') {
      console.log('Submitting search request for:', inputRef.current.value)
    }
    if (event.key === 'Escape') {
      if (windowWidth > 767 && windowWidth <= 1200) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
        inputRef.current.blur()
        setWidthSearchHeader('74%')
        setOpacitySearchHeader('1')
        setDisplaySearchHeader('flex')
      }
    }
  }

  const handleShortcut = useCallback((event) => {
    if (event.altKey && event.key === 's') {
      onFocus()
    }
  }, [])

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth
      if (windowWidth < 767 || windowWidth >= 1200) {
        setIsExpanded(true)
      } else {
        setIsExpanded(false)
      }

      if (windowWidth < 1200) {
        setDisplaySearchHeader('none')
      } else {
        setDisplaySearchHeader('flex')
      }

      if (windowWidth < 767) {
        setDisplaySearchHeaderContainer('none')
      } else {
        setDisplaySearchHeaderContainer('initial')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleShortcut)
    return () => {
      window.removeEventListener('keydown', handleShortcut)
    }
  }, [handleShortcut])

  return (
    <div
      className='search-container'
      style={{ display: displaySearchHeaderContainer }}>
      <div
        className={`search-box ${isExpanded ? 'expanded' : ''}`}
        onClick={handleClick}>
        <Search className='search-icon' />
        <div
          className='shortcut-box'
          style={{
            display: displaySearchHeader,
            opacity: opacitySearchHeader,
          }}>
          Alt + S
        </div>
        <div className='input-container' style={{ width: widthSearchHeader }}>
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
