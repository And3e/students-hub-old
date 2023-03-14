import React, { useState, useRef, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

import { Search } from 'react-bootstrap-icons'

import './search-side.css'

function SearchSide() {
  const input = useRef(null)
  const [isClicked, setIsClicked] = useState(false)
  const [displaySearchSide, setDisplaySearchSide] = useState('initial')

  function handleClick() {
    setIsClicked(true)
  }

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth

      if (windowWidth < 767) {
        setDisplaySearchSide('initial')
      } else {
        setDisplaySearchSide('none')
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className='side-search-container'
      style={{ display: displaySearchSide }}>
      <Form className='d-flex'>
        <div>
          <button
            onClick={handleClick}
            className={`${isClicked ? 'clicked' : ''}`}
            id='btn-submit'
            type='submit'>
            <Search />
          </button>
        </div>
        <div className='side-input-container'>
          <input
            type='search'
            placeholder='Cerca qualcosa...'
            aria-label='Cerca qualcosa...'
            className='side-search-input'
            ref={input}
          />
        </div>
      </Form>
    </div>
  )
}

export default SearchSide